import type { GeneratedSchedule, StudentProfile } from '../src/shared/planner.js';
import { requirePool } from './db.js';

export interface UserRecord {
  id: string;
  email: string;
  password_hash: string;
}

export interface SavedScheduleRecord {
  id: string;
  title: string;
  profileSnapshot: StudentProfile;
  generatedSchedule: GeneratedSchedule;
  createdAt: string;
  updatedAt: string;
}

export async function createUser(email: string, passwordHash: string): Promise<UserRecord> {
  const result = await requirePool().query<UserRecord>(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, password_hash',
    [email.toLowerCase(), passwordHash],
  );
  return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const result = await requirePool().query<UserRecord>(
    'SELECT id, email, password_hash FROM users WHERE email = $1',
    [email.toLowerCase()],
  );
  return result.rows[0] ?? null;
}

export async function findUserById(id: string): Promise<Pick<UserRecord, 'id' | 'email'> | null> {
  const result = await requirePool().query<Pick<UserRecord, 'id' | 'email'>>(
    'SELECT id, email FROM users WHERE id = $1',
    [id],
  );
  return result.rows[0] ?? null;
}

export async function upsertProfile(userId: string, profile: StudentProfile): Promise<StudentProfile> {
  const result = await requirePool().query<{ profile: StudentProfile }>(
    `INSERT INTO student_profiles (user_id, profile)
     VALUES ($1, $2)
     ON CONFLICT (user_id) DO UPDATE SET profile = EXCLUDED.profile, updated_at = now()
     RETURNING profile`,
    [userId, profile],
  );
  return result.rows[0].profile;
}

export async function getProfile(userId: string): Promise<StudentProfile | null> {
  const result = await requirePool().query<{ profile: StudentProfile }>(
    'SELECT profile FROM student_profiles WHERE user_id = $1',
    [userId],
  );
  return result.rows[0]?.profile ?? null;
}

export async function createSchedule(
  userId: string,
  title: string,
  profileSnapshot: StudentProfile,
  generatedSchedule: GeneratedSchedule,
): Promise<SavedScheduleRecord> {
  const result = await requirePool().query(
    `INSERT INTO saved_schedules (user_id, title, profile_snapshot, generated_schedule)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, profile_snapshot, generated_schedule, created_at, updated_at`,
    [userId, title, profileSnapshot, generatedSchedule],
  );
  return mapSchedule(result.rows[0]);
}

export async function listSchedules(userId: string): Promise<SavedScheduleRecord[]> {
  const result = await requirePool().query(
    `SELECT id, title, profile_snapshot, generated_schedule, created_at, updated_at
     FROM saved_schedules WHERE user_id = $1 ORDER BY updated_at DESC`,
    [userId],
  );
  return result.rows.map(mapSchedule);
}

export async function updateSchedule(
  userId: string,
  scheduleId: string,
  title: string,
  generatedSchedule: GeneratedSchedule,
): Promise<SavedScheduleRecord | null> {
  const result = await requirePool().query(
    `UPDATE saved_schedules
     SET title = $3, generated_schedule = $4, updated_at = now()
     WHERE id = $1 AND user_id = $2
     RETURNING id, title, profile_snapshot, generated_schedule, created_at, updated_at`,
    [scheduleId, userId, title, generatedSchedule],
  );
  return result.rows[0] ? mapSchedule(result.rows[0]) : null;
}

export async function deleteSchedule(userId: string, scheduleId: string): Promise<boolean> {
  const result = await requirePool().query(
    'DELETE FROM saved_schedules WHERE id = $1 AND user_id = $2',
    [scheduleId, userId],
  );
  return (result.rowCount ?? 0) > 0;
}

function mapSchedule(row: {
  id: string;
  title: string;
  profile_snapshot: StudentProfile;
  generated_schedule: GeneratedSchedule;
  created_at: Date;
  updated_at: Date;
}): SavedScheduleRecord {
  return {
    id: row.id,
    title: row.title,
    profileSnapshot: row.profile_snapshot,
    generatedSchedule: row.generated_schedule,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}
