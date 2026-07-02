# F08 — Implementation Plan

## Steps
1. Create `.github/workflows/ci.yml` with GitHub Actions workflow definition
2. Use `actions/checkout@v4` for checkout
3. Use `actions/setup-node@v4` with Node 20 and npm cache
4. Sequential steps: `npm ci` → `npm run lint` → `npm run test` → `npm run build` → `npm audit --audit-level=high`
5. Verify workflow syntax with `act` or manual inspection
