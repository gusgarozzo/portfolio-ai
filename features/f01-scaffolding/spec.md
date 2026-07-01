# F01 — Project Scaffolding

## Description
Initialize the Next.js 15 project with TypeScript strict mode, Tailwind CSS v4, ESLint, Prettier, and Vitest + Testing Library. Create the base directory structure and configure all tooling so subsequent phases can build on a solid foundation.

## Acceptance Criteria
- `npm run dev` starts the dev server on `http://localhost:3000` without errors
- TypeScript compiles with `strict: true` and no `any` without justification
- Tailwind CSS v4 utilities work in components
- `npm run lint` passes with ESLint + Prettier config
- `npm run test` runs Vitest and passes (dummy test is fine)
- `npm run build` compiles for production without errors or warnings
- Directory structure matches AGENTS.md (app/, components/, components/ui/, data/, lib/, types/, public/)
- Fonts Inter and JetBrains Mono are configured via next/font
- `vercel.json` is NOT modified
- No new dependencies beyond: next, react, react-dom, typescript, tailwindcss, eslint, prettier, vitest, @testing-library/react
