# Bentonville Student Planner

Bentonville Student Planner is a planned advisory tool and course planner for students in Bentonville, Arkansas, covering both public schools and the Haas school system. It aims to help students navigate their Student Success Plan (SSP), standardized testing (ACT/SAT), and extracurriculars through personalized optimization.

## What the app does

**Implemented:**
- None (The codebase is currently in its initial planning phase).

**Planned:**
- Provide a built-in course planner to help students develop their Student Success Plan (SSP).
- Give personalized advice on when to start taking the ACTs or SATs (recommended the year after finishing Geometry/Algebra 2).
- Compare ACT vs. SAT benefits and walk students through the process.
- Offer guidance on the best extracurricular activities and when to start them.
- Recommend optimized education routes, such as attending Haas Hall Academy for math up to Geometry/Algebra 2 (with an optional 7th-grade placement exam to skip Pre-Algebra), and then transferring to a public school to complete standardized exams.

## First things to know

- Read [AGENTS.md](./AGENTS.md) before any repository task. It contains the security and engineering rules for this repo.
- The repository currently contains only reference PDFs (course catalogs and flyers). There is no active codebase, architecture, or environment configured yet.
- When development begins, no real secrets or `.env` files should ever be committed.

## Repository Map

```text
121024-Jr_High_Course_Catalog_2025-26docx1.pdf    Junior High Course Catalog reference
HS Course Catalog 2026-2027.pdf                   High School Course Catalog reference
SS 26 Flyer.pdf                                   Summer School Flyer reference
```

## Architecture

*Requires owner confirmation.*

No architecture, frontend framework, backend framework, or database is currently configured.

## Main User Flows

*Planned / Not yet implemented.*

### Student Advisory Flow (Planned)
- Students will input their current grade, math level, and school system.
- The system will output a personalized route, including SSP course planning and testing timelines.

## Local Setup

### Prerequisites
- Node.js 22+
- npm
- Firebase CLI access to project `bentonvillecounselling`

### Environment
Copy `.env.example` to `.env` for local development and replace placeholder values as needed.

```bash
cp .env.example .env
```

Firebase web app values are public client configuration values, but they still belong in `.env` locally so each environment can point to the correct Firebase project. Do not commit `.env`, service account JSON, private keys, or any real server secret values.

Required Firebase client keys:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Get these from Firebase Console:

1. Open project `bentonvillecounselling`.
2. Go to Project settings.
3. Under Your apps, create or open the Web app.
4. Copy the Firebase config values into `.env`.

### Firebase Services
Enable these before running the app against Firebase:

1. Authentication: enable Google and Email/Password sign-in providers.
2. Firestore Database: create a database for project `bentonvillecounselling`.
3. Security rules: deploy `firestore.rules` before collecting real student planner data.

## Running Locally

```bash
npm ci
npm run dev
```

## API Contracts

*Not yet implemented.*

## Data Model

| Resource | Purpose | Ownership | Read access | Write access | Sensitive fields or privacy notes |
|---|---|---|---|---|---|
| *None* | N/A | N/A | N/A | N/A | N/A |

*Not yet implemented. Must be defined before collecting student data.*

## Storage Model

Signed-in users save planner data in Firestore at:

```text
users/{uid}/planner/state
```

Firestore rules deny all other access and only allow a signed-in user to read/write their own `users/{uid}` subtree. The browser also keeps a local fallback draft under `bentonville-student-planner-profile`; after login, Firestore is the source of truth and the old device profile can be imported once from the onboarding/settings flow.

## Domain-specific subsystem

### Advisory Engine (Planned)
The core logic will involve mapping student progress to Bentonville/Haas course catalogs and suggesting optimal pathways. AI/ML integration is currently *Unknown*.

## Testing and Verification

```bash
npm run lint
npm run build
```

## Development rules

- Read [AGENTS.md](./AGENTS.md) before starting any work.
- Validate all future architectural decisions with the repository owner.
- Ensure any future student data (e.g., grades, schedules, test scores) is treated as sensitive.

## Common change guides

*Not yet applicable.*

## Deployment summary

This app is configured for Firebase Hosting as a Vite static frontend.

Firebase project:
- Project name: `StudentAssistant`
- Project ID: `bentonvillecounselling`
- Project number: `856640678808`

Manual deployment:

```bash
npm run build
npx firebase-tools@latest deploy --only hosting,firestore:rules -P bentonvillecounselling
```

Automated deployment is configured in `.github/workflows/firebase-hosting.yml`.

Branch behavior:
- Push to `main`: deploys to the Firebase Hosting production channel.
- Push to `redesign`: deploys to the Firebase preview channel named `redesign`.
- Push to any other branch: deploys to a Firebase preview channel derived from the branch name.
- Pull requests targeting `main` or `redesign`: deploy to a preview channel.

Required GitHub repository secret:

```text
FIREBASE_SERVICE_ACCOUNT_BENTONVILLECOUNSELLING
```

Create a least-privilege Firebase service account for Hosting deployment, store the full JSON key as that GitHub secret, and rotate the key if it is ever exposed.

Required GitHub Actions secrets for the Vite Firebase client build:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Add them in GitHub under Settings -> Secrets and variables -> Actions -> Secrets. These are Firebase Web App config values, not service-account credentials.

The service account needs permission to deploy Firebase Hosting and Firestore rules for the production workflow. Preview channel deploys run for pull requests and non-main branches; pushes to `main` deploy the live Hosting channel and Firestore rules.

## Troubleshooting

| Symptom | Likely cause | What to check |
|---|---|---|
| No codebase found | The project is in the planning phase | The repository currently only holds reference PDFs |

## Separate applications or packages

*None.*

## Useful commands

```bash
npm run dev
npm run lint
npm run build
npx firebase-tools@latest deploy --only hosting,firestore:rules -P bentonvillecounselling
```

## First-week checklist

1. Read `AGENTS.md` and this `README.md`.
2. Review the reference course catalogs provided as PDFs in the repository root.
3. Await architectural and stack decisions from the repository owner before writing code.

## Known limitations

- **Not implemented:** The entire application is currently planned.
- **Requires owner confirmation:** Technology stack, deployment target, AI integrations, and database schema.

## License

No `LICENSE` file is present in this repository. Confirm the intended license with the repository owner before redistributing or reusing the code.
