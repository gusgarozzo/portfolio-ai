# F09 — Additional Unit Tests

## Description
Add unit tests for the three `lib/` modules that currently lack coverage: `rate-limit`, `messages`, and `build-cv-context`. Follows the existing pattern (colocated `lib/foo.ts` + `lib/foo.test.ts`).

## Acceptance Criteria
- `lib/rate-limit.test.ts` exists and tests:
  - First call from an IP returns `{ allowed: true }`
  - 21st call within the window returns `{ allowed: false }`
  - Window resets after 10 minutes
- `lib/messages.test.ts` exists and tests:
  - `t()` returns the correct ES string for known keys
  - `t()` returns the correct EN string for known keys
  - `t()` returns the key itself for unknown keys
- `lib/build-cv-context.test.ts` exists and tests:
  - Output contains `--- ES ---` and `--- EN ---` locale markers
  - Output contains personal data fields (`Name:`, `Title:`, `Location:`)
  - Output contains section headers (`Experience:`, `Skills:`, `Certifications:`, `Education:`)
- All tests pass with `npm run test`
- No new dependencies required
- No modification to source files (only test files are added)
