# EVAL_REPORT — Chat scope (gate + router)

> Iteración: cerrada · Fecha: 2026-09-24 · Estado: **DEFINITIVO — la matriz
> completa y el judge quedan cancelados por decisión del owner (2026-09-24);
> la evidencia parcial documentada aquí es el resultado final.**

## Resumen ejecutivo
- **Objetivo 7/7 gate-check pasa (definitivo).** Scope preciso determinista: el
  gate decide `out`/`skip` sin router para los OOS/FP del corpus → la matriz
  de scope no depende de TPM (matriz `post_scope.json`: 80/80 correctos en la
  muestra reanudada, incluye 20 gated OOS/FP).
- **Regresión de calidad del router (in-scope): CANCELADA por el owner.** El
  judge no se completó por límite de TPM del plan gratuito de Groq y el owner
  decidió no reanudar. Solo el scope (determinista) quedó validado, y es
  definitivo.

## Lo que SÍ se validó
| Área | Resultado |
|---|---|
| `npm run lint` | limpio |
| `npm run test` | 47/47 (incluye gate 7/7) |
| `npm run build` | OK |
| Server `:3456` GET `/` y `GET /images/portrait.webp` | HTTP 200 |
| Matriz scope parcial (post gate) | 80/80 correctos (en muestra con OOS+FP gated) |
| Gate unitario | 7/7 |

## Lo que NO se pudo validar (cancelado por el owner)
- **Matriz completa 160/160: CANCELADA (2026-09-24).** El plan limita TPM
  (TPM 8000 openai/gpt-oss-20b); el corpus 160 exige ~135 llamadas router y con
  pace necesario (>7s) superaba el tiempo de sesión. El harness quedó
  `partial: true` reanudable, pero el owner decidió cerrar sin reanudar. La
  muestra validada es `post_scope.json` (80/80).
- **Regresión de calidad (judge): CANCELADA (2026-09-24).** El harness juzga
  con GROQ (judge model) pero no se ejecutó completo; el baseline numérico
  previo (147/160) quedó **descartado** por ruido de TPM (429 → fallback
  predeterminado "in" correcto por casualidad, no por clasificación real), por
  lo que **no hay comparación confiable "antes/después"**. Esa comparación no
  se realizará.
- **Nueva característica (weather decoys → out)**: se agregó el patrón
  determinista de clima/pronóstico al gate, con tests (`gate.test.ts` 7/7) y
  se verificó `OOS-4/11/FP-1` → out en probes. EAR extra de estabilidad
  (3×8 casos borde) corrió 30/30 correcto en la última iteración.

## Reanudación — ANULADA
- ~~Para completar la matriz: correr el comando de arriba~~ (cancelado por el
  owner 2026-09-24; el harness `run.mjs` se conserva como referencia, no como
  tarea abierta).
- ~~Para calidad: `--only-gen --gen 12` + `--judge 12`~~ (cancelado; requiere
  GROQ_API_KEY/TPM y el owner decidió cerrar).
