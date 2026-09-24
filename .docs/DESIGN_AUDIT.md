# Design Audit — 2026-09-22

Sesión de rediseño integral ("Engineering Editorial — Fieldwork"). Reemplaza la identidad anterior ("Midnight Architect — Hybrid Edition").

## 1. Problemas del diseño anterior

El "Hybrid Edition" era un dashboard simulado que violaba principios clave del proyecto:

- **Falsa telemetría por todas partes**: `SYS.AUTH`, `STATUS: READY_FOR_INTEGRATION`, `LIVE_TELEMETRY_FEED`, `AUDIT_LOG`, `[ CMD ]`, `VER: 4.2.0-STABLE`. El AGENTS.md prohíbe presentar simulación/telemetría falsa; el sitio se leía como un monitor inexistente.
- **Metáfora de terminal en el chat**: persona "strict terminal assistant", respuestas `[ERROR]`, `[RATE_LIMIT_EXCEEDED]`, `SYS.QUERY v1.0`. Contradecía el requisito de un asistente natural y honesto.
- **Diagramas decorativos**: nodos inventados (`GEMINI LLM`, `YOU_ARE_HERE`) mezclaban la línea personal de IA en la figura de arquitectura profesional.
- **Google Cloud sobredimensionado**: se perfilaba como expertise equivalente a AWS cuando la fuente real es Cloud SQL / Pub/Sub / Cloud Monitoring / GKE básico.
- **Covers genéricos**: variaciones decorativas del mismo recurso; encubrimiento por estética.
- **Estética genérica "developers"**: playfair-lujo + consola + stock imagery; costosa de mantener, sin anclaje en el perfil real.

## 2. Nueva dirección

"Engineering Editorial — Fieldwork": un portfolio tipo "bitácora/journal de ingeniería" — paper-based, tipografía editorial agresiva, un único verde señal, instrumentación técnica (muy contenida: mono eyebrows, 1px reglas, una sola figura de "prueba de campo").

Personalidad (directiva del owner): contemporánea, distintiva, memorable. **No** corporate genérico. Era correcto conservar el verde `#1C6B3F` — era el único elemento auténtico de la identidad anterior (pertenece al mark Gustavo/backend).

## 3. Decisiones clave

- **Contenedor 1200px** (plan inicial: 1160px) — se amplió para dar aire al display type editorial. Documentado.
- **Fig. 01 solo con componentes reales**: AIOTEK (Web·Mobile·ERP → APIs REST Node/NestJS + Swagger → Pipeline FTP → PostgreSQL/Sequelize + Redis) y QWAVEE IT (API Gateway → Lambda → S3 + CloudWatch). Google Cloud como banda de "SOPORTE" al pie. `YOU_ARE_HERE` eliminado.
- **AWS = cloud primaria; GCP = soporte real** (Cloud SQL, Pub/Sub, Cloud Monitoring, GKE básico). El resumen del Hero puede decir "AWS · Google Cloud"; figura, Capacidades y chat mantienen el alcance real. Nota `SKILLS_GCP_NOTE` explícita.
- **Línea personal de IA fuera de la figura profesional**: vive en Weather API (chip `GEMINI FLASH 2.5`, cover tipo fascia) y en el callout "Línea de IA" de Capacidades.
- **Covers diferenciados por producto** (ver DESIGN.md "Covers"): sin métricas simuladas, code-native (CSS/SVG), cero imágenes remote.
- **Eliminación de gsap**: `package.json` sin gsap/ScrollTrigger. Un solo hook `lib/use-reveal.ts` (IntersectionObserver) + transiciones CSS. Menos dependencias, más accesible (reduced-motion global), estado final visible sin JS.
- **Nuevo order de página**: Hero → About → Experience → Projects → Skills(Capacidades) → Formación (nuevo, education+certs) → Contact. `#dashboard` desaparece. Cada sección lleva su propio `<section id>` + `scroll-mt-24` + `border-t border-line`.
- **Navbar editorial**: sticky paper/85 blur, scrollspy con `aria-current`, switch ES/EN segmentado (`aria-pressed` + sync de `documentElement.lang`), panel móvil con Escape.
- **Covers de Formación**: experiencia y educación usan las mismas fuentes de datos; se fusiona certificaciones en una sección con columna sticky.
- **Chat**: superficie rediseñada (trigger pill + dialog paper); lógica API íntegra. Persona del prompt y errores de la API ahora en lenguaje natural (fuera el framing de terminal y los `[ERROR]`/`[RATE_LIMIT]`/`[EMPTY_MESSAGE]`).
- **Messages reescritos**: claves humanas; se eliminan `SYS.AUTH`, `HYBRID_EDITION`, `TENURE_MANIFEST`, `AUDIT_LOG`, `SYS.QUERY`, `HERO_SPEC`, etc. (ver diffs de `lib/messages.ts`). `messages.test.ts` reescrito; parity ES/EN de ~83 claves.
- **Buttons**: sistema CTA en `components/ui/cta-classes.ts` (primary/secondary/ghost/text) usado por Hero y Contact. `components/ui/Button.tsx` quedó sin imports verificados y se eliminó (dead code).

## 4. Principios de UX

- **Honestidad**: sin métricas que no sean resultado medido; sin telemetría falsa; la simulación solo donde se declara (chat usa API real, las covers no muestran datos).
- **Jerarquía informativa**: eyebrow mono → display title → contenido. Columnas sticky para sections editoriales.
- **Una sola fuente de datos**: todo el copy vive en `lib/messages.ts` (es/en) y en `data/*`; metadata/JSON-LD/canonical consumen `data/personal.ts`.
- **A11y por construcción**: 1 h1, headings correctos, landmarks, `focus-visible`, skip-link, 44px targets, Escape en menú/dialog, aria-live en chat, reduced-motion global.
- **Responsive real**: mobile-first; la fig. 01 colapsa bajo el masthead; hamburger < lg; tabla-rulers en contacto.

## 5. Estrategia responsive

- **320–375**: display 5xl/4xl, CTA row en stack, facts row wrap, fig. 01 en columna, form/cert rows apilados.
- **768 (tablet)**: fig. 01 y hero en 2 columnas; grid de proyectos 2 col; skills en 2 col.
- **1024–1200**: split 4/8 sticky activo; proyectos featured + offset alternado.
- **1280+ (`xl`)**: nav completo con CTA; contenedor 1200px centrado.

## 6. Motion

- `lib/use-reveal.ts`: IntersectionObserver `data-reveal` en secciones/cards. Transiciones CSS (fade + rise 8-16px). Virtualización cero.
- `prefers-reduced-motion` corta todo (animación, transiciones).
- Underline sweep `.link-sweep` en em'phasis del nombre y links.
- Sin animaciones decorativas continuas (sin pips pulsantes, sin scanlines).

## 7. Rechazado / descartado

- Mantener 1440px frame con inset. → Contenedor editorial único 1200px.
- Covers desde un template único con variantes de color. → Covers code-native diferenciadas por producto.
- Insertar `AI / LLM / Gemini` dentro de la Fig. 01. → Se mantiene separado (Weather card + callout Capacidades).
- Banner/hero con imagen de stock o fotografía. → Sin foto confirmada disponible; tipografía como identidad (puede incorporarse retrato real futuro).
- Animaciones por librería (gsap/ScrollTrigger). → Descartado por dependencia/complexidad; CSS + hook suficiente.
- Badge/grados/chips decorativos. → Solo chips con significado real (categorías, GEMINI FLASH 2.5 de Weather).

## 8. Validación de esta sesión

Ejecutado:
- `npm install` (lockfile sin gsap).
- `npm run lint`: limpio (se corrigió un error `react-hooks/static-components` en Navbar inlinizando el LangSwitch).
- `npm run test`: 44/44 (6 suites).
- `npm run build`: exitoso (routes `/`, `/_not-found`, `/api/chat`, `/robots.txt`, `/sitemap.xml`); TypeScript OK (se corrigió `y`→`y1` en `ArchitectureFigure.tsx` y el tipo de `useLocale` en `SkipLink`).
- A11y de construcción: skip-link agregado (`SkipLink` → `#main`, cliente con locale), 1 h1, landmarks, `focus-visible`, 44px targets, Escape en menú/dialog, reduced-motion global. Metadata alineada a "Backend Engineer" (CV).
- Dead code: eliminado `components/ui/Button.tsx` (0 imports).
- Grep de artefactos viejos en `app/components/lib/data/types`: limpio (`SYS.*`, `HYBRID_EDITION`, `TENURE`, `AUDIT_LOG`, gsap, dashboard, clases del sistema viejo, image/code de projects, data/hero, data/endpoints, minigames).
- HTML compilado inspeccionado: nueva sección presente (Acerca/Experiencia/Proyectos/Capacidades/Formación/Contacto, Fig. 01), skip-link renderizado, y sin strings del sistema viejo.

NO ejecutado (se reporta honestamente como NO validado):
- Screenshots / revisión visual real del navegador (browser MCP no conectado).
- Responsive visual en dispositivos reales (320/375/768/1024/1280 por código revisado, no en navegador).
- Flujo real de streaming del chat con `GROQ_API_KEY` (requiere `.env.local` + navegador).
- Auditoría contrast/lighthouse real.

---

# Addendum — 2026-09-23 · Dirección de arte / imagery

Iteración aprobada sobre el rediseño: incorporar la foto real de Gustavo y fotografía editorial generada para dar presencia humana y diferenciación sin violar honestidad ni el AGENTS.

## Problema detectado
- El rediseño quedó puramente tipográfico en el Hero (sin imagen), con la Fig. 01 puesta ahí como único "asset gráfico"; sobrecargaba al Hero y pintaba la figura como impresora de otra cosa.
- Covers code-native en los 5 proyectos: coherentes pero sin diferenciación de jerarquía entre "estudio co-fundado / producto / proyecto personal IA".
- Sin retrato real: Gustavo requería presencia visual editorial, no avatar circular ni stock.

## Dirección de arte (aprobada)
"Objeto impreso editorial" — universo compartido con la identidad (paper/ink/signal) pero composiciones diferenciadas por pieza: arquitetura en capas, masa monumental impresa, estratos atmosféricos translúcidos, objeto único táctil. **Prohibido** arte literal de tecnología (dashboards, circuitos, servidores, código, laptops, robots, cerebros AI, interfaces, texto/métricas falsos) y stock genérico.
- Hero: **debe llevar imagen** (decisión del owner; se descarta "solo tipografía"). Elegida opción con arte editorial generada (4:5 original; la pieza final del owner quedó 3:2 y el componente se adaptó).
- About: retrato real (`me.webp`) con tratamiento editorial.
- Fig. 01 → pasa a Experiencia como **Fig. 02** (la figura profesional vive donde se explica, no como portada). Hero sin sustituto diagramático.
- Projects: jerarquía por tiers (featured → destacados con imagen → code-native).

## Assets generados / mantenidos
- `portrait.webp` (717×960, ~35KB): derivado con sharp de `me.webp` (896×1200, master intacto). Filtro `grayscale(0.2) sepia(0.05) contrast(1.02)`, `rounded-lg border border-line bg-paper-2`, caption data-only (`name · title`), `PORTRAIT_ALT` es/en.
- `hero.webp` (1200×805, 3:2, ~28KB): generado con RunComfy `google/nano-banana-2` (skill ai-image-generation). Decorative `alt=""`.
- `cover-barking-dogs.webp` (1200×805, ~74KB): placa de estudio generada.
- `cover-weather-api.webp` (1100×821, ~65KB): estratos atmosféricos; overlay chip `GEMINI FLASH 2.5`.
- `cover-watchdog.webp` (1100×821, ~63KB): objeto único táctil.
- JPG masters generados conservados en `public/images/` (`hero.jpg`, `barking-dogs.jpg`, `weather-api.jpg`, `watchdog.jpg`).

## Proceso real (registro)
- Skill `ai-image-generation` instalada (`.agents/skills/`) y CLI `@runcomfy/cli` usado con `RUNCOMFY_TOKEN` del owner (no commiteado).
- Crash de créditos en RunComfy tras 2 generaciones (hero inicial 4:5 + barking): se consultó y **el owner recargó/generó el resto** (`weather-api.jpg`, `watchdog.jpg`, `hero.jpg`)/ajustó y dejó los masters en `public/images/`. El componente Hero se ajustó al ratio definitivo (3:2, 1200×805).
- Optimización a webp con sharp (bundled con Next 16): targets de calidad 82, effort 6, tamaños de render previstos.

## Cambios de código
- `Hero.tsx`: removida Fig. 01; columna derecha = placa editorial (`next/image`, `alt=""`); facts row → líneas de stat editoriales (número + label mono sobre hairline).
- `Experience.tsx` + `components/experience/ArchitectureFigure.tsx` (movido): Fig. 02 al cierre del timeline.
- `About.tsx`: retrato en columna sticky + caption data-only.
- `ProjectCover.tsx`: `next/image` (fill) para bark/weather/watchdog; Sinergy/ClickCore siguen code-native.
- `Projects.tsx`: tiers (featured → [weather, watchdog] con accent signal en Weather → [sinergy, clickcore]).
- `ProjectCard.tsx`: prop `accent`.
- `next.config.ts`: `images.formats: ["image/webp"]`.
- `lib/messages.ts`+test: `FIGURE_CAPTION` renumerada a Fig. 02; clave nueva `PORTRAIT_ALT`.

## Tratamiento / a11y / responsive (por código)
- Alts: hero y covers decorativas (`alt=""`, el nombre está en el markup); retrato informativo (`PORTRAIT_ALT`).
- CLS: hero/retrato con `width/height`; covers con `fill` dentro de contenedores de altura fija.
- Mobile: hero 3:2 al ancho completo; retrato ~80vw; covers mantienen altura de tarjeta; tiers apilan.

## NO validado aún
> **Actualización 2026-09-24:** el owner cierra estos pendientes de validación
> manual; los puntos de abajo pasan a revisión humana del sitio publicado
> (no son tareas del repo). La OG image, en cambio, ya se generó y sirve
> (`.docs/DOC.md`, sesión 2026-09-24).
- ~~Revisión visual real en navegador (browser MCP no disponible) en
  375/768/1024/1280 — pendiente manual (Hero, retrato, featured,
  densidad/whitespace, crop mobile, equilibrio texto/imagen).~~
- ~~Calidad estética final de las piezas generadas (el agente no puede
  inspeccionar imágenes; el owner decide).~~
- ~~OG image: no generada en esta iteración (diferido a pedido explícito).~~ →
  Resuelta: `app/opengraph-image.tsx` sirve 200 `image/png` 1200×630.