# F07 — Tests & Polish

## Description
Add unit tests for non-trivial logic in `lib/`, verify responsive design at breakpoints, audit accessibility, and perform final build verification.

## Acceptance Criteria
- Tests exist for any utility functions in `lib/` (formatting, data transformations)
- Test files are colocated (`lib/foo.ts` + `lib/foo.test.ts`)
- `npm run test` passes (Vitest)
- All sections render correctly at 375px and 1280px widths
- Interactive elements are keyboard-navigable with visible focus indicators
- `prefers-reduced-motion` is respected (no animations if user prefers reduced motion)
- `npm run build` completes with zero errors and zero TypeScript warnings
- `npm run lint` passes
