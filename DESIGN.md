---
name: Engineering Editorial — Fieldwork
colors:
  paper: '#F7F4EE'
  paper-2: '#EFEAE0'
  paper-3: '#E6E0D0'
  ink: '#1C1913'
  ink-soft: '#4C463C'
  ink-mute: '#777062'
  line: '#DDD6C8'
  line-strong: '#C9C1B0'
  signal: '#1C6B3F'
  signal-strong: '#0E4A2A'
  signal-tint: '#E3EDE2'
typography:
  display:
    fontFamily: Archivo
    weight: '800'
    letterSpacing: -0.03em
  body:
    fontFamily: Source Sans 3
    weight: '400'
    lineHeight: '1.65'
  meta:
    fontFamily: IBM Plex Mono
    size: 11px
    letterSpacing: 0.14em
    textTransform: uppercase
rounded:
  sm: 6px
  default: 10px
  md: 14px
  lg: 20px
container:
  max: 1200px
  gutter: 24px
  section-pad: 96px
grid:
  columns: 12
  editorial-split: [4, 8]
motion:
  library: IntersectionObserver + CSS transitions
---

## Brand & Style
"Engineering Editorial — Fieldwork" is the visual identity for Gustavo Garozzo's portfolio. It positions him as a Backend Engineer (Node.js, TypeScript, NestJS, AWS, system integrations) with a growing, concrete AI Engineering line.

The identity reads like an **editorial engineering journal**: paper-based, typography-led, with a restrained technical instrumentation (mono labels, 1px rules, a single field-test diagram). It is contemporary, distinctive and memorable — **not** a generic corporate template, a fake system console, or an AI-generated website.

Design personality (owner directive): assertive, editorial, technically credible. Big display type, one signal-green accent used sparingly, paper grain, real sharp microcopy, and a single architecture figure that shows only components Gustavo actually used.

## Colors
A warm paper-and-ink palette rooted in the original green accent (which was the only authentic brand element from the previous identity).

- **Paper:** Warm Off-White `#F7F4EE` — the climate; background of the whole interface.
- **Paper 2:** `#EFEAE0` — recessed panels, nav container, chips. Slight tonal lift, no shadows.
- **Paper 3:** `#E6E0D0` — hover states and deeper recesses.
- **Ink:** `#1C1913` — near-black warm ink. Headlines, nav background on action, active states.
- **Ink Soft:** `#4C463C` — body copy.
- **Ink Mute:** `#777062` — metadata, captions, footer (verified AA on paper as secondary text).
- **Line:** `#DDD6C8` — 1px hairline rules and borders.
- **Line Strong:** `#C9C1B0` — stronger separators and table borders.
- **Signal:** `#1C6B3F` — the only accent. Field-tested green; used for primary CTAs, key highlights, the status mark, and the AI line. Never used graphically for decoration at scale.
- **Signal Strong:** `#0E4A2A` — hover of signal, link focus.
- **Signal Tint:** `#E3EDE2` — the "learning / IA" callout background.

No gradients across the whole interface; no glassmorphism; no fake dashboard tiles.

## Typography
Three families with clear editorial hierarchy.

- **Display — Archivo (variable, weight up to 800):** Hero masthead, section titles, project names, pull-quote. Tight tracking (-0.03em), confident scale. The hero name uses an emphasized word in signal green with a handwritten-style underline sweep (`.link-sweep`).
- **Body — Source Sans 3:** All paragraphs, descriptions, contact rows. Line-height 1.65.
- **Meta — IBM Plex Mono (11px, +0.14em, uppercase):** Section eyebrows, figure captions, periods/locations, footer, chip labels, the architecture figure labels. This is the "instrumentation" layer — present but quiet, never decorative bloack.

Hierarchy rule: every section opens with a mono eyebrow (e.g. `EXPERIENCIA`, `CAPACIDADES`, `FORMACIÓN`) above a large display title. Sticky editorial left columns (About, Formación) hold the eyebrow + title while content scrolls on the right (4/8 split).

## Layout & Spacing
A single 1200px editorial column (`max-w-[1200px] mx-auto px-6`), 12-col grid, sections stacked vertically separated by 1px `line` rules.

- **Container:** 1200px (decision documented: planned 1160px was widened to give the editorial type room).
- **Sections:** `grid grid-cols-1 lg:grid-cols-12` split `[4, 8]` (About, Formación) or full width (Experience, Projects, Skills, Contact). Each section renders its own `<section id>` with `scroll-mt-24` + `border-t border-line` for clear editorial rhythm.
- **Hero:** editorial masthead — kicker (`HERO_KICKER` "Backend Engineer · Node.js · TypeScript · NestJS"), name display, summary lead + sub-lead, CTAs, and an editorial facts row (experience / stack / seniority) as standalone stat lines over a hairline rule. Right column holds the generated editorial plate (`/images/hero.webp`, 3:2, decorative).
- **Sticky columns:** About/Formación left column `lg:sticky lg:top-24 self-start`.
- **Footer:** single line editorial — name, `FOOTER_ROLE`, links, "Hecho en Tandil · 2022-2026".
- **Responsive:** single column below lg; type scales down (display 8xl → 5xl/4xl); sticky columns become static; nav collapses to a hamburger panel.

## The Architecture Figure (Fig. 02)
The Experience section closes with **one** SVG figure (`components/experience/ArchitectureFigure.tsx`) in a bordered panel with a mono caption. It is the "field test" diagram of Gustavo's real production shape. (Moved out of the Hero in the imagery iteration; no diagram substitute in the hero.)

- **Left column — AIOTEK · INTEGRACIONES:** Web · Mobile · ERP clients → APIs REST Node.js / NestJS (connectivity with ERPs & marketplaces · Swagger) → Pipeline FTP (invoices · batch) → PostgreSQL / Sequelize + Redis cache.
- **Right column — QWAVEE IT · SERVERLESS AWS:** API Gateway → Lambda → S3 (+ CloudWatch).
- **Bottom band — GOOGLE CLOUD · SOPORTE:** Cloud SQL · Pub/Sub · Cloud Monitoring · GKE (básico).

Rules honored:
- Only components Gustavo actually used. No decorative nodes (`YOU_ARE_HERE` was explicitly removed).
- AWS appears as the primary cloud; Google Cloud appears as real-scope support (Cloud SQL, Pub/Sub, Cloud Monitoring, GKE básico) — never equivalent-expertise framing.
- The personal AI/Gemini line does **not** appear in the professional figure; it lives in the Weather API card and the Skills "Línea de IA" callout.
- Caption `FIGURE_CAPTION` + honest note `FIGURE_NOTE`.

## Imagery

Generated editorial photography (RunComfy Nano Banana 2 via the `ai-image-generation` skill) + a real portrait. Palette-locked to paper/ink/signal; no text, screens, code, hardware or people in the generated shots; generous negative space; offset-print materiality.

- **Hero plate** (`public/images/hero.webp`, 3:2, generated): abstract editorial still-life — layered paper/folded forms studio-lighted. Decorative (`alt=""`).
- **Portrait** (`public/images/portrait.webp`, ~3:4, from `me.webp`): About sticky left column, `rounded-lg border border-line bg-paper-2`, filter `grayscale(0.2) sepia(0.05) contrast(1.02)`. Informative `PORTRAIT_ALT`; caption is data-only (`name · title`). `me.webp` (896×1200) is kept as the source master.
- **Project covers** (generated): `cover-barking-dogs.webp` (wide), `cover-weather-api.webp` (4:3, keeps the `GEMINI FLASH 2.5` chip overlay), `cover-watchdog.webp` (4:3). Decorative `alt=""` (project name is already in the card markup). Sinergy + ClickCore keep code-native covers.

Served via `next/image` (`fill` for covers, width/height for hero and portrait — no CLS). `next.config.ts`: `images.formats: ["image/webp"]`. Source JPG masters (`hero.jpg`, `barking-dogs.jpg`, `weather-api.jpg`, `watchdog.jpg`) are retained in `public/images/` as the canonical generated output.

## Covers (Projects)
Each project card has a differentiated cover driven by the product — not decorative variations of one resource. Featured playing: Barking Dogs, Weather API and WatchDog use generated editorial photography (see Imagery); Sinergy and ClickCore stay code-native.

- **Barking Dogs:** generated studio plate (3:2, image).
- **Sinergy Consulting Platform:** executive grid / "informe ejecutivo" — repeating line grid + green vertical bar (code-native).
- **WatchDog Price Tracker:** generated tactile plate (4:3, image).
- **ClickCore Agency Landing:** layered/stacked cards (code-native).
- **Weather API:** generated atmospheric plate (4:3) + `GEMINI FLASH 2.5` chip overlay — visually distinct as a personal/AI experiment.

No simulated metrics on any cover or card.

## Components

### Navbar
Sticky, `bg-paper/85 backdrop-blur`, 1px bottom border. Left: mono signature `Gustavo Garozzo`. Right: scrollspy nav (Experiencia, Proyectos, Capacidades, Formación, Contacto) with `aria-current`, an ES/EN segmented control (`role=group`, `aria-pressed`, leaves `document.documentElement.lang` in sync), CTA "¿Trabajamos?" (hidden below xl). Mobile: hamburger → full panel, `aria-expanded`, Escape closes, 44px targets.

### Hero
Masthead. Kicker + name (with emphasized word), summary lead + sub-lead, CTA row, editorial fact lines over a hairline divider. Right column: generated editorial plate (3:2, bordered, `alt=""`).

### About
4/8 editorial split (sticky left). Left column: eyebrow + title, editorial portrait figure (`portrait.webp` + data-only caption), location/stack meta, `ABOUT_MORE`. Right: paragraphs + a closing pull-quote blockquote, with email/LinkedIn inline links.

### Experience
Vertical editorial timeline. Each entry: period/location (mono, right or above), company display title, role meta in signal, highlight bullets "squares" (signal). All entries stacked — no selector list.

### Projects
Tiered: Barking Dogs featured full-width (image cover) → Weather API + WatchDog in a 2-col image tier (Weather emphasized with a signal border) → Sinergy + ClickCore in a 2-col code-native tier. Alternating vertical offset (`md:mt-12`) in each tier. Categories from messages; link labels differentiate GitHub (VER CÓDIGO) vs store (ABRIR APP) vs site (VISITAR).

### Skills ("Capacidades")
Four editorial columns: **Core**, **Supporting**, **Learning**, and the **Línea de IA** callout (signal-tint panel, links to Weather API). Under Supporting, an honest GCP scope note (`SKILLS_GCP_NOTE`): Cloud SQL / Pub/Sub / Cloud Monitoring / GKE básico.

### Formación (new)
Education + certifications merged into one section. 4/8 sticky split. Education as `dl` rows; certifications as `ul` with year column, sorted desc.

### Contact
Editorial. Sticky left header + "Disponibilidad" block (signal border). Right: channel rows (email, tel, LinkedIn, GitHub, CV) separated by rules.

### Chat (AskGustavo)
Floating pill trigger (bottom-6 right-6, `bg-ink text-paper`). Opens a paper dialog. Same API/UX logic preserved: `role=dialog`, aria-live, Escape, focus management, rate-limit cooldown, streaming. Only surface changed. Suggested chips from messages.

## Motion
No animation library. `lib/use-reveal.ts` = one IntersectionObserver hook; CSS transitions for reveals, hover states, underline sweeps. Global `prefers-reduced-motion` kills all animation. Default states never rely on JS (content visible if JS fails).

## Accessibility & Interaction
- Semantic HTML; one `h1`; correct h2/h3 hierarchy; section landmarks.
- Visible focus: `focus-visible` outline signal; skip-to-content link.
- 44px minimum touch targets (nav, chat trigger, buttons, language switch).
- Keyboard nav: Escape closes mobile menu & dialog; spinner logic intact.
- Contrast: ink/ink-soft on paper verified AA; signal `#1C6B3F` on paper used for primary CTA text/label minimum 4.5:1; status conveyed with text, never color-only.
- Reduced motion honored globally.

## Implementation Notes
- Tokens in `app/globals.css` under `@theme` (`--color-paper`, `--color-signal`, etc.). Grain via `body::after` SVG noise at low opacity. `themeColor #F7F4EE`.
- Fonts via `next/font` (Archivo, Source Sans 3, IBM Plex Mono) exposed as `--font-display`, `--font-sans`, `--font-mono`.
- Covers are driven by the product: Barking Dogs, Weather API and WatchDog use generated photography via `next/image` (`/images/cover-*.webp`); Sinergy and ClickCore are code-native (CSS/SVG). No `remotePatterns` needed — all images are local.
- Imagery: local `public/images/*.webp` optimized with sharp; `next.config.ts` set to `images.formats: ["image/webp"]`. Hero and portrait carry width/height; covers use `fill` inside fixed-height containers (no CLS). Generated shots contain no text/screens/code/hardware.
- Content single-source: `lib/messages.ts` (es/en), `data/personal.ts`, `data/about-me.ts`, `data/experience.ts`, `data/projects.ts`, `data/skills.ts`, `data/education.ts`, `data/certifications.ts`, `data/summary.ts`. `types/portfolio.ts` no longer carries `Project.code`/`image`.
- The chat persona (`app/api/chat/route.ts`) is a plain, professional assistant — no terminal/`[ERROR]` framing. Scope guard, tier rules, honesty and metrics rules unchanged.