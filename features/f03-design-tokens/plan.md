# F03 — Implementation Plan

## Steps
1. Configure `tailwind.config.ts` with extended theme:
   - Colors: map every DESIGN.md hex to Tailwind color names (surface, primary, secondary, tertiary, error, etc.)
   - FontFamily: Inter for body/headlines, JetBrains Mono for code/labels
   - FontSize: custom scale matching headline-xl → label-caps
   - BoxShadow: add `glow` token (0px 0px 12px hsla(186, 100%, 50%, 0.3))
   - BorderRadius: set default to 0px
2. Add custom utilities in `app/globals.css`:
   - `.micro-border` class
   - `.grid-overlay` background pattern at 3% opacity
   - `.bloom-cyan` for glow on hover/active
3. Verify all tokens are usable in a test component
