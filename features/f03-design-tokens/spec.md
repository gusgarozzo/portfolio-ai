# F03 — Design Tokens in Tailwind

## Description
Translate the full `DESIGN.md` color palette, typography scale, spacing, shapes, and effects into Tailwind CSS v4 configuration and utility classes. Every token from DESIGN.md must be available as a Tailwind class.

## Acceptance Criteria
- All ~40+ colors from DESIGN.md are available as Tailwind colors (e.g. `bg-surface`, `text-primary`, `border-outline-variant`)
- Typography tokens (`headline-xl`, `headline-lg`, `headline-md`, `body-lg`, `body-md`, `code-md`, `label-caps`) are available as utility classes
- Spacing system uses 4px unit base / 8px grid
- Border radius defaults to `0px` (sharp) globally
- Bloom/glow effect available as `shadow-glow` utility (0px 0px 12px cyan at 30%)
- Micro-border utility available (1px solid with `#ffffff` at 8% opacity)
- Grid overlay utility for backgrounds
- TypeScript build passes with all new tokens
