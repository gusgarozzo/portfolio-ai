# Auditoría final de producción

Fecha: 2026-09-22 · Estado: cambios de cierre aplicados; quedan solo verificaciones manuales con entorno / post-deploy. Nada incluido en la sección 3 está declarado validado hasta probarse de verdad.

Contexto: Batches 1–4 de pulido + cierre (decisiones finales 2026-09-22) completos y validados (lint, tests, build). Este documento reúne lo resuelto y la checklist de validación manual que requiere entorno (key, dominio, imágenes o navegador real).

---

## 1. Validación automatizada (hecho)

- `npm run lint`: limpio.
- `npm run test`: 44/44 (6 suites) tras el cierre.
- `npm run build`: exitoso; rutas `/robots.txt` y `/sitemap.xml` estáticas generadas.
- HTML prerenderizado verificado: título, `lang="es"`, description, `canonical` = `https://gustavo-garozzo.vercel.app`, `og:url`, `twitter:card=summary` (sin recursos inventados), JSON-LD `Person` consistente con `data/personal`.
- Snapshot de accesibilidad: 1 h1, h2 únicos por sección, h3 solo dentro de tarjetas, anclas de navegación resuelven, sin metadata duplicada.

## 2. Decisiones de cierre (aplicadas)

1. **LinkedIn canónico → resuelto.**
   - Fuente única: `data/personal.ts` → `linkedin: "https://www.linkedin.com/in/gusgarozzo/"`.
   - Hero, Footer, Contact, JSON-LD `sameAs`, `build-cv-context` y tests consumen esa fuente o el fixture actualizado. Coincide con el CV (`linkedin.com/in/gusgarozzo`).
   - Verificado por grep: no queda ninguna URL de LinkedIn `gustavogarozzo` (fuera de registros históricos en `.docs/`).
2. **Dominio de producción → confirmado tal cual.**
   - `NEXT_PUBLIC_SITE_URL=https://gustavo-garozzo.vercel.app` (sin cambio). Alimenta canonical, OG url, sitemap, robots y el origin-check del chat.
3. **Métricas de proyectos → eliminadas.**
   - Clasificación aplicada: todas eran dato histórico sin método documentado (ninguna con fuente reproducible anclada a un reporte/commit). No se presentan como métricas objetivas.
   - Eliminados los bloques `metrics` de `data/projects.ts` (es/en × 5 proyectos), los tipos `LighthouseMetrics`, `Subproject`, `ProjectMetric` y los campos `metrics`/`subprojects`, el render de la tabla en `Projects.tsx` y el loop en `lib/build-cv-context.ts`.
   - Se conservan descripciones cualitativas ("enfoque en rendimiento, SEO") y `highlights`.
4. **Footer `VER: 4.2.0-STABLE` → eliminado.**
   - Se quitó de `lib/messages.ts` (clave `VER`), de `Footer.tsx` y del array de claves del test. `DESIGN.md` actualizado en consecuencia.
5. **Imagen OG / Twitter image.**
   - No existen assets. Se publicó `twitter:card=summary` sin `twitter:image` ni `og:image`, adrede (no se inventan recursos). Opcional: generar portada real y referenciarla.
6. **Handle de Twitter/X.**
   - No confirmado; no se agregó para no inventar.

## 3. Checklist de validación manual final (NO validado aún)

Pendiente de ejecutar en entorno real; ninguno de estos puntos está declarado verificado.

> **Actualización 2026-09-24:** esta checklist se cierra por decisión del owner.
> Lo verificable en esta iteración ya se validó (ver más abajo); el resto pasa
> a revisión humana del sitio desplegado, no a tareas del repo.

Puntos ya validados en el cierre (09-2024):
- **Streaming real del chat con `GROQ_API_KEY`.** ✅ `/api/chat` 200 con
  respuesta real del LLM (origin localhost y producción) en `:3456`.
- **CI después del push.** ✅ Workflow `CI` en `7f9d94c`: completed / success
  (lint + tests + build en GitHub Actions).
- **Origin-check del chat.** ✅ Coincide con `NEXT_PUBLIC_SITE_URL`; 403 solo
  sin origin o con origin ajeno.

Puntos que pasan a revisión humana del sitio publicado (no bloqueantes):
1. **Matriz de preguntas ES/EN.**
   - Perfil, experiencia, Aiotek, Qwavee, Barking Dogs, Sinergy, WatchDog, ClickCore, Weather API, tecnologías, cloud, bases de datos, arquitectura, AI Engineering, estudios, certificaciones, proyectos, contacto y búsqueda laboral.
2. **Fallback del chat.**
   - Preguntas fuera de los datos del perfil: debe responder sin inventar, en es y en.
3. **Toggle ES/EN y `document.documentElement.lang`.**
   - Al cambiar idioma: contenido completo cambia y `document.documentElement.lang` se actualiza a `es`/`en`.
4. **Responsive 375px / desktop.**
   - Hero con system map, nav (menú mobile), chat, project cards, skills, contacto y footer.
5. **Revisión visual.**
   - Screenshots: mapa del Hero, legibilidad, contraste, composición, jerarquía.

## 4. Despliegue / infraestructura

1. **CI en remoto**: el push ejecuta GitHub Actions (ci.yml). Validar en GitHub el lint + tests + build tras el push.
2. **Origin-check del chat**: el backend valida el origen contra `NEXT_PUBLIC_SITE_URL`; debe coincidir con el dominio donde esté desplegado.
3. **Nota del entorno local (no del proyecto)**: `localhost:3000` del WSL está ocupado por `node dist/main` (backend del entorno, root). La app local corre por interop Windows en `http://localhost:4000`. No afecta el producto.

## 5. Pendientes funcionales planificados (no bloqueantes)

- Google Analytics/Lighthouse/Insights: si se agregan, requiere verificación de custodia; hasta entonces el SEO se apoya en metadata + JSON-LD + sitemap/robots, sin scripts de analytics.