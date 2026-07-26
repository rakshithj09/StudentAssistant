declare module 'connect-pg-simple' {
  import type session from 'express-session';

  interface PgSessionStoreOptions {
    pool?: unknown;
    conString?: string;
    createTableIfMissing?: boolean;
  }

  interface PgSessionStoreConstructor {
    new(options?: PgSessionStoreOptions): session.Store;
  }

  function connectPgSimple(expressSession: typeof session): PgSessionStoreConstructor;
  export default connectPgSimple;
}
