import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class ApiError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function sendData<T>(res: Response, data: T, statusCode = 200) {
  return res.status(statusCode).json({ data });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: { code: error.code, message: error.message },
    });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      error: {
        code: 'validation_error',
        message: 'Request validation failed',
        details: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        })),
      },
    });
  }

  console.error('Unexpected API error', error);
  return res.status(500).json({
    error: { code: 'internal_error', message: 'Internal server error' },
  });
}
