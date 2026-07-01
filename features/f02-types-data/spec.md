# F02 — Types & Data Layer

## Description
Define all TypeScript interfaces in `types/` and convert the portfolio content from `data/DATA.md` into typed, exported TypeScript modules in `data/`. Components will import from these modules; no hardcoded strings in components.

## Acceptance Criteria
- `types/portfolio.ts` exports all interfaces: `PersonalInfo`, `Experience`, `Project`, `Subproject`, `SkillCategory`, `Certification`, `Education`, `Summary`
- `data/personal.ts`, `data/experience.ts`, `data/projects.ts`, `data/skills.ts`, `data/certifications.ts`, `data/education.ts` each export typed constants matching DATA.md content
- All nullable fields (`url`, `period`, `metrics`, `note`) are typed as `T | null`
- `data/DATA.md` is removed after migration
- TypeScript compiles without errors
