# F01 — Implementation Plan

## Steps
1. Run `npx create-next-app@latest` with TypeScript + App Router + Tailwind CSS
2. Enable `strict: true` in `tsconfig.json`
3. Install Vitest + Testing Library as dev dependencies
4. Configure ESLint with Prettier integration
5. Create empty directories: `components/`, `components/ui/`, `lib/`, `types/`, `public/`
6. Configure Inter and JetBrains Mono via `next/font` in `app/layout.tsx`
7. Add `label-caps` and `code-md` utility classes in `app/globals.css`
8. Verify all commands (`dev`, `build`, `lint`, `test`) work
