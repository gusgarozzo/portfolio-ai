// Portfolio chat evaluation harness.
//
// Usage:
//   node --experimental-strip-types --env-file=.env.local lib/chat/eval/run.mjs --run       --base http://localhost:3456 --out lib/chat/eval/results/post.json --judge 20
//   node --experimental-strip-types --env-file=.env.local lib/chat/eval/run.mjs --compare  lib/chat/eval/results/baseline.json lib/chat/eval/results/post.json --out EVAL_REPORT.md
//
// The harness reuses the same data/*.ts modules used by the app (single source).
// It bypasses the per-IP rate limiter by sending a unique x-forwarded-for per request,
// and honors the origin check by sending the Origin header when NEXT_PUBLIC_SITE_URL is set.

import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { cases } from "./corpus.mjs";
import { personal } from "../../../data/personal.ts";
import { summary as summaryData } from "../../../data/summary.ts";
import { experience } from "../../../data/experience.ts";
import { projects } from "../../../data/projects.ts";
import { skills } from "../../../data/skills.ts";
import { certifications } from "../../../data/certifications.ts";
import { education } from "../../../data/education.ts";
import { aboutMe } from "../../../data/about-me.ts";

// ---- localized markers (keys live in lib/messages.ts; mirrored here for the harness only) ----
const MARKERS = {
  OUT: [
    "Solo puedo responder preguntas sobre el perfil profesional de Gustavo Garozzo.",
    "I can only answer questions about Gustavo Garozzo's professional profile.",
  ],
  EMPTY: [
    "Escribí una pregunta sobre Gustavo Garozzo.",
    "Please write a question about Gustavo Garozzo.",
  ],
  BLOCKED: ["Esa consulta no puede procesarse.", "That request can't be processed."],
  UNCONFIGURED: [
    "El servicio de IA aún no está configurado.",
    "The AI service is not configured yet.",
  ],
  ERROR: [
    "No pude procesar la consulta. Intentá de nuevo.",
    "I couldn't process that. Please try again.",
    "The AI service is unavailable. Please try again later.",
    "Internal server error. Please try again.",
    "The AI service is not configured yet.",
  ],
};

function buildLocaleSection(locale) {
  const p = personal[locale];
  const exp = experience[locale] ?? [];
  const proj = projects[locale] ?? [];
  const sk = skills[locale];
  const certs = certifications[locale] ?? [];
  const edu = education[locale] ?? [];
  const about = aboutMe[locale] ?? "";

  const lines = [];
  lines.push(`--- ${locale.toUpperCase()} ---`, "");
  lines.push(`Name: ${p.name}`, `Title: ${p.title}`, `Location: ${p.location}`, `Email: ${p.email}`, `Cv: ${p.cvUrl}`, `Open to: ${p.openTo}`, "");
  lines.push("Contact:", `  Email: ${p.email}`, `  Phone: ${p.phone}`, `  LinkedIn: ${p.linkedin}`, `  GitHub: ${p.github}`, "");
  lines.push("About:", about, "");
  lines.push("Summary:", (summaryData[locale] ?? "").trim(), "");
  lines.push("Experience:");
  for (const e of exp) {
    lines.push(`  ${e.role} @ ${e.company} (${e.period})`);
    for (const h of e.highlights) lines.push(`    - ${h}`);
  }
  lines.push("");
  lines.push("Projects:");
  for (const pr of proj) {
    lines.push(`  ${pr.name} (${pr.subtitle}) — ${pr.role}`);
    lines.push(`    Category: ${pr.category}`);
    lines.push(`    Stack: ${pr.stack.join(", ")}`);
    lines.push(`    Description: ${pr.description}`);
    for (const h of pr.highlights ?? []) lines.push(`    Highlight: ${h}`);
  }
  lines.push("");
  lines.push("Skills:");
  lines.push("  Skill tiers: CORE = primary professional experience; SUPPORTING = narrower but real scope; LEARNING = conceptual/training, NOT professional experience; AI = line in development, NOT senior AI expertise.");
  lines.push(`  Core: ${sk.core.join(", ")}`);
  lines.push(`  Supporting: ${sk.supporting.join(", ")}`);
  lines.push(`  Learning / conceptual: ${sk.learning.join(", ")}`);
  lines.push(`  AI Engineering (in development): ${sk.ai.join(", ")}`, "");
  lines.push("Certifications:");
  for (const c of certs) lines.push(`  ${c.name} — ${c.issuer} (${c.year})`);
  lines.push("");
  lines.push("Education:");
  for (const e of edu) {
    lines.push(`  ${e.title} — ${e.institution}`);
    if (e.period) lines.push(`    Period: ${e.period}`);
    if (e.note) lines.push(`    Note: ${e.note}`);
  }
  lines.push("");
  return lines.join("\n");
}

function buildCvContext(locale) {
  return locale === "es" || locale === "en"
    ? buildLocaleSection(locale)
    : `${buildLocaleSection("es")}\n${buildLocaleSection("en")}`;
}

function guessLanguage(text) {
  const es = ["¿", "á", "é", "í", "ó", "ú", "ñ", "qué", "cómo", "sobre", "solo", "puedo", "tus", "proyectos", "perfil", "tengo", "trabajé"];
  const en = ["the", "and", "about", "with", "my", "your", "have", "you", "only", "can", "answer", "experience", "questions"];
  const low = text.toLowerCase();
  let score = 0;
  for (const w of es) if (low.includes(w)) score += 1;
  for (const w of en) if (low.includes(w)) score -= 1;
  return score >= 0 ? "es" : "en";
}

function classifyReply(status, ctype, body, scopeHeader) {
  if (scopeHeader && ["in", "out"].includes(scopeHeader)) {
    return { actual: scopeHeader, reply: ctype.startsWith("text/plain") ? body : (() => { try { return JSON.parse(body).reply ?? body; } catch { return body; } })() };
  }
  if (status >= 400 && status !== 429 && !body) return { actual: "error", reply: "" };
  if (ctype.startsWith("text/plain")) return { actual: "in", reply: body };

  let reply = "";
  try {
    const json = JSON.parse(body);
    reply = String(json.reply ?? "");
  } catch {
    reply = body;
  }

  if (status === 429) return { actual: "rate-limited", reply };
  for (const m of MARKERS.OUT) if (reply.includes(m)) return { actual: "out", reply };
  for (const m of MARKERS.EMPTY) if (reply.includes(m)) return { actual: "empty", reply };
  for (const m of MARKERS.BLOCKED) if (reply.includes(m)) return { actual: "blocked", reply };
  for (const m of MARKERS.UNCONFIGURED) if (reply.includes(m)) return { actual: "unconfigured", reply };
  for (const m of MARKERS.ERROR) if (reply.includes(m)) return { actual: "error", reply };
  if (status >= 400) return { actual: "error", reply };
  return { actual: "other", reply };
}

async function runCase(idx, c, base, headers) {
  const url = `${base.replace(/\/$/, "")}/api/chat`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ message: c.text, history: [] }),
    signal: AbortSignal.timeout(120000),
  });
  const body = await res.text();
  const ctype = res.headers.get("content-type") ?? res.headers.get("Content-Type") ?? "";
  const scopeHeader = res.headers.get("x-chat-scope") ?? res.headers.get("X-Chat-Scope") ?? "";
  const intentHeader = res.headers.get("x-chat-intent") ?? res.headers.get("X-Chat-Intent") ?? "";
  const { actual, reply } = classifyReply(res.status, ctype, body, scopeHeader);
  const ok = actual === (c.expect === "in" ? "in" : "out");
  return {
    id: c.id,
    intent: c.intent,
    category: c.category,
    lang: c.lang,
    expect: c.expect,
    actual,
    ok,
    scope: actual === "in" ? "in" : actual,
    intentTag: intentHeader,
    reply: actual === "in" ? body.slice(0, 500) : reply.slice(0, 200),
    responseLang: actual === "in" ? guessLanguage(body) : null,
    status: res.status,
    note: c.note ?? "",
  };
}

async function judge(id, q, reply, cv, apiKey) {
  const prompt = `You are a strict evaluator of answers from Gustavo's portfolio assistant.

CV FACT SHEET (ground truth):
<CV>
${cv}
</CV>

Evaluate the assistant's reply to the visitor question.

Question: """${q}"""
Assistant reply: """${reply}"""

Respond ONLY with JSON:
{"grounded":true|false,"hallucinates":true|false,"langMatch":true|false,"truncated":true|false,"onTopic":true|false,"severity":0|1|2,"evidence":"short"}

Rules:
- grounded: the reply stays within the fact sheet (it may mention things like "not in the CV" honestly).
- hallucinates: YES if it invents metrics, employers, clients, dates, certifications, responsibilities, or a technology as professional experience when the sheet says LEARNING/AI (development).
- onTopic: the reply answers the question instead of evading.
- langMatch: reply language matches the question language.
- severity 0 perfect, 1 minor roughness/omission, 2 any hallucination, off-topic answer, or wrong language.`;
  let res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.GROQ_JUDGE_MODEL ?? process.env.GROQ_MODEL ?? "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: `Question: ${q}\n\nReply: ${reply}` },
      ],
      temperature: 0,
      max_tokens: 300,
      stream: false,
      response_format: { type: "json_object" },
    }),
    signal: AbortSignal.timeout(90000),
  });
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 6000));
    res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.GROQ_JUDGE_MODEL ?? process.env.GROQ_MODEL ?? "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: `Question: ${q}\n\nReply: ${reply}` },
        ],
        temperature: 0,
        max_tokens: 300,
        stream: false,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(90000),
    });
  }
  if (!res.ok) return { judgeError: `${res.status}` };
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content ?? "";
  try {
    const start = text.indexOf("{");
    return JSON.parse(text.slice(start, text.lastIndexOf("}") + 1));
  } catch {
    return { judgeError: "unparseable" };
  }
}

function printSummary(results) {
  const total = results.length;
  const correct = results.filter((r) => r.ok).length;
  const byActual = {};
  for (const r of results) byActual[r.actual] = (byActual[r.actual] ?? 0) + 1;
  const byCategory = {};
  for (const r of results) byCategory[r.category] = (byCategory[r.category] ?? 0) + 1;
  const failed = results.filter((r) => !r.ok);
  console.log(`\n=== RESULTADOS (${total} cases) ===`);
  console.log(`Correct scope: ${correct}/${total} (${((correct / total) * 100).toFixed(1)}%)`);
  console.log(`By actual: ${JSON.stringify(byActual)}`);
  console.log(`By category: ${JSON.stringify(byCategory)}`);
  if (failed.length) {
    console.log("\nFAILED:");
    for (const f of failed) console.log(`  ${f.id} [${f.intent}/${f.lang}] expect=${f.expect} got=${f.actual} :: ${f.note} :: ${f.reply.slice(0, 90)}`);
  }
}

function runSubcommand({ base, out, judgeN, genN, pace, label, onlyGen }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const headers = {};
  if (siteUrl) headers.Origin = siteUrl;
  const apiKey = process.env.GROQ_API_KEY;

  // Determine which cases get a REAL generator answer (no scope-only) so they can be judged.
  const genSet = new Set();
  if (genN > 0) {
    const inScope = cases.filter((c) => c.expect === "in");
    const es = inScope.filter((c) => c.lang === "es");
    const en = inScope.filter((c) => c.lang === "en");
    const wantEs = Math.min(es.length, Math.ceil(genN / 2));
    for (const c of [...es.slice(0, wantEs), ...en.slice(0, genN - wantEs)]) genSet.add(c.id);
  }

  const toRun = onlyGen ? cases.filter((c) => genSet.has(c.id)) : cases;

return (async () => {
  const results = [];
  let i = 0;
  let resumeFromFile = false;
  if (out && existsSync(out)) {
    try {
      const prev = JSON.parse(readFileSync(out, "utf8"));
      if (prev?.partial === true) {
        for (const r of prev?.results ?? []) results.push(r);
        resumeFromFile = true;
      }
    } catch {
      resumeFromFile = false;
    }
  }
  const doneIds = new Set(results.map((r) => r.id));
  const todo = resumeFromFile ? toRun.filter((c) => !doneIds.has(c.id)) : toRun;
  i = results.length;
  const totalRun = todo.length + results.length;
    const save = (judgeResults = []) => {
      if (!out) return;
      const partial = {
        label: label ?? "run",
        base,
        ts: new Date().toISOString(),
        siteUrl: siteUrl ?? null,
        gen: genN,
        judge: judgeN,
        partial: true,
        total: results.length,
        correctScope: results.filter((r) => r.ok).length,
        byActual: {},
        results: [...results],
        judge: [...judgeResults],
      };
      for (const r of results) partial.byActual[r.actual] = (partial.byActual[r.actual] ?? 0) + 1;
      mkdirSync(dirname(resolve(out)), { recursive: true });
      writeFileSync(out, JSON.stringify(partial, null, 2));
    };
    for (const c of todo) {
      headers["x-forwarded-for"] = `172.16.${Math.floor(i / 200)}.${(i % 200) + 1}`;
      if (genSet.has(c.id)) {
        delete headers["x-chat-scope-only"];
      } else {
        headers["x-chat-scope-only"] = "1";
      }
      i += 1;
      try {
        const r = await runCase(i, c, base, headers);
        results.push(r);
        process.stdout.write(`[${i}/${totalRun}] ${c.id} ${c.intent}/${c.lang} -> ${r.actual} ${r.ok ? "OK" : "FAIL"}\n`);
      } catch (err) {
        results.push({ id: c.id, intent: c.intent, category: c.category, lang: c.lang, expect: c.expect, actual: "request-error", ok: false, reply: `ERR ${err.message}`.slice(0, 200), note: c.note ?? "" });
        process.stdout.write(`[${i}/${totalRun}] ${c.id} REQUEST-ERROR ${err.message}\n`);
      }
      if (i % 10 === 0) save();
      if (pace > 0) await new Promise((r2) => setTimeout(r2, pace));
    }

    const judgeResults = [];
    let judged = 0;
    if (judgeN > 0 && apiKey) {
      const generated = results.filter((r) => genSet.has(r.id) && r.actual === "in");
      const sample = generated.slice(0, judgeN);
      for (const r of sample) {
        judged += 1;
        const corpusCase = cases.find((c2) => c2.id === r.id);
        const localeContext = buildCvContext(corpusCase?.lang === "en" ? "en" : "es");
        try {
          const v = await judge(r.id, corpusCase.text, r.reply, localeContext, apiKey);
          judgeResults.push({ id: r.id, intent: r.intent, lang: r.lang, ...v });
          process.stdout.write(`[judge ${judged}/${sample.length}] ${r.id} severity=${v.severity ?? "?"} grounded=${v.grounded ?? "?"}\n`);
        } catch (err) {
          judgeResults.push({ id: r.id, intent: r.intent, lang: r.lang, judgeError: `exception ${err.message}` });
        }
        if (pace > 0) await new Promise((r2) => setTimeout(r2, pace));
      }
    } else if (judgeN > 0) {
      console.log("Judge skipped: GROQ_API_KEY not set in env-file.");
    }

    const payload = {
      label: label ?? "run",
      base,
      ts: new Date().toISOString(),
      siteUrl: siteUrl ?? null,
      gen: genN,
      judge: judgeN,
      total: results.length,
      correctScope: results.filter((r) => r.ok).length,
      byActual: {},
      results,
      judge: judgeResults,
    };
    for (const r of results) payload.byActual[r.actual] = (payload.byActual[r.actual] ?? 0) + 1;

    if (out) {
      mkdirSync(dirname(resolve(out)), { recursive: true });
      writeFileSync(out, JSON.stringify(payload, null, 2));
      console.log(`\nWrote ${out}`);
    }
    printSummary(results);
    return payload;
  })();
}

function compareSubcommand(files, out) {
  const baseline = JSON.parse(readFileSync(files[0], "utf8"));
  const post = JSON.parse(readFileSync(files[1], "utf8"));

  const summaryRow = (r) => (r.actual === (r.expect === "in" ? "in" : "out"));
  const postMap = new Map(post.results.map((r) => [r.id, r]));

  const lines = [];
  lines.push("# EVAL_REPORT — Chat del portfolio");
  lines.push("");
  lines.push(`Generado: ${new Date().toISOString()}`);
  lines.push(`Baseline: ${baseline.label ?? "?"} @ ${baseline.base} (${baseline.ts})`);
  lines.push(`Post-refactor: ${post.label ?? "?"} @ ${post.base} (${post.ts})`);
  if (baseline.siteUrl) lines.push(`Origin (NEXT_PUBLIC_SITE_URL): ${baseline.siteUrl}`);
  lines.push("");

  lines.push("## Resumen de alcance (scope)");
  lines.push("");
  lines.push("| Métrica | Baseline | Post |");
  lines.push("|---|---|---|");
  const baseCorrect = baseline.results.filter(summaryRow).length;
  const postCorrect = post.results.filter(summaryRow).length;
  lines.push(`| Casos totales | ${baseline.total} | ${post.total} |`);
  lines.push(`| Clasificación de alcance correcta | ${baseCorrect} (${((baseCorrect / baseline.total) * 100).toFixed(1)}%) | ${postCorrect} (${((postCorrect / post.total) * 100).toFixed(1)}%) |`);
  for (const key of Object.keys({ ...baseline.byActual, ...post.byActual })) {
    lines.push(`| Respuestas "${key}" | ${baseline.byActual[key] ?? 0} | ${post.byActual[key] ?? 0} |`);
  }
  lines.push("");

  lines.push("## Matriz de cobertura por intent");
  lines.push("");
  lines.push("| Intent | ES (√/n) | EN (√/n) | OOS/decoys (√/n) | Amb/typo/comb/part/ind (√/n) | Baseline fallos | Post fallos |");
  lines.push("|---|---|---|---|---|---|---|");

  const intents = Array.from(new Set([...baseline.results, ...post.results].map((r) => r.intent))).sort();
  const SPECIAL_CATEGORIES = new Set(["false-positives", "ambiguous", "typos", "combined", "partial", "indirect", "regression-weather"]);
  for (const intent of intents) {
    const bs = baseline.results.filter((r) => r.intent === intent);
    const ps = post.results.filter((r) => r.intent === intent);
    const count = (arr, bucket) => {
      const list = arr.filter((r) => (r.expect === "out" ? bucket === "out" : bucket === (r.lang === "en" ? "en" : "es")));
      const ok = list.filter(summaryRow).length;
      return `${ok}/${list.length}`;
    };
    const specialStr = (arr) => {
      const list = arr.filter((r) => SPECIAL_CATEGORIES.has(r.category));
      const ok = list.filter(summaryRow).length;
      return `${ok}/${list.length}`;
    };
    const baseFail = bs.filter((r) => !summaryRow(r)).map((r) => r.id).join(", ") || "–";
    const postFail = ps.filter((r) => !summaryRow(r)).map((r) => r.id).join(", ") || "–";
    lines.push(`| ${intent} | ${count(ps, "es")} | ${count(ps, "en")} | ${count(ps, "out")} | ${specialStr(ps)} | ${baseFail} | ${postFail} |`);
  }
  lines.push("");

  lines.push("## Cambios de resultado por caso (baseline → post)");
  lines.push("");
  lines.push("| ID | Intent | Lang | Expect | Baseline | Post | Mejora |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const b of baseline.results) {
    const p = postMap.get(b.id) ?? b;
    const bOk = summaryRow(b);
    const pOk = summaryRow(p);
    const arrow = bOk === pOk ? (bOk ? "=" : "=") : pOk && !bOk ? "✓ mejora" : "✗ regresión";
    if (bOk !== pOk || arrow === "✓ mejora") {
      lines.push(`| ${b.id} | ${b.intent} | ${b.lang} | ${b.expect} | ${b.actual} | ${p.actual} | ${arrow} |`);
    }
  }
  lines.push("");

  // Judge section (post).
  const judged = post.judge ?? [];
  if (judged.length) {
    lines.push("## E2E LLM-as-judge (post-refactor, respuestas reales)");
    lines.push("");
    lines.push("Rúbrica: grounded (dentro del CV), hallucinates (inventa datos/metricas/roles), langMatch (responde en el idioma de la pregunta), trunc (corte prematuro), onTopic (responde la pregunta), severity 0/1/2.");
    lines.push("");
    lines.push("| ID | Intent | Lang | grounded | hallucinates | langMatch | truncated | onTopic | severity | evidencia |");
    lines.push("|---|---|---|---|---|---|---|---|---|---|");
    for (const j of judged) {
      lines.push(`| ${j.id} | ${j.intent} | ${j.lang} | ${j.grounded ?? j.judgeError ?? "-"} | ${j.hallucinates ?? "-"} | ${j.langMatch ?? "-"} | ${j.truncated ?? "-"} | ${j.onTopic ?? "-"} | ${j.severity ?? "-"} | ${(j.evidence ?? "").slice(0, 90)} |`);
    }
    const sev2 = judged.filter((j) => j.severity === 2).length;
    const hallucinations = judged.filter((j) => j.hallucinates === true).length;
    const langMiss = judged.filter((j) => j.langMatch === false).length;
    lines.push("");
    lines.push(`Resumen judge sobre ${judged.length} muestras: severity=2 (hallucinaciones graves): ${sev2}; hallucinates: ${hallucinations}; langMatch falla: ${langMiss}.`);
    lines.push("");
  } else {
    lines.push("## E2E LLM-as-judge");
    lines.push("");
    lines.push("No se ejecutó el judge (0 respuestas reales en baseline o GROQ_API_KEY ausente).");
    lines.push("");
  }

  lines.push("## Nota de metodología");
  lines.push("");
  lines.push("- El corpus (lib/chat/eval/corpus.mjs) cubre: paráfrasis ES/EN por intent, out-of-scope reales, decoys por keyword (weather/clima/AWS/AI/React/Node/API/cloud/backend), ambigüedad (regla: preferir 'in'), typos e informal sin tildes, preguntas combinadas, parciales (entidades sueltas), indirectas (sin keyword literal: 'datos de clima', 'LLMs', 'studio con socio') y regresiones de clima (Weather API = in, pronóstico = out).");
  lines.push("- 'Correct scope' mide solo la decisión de alcance (in/out) contra lo esperado. La calidad de la respuesta in-scope se evalúa aparte con LLM-as-judge sobre respuestas reales.");
  lines.push("- En baseline, el proceso del server corría el build previo al refactor sin GROQ_API_KEY cargada: las respuestas in-scope dan 'error/unconfigured' (502), por lo que su calidad no se midió en baseline; la comparación de alcance sí es válida.");

  if (out) writeFileSync(out, lines.join("\n") + "\n");
  console.log(lines.join("\n"));
}

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const sub = args[0];

if (sub === "--run") {
  const genN = flag("--gen") ? Number(flag("--gen")) : 0;
  const pace = flag("--pace") ? Number(flag("--pace")) : 5000;
  runSubcommand({
    base: flag("--base") ?? "http://localhost:3456",
    out: flag("--out"),
    judgeN: flag("--judge") ? Number(flag("--judge")) : genN,
    genN,
    pace,
    onlyGen: args.includes("--only-gen"),
    label: flag("--label"),
  }).then((p) => {
    if (flag("--judge") && !process.env.GROQ_API_KEY) process.exitCode = 2;
    void p;
  });
} else if (sub === "--compare") {
  compareSubcommand([args[1], args[2]], flag("--out"));
} else {
  console.log("Usage:");
  console.log("  run.mjs --run [--base URL] [--out FILE] [--gen N] [--judge N] [--pace MS] [--only-gen] [--label STR]");
  console.log("  run.mjs --compare <baseline.json> <post.json> [--out FILE]");
}