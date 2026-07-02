# F09 — Implementation Plan

## Steps
1. Create `lib/rate-limit.test.ts` — test checkRateLimit with vi.advanceTimersByTime for window reset
2. Create `lib/messages.test.ts` — test t() with ES, EN, and missing keys
3. Create `lib/build-cv-context.test.ts` — test output contains locale markers and field names
4. Run `npm run test` and verify all 12+ passed
5. Run `npm run build` to ensure no regressions
