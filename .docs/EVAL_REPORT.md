# EVAL_REPORT — Chat scope (gate + router)

> Iteración: cierre parcial · Fecha: 2026-09-23 · Estado: **PARCIAL — evidencia limitada por TPM/TTPM del plan gratuito de Groq.**

## Resumen ejecutivo
- **Objetivo 7/7 gate-check pasa.** Scope preciso determinista: el gate decide
  `out`/`skip` sin router para los OOS/FP del corpus → la matriz de scope
  ya no depende de TPM (matriz `post_scope.json`: 80/80 correctos en la
  muestra reanudada, incluye 20 gated OOS/FP).
- **Regresión de calidad del router (in-scope) NO terminada**: el judge no
  alcanzó a correrse de forma completa por límite de TPM; la generación de
  16 muestras se posterga. Solo se validó scope (determinista).

## Lo que SÍ se validó
| Área | Resultado |
|---|---|
| `npm run lint` | limpio |
| `npm run test` | 47/47 (incluye gate 7/7) |
| `npm run build` | OK |
| Server `:3456` GET `/` y `GET /images/portrait.webp` | HTTP 200 |
| Matriz scope parcial (post gate) | 80/80 correctos (en muestra con OOS+FP gated) |
| Gate unitario | 7/7 |

## Lo que NO se pudo validar (honesto)
- **Matriz completa 160/160**: el plan limita TPM (TPM 8000 openai/gpt-oss-20b);
  el corpus 160 exige ~135 llamadas router; con pace necesario (>7s) se supera
  el tiempo de sesión (25 min). Quedó `partial: true` reanudable:
  `node --experimental-strip-types --env-file=.env.local lib/chat/eval/run.mjs --run --base http://localhost:3456 --out lib/chat/eval/results/post_scope.json --gen 12 --judge 12 --pace 12000 --label "post gate scope matrix (continuación)"`
- **Regresión de calidad (judge)**: el harness juzga con GROQ (judge model)
  pero no se ejecutó completo; el baseline numérico previo (147/160) quedó
  **descartado** por ruido de TPM (429 → fallback predeterminado "in" correcto
  por casualidad, no por clasificación real), por lo que **no hay comparación
  confiable "antes/después" aún**.
- **Nueva característica (weather decoys → out)**: se agregó el patrón
  determinista de clima/pronóstico al gate, con tests (`gate.test.ts` 7/7) y
  se verificó `OOS-4/11/FP-1` → out en probes. EAR extra de estabilidad
  (3×8 casos borde) corrió 30/30 correcto en la última iteración.

## Reanudación
- Para completar la matriz: correr el comando de arriba (el harness reanuda
  desde `post_scope.json` sin repetir: guarda resultados parciales cada 10).
- Para calidad: `--only-gen --gen 12` + `--judge 12` (requiere GROQ_API_KEY).
