import pg from 'pg';
import { ApiError } from './errors.js';

const { Pool } = pg;

export const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
    })
  : null;

export function requirePool() {
  if (!pool) {
    throw new ApiError(503, 'database_not_configured', 'Database is not configured. Set DATABASE_URL and run npm run db:migrate.');
  }
  return pool;
}
