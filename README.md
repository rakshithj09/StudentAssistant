# Bentonville Student Assistant

Bentonville Student Assistant is a React and Express planning tool for students in Bentonville, Arkansas. It generates a private, semester-by-semester academic schedule from student profile data, saved account data, and curated course-catalog seed data for Bentonville Public Schools and Haas Hall Academy.

## What the App Does

- Creates email/password accounts with server-side sessions.
- Stores student profiles and saved schedules in Postgres.
- Collects grade, school system, math level, GPA, course grades, test status/scores, career cluster, rigor preference, completed courses, and extracurricular interests.
- Generates a deterministic college-readiness schedule through 12th grade.
- Lets students edit, save, load, and print/export generated schedules.

All generated advice is informational and must be confirmed with a school counselor. Catalog entries in code are curated seed data from the provided PDF references and should be expanded/verified before relying on them for official enrollment decisions.

## Local Setup

Prerequisites:

- Node.js 22.22+ or 24+
- Postgres 14+

Install dependencies:

```bash
npm install
```

Create local environment settings:

```bash
cp .env.example .env
```

Update `.env` with a real local `DATABASE_URL` and a random `SESSION_SECRET` of at least 32 characters.

Apply database schema:

```bash
npm run db:migrate
```

Run the frontend and API together:

```bash
npm run dev
```

The client runs at `http://localhost:5173` and proxies `/api` to the API server at `http://localhost:4000`.

## API Summary

Responses use `{ "data": ... }` on success and `{ "error": { "code", "message" } }` on failure.

- `GET /api/health`
- `GET /api/auth/csrf`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/profile`
- `PUT /api/profile`
- `POST /api/schedules/generate`
- `GET /api/schedules`
- `POST /api/schedules`
- `PUT /api/schedules/:id`
- `DELETE /api/schedules/:id`

Unsafe requests require the session-bound `x-csrf-token` header. Browser calls should use the app's API client.

## Data Model

| Resource | Purpose | Ownership | Privacy notes |
|---|---|---|---|
| `users` | Account identity and password hash | One row per account | Never expose password hashes |
| `session` | Server-side session storage | Session cookie | HTTP-only cookie |
| `student_profiles` | Current planning inputs | `user_id` | Contains GPA, grades, and test scores |
| `saved_schedules` | Saved generated plans | `user_id` | Contains profile snapshot and editable schedule |

Every student-owned row is queried by authenticated `user_id`; client-submitted user IDs are not trusted.

## Verification

```bash
npm run lint
npm run build
npm test
npm audit
```

Database-backed persistence routes require a configured Postgres database for full integration verification.

## Development Rules

Read `AGENTS.md` before every repository task. Student academic data is sensitive: minimize collection, validate all inputs, avoid logging personal data, and do not commit real `.env` values or credentials.
