# F04 — Implementation Plan

## Steps
1. Create `SectionTitle.tsx` with `label` (string, optional) and `title` (string) props
2. Create `Card.tsx` with `header`, `footer`, `children` slots and optional `statusDot` prop
3. Create `Badge.tsx` with `variant` and `children` props
4. Create `Button.tsx` with `variant` ("primary" | "secondary"), `children`, and standard button HTML attributes
5. Create `StatusChip.tsx` with `score` (number) and `label` props
6. Create `TerminalBlock.tsx` with `lines` (array of `{text, color?}`) prop
7. Create `CornerBracket.tsx` with `position` ("top-left" | "top-right" | "bottom-left" | "bottom-right") prop
8. Verify `npm run lint` and `npm run build` pass
