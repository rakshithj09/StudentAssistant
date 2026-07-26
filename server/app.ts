import './sessionTypes.js';
import bcrypt from 'bcryptjs';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import crypto from 'node:crypto';
import express, { type NextFunction, type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import helmet from 'helmet';
import { z } from 'zod';
import { generatedScheduleSchema, generateSchedule, studentProfileSchema } from '../src/shared/planner.js';
import { pool } from './db.js';
import { ApiError, errorHandler, sendData } from './errors.js';
import {
  createSchedule,
  createUser,
  deleteSchedule,
  findUserByEmail,
  findUserById,
  getProfile,
  listSchedules,
  updateSchedule,
  upsertProfile,
} from './repositories.js';

const authSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(10).max(128),
}).strict();

const saveScheduleSchema = z.object({
  title: z.string().trim().min(1).max(140),
  profileSnapshot: studentProfileSchema,
  generatedSchedule: generatedScheduleSchema,
}).strict();

const updateScheduleSchema = z.object({
  title: z.string().trim().min(1).max(140),
  generatedSchedule: generatedScheduleSchema,
}).strict();

const developmentSessionSecret = crypto.randomBytes(48).toString('hex');

export function createApp() {
  const app = express();
  const PgSession = connectPgSimple(session);
  const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: clientOrigin, credentials: true }));
  app.use(express.json({ limit: '256kb' }));
  app.use(rateLimit({
    windowMs: 60_000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }));
  app.use(session({
    name: 'student_assistant.sid',
    secret: getSessionSecret(),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8,
    },
    store: pool ? new PgSession({ pool, createTableIfMissing: false }) : undefined,
  }));
  app.use(ensureCsrfToken);
  app.use(requireCsrfForUnsafeMethods);

  app.get('/api/health', (_req, res) => {
    sendData(res, { ok: true, databaseConfigured: Boolean(pool) });
  });

  app.get('/api/auth/csrf', (req, res) => {
    sendData(res, { csrfToken: req.session.csrfToken });
  });

  app.post('/api/auth/register', asyncRoute(async (req, res) => {
    const body = authSchema.parse(req.body);
    const existing = await findUserByEmail(body.email);
    if (existing) {
      throw new ApiError(409, 'email_taken', 'An account already exists for this email.');
    }
    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await createUser(body.email, passwordHash);
    req.session.userId = user.id;
    sendData(res, { id: user.id, email: user.email }, 201);
  }));

  app.post('/api/auth/login', asyncRoute(async (req, res) => {
    const body = authSchema.parse(req.body);
    const user = await findUserByEmail(body.email);
    if (!user || !(await bcrypt.compare(body.password, user.password_hash))) {
      throw new ApiError(401, 'invalid_credentials', 'Email or password is incorrect.');
    }
    req.session.userId = user.id;
    sendData(res, { id: user.id, email: user.email });
  }));

  app.post('/api/auth/logout', (req, res, next) => {
    req.session.destroy((error) => {
      if (error) return next(error);
      res.clearCookie('student_assistant.sid');
      return sendData(res, { ok: true });
    });
  });

  app.get('/api/auth/me', asyncRoute(async (req, res) => {
    const userId = requireUserId(req);
    const user = await findUserById(userId);
    if (!user) {
      throw new ApiError(401, 'unauthorized', 'Session is no longer valid.');
    }
    sendData(res, user);
  }));

  app.get('/api/profile', asyncRoute(async (req, res) => {
    const profile = await getProfile(requireUserId(req));
    sendData(res, profile);
  }));

  app.put('/api/profile', asyncRoute(async (req, res) => {
    const profile = studentProfileSchema.parse(req.body);
    const saved = await upsertProfile(requireUserId(req), profile);
    sendData(res, saved);
  }));

  app.post('/api/schedules/generate', asyncRoute(async (req, res) => {
    const profile = studentProfileSchema.parse(req.body);
    await upsertProfile(requireUserId(req), profile);
    sendData(res, generateSchedule(profile), 201);
  }));

  app.get('/api/schedules', asyncRoute(async (req, res) => {
    sendData(res, await listSchedules(requireUserId(req)));
  }));

  app.post('/api/schedules', asyncRoute(async (req, res) => {
    const body = saveScheduleSchema.parse(req.body);
    const saved = await createSchedule(
      requireUserId(req),
      body.title,
      body.profileSnapshot,
      body.generatedSchedule,
    );
    sendData(res, saved, 201);
  }));

  app.put('/api/schedules/:id', asyncRoute(async (req, res) => {
    const body = updateScheduleSchema.parse(req.body);
    const saved = await updateSchedule(requireUserId(req), String(req.params.id), body.title, body.generatedSchedule);
    if (!saved) {
      throw new ApiError(404, 'not_found', 'Schedule was not found.');
    }
    sendData(res, saved);
  }));

  app.delete('/api/schedules/:id', asyncRoute(async (req, res) => {
    const deleted = await deleteSchedule(requireUserId(req), String(req.params.id));
    if (!deleted) {
      throw new ApiError(404, 'not_found', 'Schedule was not found.');
    }
    res.status(204).send();
  }));

  app.use(errorHandler);
  return app;
}

function ensureCsrfToken(req: Request, _res: Response, next: NextFunction) {
  req.session.csrfToken ??= crypto.randomBytes(32).toString('hex');
  next();
}

function requireCsrfForUnsafeMethods(req: Request, _res: Response, next: NextFunction) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const token = req.header('x-csrf-token');
  if (!token || token !== req.session.csrfToken) {
    return next(new ApiError(403, 'csrf_failed', 'Security token is missing or invalid.'));
  }
  return next();
}

function requireUserId(req: Request): string {
  if (!req.session.userId) {
    throw new ApiError(401, 'unauthorized', 'Sign in to continue.');
  }
  return req.session.userId;
}

function asyncRoute(handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET must be set to at least 32 characters in production.');
  }
  return developmentSessionSecret;
}
