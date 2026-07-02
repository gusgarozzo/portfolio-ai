# F08 — CI/CD Pipeline

## Description
Add a GitHub Actions CI workflow that validates every push to `main` and every pull request. Runs linting, unit tests, build, and dependency audit to catch regressions early.

## Acceptance Criteria
- `.github/workflows/ci.yml` exists with a valid GitHub Actions workflow
- Workflow triggers on `push` to `main` and `pull_request` to `main`
- Steps: checkout → setup Node 20 → cache npm → `npm ci` → `npm run lint` → `npm run test` → `npm run build` → `npm audit`
- `npm run build` runs only after lint and test pass (fail-fast)
- Build passes with zero errors and zero TypeScript warnings
- No external actions beyond `actions/checkout` and `actions/setup-node`
- No secrets or environment variables required for the CI steps (`.env.example` content is not needed for build)
