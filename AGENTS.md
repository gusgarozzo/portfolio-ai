# Portfolio — Gustavo Garozzo
Portfolio personal de Gustavo Garozzo, Desarrollador Backend Ssr. especializado en Node.js, NestJS y AWS. Sitio estático con Next.js orientado a reclutadores y equipos técnicos.

## Stack
- **Lenguaje:** TypeScript estricto (`strict: true`, sin `any` sin justificación)
- **Framework / runtime:** Next.js 15 (App Router) + Node 20
- **Estilos:** Tailwind CSS v4
- **Tests:** Vitest + Testing Library
- **Linting / formato:** ESLint + Prettier
- **Deploy:** Vercel

## Comandos
- `npm run dev` — arranca el servidor en local (http://localhost:3000)
- `npm run test` — ejecuta los tests con Vitest (deben pasar antes de cada commit)
- `npm run lint` — revisa el estilo con ESLint (antes de cada PR)
- `npm run build` — compila para producción
- `npm run preview` — sirve el build de producción en local

## Estructura del proyecto
- `app/` — rutas y layouts de Next.js (App Router); una carpeta por sección si se necesita
- `components/` — componentes reutilizables organizados por sección (`hero/`, `experience/`, `projects/`, `skills/`, `certifications/`, `contact/`)
- `components/ui/` — componentes genéricos sin lógica de negocio (Button, Card, Badge, SectionTitle, etc.)
- `data/` — contenido estático del portfolio en archivos `.ts` (experiencia, proyectos, skills, certificaciones); es la única fuente de verdad
- `public/` — assets estáticos (imágenes, favicon, og-image)
- `lib/` — utilidades puras y helpers (sin side effects)
- `types/` — tipos e interfaces globales compartidos entre componentes y data

## Convenciones
- **Nombres de archivos:** `kebab-case` para archivos y carpetas; `PascalCase` para componentes React.
- **Nombres de variables y funciones:** `camelCase`.
- **Componentes:** un componente por archivo; el archivo lleva el mismo nombre que el componente exportado.
- **Datos del portfolio:** todo el contenido (textos, fechas, links) vive en `data/`; los componentes solo consumen, nunca hardcodean strings propios.
- **Tipos:** definir tipos e interfaces en `types/` cuando se comparten entre más de un archivo; si son locales al componente, definirlos en el mismo archivo.
- **Tests:** al lado del archivo que testean — `foo.ts` + `foo.test.ts`. Solo testear lógica no trivial (utilidades en `lib/`, transformaciones de datos); no testear componentes puramente visuales.
- **Estilos:** solo Tailwind CSS; no escribir CSS custom salvo casos excepcionales justificados en comentario.
- **Imágenes:** usar siempre el componente `<Image>` de Next.js con `alt` descriptivo.
- **Accesibilidad:** todo elemento interactivo debe ser navegable por teclado y tener label semántico.

## No hagas
- No usar `any` en TypeScript sin un comentario que explique por qué.
- No hardcodear textos, fechas ni links dentro de los componentes; todo va en `data/`.
- No instalar dependencias nuevas sin consultarme primero.
- No crear lógica de negocio dentro de los componentes; extraerla a `lib/`.
- No subir archivos `.env*` al repositorio; usar `.env.example` como referencia.
- No modificar la configuración de Vercel (`vercel.json`) sin avisarme.
- No romper el build: `npm run build` debe completar sin errores ni warnings de TypeScript.

## Flujo de trabajo
- Antes de una tarea no trivial (nuevo componente, refactor, nueva sección), proponé un plan con la estructura de archivos que vas a tocar y esperá mi OK.
- Una tarea a la vez; al terminar, decime exactamente qué archivos creaste o modificaste para que lo revise.
- Si no estás seguro al 80% de algo (estructura, nombre, comportamiento esperado), preguntá. No inventes ni asumas.
- Cada sección nueva debe verse bien en mobile (375px) y desktop (1280px) antes de darse por terminada.

## Diseño
- Antes de crear o modificar cualquier componente visual, leer `/mnt/skills/public/frontend-design/SKILL.md` y seguir sus lineamientos de tokens, tipografía y layout.
- El diseño del portfolio está definido en `DESIGN.md` (en la raíz del proyecto); es la referencia de autoridad para colores, espaciados, componentes y decisiones visuales. Ante cualquier duda de diseño, consultar ahí primero.
- No inventar estilos, paletas ni decisiones visuales que no estén en `DESIGN.md` o en el skill de frontend-design.

## MCP y herramientas conectadas
- Usar los MCP configurados en el entorno cuando la tarea lo requiera (acceso a archivos en Google Drive, etc.).
- Antes de buscar en la web algo que podría estar en los archivos del proyecto o en Google Drive, intentar primero con las herramientas internas disponibles.
- No asumir que un MCP no está disponible sin intentar usarlo primero.

## Documentación de sesión
- Al finalizar cada sesión de trabajo, documentar todo lo realizado en `/.docs/doc.md`.
- El registro debe incluir: fecha y hora, tareas completadas, archivos creados o modificados, decisiones técnicas tomadas y cualquier punto pendiente para la próxima sesión.
- Si el archivo ya existe, agregar una nueva entrada al principio (orden cronológico inverso), sin borrar el historial anterior.
- Formato de cada entrada:

```markdown
## Sesión — [fecha y hora]
### Tareas completadas
- ...
### Archivos creados / modificados
- ...
### Decisiones técnicas
- ...
### Pendientes
- ...
```

## Referencias y documentación
- Contenido y datos del portfolio: `data/DATA.md` (fuente de verdad)
- Guía de diseño del proyecto: `DESIGN.md`
- Skill de diseño frontend: `/mnt/skills/public/frontend-design/SKILL.md`
- Referencia de componentes de Next.js: https://nextjs.org/docs
- Referencia de Tailwind CSS v4: https://tailwindcss.com/docs
- Referencia de Vitest: https://vitest.dev/
- Deploy en Vercel: https://vercel.com/docs/frameworks/nextjs