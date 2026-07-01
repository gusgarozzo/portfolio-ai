# F07 — Implementation Plan

## Steps
1. Identify logic in `lib/` that warrants tests (formatDate, extractDomain, scoreColor, etc.)
2. Write unit tests for each utility function
3. Manual responsive audit at 375px and 1280px
4. Keyboard navigation audit: tab through all interactive elements
5. Add `prefers-reduced-motion` media query wrapper if animations exist
6. Fix any a11y issues (missing labels, low contrast, missing focus indicators)
7. Run full build and test suite
8. Document any remaining issues in `.docs/DOC.md`
