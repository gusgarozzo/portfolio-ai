# F06 — Layout & Main Page

## Description
Create the root layout with metadata, SEO, font loading, global styles, and compose all sections into the main page. Optional Navbar and Footer components.

## Acceptance Criteria
- `app/layout.tsx` loads Inter + JetBrains Mono via next/font, sets metadata (title, description, OG tags)
- `app/page.tsx` renders all sections in order: Hero → Experience → Projects → Skills → Certifications → Contact
- `app/globals.css` includes base styles: dark background, custom scrollbar, grid overlay, micro-border utility
- Responsive container with max-width 1440px and appropriate margins (16px mobile, 32px desktop)
- Optional: Navbar with smooth scroll links to each section
- Optional: Footer with "Systems Online" / uptime-inspired micro-copy
- `npm run build` passes with no errors
