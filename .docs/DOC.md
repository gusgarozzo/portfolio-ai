## Sesión — 2026-09-23 (Fase 2 · tipografía + hero + covers nativas)

### Contexto
- Fase 1 aprobada por el owner tras revisar capturas (diagrama/footer/chat OK). Antes de pasar a Fase 2 pidió 4 ajustes chicos (abajo) y que toda auditoría corra en ES y EN desde ahora.

### Ajustes previos (owner)
1. **Eliminada la línea GCP suelta** bajo el figure (`FIGURE_NOTE`): repetía la banda verde y el epígrafe. La nota de alcance real de GCP se integró al epígrafe (`FIGURE_CAPTION`, clave `FIGURE_NOTE` eliminada de messages.ts y del test).
2. **Epígrafe del diagrama**: sans (Source Sans 3), 14px, `text-ink`, `max-w-[68ch]` → AA garantizado.
3. **Higiene**: `.shots/cdp-profile/` (perfil Chrome, 26MB) eliminado y regenerado solo durante cada corrida de auditoría; `.shots/` agregado al `.gitignore`. Estado git: `.shots/` completo está **untracked** (`??`), 0 archivos trackeados.
4. **Auditoría bilingüe**: script CDP ahora recorre locales `es`/`en` × viewports (1440/390) seteando `localStorage['portfolio-locale']` + reload y verificando `document.documentElement.lang`. Nombre de archivos `f{phase}-{locale}-{viewport}-{seccion}.png`. Se fuerza reveal antes de capturas full-page.

### Fase 2 implementada
- **Scale tipográfica** (`globals.css`): `--color-ink-mute #777062 → #6a6355` (AA 4.5:1 sobre paper y paper-2: 5.42/4.96). `.body-md` → 17px (16–18). `.meta` 12.48px y `.eyebrow` 12px ya cumplían ≥12.
- **H1 (.display-hero)**: `clamp(2.5rem, 5.1vw, 3.6rem)` → una sola línea en desktop (regla del owner: si una línea se logra a ≥ ~56px, usarla). Verificado `h1Lines = 1` en los 4 escenarios.
- **Hero 2 columnas** (`Hero.tsx`): sin la técnica stock dir `hero.webp`; columna derecha = `portrait.webp` con `aspect-[4/5] object-cover object-[center_25%]` (crop cara/hombros) y `alt` real. Izquierda: kicker → H1 → línea de stack (mono, `personal.subtitle`) bajo el titular → lead display → primer párrafo; CTAs primarios **Ver proyectos** + **Contactar**; terciarios **LinkedIn ↗** y **Descargar CV**. Facts row = solo **Experiencia · Nivel · Ubicación** (se eliminó "Stack principal" de la fila y `FACT_STACK`; nueva `FACT_LOCATION`; ubicación corta derivada de `personal.location` "Tandil, Buenos Aires").
- **ProjectCover 100% code-native**: fuera `cover-*.webp` y `next/image` (`covers`). Barking Dogs = placa estudio con wordmark + chips; Weather API = fascia con barras + chip GEMINI FLASH 2.5; WatchDog = barras + chip PUSH; Sinergy y ClickCore intactos. Chips a 12px (>= mínimo).
- **About**: último párrafo de `blockquote` display-italic → **texto normal** (`body-lg text-ink`).
- **Contacto**: disponibilidad sin recuadro `border-l` → párrafo normal (`body-md`).
- **Sin referencias** en código a `hero.webp` ni `cover-*.webp` (archivos quedan en `public/images/` sin uso; borrarlos si el owner confirma).

### Validación
- `npm run lint` limpio · `npm run test` 44/44 · `npm run build` OK.
- Auditoría CDP (`audit-f2.json`, screenshots `f2-*.png` en `.shots/`): ES + EN × 1440/390 → hScroll `false`, 0 overlaps (8 cajas), figcaption 14px sans, H1 1 línea, chat label block(1440)/none(390), 0 links del footer cubiertos, footer pad 96/112px.
- Pendiente revisión visual del owner (este modelo no renderiza imágenes): revisar `f2-{es,en}-{1440,390}-{hero,about,full}.png`.

### TODO Fase 3 (anotado)
- **Contact · Currículum**: hoy muestra la ruta cruda del PDF (`value: personal.cvUrl` en `Contact.tsx`). Cambiar a texto **"Descargar CV" + ícono**, sin mostrar la ruta; conservar `download`.

### Notas
- Server de verificación local: `next start -p 3456` (proceso Windows vía WSL). `.shots/` queda outside git.

## Sesión — 2026-09-23 (Fase 1 · bugs / refactor visual)

### Contexto
- Nueva iteración aprobada por el owner: refactor de **ejecución** (no de dirección estética). Se mantiene la identidad paper/ink/signal, tipografía grotesca y microetiquetas mono. Prioridad: claridad y legibilidad. Fases 1→3 (bugs → tipografía → secciones); trabajo fase por fase con screenshots y OK del owner.
- Plan completo aprobado; respuestas del owner: stack del hero queda en la línea bajo el titular; foto = `portrait.webp`; certis visibles = Node Debugging, AWS Intro, DDD, Patrones Esenciales; chips IA dentro de "Prácticas"; disponibilidad sin recuadro; H1 2 líneas permitido; breakpoint `md` único; registrar en `.docs/DOC.md`.

### Fase 1 implementada
1. **Chat vs footer**: `Footer` gana `pb-28 md:pb-24` (reserva ~96–112px). Botón de chat en mobile `<md` = solo ícono (`label hidden md:inline`), ajustada la primera parte del padding. Divergencia de breakpoints unificada en `md`.
2. **Diagrama de arquitectura** (`components/experience/ArchitectureFigure.tsx`): reescrito de SVG con coordenadas a **HTML + CSS grid** (2 columnas `md`, banda GCP `col-span-2`, flechas inline SVG). Sin `position`/coordenadas → elimina el overlap de 18px PG/Redis vs GCP. Labels `text-sm` (14px), sub y epígrafes `text-xs` (12px), colores por tokens (`bg-white/70`, `border-line`, `text-ink`, `text-signal`, `bg-signal-tint`) en lugar de hex hardcodeados. `data-testid` para auditoría; `role="img"` + `aria-label` ES/EN intacto. Colapsa a 1 columna <768px; sin overflow a 390px.
3. **Título profesional unificado**: `personal.title` → "Backend Engineer" (es/en); `heroStats.seniority` → "Semi-Senior"/"Mid-level"; `openTo` "Semi-Senior/Senior" / "(Mid-level/Senior)"; `experience` Aiotek → "Desarrollador Node.js Semi-Senior"/"Node.js Developer (Mid-level)"; `about-me` y `summary` → "Backend Engineer"; Weather API role → "Backend Engineer"; Nav muestra `personal.title` (solo "Backend Engineer", sin stack; antes `FOOTER_ROLE`).

### Validación
- `npm run lint` limpio · `npm run test` 44/44 (6 suites) · `npm run build` exitoso.
- Auditoría CDP propia (script descartable `.shots/audit-cdp.mjs`, Chrome headless, sin dependencias nuevas) a **1440×900** y **390×844**:
  - Scroll horizontal: `false` en ambos (scrollWidth ≤ clientWidth).
  - Título: "Backend Engineer" presente; sin `Ssr`/`SSR` en body; nav subtitle = "Backend Engineer".
  - Diagrama: 8 cajas, **0 overlaps**, 0 fuera del contenedor/vista; min font = título 14px, sub 12px, col-label 12px, figcaption 12.48px.
  - Footer: 0 links cubiertos por el botón del chat; padding-bottom 96px (1440) / 112px (390); label del botón `block` en desktop y `none` a 390.
- Screenshots en `.shots/f1-*.png` (1440 y 390: hero, experience, diagram, footer, full page).
- Pendiente de revisión visual del owner (este modelo no renderiza imágenes); revisión en navegador real diferida si el owner no conecta Browser MCP.

### Notas
- `me.webp` sigue intacto y **sin referencias de código** (solo docs como master de `portrait.webp`); no hay OG image ni favicon que lo use.
- `data/DOCS.md` no existe; el harness lo referencias pero el log real es `.docs/DOC.md` (aquí se registra).
- **TODO (owner)**: el PDF `public/cv-gustavo-garozzo.pdf` aún dice "BACKEND DEVELOPER SSR"; regenerarlo cuando corresponda.

## Sesión — 2026-09-23 (Dirección de arte · imagery)

### Contexto
- Iteración aprobada por el owner sobre el rediseño "Engineering Editorial": añadir la foto real de Gustavo y fotografía editorial generada; mover la Fig. 01 fuera del Hero; jerarquizar Proyectos por tiers. Sin preguntas de diseño pendientes; detalles completos en `.docs/DESIGN_AUDIT.md` (Addendum 2026-09-23).

### Decisión clave (owner)
- El Hero debía **llevar una imagen** (se descartó "solo tipografía"): arte editorial generada de objeto impreso en la paleta paper/ink/signal. El retrato real va a About. Fig. 01 → Experiencia como **Fig. 02**. Sin OG image esta iteración.

### Cambios implementados
- **Hero**: fuera la Fig. 01; columna derecha = placa editorial `next/image` (decorativa, `alt=""`); facts row → líneas de stat editoriales sobre hairline.
- **Experience**: figura de arquitectura movida (`components/experience/ArchitectureFigure.tsx`) como Fig. 02 al cierre del timeline; `FIGURE_CAPTION` renumerada.
- **About**: retrato editorial (`portrait.webp` desde `me.webp`, sharp), filtro `grayscale(0.2) sepia(0.05) contrast(1.02)`, caption data-only, clave nueva `PORTRAIT_ALT` (es/en) + parity en `messages.test.ts`.
- **Projects**: tiers — Barking Dogs featured full-width → [Weather API (accent signal + chip GEMINI FLASH 2.5), WatchDog] → [Sinergy, ClickCore] code-native. `ProjectCard` prop `accent`.
- **ProjectCover**: `next/image` (fill) para bark/weather/watchdog; Sinergy/ClickCore siguen code-native.
- **next.config.ts**: `images.formats: ["image/webp"]`.
- **Assets**: generados con RunComfy `google/nano-banana-2` (skill `ai-image-generation`, CLI `@runcomfy/cli`, `RUNCOMFY_TOKEN` del owner — no commiteado); optimizados a webp con sharp. JPG masters del owner conservados en `public/images/` (hero/barking-dogs/weather-api/watchdog). `me.webp` intacto como master del retrato.

### Validación preliminar
- `npm run test`: 44/44 (6 suites).
- `npm run lint`: limpio.
- `npm run build`: exitoso (routes `/`, `/_not-found`, `/api/chat`, `/robots.txt`, `/sitemap.xml`).
- Tamaños de assets verificados (< 100KB cada webp servido); ratios correctos; alts por rol (decorativas vs informativa); width/height o fill sin CLS.
- NO validado (honesto): revisión visual real en navegador (browser MCP no disponible) en 375/768/1024/1280; calidad estética final de las piezas generadas (el owner decide); OG image diferida.

## Sesión — 2026-09-22 (Rediseño · Engineering Editorial — Fieldwork)

### Contexto
- Rediseño integral aprobado por el owner ("adelante") sobre el plan de Engineering Editorial. Reemplaza por completo la identidad "Midnight Architect — Hybrid Edition" (dashboard simulado/telemetría falsa) por un journal editorial: paper + tinta, tipografía display fuerte, un único verde señal, una sola figura de arquitectura real y la línea personal de IA separada de la figura profesional. Sin pedir nuevas confirmaciones durante la implementación (decisión del owner); decisiones registradas en `.docs/DESIGN_AUDIT.md`.

### Correcciones del owner aplicadas
1. **Fig. 01 solo con arquitectura/componentes reales** — eliminados nodos decorativos (`YOU_ARE_HERE`, `GEMINI LLM`); la línea personal de IA no aparece en la figura profesional (vive en Weather API y en el callout "Línea de IA" de Capacidades).
2. **Google Cloud a alcance real** — "AWS · Google Cloud" OK como resumen del Hero, pero figura, Capacidades y chat mantienen: Cloud SQL, Pub/Sub, Cloud Monitoring, GKE (básico). Nunca como expertise equivalente a AWS. Nota `SKILLS_GCP_NOTE` en Capacidades.
3. **Covers diferenciados por producto** — `ProjectCover.tsx` code-native por producto (Barking Dogs placa estudio, Sinergy informe ejecutivo, WatchDog barras + PUSH chip, ClickCore cards apiladas, Weather fascia cielo + chip GEMINI FLASH 2.5). Sin métricas simuladas.

### Decisiones / cambios implementados
- **Diseño**: `DESIGN.md` reescrito completo. Tokens nuevos en `globals.css`: paper `#F7F4EE`, ink `#1C1913`, signal `#1C6B3F`, line `#DDD6C8`, etc. Fuentes Archivo + Source Sans 3 + IBM Plex Mono (`next/font`). Contenedor único 1200px (plan 1160px → 1200px documentado). `themeColor #F7F4EE`. Grain via `body::after`.
- **Layout**: nueva composición Hero → About → Experience → Projects → Capacidades → Formación → Contact. Cada sección = su propio `<section id>` + `scroll-mt-24` + `border-t border-line`. Se elimina `#dashboard`.
- **Componentes nuevos/reescritos**: Navbar (scrollspy, switch ES/EN `aria-pressed`, panel móvil), Footer, Hero masthead + facts, `ArchitectureFigure` (Fig. 01), `About` (nuevo), `Experience` timeline editorial, `Projects`/`ProjectCard`/`ProjectCover`, `Skills` (4 columnas + callout IA + nota GCP), `Formacion` (nuevo, educación+certs fusionadas), `Contact`, `AskGustavo` (solo superficie; API intacta), `cta-classes.ts`, `use-reveal.ts`.
- **Eliminado**: `components/minigames/` (LatencyDash/LogWatch), `data/endpoints.ts`, `data/hero.ts`, `components/ui/Badge.tsx`, `components/certifications/`, `public/projects/` (5 SVGs), dependencia gsap, `Project.code`/`image` de types/data.
- **Chat API**: persona del prompt en lenguaje natural (sin "strict terminal assistant"); respuestas de error des-bracketeadas (`[ERROR]`/`[RATE_LIMIT]`/`[EMPTY_MESSAGE]` → texto claro). Reglas de scope/tiers/metrics intactas.
- **`lib/messages.ts` + test**: claves humanas (`FIG_CAPTION`, `SKILLS_*`, `CHAT_SUBTITLE`, `ASK_*`, etc.); eliminadas `SYS.*`, `HYBRID_EDITION`, `TENURE_MANIFEST`, `AUDIT_LOG`, `SYS.QUERY` y otras muertas. Typo `SKILLS_AI_CTTA` → `SKILLS_AI_CTA` corregido. `messages.test.ts` reescrito (parity ES/EN de la nueva key set).

### Validación
- `npm install` (lockfile sin gsap).
- `npm run test`: 44/44 (6 suites).
- `npm run lint`: limpio.
- `npm run build`: exitoso (routes `/`, `/_not-found`, `/api/chat`, `/robots.txt`, `/sitemap.xml`).
- Grep de artefactos viejos en `app/components/lib/data/types`: limpio (SYS.*, gsap, dashboard, clases viejas, data/hero, data/endpoints, minigames, image/code de projects).
- HTML prerenderizado inspeccionado: secciones nuevas presentes; sin strings del sistema viejo; Fig. 01 con AIOTEK/QWAVEE/GOOGLE CLOUD · SOPORTE.
- NO validado (honesto): screenshots reales del navegador (browser MCP no disponible), responsive visual en dispositivos, streaming real con GROQ_API_KEY. Checklist completa en `.docs/PRODUCTION_AUDIT.md` y nueva auditoría de diseño en `.docs/DESIGN_AUDIT.md`.

### Ajustes post-validación inicial
- **Lint fix**: `Navbar.tsx` componente `LangSwitch` creado en render → inlinado (error `react-hooks/static-components`).
- **TS fix**: `ArchitectureFigure.tsx` `<Arrow y>` → `y1` (build).
- **A11y**: nuevo `SkipLink` (cliente, usa `useLocale`) en `app/layout.tsx` → `#main` (ahora con `id` + `tabIndex={-1}` + `outline-none`); clave `SKIP_TO_CONTENT` agregada a `lib/messages.ts` + test.
- **Metadata**: TITLE/DESCRIPTION alineados a la posición Backend Engineer (fuente CV) — reemplaza "Backend Developer / Ssr." del antiguo copy de metadata. `Ssr.` se mantiene solo como dato factual de senioridad en `heroStats`.
- **Dead code**: eliminado `components/ui/Button.tsx` (0 imports verificados). Queda `cta-classes.ts` como sistema CTA.

## Sesión — 2026-09-22 (Cierre · decisiones finales de producción)

### Contexto
- No se agregaron funciones nuevas. Se aplicaron las 4 decisiones finales del owner para cerrar la implementación y se actualizó la documentación. Pendiente: ejecutar la checklist manual (nada de ella se declara validado).

### Decisiones aplicadas
- **LinkedIn canónico → única fuente.** `data/personal.ts` (es/en) ahora apunta a `https://www.linkedin.com/in/gusgarozzo/`. Hero, Footer, Contact, `json-ld` (sameAs), `build-cv-context` y `extract-domain.test.ts` consumen esa fuente o usan el fixture actualizado. Coincide con el CV (`linkedin.com/in/gusgarozzo`). Grep de verificación: no queda ninguna URL `gustavogarozzo` salvo menciones históricas en `.docs/` y el email (correcto).
- **Dominio de producción → mantenido.** `NEXT_PUBLIC_SITE_URL=https://gustavo-garozzo.vercel.app` (source de canonical, OG url, sitemap, robots y origin-check del chat).
- **Métricas de proyectos → eliminadas.** Clasificación: todas eran dato histórico sin método documentado (ninguna reproducible contra un reporte/commit fijo); no se presentan como métricas objetivas. Se eliminaron los bloques `metrics` de `data/projects.ts` (es/en ×5), los tipos `LighthouseMetrics`, `Subproject`, `ProjectMetric` y campos `metrics`/`subprojects` de `types/portfolio.ts`, el render de tabla en `Projects.tsx` y el loop en `lib/build-cv-context.ts`. Se conservan descripciones cualitativas y `highlights`. `DESIGN.md` actualizado (footer sin VER, cards sin tabla de métricas).
- **Footer `VER: 4.2.0-STABLE` → eliminado.** Se quitó la clave `VER` de `lib/messages.ts`, el `<span>` de `Footer.tsx` y la entrada del array de claves en `lib/messages.test.ts`.

### Validación
- `npm run test`: 44/44 (6 suites).
- `npm run lint`: limpio.
- `npm run build`: exitoso (routes `/`, `/_not-found`, `/api/chat`, `/robots.txt`, `/sitemap.xml`).
- HTML compilado inspeccionado: `www.linkedin.com/in/gusgarozzo` presente y sin URL vieja; ausente `VER`/`4.2.0-STABLE`; sin labels de métricas (`124ms`, `89ms`, `PERFORMANCE`, etc.); JSON-LD `sameAs` = [`https://www.linkedin.com/in/gusgarozzo/`, GitHub].

### Decisión de registro
- `.docs/PRODUCTION_AUDIT.md` actualizado: secciones 1–2 reflejan lo resuelto; sección 3 es la checklist final de validación manual (streaming chat con GROQ_API_KEY, matriz ES/EN, fallback, toggle de idioma + `documentElement.lang`, responsive 375px/desktop, revisión visual, CI tras push). Ningún punto de la checklist está declarado probado.

## Sesión — 2026-09-22 (Batch 4 · SEO y limpieza)

### Contexto
- Ejecutado el último batch de pulido: dead code verificado y luego removido, SEO completo (metadata, canonical, OG/Twitter, JSON-LD Person, robots/sitemap, lang) y revisión de headings/enlaces/metadata duplicada. Sin features nuevas ni rediseños. No se avanzó a otro batch; se generó la auditoría final de producción en `.docs/PRODUCTION_AUDIT.md`.

### Tareas completadas
- **Limpieza (solo uso verificado nulo)**: eliminados `components/ui/Card.tsx`, `SectionTitle.tsx`, `StatusChip.tsx`, `TerminalBlock.tsx`, `CornerBracket.tsx`; `lib/score-color.ts` + `lib/score-color.test.ts` (test huérfano). Se verificó vía grep que no existe ningún import ni referencia en la app. Se conservaron `Button` y `Badge` (en uso) y `data/education.ts`/`data/about-me.ts` (usados por `build-cv-context`). Claves muertas eliminadas de `lib/messages.ts`/test: `HERO_SPEC`, `ARCHITECTURE_TOPOLOGY` (sin `t("...")` que las use).
- **`lib/site.ts` (nuevo)**: `SITE_URL` = env `NEXT_PUBLIC_SITE_URL` sin slash final; `hasSiteUrl`.
- **`app/layout.tsx`**: metadata pasa a `generateMetadata()` con `metadataBase` (solo si hay URL), canonical `alternates: { canonical: "/" }`, OpenGraph `type=website`, `locale=es_AR`, `alternateLocale=en_US`, `url` real; Twitter `card: summary` (sin imagen ni handle no confirmados); `robots: index/follow`. JSON-LD `Person` renderizado como `<script type="application/ld+json">` derivado de `data/personal` (es) vía `lib/json-ld.ts`.
- **`lang`**: SSR default `lang="es"`; `LocaleProvider` sincroniza `document.documentElement.lang` al cambiar idioma.
- **`app/robots.ts` + `app/sitemap.ts`**: generan `robots.txt` y `sitemap.xml` usando `SITE_URL` cuando está configurada; sitemap vacío y robots sin ref si no hay URL.
- **`.env.example`**: comentario actualizado (NEXT_PUBLIC_SITE_URL alimenta canonical/OG/sitemap/robots y origin-check del chat).

### Validación
- `npm run test`: 44/44 (6 suites; −6 por eliminación de `score-color.test.ts`).
- `npm run lint`: limpio. `npm run build`: exitoso; rutas `/robots.txt` y `/sitemap.xml` generadas estáticas.
- HTML prerenderizado verificado: `title`, `lang="es"`, description, `canonical` = `https://gustavo-garozzo.vercel.app`, `og:url` igual, `twitter:card=summary` (sin recursos inventados), JSON-LD `Person` con name/jobTitle/email/telephone/address/sameAs/url.
- Snapshot de accesibilidad: 1 h1, h2 únicos (Experiencia, Proyectos, Habilidades, Certificaciones, Monitor de Salud de API, Contacto), h3 solo dentro de tarjetas; anclas de nav resuelven a secciones existentes; sin metadata duplicada visible.

### Decisiones
- URL producción tomada de `NEXT_PUBLIC_SITE_URL` ya definido en `.env.local` (`https://gustavo-garozzo.vercel.app`). No se inventó dominio; si el dominio real difiere (ej. custom domain), actualizar el env y rebuild — canonical/OG/sitemap/robots lo reflejan automáticamente.
- **LinkedIn canónico queda explícitamente PENDIENTE**: no se alternó silenciosamente entre `gusgarozzo` (CV y GitHub) y `gustavogarozzo` (project data). `data/personal.ts` sigue con `gustavogarozzo`. JSON-LD `sameAs` lo consume tal cual.
- Sin OG image ni handle de Twitter: no existen assets/confirmación → no se referencian.

### Pendientes
- Confirmar LinkedIn canónico.
- Confirmar el dominio real de producción (verificar `NEXT_PUBLIC_SITE_URL`).
- Verificar de forma manual el toggle de idioma (lang dinámico en runtime; el click del browser MCP no confirmó el cambio pero el mecanismo es simple y type-checked).
- Flujo real de streaming del chat con `GROQ_API_KEY`.
- Revisión visual de screenshots con un modelo con soporte de imágenes; responsive manual 375/1280.
- Push + ejecución de CI (GitHub Actions) para validar en remoto.
- Detalles completos en `.docs/PRODUCTION_AUDIT.md`.

## Sesión — 2026-09-22 (Batch 3 · identidad visual / UX)

### Contexto
- Ejecutado el Batch 3 (visual/UX) sobre una base ya validada (Batch 1 + 2). Criterios del usuario: Hero sin telemetría + system map, nav desktop con links reales, solo a11y (toques ≥44px, reduced-motion también para GSAP, fuentes mínimas), marcar minigames como simulación, respetar estética OLED/champagne/editorial. No tocar SEO ni dead-code cleanup (Batch 4).

### Tareas completadas
- `app/globals.css`:
  - Contraste: `--color-text-muted` `#52525b` (2.72:1, falla AA) → `#87878f` (5.9:1). `text-secondary #A1A1AA` (8.2:1) y `accent #C5A059` (8.5:1) sin cambios.
  - Tipografía mínima: `.label-mono` 11→12px, `.caption-mono` 10→11px; se eliminan overrides inline `text-[11px]`/`text-[10px]` en componentes (verificados por grep, 0 restantes).
  - `html { scroll-behavior: smooth; }`, `section[id] { scroll-margin-top: 64px; }` (navbar sticky) y `scroll-behavior: auto` bajo `prefers-reduced-motion`.
- `lib/reduced-motion.ts` (nuevo): detector `matchMedia("(prefers-reduced-motion: reduce)")`.
- `components/hero/Hero.tsx`:
  - System map SVG code-native sustituyendo la apariencia de telemetría: CLIENTS → AWS API GATEWAY → bifurcación (NESTJS · NODE.JS / AWS LAMBDA · S3) → POSTGRESQL (REDIS · CACHE) y GEMINI LLM (STRUCTURED OUTPUTS), marcador `● YOU_ARE_HERE` en la capa backend, leyenda `ROLE: BACKEND ENGINEER` y `NODE: GUSTAVO.GAROZZO`. `role="img"` + `aria-label` descriptivo en es/en.
  - Se conserva la leyenda spec factual (heroSpec) bajo el mapa — no se repite telemetría.
  - Typewriter (`[ CMD ]`) con guard de reduced-motion: con reduce se muestra el texto completo sin animación.
- `components/layout/Navbar.tsx`:
  - Nav desktop real (`hidden md:flex`) con anclas `#experience/#projects/#skills/#certifications/#contact` (label localizado, `min-h-11`).
  - Desaparecida la telemetría falsa `STATUS: READY_FOR_INTEGRATION`: la posición derecha muestra `personal.title` factual (role). Se quitó la clave `STATUS` de mensajes.
  - Menú mobile intacto, ahora con `min-h-11`; `scrollIntoView` respeta reduced-motion.
- Minigames marcados como simulación:
  - `Lib/messages.ts`: claves nuevas `DEMO_LABEL`, `DEMO_TITLE_LATENCY`, `DEMO_NOTE`, `SIMULATED_GAME`; se quitó `STATUS`.
  - `LatencyDash.tsx`: eyebrow `DEMO_LABEL`, título `DEMO_TITLE_LATENCY`, nota `DEMO_NOTE` (todo localizado); guard reduced-motion en run/recover (estado final directo, sin tween); pip de recovery ahora botón de 44×44px; botón RUN con `min-h-11`.
  - `LogWatch.tsx`: chip `[ LOG GAME · DATOS SIMULADOS ]`; botones con `min-h-11`; console `text-xs`.
- Jerarquía de sección (h2 reales):
  - `Experience`: eyebrow `TENURE_MANIFEST` + h2 `NAV_EXPERIENCE`.
  - `Projects`: header `PROJECTS_EYEBROW` + h2 `NAV_PROJECTS`.
  - `Skills`: eyebrow `SKILLS_EYEBROW` + h2 `NAV_SKILLS`.
  - `Contact`: `CONTACT_REACH_OUT` + h2 `NAV_CONTACT`.
  - LatencyDash ya es h2 propia (demo).
- Accesibilidad táctil: chat (AskGustavo) — botón flotante, sugerencias, input y SEND con `min-h-11`; tabs de experiencia con padding suficiente; botones de minigames con `min-h-11`.
- `lib/messages.test.ts`: lista de claves actualizada (sin `STATUS`, con las nuevas).

### Validación
- `npm run test`: 50/50 (7 suites).
- `npm run lint`: limpio.
- `npm run build`: exitoso, 0 errores TS.
- Verificación en navegador (accessibility snapshot): navbar con links de ancla + role factual, system map con `aria-label` completo, h2 en todas las secciones, chips de simulación presentes, pips 44px. El screenshot no pudo revisarse con el modelo actual (sin soporte de imagen), la estructura se validó vía snapshot a11y.

### Decisiones
- `text-muted` → `#87878f` para pasar AA manteniendo la jerarquía bajo `secondary`.
- El system map reemplaza la telemetría del Hero sin inventar nada: es representación estática del rol, claro en la leyenda.
- Clave `ARCHITECTURE_TOPOLOGY` quedó sin uso en Skills (se rewritearon eyebrows); no se limpia (Batch 4).
- Covers SVG de proyectos ya estaban diferenciados por motivo (BD/sinergy/watchdog/clickcore/weather) → sin cambios de assets.
- `STATUS` eliminado del sistema de mensajes; el navbar usa `personal.title` (sin duplicar fuente).

### Pendientes
- Revisión visual fina (screenshot) con un modelo que soporte imágenes: mapa del Hero, navbar desktop, jerarquía h2.
- Batch 4: limpieza de dead code (Card, SectionTitle, StatusChip, TerminalBlock, CornerBracket, `score-color`, clave `ARCHITECTURE_TOPOLOGY`) y revisión SEO/metadata.
- Confirmar LinkedIn canónico (`gusgarozzo` vs `gustavogarozzo`).

### Tareas completadas
- `lib/scope-guard.ts`: el patrón `clima|weather` ya no bloquea referencias al proyecto Weather API. Se separó en `WEATHER_OFF_TOPIC` y `WEATHER_PROJECT_REFERENCE` (`weather api`, `api del clima`, `proyecto...clima/weather`). El clima genérico sigue bloqueado.
- `lib/scope-guard.test.ts`: +4 casos (Weather API permitida en es/en, API del clima, stack de la Weather API) y +1 bloqueo de temperatura genérica. 22 tests.
- `app/api/chat/route.ts`:
  - Trim de historial: máximo 20 mensajes, validación de roles (`user`/`assistant`), corte de textos a 2000 chars y del mensaje a 2000 chars.
  - Streaming SSE: `stream: true` a Groq, `ReadableStream` que reenvía deltas de contenido como `text/plain` con parser de eventos SSE (soporta chunks partidos y `[DONE]`). Los errores previos (403, 429, 400, 500, 502, scope-guard) siguen respondiendo JSON.
- `lib/messages.ts` + `lib/messages.test.ts`: claves nuevas `CHAT_SEND`, `CHAT_LOG_LABEL`, `CHAT_EMPTY_TITLE`, `CHAT_EMPTY_HINT`, `SUGGESTED_PROMPTS_LABEL`, `SUGGESTION_EXPERIENCE/SKILLS/AI/WEATHER`.
- `components/chat/AskGustavo.tsx`:
  - Consumo de la respuesta stream (lee el body a medida que llega, muestra `streamText` en vivo con cursor, la commitea al final).
  - Empty state con 4 consultas sugeridas clicables (localizadas), jerarquía de mensajes preservada (terminal).
  - A11y: `role=dialog`/`aria-label`, `role=log` + `aria-live=polite` + `aria-busy`, label del input, `aria-label` de cerrar/enviar, hint oculto del cursor.
  - Teclado: `Escape` cierra el chat y devuelve el foco al botón de apertura; Enter sigue enviando. Focus restituto al abrir/cerrar.
  - Mobile/layout: `max-h` con `100dvh` en mobile y `min(600px, calc(100vh-48px))` en desktop; input con `min-w-0`.
  - Estados: cooldown en el botón SEND (Xs), error/rate-limit mantienen copy localizado.

### Validación
- `npm run test`: 50/50 (7 suites; scope-guard 22).
- `npm run lint`: limpio.
- `npm run build`: exitoso, 0 errores TS.
- Parser SSE verificado offline en Node (chunks partidos + `[DONE]` → salida correcta).

### Decisiones
- La respuesta de streaming no usa formato SSE hacia el cliente sino `text/plain` (deliveries simples); el servidor sí parsea el SSE de Groq.
- Los bloqueos de scope/errores siguen siendo JSON → el cliente distingue por `content-type`.
- No se tocó el rate-limit (20 req/10 min por IP) ni el origin-check condicional.

### Pendientes
- Probar el chat en vivo con `GROQ_API_KEY` (el build no valida el flujo real contra Groq).
- Revisar `DESIGN.md` para reflejar la eliminación de telemetría en Hero y el nuevo estado del chat.

## Sesión — 2026-09-22 (Batch 1 · capa de datos/contenido)

### Contexto
- Auditoría completa del portfolio aprobada (informe A–H). Se ejecuta el Batch 1: canonicalización del perfil, skills por niveles, categorías de proyectos, eliminación de telemetría falsa y fuente única en `data/*.ts` compartida por UI y chat. Batch 2 (chat: scope-guard, historial, streaming, FAQ) queda pendiente.

### Tareas completadas
- Movido el harness de ubicación: `.agents/skills/PORTFOLIO_POLISH_HARNESS.md` → `.agent/PORTFOLIO_POLISH_HARNESS.md` (AGENTS.md ya referenciaba `.agent/`).
- `types/portfolio.ts`: agregado `ProjectCategory` (`studio | co-founded-product | personal | ai-experiment`) y campo `category` en `Project`; `SkillCategory` ahora es `{ core, supporting, learning, ai }`.
- `data/skills.ts`: skills separadas en core (stack principal real), supporting (GCP acotado: Cloud SQL, Pub/Sub, Cloud Monitoring, GKE básico; Express, Next.js, React, Kotlin/Android, microservicios, event-driven), learning (MongoDB, DynamoDB, Terraform, Kubernetes base, DDD — conceptual) y ai (Gemini, structured outputs, tool calling, AI pair programming, prompt engineering).
- `data/hero.ts` (nuevo): spec factual REEMPLAZA la telemetría falsa del Hero (NODE_VERSION 20.20.2, UPTIME 99.97%, LATENCY_P50 42ms, THROUGHPUT 1.2k rpm, MEMORY 187MB) por ROLE, PRIMARY_STACK, CLOUD (AWS · Google Cloud), DATABASES (PostgreSQL · Redis), ARCHITECTURE, AI_LINE.
- `data/projects.ts`: `category` en los 5 proyectos (Barking Dogs → `studio`; Sinergy, WatchDog, ClickCore → `co-founded-product`; Weather API → `ai-experiment`), es/en.
- `data/endpoints.ts`: eliminado `uptime: "99.94"` y `recoveryMsg`; agregado `demoLabel: "SIMULATED_FEED"`.
- `lib/messages.ts`: eliminadas claves `LIVE_TELEMETRY`, `TELEM_*`, `LAST_PARSED`, `TOPOLOGY_*`; agregadas `HERO_SPEC`, `SKILLS_TIER_CORE/SUPPORTING/LEARNING`, `SKILLS_AI_LINE`, `CERT_COUNT`, `PROJECT_CAT_STUDIO/COFOUNDED/PERSONAL/AI`.
- `lib/messages.test.ts`: lista de claves actualizada.
- `lib/build-cv-context.ts`: skills por tiers con semántica de nivel, categorías de proyectos en el contexto, y bloque de contacto completo (email, phone, LinkedIn, GitHub, CV).
- `lib/build-cv-context.test.ts`: asserts para contacto, tiers y categorías.
- Componentes: `Skills.tsx` (3 columnas por tier + banda visual de línea IA), `Hero.tsx` (spec factual), `LatencyDash.tsx` (demoLabel + disclaimer explícito de simulación, sin uptime falso), `Certifications.tsx` (`CERT_COUNT` en lugar de timestamp con `new Date()`), `Contact.tsx` (valores derivados de `data/personal.ts`, sin hardcode), `Projects.tsx` (badge de categoría localizado).
- `app/api/chat/route.ts`: system prompt con regla de tiers (LEARNING/IA = en desarrollo, no experiencia profesional) y regla de métricas (nunca presentarlas como telemetría live).

### Validación
- `npm run test`: 46/46 pass (7 suites).
- `npm run lint`: limpio.
- `npm run build`: exitoso (0 errores TS, 5 páginas estáticas + /api/chat).

### Decisiones
- Aiotek ya figuraba "Septiembre 2023 – Junio 2026" en los datos → sin cambios.
- Google Cloud queda como supporting acotado (no al nivel del stack principal); MongoDB/DynamoDB/Terraform como conceptual; AI Engineering como línea en desarrollo (no experto en IA).
- Las métricas reales del CV se conservan como resultados de proyecto; ninguna se presenta como telemetría/live.
- Contacto y chat consumen la misma fuente `data/*.ts`. Sin respuestas de chat duplicadas.

### Pendientes
- Confirmar LinkedIn canónico: CV dice `linkedin.com/in/gusgarozzo`, sitio usa `gustavogarozzo`. Se dejó el valor actual de `data/personal.ts` sin tocar.
- Batch 2 (chat): fix de scope-guard (regex `clima|weather` bloquea "Weather API"), trim de historial, streaming, quitar rate-limit de tests si procede, estado vacío/sugerencias.
- Reporte de auditoría visual pendiente de revisión (contraste `text-muted`, nav desktop, prefers-reduced-motion, metadata SEO).
- `DESIGN.md` y entradas previas de este log referencian la telemetría vieja; se actualiza DESIGN.md en batch de presentación.

## Sesión — 2026-09-22

### Tareas completadas
- Implementado el enlace de descarga del CV desde Hero y Contact.
- Creado el PDF público `public/cv-gustavo-garozzo.pdf` con el perfil, experiencia, stack y métricas actuales.
- Añadido `cvUrl` al tipo y a los datos canónicos de perfil.
- Enriquecido el contexto del chat con highlights y métricas de proyectos.
- Actualizado el system prompt para permitir preguntas sobre impacto, resultados, logros y decisiones técnicas.
- Añadidas pruebas para preguntas abiertas sobre resultados de proyectos y logros profesionales.

### Archivos creados / modificados
- `public/cv-gustavo-garozzo.pdf` — PDF descargable del CV.
- `types/portfolio.ts` — campo `cvUrl` en `PersonalInfo`.
- `data/personal.ts` — URL pública del CV para ambos idiomas.
- `components/hero/Hero.tsx` — CTA localizado de descarga.
- `components/contact/Contact.tsx` — enlace de descarga en contacto.
- `lib/build-cv-context.ts` — highlights y métricas de proyectos incluidos en el contexto.
- `app/api/chat/route.ts` — alcance profesional ampliado para resultados y logros.
- `lib/messages.ts` — textos localizados del CTA.
- `lib/scope-guard.test.ts` — regresiones de preguntas abiertas.

### Decisiones técnicas
- El PDF se sirve como asset estático desde `public/` y se referencia desde `data/personal.ts`, evitando URLs duplicadas en componentes.
- El guard mantiene bloqueados temas no relacionados; sólo se amplió el contexto permitido del prompt y se cubrieron casos profesionales previamente ausentes.
- Se eliminaron los helpers sin uso de `build-cv-context.ts` para dejar lint limpio.

### Pendientes
- Hacer push al remoto y verificar la ejecución del workflow en GitHub Actions.
- Probar el chat en vivo con `GROQ_API_KEY` configurada.

## Sesión — 2026-07-02 19:02

### Tareas completadas
- Scope guard implementado: pre-filtro en servidor que bloquea off-topic antes de llamar a Groq
- System prompt rediseñado: mucho más estricto, con CV embebido en `<CV_DATA>` y ejemplos explícitos de off-topic
- 16 tests para scope-guard (8 on-topic allow, 6 off-topic block, 2 edge cases)
- 42 tests totales, 7 suites — todos pasan
- Build exitoso (0 errores, 0 warnings TS)

### Archivos creados / modificados
- `lib/scope-guard.ts` — pre-filtro con 12 patrones regex (recetas, código, matemáticas, traducción, poemas, noticias, opiniones, clima, precios, dólar, juegos/series)
- `lib/scope-guard.test.ts` — 16 tests cubriendo allow/block/edge cases
- `app/api/chat/route.ts` — system prompt mucho más estricto con `<CV_DATA>` embebido, regla ABSOLUTE con mensaje de rechazo exacto, scope guard integrado antes de llamar a Groq

### Decisiones técnicas
- Scope guard usa regex con heurísticas simples (sin ML, sin dependencias) para bloquear off-topic obvio sin llamar a la API de Groq (ahorra latencia y tokens)
- CV data se inyecta DENTRO del system prompt (en `<CV_DATA>`) en vez de como mensaje user aparte, lo que le da más peso semántico
- Si el guard bloquea, responde instantáneamente sin consumir API

### Pendientes
- Probar en vivo con preguntas off-topic reales (requiere GROQ_API_KEY en .env.local)

## Sesión — 2026-07-02 18:25

### Tareas completadas
- Feature F08 — CI/CD Pipeline: spec, plan, tasks + GitHub Actions workflow (`ci.yml`)
- Feature F09 — Additional Unit Tests: spec, plan, tasks + 3 nuevos test files
- Tests pasan: 12 → 26 tests (14 nuevos, 0 fallos)
- Build exitoso (0 errores, 0 warnings TS)

### Archivos creados / modificados
- `.github/workflows/ci.yml` — GitHub Actions: checkout → Node 20 → npm ci → lint → test → build → audit
- `features/f08-ci-cd/spec.md`
- `features/f08-ci-cd/plan.md`
- `features/f08-ci-cd/tasks.md`
- `features/f09-unit-tests/spec.md`
- `features/f09-unit-tests/plan.md`
- `features/f09-unit-tests/tasks.md`
- `lib/rate-limit.test.ts` — 5 tests (first call, 20 ok, 21st blocked, window reset, IP isolation)
- `lib/messages.test.ts` — 4 tests (ES strings, EN strings, unknown key fallback, all keys non-empty)
- `lib/build-cv-context.test.ts` — 5 tests (locale markers, personal fields, section headers, min length, About section)

### Decisiones técnicas
- CI usa `npm ci` en vez de `npm install` para instalaciones determinísticas (reproducibilidad)
- npm audit se ejecuta con `--audit-level=high` para no fallar por vulnerabilidades bajas/modadas
- `rate-limit.test.ts` usa `vi.useFakeTimers()` para manipular el reloj sin esperar 10 min reales
- `build-cv-context.test.ts` testea output real (integra datos reales de `data/`), no mockea nada
- No se usan dependencias nuevas en ningún test

### Pendientes
- Hacer commit y push del CI workflow para validar que corre en GitHub Actions
- Ninguno

## Sesión — 2026-07-02 10:05

### Tareas completadas
- Migración del chatbot ASK_GUSTAVO de Gemini a Groq
- Chat ahora responde sobre vida personal e intereses del autor (no solo profesional)

### Archivos creados / modificados
- `app/api/chat/route.ts` — endpoint migrado a Groq (OpenAI-compatible): endpoint, auth, body format, modelo `llama-3.3-70b-versatile`
- `.env.example` — `GEMINI_API_KEY` → `GROQ_API_KEY`
- `components/chat/AskGustavo.tsx` — history role mapping corregido (`"model"` → `"assistant"`)
- `app/api/chat/route.ts` — system instruction ampliada para permitir preguntas sobre intereses personales, filosofía y valores
- `.docs/doc.md` — registro de sesión agregado

### Decisiones técnicas
- Se usa la API OpenAI-compatible de Groq en vez de su SDK (sin nuevas dependencias)
- El CV context (`buildCvContext`) ya incluía about-me.ts, solo se ajustó la regla en system prompt

### Pendientes
- El usuario debe crear `GROQ_API_KEY` en `.env.local`
- Verificar build y probar en vivo

## Sesión — 2026-07-01 17:28

### Tareas completadas
- Implementación completa del nuevo DESIGN.md "Midnight Architect — Hybrid Edition"
- 6 fases ejecutadas: tokens → layout → UI primitives → secciones → animaciones → build/validate

### Fase 1 — Design Tokens (globals.css)
- Color palette: canvas `#000000`, surface `#0B0B0B`, surface-deep `#050505`, accent gold `#C5A059`, border `#1A1A1A`, text-primary `#FFFFFF`/secondary `#A1A1AA`/muted `#52525B`
- Typography: display-lg 60px Playfair, headline-md 36px, body-lg 18px Inter, label-mono 11px 0.15em uppercase, data-mono 13px, caption-mono 10px 0.3em
- Utility classes: `.dashboard-frame`, `.section-border`, `.vertical-border`, `.pip` (8×8 gold square), `.glitch-overlay`, `.scan-line` keyframe, `.scrollbar-hide`

### Fase 2 — Layout
- `layout.tsx`: dashboard frame con border-x, px-6 padding, bg-canvas, themeColor → `#000000`
- `Navbar.tsx` → `SystemStatusBar`: sticky top-bar con `SYS.AUTH`, nombre, location + live clock, gold pip + `STATUS: READY_FOR_INTEGRATION`, mobile hamburger con GSAP fade-in reveals
- `Footer.tsx`: `// HYBRID_EDITION.SYS` | `[ LINKEDIN ] [ GITHUB ]` | `VER: 4.2.0-STABLE`

### Fase 3 — UI Primitives
- `Button.tsx`: gold primary (bg-accent), secondary (transparent + border-accent hover), ghost (mono label-mono)
- `Card.tsx`: bg-surface, border-border, caption-mono header/footer
- `Badge.tsx`: surface-accent/accent primary, surface/text-secondary secondary, surface-deep/text-muted tertiary
- `SectionTitle.tsx`: label→eyebrow prop con label-mono gold
- `StatusChip.tsx`: pip + gold border for ≥90, text-secondary for ≥70, text-muted for below
- `TerminalBlock.tsx`: bg-surface-deep, data-mono
- `CornerBracket.tsx`: mantiene null return (no encaja en el editorial minimalism)

### Fase 4 — Secciones
- **Hero**: 3-column grid (4/5/3). Left: Playfair headline con italic gold, Intro, `[ CMD ] INITIATE_HANDSHAKE`, CTA buttons. Center: CSS topography pattern (concentric/radial) con LIVE_TELEMETRY_FEED overlay. Right: Stat blocks (Experience_Cycle, Primary_Stack, Seniority_Grade) con underline hover expansion.
- **Experience**: 4/8 split client component. Left: COMPANY_TENURE_MANIFEST con company rows (active: surface-accent + gold border). Right: Playfair company name, gold mono role, mono period/location, highlights con `[01]` formato gold.
- **Projects**: Filmstrip horizontal snap-scroll. Cards 320-450px: gradient placeholder header con code badge + scanline overlay, Playfair title, metrics table (opacity 60→100 on hover), tag chips.
- **Skills**: Architecture Topology con SVG circuit lines (gold, 0.5px), `BACKEND_SYSTEM_CORE` node, 3 columns (Languages, Infrastructure, Mindset) con skill pills hover→gold.
- **Certifications**: Audit Log 4/8 split. Left: AUDIT_LOG / CERTIFICATIONS con LAST_PARSED. Right: surface-deep terminal con staggered GSAP reveal (ScrollTrigger).
- **Contact**: 2-col grid de link buttons.

### Fase 5 — Motion (GSAP + ScrollTrigger)
- SystemStatusBar: staggered fade-in (name 0s, location 0.6s, status 1.2s)
- Certifications: terminal lines staggered reveal con ScrollTrigger (play → reverse)
- Globals.css: scan keyframe, glitch-overlay, hover transitions gold en todos lados

### Archivos creados / modificados
- `app/globals.css` — rewrite completo (colores, tipografía, utilities, animaciones)
- `app/layout.tsx` — dashboard frame, themeColor #000000
- `app/page.tsx` — section-border en cada sección, sin SectionTitle (ahora integrado en secciones)
- `types/portfolio.ts` — HeroStats interface, Project.code, Project.metrics[]
- `data/personal.ts` — heroStats field
- `data/projects.ts` — code, metrics[] añadidos a cada proyecto
- `components/layout/Navbar.tsx` — rewrite a SystemStatusBar con GSAP
- `components/layout/Footer.tsx` — rewrite con formato HYBRID_EDITION
- `components/ui/` — Button, Card, Badge, SectionTitle, StatusChip, TerminalBlock (todos actualizados)
- `components/hero/Hero.tsx` — rewrite 3-column hero
- `components/experience/Experience.tsx` — rewrite 4/8 split cliente interactivo
- `components/projects/Projects.tsx` — rewrite filmstrip horizontal
- `components/skills/Skills.tsx` — rewrite architecture topology con SVG
- `components/certifications/Certifications.tsx` — rewrite audit log con GSAP stagger
- `components/contact/Contact.tsx` — rewrite con nuevos tokens
- `package.json` — +gsap

### Decisiones técnicas
- GSAP + ScrollTrigger aprobados e instalados como dependencia
- Topography visual usa CSS radial/repeating gradients (no imagen real ni video)
- No se usa dashboard-frame literal como contenedor visible; el frame se logra con border-x en main + section-border en cada sección
- formatYear test pasa sin cambios (sigue siendo identity function)
- scrollbar-hide agregado como utility class para el filmstrip

### Pendientes
- Manual responsive check a 375px y 1280px (requiere browser)
- Keyboard navigation audit completo
- OG image personalizada (imagen open-graph para redes)

## Sesión — 2026-07-01 17:01

### Tareas completadas
- Configurado plugin `opencode-gpt-imagegen` v0.1.8 en `opencode.json`
- Eliminada entrada inválida `imagesorcery-mcp`
- Verificado que build, tests (12/12) y lint pasan correctamente

### Archivos creados / modificados
- `opencode.json` — agregado plugin y eliminado MCP roto

### Decisiones técnicas
- `opencode-gpt-imagegen` usa `gpt-image-2` via ChatGPT OAuth (sin costo extra de API)
- El plugin se auto-instala vía Bun al próximo reinicio de OpenCode; requiere que la sesión esté autenticada con ChatGPT

### Pendientes (heredados)
- Manual responsive check a 375px y 1280px (requiere browser)
- Keyboard navigation audit completo
- OG image personalizada (imagen open-graph para redes)

## Sesión — 2026-07-01 15:40

### Tareas completadas
- Fases 1 a 7 completadas secuencialmente
- Portfolio funcional con todas las secciones renderizadas

### Fase 1 — Scaffolding
- Next.js 16.2.9 (App Router) + TypeScript strict + Tailwind CSS v4
- Vitest + Testing Library configurado
- ESLint 9 flat config con eslint-config-next
- Directorios: app/, public/, components/, components/ui/, lib/, types/
- Fonts Inter + JetBrains Mono via next/font
- Utilidades label-caps y code-md en globals.css
- Dark theme base (#131315)

### Fase 2 — Types & Data
- `types/portfolio.ts` con todas las interfaces
- `data/personal.ts`, `data/summary.ts`, `data/experience.ts`, `data/projects.ts`
- `data/skills.ts`, `data/certifications.ts`, `data/education.ts`
- DATA.md eliminado; contenido migrado a .ts tipados

### Fase 3 — Design Tokens
- +40 colores del sistema Material Design 3 en Tailwind v4 @theme
- Tipografía completa (headline-xl → label-caps) como clases utilitarias
- shadow-glow, micro-border, grid-overlay, bloom-cyan
- Scrollbar personalizada, focus-visible outlines
- prefers-reduced-motion support

### Fase 4 — UI Primitives
- 7 componentes: SectionTitle, Card, Badge, Button, StatusChip, TerminalBlock, CornerBracket
- Todos con TypeScript estricto, data-testid, sin lógica de negocio

### Fase 5 — Sections
- Hero, Experience, Projects, Skills, Certifications, Contact
- Cada sección consume datos de `data/`, sin hardcodeo
- Cada sección en su propia carpeta con index.ts re-export

### Fase 6 — Layout & Page
- Root layout con metadata, viewport, OG tags, themeColor
- Navbar sticky con smooth-scroll (mobile: hamburger menu)
- Footer "SYSTEMS ONLINE"
- Container responsive (max-width 1440px, padding 16px/32px)
- Grid overlay en body background

### Fase 7 — Tests & Polish
- 3 utilidades en lib/: score-color, format-date, extract-domain
- 12 tests unitarios (Vitest) pasando
- prefers-reduced-motion y focus-visible outlines
- lint y build pasando sin errores

### Archivos creados / modificados
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `components/ui/` — 7 primitivas
- `components/hero/`, `components/experience/`, `components/projects/`
- `components/skills/`, `components/certifications/`, `components/contact/`
- `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`
- `types/portfolio.ts`
- `data/` — 7 módulos de datos
- `lib/` — 3 utilidades + 3 tests
- `features/` — 7 carpetas de especificación
- `vitest.config.ts`, `package.json`, `tsconfig.json`
- `.docs/doc.md`

### Decisiones técnicas
- Se usó nvm para Node 20.20.2 (no disponible en WSL sin sudo)
- Tailwind CSS v4 con @theme inline (sin tailwind.config.ts)
- Navbar usó scrollIntoView nativo (no librería externa)
- StatusChip refactorizado para usar lib/score-color
- Sin dependencias externas más allá del scaffold + Vitest

### Pendientes
- Manual responsive check a 375px y 1280px (requiere browser)
- Keyboard navigation audit completo
- OG image personalizada (se puede agregar después)

## Sesión — 2026-09-23 — Correcciones pre-Fase 3 + Fase 3

### Correcciones aprobadas (revisión visual del owner)
- **About**: eliminada la foto (duplicada con hero); quedó solo texto en una columna `max-w-[68ch]`. 1er párrafo 18–19px (`text-[1.125rem] md:text-[1.2rem]`), `font-medium text-ink`; párrafos medios `body-lg text-ink-soft`; frase de cierre `body-md text-ink-mute italic` (antes era más oscura que el resto; se invirtió). Se eliminaron la columna izquierda, la nota `ABOUT_MORE` y los quick links.
- **Diagrama i18n**: todos los textos del figure (labels de columna, títulos/subs de cajas, banda GCP y aria-label) pasaron a `lib/messages.ts` como claves `FIG_*` (es/en). `aria-label` ahora `t("FIGURE_ARIA")`.
- **ProjectCover eliminado por completo** (`rm components/projects/ProjectCover.tsx`): la card de proyecto es solo texto (acorde al plan 3.2). Nombre y stack aparecen una sola vez; se quitó el grid del featured y los decorativos (barras/wordmarks/patrones). Se eliminó la clave `PROJECTS_FEATURED` (sin uso).
- **Hero**: la línea de stack pasó de mono gris a sans 17–18px, `font-medium`, `text-ink`, justo bajo el titular. `locationShort` ahora deriva "Tandil, Argentina" (primera + última parte), consistente en ES/EN.

### Fase 3 (según plan aprobado)
- **Skills / chips IA**: solo chips respaldados por proyecto real (Gemini/LLMs, Structured outputs, Tool calling); se quitaron "AI pair programming" e "Ingeniería de prompts". El texto "Línea en desarrollo · proyectos personales" pasó a clave `SKILLS_AI_NOTE`.
- **Certificaciones**: decisión del owner — la 4ª visible es "Arquitectura de Software con IA" (criterio: complemento de perfil Backend, no pivote IA; sin copy nuevo de AI Engineering). Visibles: Arq. Software con IA, Depuración Node, DDD, Introducción a AWS (campo `featured` en `types/portfolio.ts` + `data/certifications.ts`). El resto queda detrás de `<details>` con "Ver las N restantes" (`CERT_SHOW_MORE`).
- **Contacto**: ítem Currículum muestra apenas "Descargar CV" + ícono de descarga (nunca la ruta cruda), vía `downloadLabel`.
- **Chat**: scroll de conversación respeta `prefers-reduced-motion`.

### Test de guarda i18n (`lib/i18n.guard.test.ts`)
- Paridad: toda clave de `lib/messages.ts` con valor no vacío en es y en.
- Todo `t("KEY")` literal referenciado en `components/` y `app/` existe en messages.
- Ningún carácter acentuado español hardcodeado en `components/`/`app/` (fuera de comentarios). Detectó y se corrigió el literal de Skills y los del diagrama.

### Auditoría F3 (ES + EN × 1440/390)
- Nueva verificación de idioma: marks distintivos ES/EN en `body.innerText` (comparación case-insensitive) → `wrongLanguage: []` y `missing: []` en las 4 vistas; el chat se abre, verifica título/placeholder/label de apertura en el idioma correcto y se cierra.
- Resultados: `hScroll false` · H1 1 línea · 0 overlaps (8 boxes) · figcaption 14px sans · label chat block (1440)/none (390) · footer sin links cubiertos · sin texto en idioma erróneo.
- Capturas por sección (hero, about, experience, diagram, projects, skills, formacion, contact, footer, full) × 4 combos = 40 PNG en `.shots/f3-*.png`.
- Validación: lint limpio, 47/47 tests, build OK.
- Infra: server `next start -p 3456` relanzado con `node node_modules/next/dist/bin/next start` (detached); audit con `node.exe audit-cdp.mjs f3`.

## Sesión — 2026-09-23 — Fase 3 aprobada (owner) + Housekeeping de assets

### Aprobación
- Owner aprobó Fase 3 ("adelante") tras el reporte de la auditoría bilingüe y las 40 capturas por sección.

### Housekeeping (housekeeping de la sesión anterior, pendiente de confirmación del owner)
- Verificado por grep que el único asset con referencias en código (`app/components/lib/data/types`) es `images/portrait.webp` (Hero).
- Borrados de `public/images/` sin uso: `hero.webp`, `cover-{barking-dogs,clickcore,sinergy,watchdog,weather-api}.webp`, y los masters JPG `{barking-dogs,clickcore,hero,sinergy,watchdog,weather-api}.jpg`.
- Conservados: `portrait.webp` (en uso) y `me.webp` (master del retrato, documento como fuente).
- Backup de todo lo borrado: `/tmp/opencode/portfolio-images-backup/` (los archivos eran untracked en git, no recuperables por otra vía).
- ESLint: agregado `.shots/**` a `globalIgnores` en `eslint.config.mjs` (el perfil de Chrome de la auditoría disparaba ~2900 errores de lint); `.shots/audit-cdp.mjs` ahora borra `cdp-profile` al terminar cada corrida.

### Validación
- `npm run lint` limpio · `npm run test` 47/47 · `npm run build` OK · `GET /` y `GET /images/portrait.webp` HTTP 200 en `:3456`.

### Pendientes (owner)
- Regenerar `public/cv-gustavo-garozzo.pdf` (aún dice "BACKEND DEVELOPER SSR").
- OG image: no generada (diferido a pedido explícito).

## Sesión — 2026-09-23 — Gate determinista + matrices de scope (cierre parcial)

### Cambios
- `lib/chat/gate.ts`: nuevo gate determinista (`gateExternalAccess`) que decide
  `out`/`skip` para OOS/FP del corpus **sin round-trip a Groq**: recetas,
  capitales/geografía, pronóstico/clima actual, resultados/noticias (quién
  ganó), chistes/cuentos, clima-tiempo actual. Parches de precisión:
  `capital (de|of)` ES/EN, `quién ganó/who won`, current forecast
  (`cómo está el tiempo/clima`, `what's the weather`, `weather forecast`,
  `temperatura hoy`, `pronóstico del tiempo`) — WAT/API que mencionan su
  proyecto siguen `in` (sharing/ENTITY_PROJECTS antes que el patrón).
- `classify.ts`: router compactado (~30% tokens); `classifyMessage` con
  lenguaje por locale; fallback honesto; `language` del hint (en la regla del
  CV por locale, si se da) para "¿de dónde sos?".
- `buildCvContext(locale)`: contexto CV localizado (es/en) → las respuestas
  ya no cargan el CV bilingüe completo por request (reduce TPM).
- `answer.ts`: sleep/retry 429 (3.5s) en stream; temperatura 0.4; regla 9
  (lengua única por locale).
- `run.mjs` (eval): harness reanudable (`partial` + resume desde `--out`),
  `--only-gen`/`--gen`/`--judge`/`--pace`, judge con retry 429; captura
  `x-chat-intent`, `x-chat-scope`; `x-chat-scope-only` para scope puro
  (sin generación) — evita crowding TPM en la matriz de scope.
- `classify`/`gate` comparten `hints` (`extractHints`)

### Validación
- `npm run lint` limpio.
- `npm run test` 59/59 (incluye gate.test.ts 7/7 y corpus/gate coverage).
- `npm run build` OK.
- Matriz scope parcial post-gate: `lib/chat/eval/results/post_scope.json`
  **80/80 correctos** en corrida reanudable (marcada `partial: true`); no se
  completó 160/160 por TPM (openai/gpt-oss-20b plan gratuito, TPM 8000; pace
  7–12s). Judge/generación de muestra 12 no ejecutada (requiere GROQ_API_KEY
  + TPM) → **EVAL_REPORT.md (PARCIAL)** en `.docs/`.
- Server: `:3456` relanzado con la nueva build; `GET /` y
  `GET /images/portrait.webp` HTTP 200; probes OOS-4/11/FP-1/WAT → out OK,
  in-scope/default → in OK con headers `x-chat-scope`.

### Pendientes (owner)
- Completar matriz 160 (reanudar `--run` con el comando del EVAL_REPORT) y
  correr judge (12+12) cuando haya TPM/API key.
- `public/cv-gustavo-garozzo.pdf` sigue "BACKEND DEVELOPER SSR".
- OG image no generada.

## Sesión — 2026-09-24 — Cierre owner: CV PDF + OG image confirmados

### Cambios
- **CV PDF (localizado) resuelto/pendiente-stale.** Los archivos reales son
  `public/cv-gustavo-garozzo-es.pdf` y `public/cv-gustavo-garozzo-en.pdf`
  (referenciados en `data/personal.ts`), ambos con título correcto:
  "Backend Engineer | Node.js • TypeScript • NestJS" (verificado con
  `pdftotext`). La nota de DOC "cv-gustavo-garozzo.pdf dice BROAD DEVELOPER
  SSR" referenciaba el archivo viejo único (ya no existe) → se retira.
- **OG image reparada y funcional.** `app/opengraph-image.tsx` fallaba con
  "No fonts are loaded": `loadFont` solo aceptaba `.woff2`, pero Google Fonts
  sin User-Agent de navegador devuelve `.ttf` → regex no matcheaba → `fonts=[]`
  → satori pum. Se amplió el regex a `(woff2|woff|ttf)`. Ahora `GET
  /opengraph-image` → `200 image/png`, 1200×630, 45.7 KB (validado header +
  bytes PNG + dimensiones).

### Validación
- `npm run build` OK (ruta `ƒ /opengraph-image`).
- Probes HTTP sobre `:3456`: `/`=200, `/opengraph-image`=200,
  `/cv-gustavo-garozzo-es.pdf`=200, `/cv-gustavo-garozzo-en.pdf`=200,
  `/images/portrait.webp`=200. Sin errores en el log del server.

### Pendientes owner restantes (solo Groq/TPM) — CANCELADOS
- Completar matriz 160 y judge (12+12): cancelado por decisión del owner
  2026-09-24. La evidencia parcial (`post_scope.json` 80/80) queda como
  resultado final; el harness `run.mjs` se conserva pero no se reanuda.

## Sesión — 2026-09-24 — Cierre definitivo (owner cancela pendientes restantes)

### Decisiones
- **Matriz 160/160 + judge (12+12): CANCELADA.** Única tarea pendiente de
  producto tras el cierre; dependía de TPM de Groq (free, 8000/min). El owner
  decide cerrar con la evidencia parcial documentada (80/80 scope determinista,
  gate 7/7, tests 59/59). Harness y datos se mantienen en el repo como
  referencia, no como tarea abierta.
- **Verificación visual manual en navegador** (320/375/768/1024/1280): se
  descarta como bloqueante de cierre. El owner revisará el sitio publicado;
  los audits de código ya están documentados (`.docs/DESIGN_AUDIT.md`).
- **Keyboard navigation audit completo**: cubierto por implementación (SkipLink,
  focus states, headings, reduced-motion) documentada; sin checklist adicional
  requerida para el cierre.
- **Checklist post-deploy de `.docs/PRODUCTION_AUDIT.md` (sección 3)**: los
  puntos verificables en esta iteración se validaron (chat streaming real con
  GROQ_API_KEY, OG image, PDFs, CI success en `7f9d94c`). Los restantes quedan
  como verificación del owner sobre el sitio publicado, no como tareas del repo.

### Validación
- `npm run lint` limpio · `npm run test` 59/59 · `npm run build` OK.
- Chat en vivo validado: `/api/chat` 200 (origin localhost y producción),
  respuesta real del LLM; 403 solo sin origin / origin ajeno.
- CI GitHub Actions en `7f9d94c`: completed / success.
