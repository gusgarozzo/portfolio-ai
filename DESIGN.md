---
name: Midnight Architect — Hybrid Edition
colors:
  bg: '#000000'
  surface: '#0B0B0B'
  surface-deep: '#050505'
  surface-accent: '#102034'
  accent: '#C5A059'
  border: '#1A1A1A'
  text-primary: '#FFFFFF'
  text-secondary: '#A1A1AA'
  text-muted: '#52525B'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 60px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.15em
    textTransform: uppercase
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
  caption-mono:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.3em
    textTransform: uppercase
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  sharp: 0px
  full: 9999px
spacing:
  unit: 8px
  frame-inset: 24px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 20px
  section-pad: 48px
  section-gap: 96px
grid:
  columns: 12
  hero-split: [4, 5, 3]
  experience-split: [4, 8]
  audit-split: [4, 8]
motion:
  library: GSAP 3 + ScrollTrigger
---

## Brand & Style
"Midnight Architect — Hybrid Edition" is the final visual identity for Gustavo Garozzo's portfolio: a Backend Engineer specialized in Node.js, NestJS and AWS. It fuses the **rigid, data-dense structure of an executive dashboard** with the **flowing, editorial verticality of a filmstrip gallery**.

The result reads as an operational control panel for a senior backend architect: authoritative, quiet and intentional. It rejects "gamer" developer tropes in favor of an editorial, high-end atmosphere where technical telemetry (mono labels, status pips, audit logs) coexists with luxury serif headlines.

The whole interface lives inside a single **dashboard frame** — a 24px inset border enclosing the viewport — segmented by 1px rule lines into distinct panels, evoking a blueprint or a systems console.

## Colors
The palette is rooted in "OLED Depth": absolute black canvases for infinite depth and maximum focus, with a single champagne-gold accent reserved for high-value signals.

- **Canvas / bg:** Absolute Black `#000000` — the foundation and the frame background.
- **Surface:** Deep Charcoal `#0B0B0B` — elevated panels, cards, system bar.
- **Surface Deep:** `#050505` — the darkest recessed panels (audit log body, card hover).
- **Surface Accent:** Navy Container `#102034` — active/selected states and terminal-line hover.
- **Accent:** Champagne Gold `#C5A059` — status pips, active borders, key metrics, hover text, links. Used sparingly.
- **Border:** Deep Slate `#1A1A1A` — every 1px partition and rule line (structure, not shadow).
- **Text Primary:** Pure White `#FFFFFF` — headlines and key values.
- **Text Secondary:** Muted Grey `#A1A1AA` — body copy, reduces eye strain.
- **Text Muted:** `#52525B` — metadata, mono captions, inactive labels.

## Typography
Three families create tension between editorial luxury and utilitarian precision.

- **Headlines — Playfair Display (serif):** All major headings (hero, section titles, project names). High-contrast strokes, tight tracking; italic + gold used for emphasis words (e.g. *Digital*).
- **Body — Inter (sans):** Neutral, highly legible. Line-height 1.6 for the editorial feel.
- **Data & Labels — JetBrains Mono:** All technical "telemetry" — system bar, section eyebrows, project codes, metric tables, tags, audit log, footer. Uppercase with wide tracking (0.15em–0.4em) for "architectural air".

Hierarchy rule: every section opens with a mono eyebrow label (e.g. `TECHNICAL_TENURE_MANIFEST`, `PRODUCTION_TELEMETRY_LOG`) above a large Playfair title.

## Layout & Spacing
A **strict 12-column dashboard grid** framed by a 24px inset border (`.dashboard-frame`).

- **Frame:** 24px margin on all sides, 1px `#1A1A1A` border, min-height `calc(100vh - 48px)`.
- **Panels:** Sections are grid rows separated by `section-border` (bottom 1px) and `vertical-border` (right 1px) rules — no gaps, panels butt against each other.
- **Hero:** 3-column split `4 / 5 / 3` (intro copy · video map · stat column).
- **Experience:** `4 / 8` split (company selector list · detail panel).
- **Audit:** `4 / 8` split (title panel · scrolling terminal log).
- **Rhythm:** 8px base unit. Panel padding 48px (desktop) / 32px. Section vertical padding ~96px on standalone sections (projects, architecture).
- **Mobile (375px):** Columns collapse to single-column stacks (`col-span-12`); vertical/section borders are preserved to keep the console feel; type scales down (Playfair 60px → 40px).

## Elevation & Depth
Depth is conveyed through **tonal layering and 1px borders**, never shadows.

- **Layers:** `#000000` base → `#0B0B0B` surface → `#050505` recessed → `#102034` active/selected.
- **Borders:** 1px `#1A1A1A` defines every edge and partition.
- **Interaction:** On hover, borders/text shift toward Champagne Gold; underlines and rule lines expand (`w-0 → w-full`) rather than glow.
- **Photography:** High-contrast, grayscale + `brightness-50` by default; on hover transition to full color/brightness (`grayscale-0 brightness-100`, 700ms). Images behave as "windows" into the dark architecture. Hero uses a grayscale topographical video map at 30% opacity.

## Shapes
Technical and precise.

- **UI elements** (skill nodes, company rows, buttons): 4px radius (`rounded-sm`).
- **Media, project cards, hero containers:** 0px (sharp) corners for the editorial layout.
- **Status indicators:** Small 8×8px square pips (never circles), gold, `animate-pulse`.

## Components

### System Status Bar
Sticky top bar (`z-50`), `#0B0B0B` surface, 1px bottom border, mono uppercase 11px. Left: `SYS.AUTH` + typed name/role. Center: typed location + live clock. Right: gold square pip + typed `STATUS: READY_FOR_INTEGRATION`. Text reveals via terminal typing effect on load.

### Hero Topography
3-column panel. Left: Playfair headline with italic-gold accent word, Inter intro, mono command lines (`[ CMD ] INITIATE_HANDSHAKE`, gold email). Center: grayscale topographical **video map** (`object-cover grayscale opacity-30`) with a bottom-to-top black gradient, a `LIVE_TELEMETRY_FEED` mono overlay, and GSAP parallax (yPercent 20 on scroll). Right: stacked stat blocks (`Experience_Cycle`, `Primary_Stack`, `Seniority_Grade`) with gold mono eyebrows and Playfair values; animated gold underline on hover.

### Experience Manifest
`4 / 8` split. Left: `TECHNICAL_TENURE_MANIFEST` list of company rows — active row uses `#102034` fill + gold border, inactive rows muted with `hover:border-muted`. Right: selected company detail — Playfair company name, gold mono role, right-aligned mono period/location, numbered highlight list (`[01]`, `[02]`… in gold mono).

### Filmstrip Projects (from the Art Gallery Manifest)
Horizontal snap-scroll strip (`overflow-x-auto snap-x`, hidden scrollbar). Each card: **450px wide, 9:16 aspect, 0px corners**, `#0B0B0B` surface with right border, on hover deepens to `#050505`.
- **Header (45% height):** technical grayscale image, color reveal on hover.
- **Body:** gold mono code (`BD_SINERGY_01`), Playfair title (gold on hover), Inter description, a mono **metric table** (label · gold/white value, `opacity-60 → 100` on hover), and bordered mono tag chips.
- **Glitch/Scan overlay:** a `repeating-linear-gradient` gold scanline overlay (`.glitch-overlay`) that fades in and runs the `scan` keyframe animation on hover.

### Architecture Topology
Full-width `#0B0B0B` panel with faint SVG circuit lines (opacity 0.1). Centered `ARCHITECTURE_TOPOLOGY` eyebrow, a gold-bordered `BACKEND_SYSTEM_CORE` root node, and 3 columns (Languages · Infrastructure · Mindset) of `.skill-node` pills (4px radius, 1px border, 13px). Key nodes highlighted with gold border.

### Audit Log Terminal
`4 / 8` split. Left: `AUDIT_LOG / CERTIFICATES` eyebrow, Playfair title, mono `LAST_PARSED` timestamp. Right: `#050505` scrollable terminal (custom 4px gold-less scrollbar) that populates certification lines progressively via JS/GSAP (staggered fade + x-shift); each `.terminal-line` hovers to `#102034` + gold.

### Footer
`#000000`, mono 10px, wide tracking. Left: copyright `// HYBRID_EDITION.SYS`. Center: bracketed links `[ LINKEDIN ]` `[ GITHUB ]` (gold on hover). Right: `VER: 4.2.0-STABLE`.

### Buttons & Links
- **Primary:** Champagne Gold bg, black text, 4px radius, no border.
- **Secondary:** transparent, 1px `#1A1A1A` border, white text.
- **Ghost / links:** mono uppercase, gold-on-hover, subtle underline expansion.

### Status Indicators
8×8px gold squares, `animate-pulse`. Never circular.

## Motion Design (GSAP 3 + ScrollTrigger)
Motion is subtle, technical and purposeful — reinforcing the "live system" metaphor.

- **Terminal Typing:** `typeEffect()` utility reveals system-bar metadata and status character-by-character on load (30–50ms/char), status delayed ~1.5s.
- **Audit Log Populate:** certification lines appended on a 200ms stagger, each fading in with a small x-shift.
- **Hero Parallax:** `#hero-video` scrubs `yPercent: 20` across the hero scroll range.
- **Entrance Reveals:** `.reveal-text` panels fade + rise (`y → 0`, opacity, `power2.out`) at `top 90%`, `toggleActions: play none none reverse`.
- **Filmstrip Reveal:** project cards enter with `x: 100`, opacity, 0.2s stagger, `power3.out` when the projects section hits `top 80%`.
- **Scan/Glitch:** CSS-driven gold scanline overlay animates on card hover (`scan` keyframe, 4s linear infinite).

## Implementation Notes
- Tokens above map to Tailwind v4 theme variables; define them in `app/globals.css` under `@theme` (e.g. `--color-accent: #C5A059`, `--color-surface: #0B0B0B`).
- Fonts loaded via `next/font` (Playfair Display, Inter, JetBrains Mono) exposed as CSS variables and mapped to `font-playfair` / `font-sans` / `font-mono`.
- GSAP + ScrollTrigger are new dependencies — **confirm with the owner before installing** (per AGENTS.md); animations should be guarded behind `prefers-reduced-motion`.
- Remote images/video (Unsplash, Pexels) require `remotePatterns` in `next.config.ts` and must use `<Image>` with descriptive `alt`; the hero video is a standard `<video>` element.
- All content (metrics, codes, copy) must live in `data/` — the mock metrics shown in the design (latency, perf scores) need real values added to `data/projects.ts` before use.
