# Bentonville Student Planner Engineering and Security Rules

This file defines non-negotiable engineering rules for any agent or contributor working in the Bentonville Student Planner repository. Follow these rules for every future code change, feature, fix, refactor, dependency update, API route, database change, deployment change, or documentation update.

If a requested change conflicts with this file, stop and explain the conflict. Do not weaken security, privacy, access control, or data integrity to make a feature work.

## 0. Mandatory preflight

Before doing any repository task, the agent must:

1. Read this `AGENTS.md` file from disk.
2. Treat these instructions as binding for the entire task.
3. If any user request conflicts with this file, stop and explain the conflict.
4. Do not rely only on prior memory or conversation context. Reread this file at the start of each new task.
5. Review the provided reference PDFs (course catalogs) to ensure accurate advice generation if working on advisory logic.
6. Check for the existence of agent definitions or specialist skills (e.g., UI/UX skills) before using them. 
7. Include confirmation in the final report that `AGENTS.md` was checked.

*Note: The project is currently in the planning phase and consists of reference PDFs. Do not hallucinate tools, directories, or skills that are not present.*

## 1. Core operating rules

- Read the existing code before changing it (once code exists).
- Preserve working features unless the requested change requires removal.
- Prefer the smallest safe change.
- Do not invent integrations, data sources, security controls, compliance status, or test results.
- Do not state that a feature is secure, private, compliant, production-ready, or complete unless the repository proves it.
- Do not hardcode secrets, access tokens, API keys, passwords, service-account JSON, private URLs, signing keys, or database credentials.
- Do not commit `.env.local`, `.env`, service-account files, private keys, or downloaded user data.
- Avoid adding dependencies. Add one only when the standard library or existing project dependencies do not solve the problem safely.
- Use clear names and short functions.
- Respect dirty worktrees and avoid destructive Git commands.

## 2. Required workflow for every task

**Before coding:**
1. Identify data touched by the change.
2. Identify trust boundaries (e.g., browser to API).
3. Identify input sources and privacy risks (especially concerning student academic data).
4. Select the smallest safe design.

**While coding:**
1. Validate input at the server boundary.
2. Ensure appropriate authentication and authorization (once implemented).
3. Add tests or a reproducible verification path.

**Before finishing:**
1. Run any available formatting, linting, type checks, tests, and builds.
2. Review the diff for secrets or overly broad permissions.
3. Update `README.md` if the change affects architecture or setup.
4. Report files changed, behavior changed, and unresolved risks.

## 3. Secrets and environment variables

- No environment variables are currently configured.
- When a stack is chosen, maintain `.env.example` with placeholder values only.
- Values that must remain server-only must never be exposed to the client.
- Never commit real secret values.

## 4. Authentication and authorization

*Not yet implemented. Requires owner confirmation before building.*

- When implemented, use deny-by-default access control.
- Verify identity on the server.
- Student data (courses, grades, test scores) must be strictly isolated to the owning user.
- Enforce role permissions explicitly (e.g., Student vs. Admin).

## 5. Database and storage security

*Not yet configured. Requires owner confirmation before building.*

- When implemented, use schema validation and enforce least-privilege database credentials.
- Ensure ownership fields exist on any record tied to a student.
- Do not use open or public database rules in production.

## 6. Input validation and output safety

*Not yet configured.*

- When implemented, use schema validation for all inputs.
- Reject unexpected fields.
- Prevent XSS, SQL/NoSQL injection, and path traversal.
- AI-generated advisory output must be safely rendered and clearly marked as informational.

## 7. File and upload rules

*Not yet supported.*

- If file uploads are added, define strict size limits, allowed MIME types, and server-side name generation.
- Revisit this section before adding upload capabilities.

## 8. APIs, costly operations, AI, and rate limiting

*Not yet configured.*

- If AI models (e.g., for parsing course catalogs or giving personalized advice) are integrated, treat all model output as untrusted.
- Do not make unreviewed high-stakes claims regarding college admissions or scholarships.
- Protect provider secrets (e.g., LLM API keys) on the server.
- Implement rate limiting on expensive operations.

## 9. Privacy and data minimization

- Collect only data necessary for generating the Student Success Plan or advisory routes.
- Do not request unnecessary precise location or device data.
- Since the tool handles student planning, ensure a Privacy Policy is established before any public release.
- Avoid logging personal data.

## 10. Browser security, headers, CSRF, and CORS

*Not yet configured.*

- When a web framework is chosen, enforce Content Security Policy, secure cookies, CSRF protection, and restricted CORS.

## 11. Error handling, logging, and monitoring

- Return generic, actionable errors to users.
- Redact personal data and credentials from logs.
- Do not swallow errors silently.

## 12. Dependencies and supply-chain safety

- Justify any new dependency.
- Use lockfiles to ensure consistency.

## 13. Testing requirements

*Not yet configured.*

- Once testing is established, require test cases for unauthenticated rejection, authorized success, malformed input, and critical user flows.

## 14. Deployment rules

*Not configured.*

- Deployment targets and CI/CD are unknown. Do not claim a deployment path exists until it is configured.

## 15. Prohibited shortcuts

- Hardcoding secrets.
- Trusting client-side user IDs for authorization.
- Disabling security checks to make a feature work.
- Using wildcard authenticated CORS.
- Fabricating compliance claims or features.

## 16. Completion report template

At the end of each task, provide this exact report format:

```text
AGENTS.md:
- Read before work: [Yes/No]
- Applicable nested instructions: [files or none]

Changed:
- [file]: [what changed]

Behavior:
- [user-visible or system behavior changed]

Security and privacy review:
- Data touched: [list or none]
- Trust boundaries: [list or none]
- Authentication: [how verified or not applicable]
- Authorization: [ownership/role checks or not applicable]
- Validation: [schemas/checks or not applicable]
- Rate limits: [route and threshold or not applicable]
- Secrets: [confirmation]
- Privacy impact: [collected, stored, shared, deleted, or none]

Verification:
- [command]: [passed/failed/not run and reason]
- [manual check]: [result]

Documentation:
- README updated: [Yes/No/Not required]
- Environment or deployment changes: [details or none]

Remaining risks or follow-up:
- [specific item or “None identified”]
```

## 17. Current project-specific reminders

- **Project Status:** The repository currently holds reference PDFs only. No codebase exists.
- **Core Strategy:** The smartest and most optimized route recommended by this tool is to attend Haas Hall Academy for math up to Geometry/Algebra 2 (using a placement exam to skip Pre-Algebra and start with Algebra 1 in 7th grade if desired), and then move to a public school to start and finish ACT/SAT exams the year those math courses are completed.
- **Course Planning:** Base all course planning advice on the official course catalogs provided in the repository.
