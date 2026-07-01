# F04 — UI Primitives

## Description
Build the reusable, business-logic-free UI components in `components/ui/` based on the DESIGN.md component specifications. These are the atomic building blocks used by all sections.

## Acceptance Criteria
- `SectionTitle` — renders label-caps eyebrow + headline, accepts `label` and `title` props
- `Card` — dark container with 1px micro-border, optional Terminal Header (status dot + top bar), optional footer with micro-data in JetBrains Mono
- `Badge` — rectangular block with tinted background, `label-caps` text, accepts `variant` prop (primary, secondary, tertiary)
- `Button` — hard edges only, primary variant with cyan-to-deepblue gradient + black text, secondary as ghost with 1px border, hover applies cyan bloom
- `StatusChip` — for Lighthouse metrics, shows numeric score with color coding (green > 90, yellow > 70, red < 70)
- `TerminalBlock` — black background, JetBrains Mono, syntax-highlighted text lines
- `CornerBracket` — decorative L-shaped brackets for significant containers
- All components are typed with TypeScript (no `any`)
- All components have `data-testid` attributes for testing
- Each component is in its own file, named `PascalCase.tsx`
