# F05 — Portfolio Sections

## Description
Build all section components that consume data from `data/` and render the portfolio content using the UI primitives. Each section lives in its own folder under `components/`.

## Acceptance Criteria
- `Hero` — displays name, title, subtitle, location, email, phone, LinkedIn/GitHub links, and "open to" statement. Terminal-style header as visual signature.
- `Experience` — timeline/masonry of roles, each as a Card with company, role, period, location, and bullet-point highlights. Uses the Terminal Header pattern.
- `Projects` — cards for each project with name, subtitle, role, period, description, stack badges, and subproject metrics. Subprojects show Lighthouse scores as StatusChips.
- `Skills` — grouped by category (languages, frameworks, databases, cloud, architecture, soft). Each category rendered as a Card with Badge items. Terminal Header with category name as label.
- `Certifications` — table or grid of certifications showing name, issuer, and year. JetBrains Mono for data.
- `Contact` — email, phone, location, LinkedIn, GitHub links with appropriate icons. Hard-edge buttons for each link.
- Every section reads exclusively from `data/` modules, no hardcoded strings
- Each section has its own folder with `index.tsx` re-export
- Responsive: tested at 375px and 1280px
- All interactive elements keyboard-navigable
