import { detectLanguage, type Language } from "./normalize";
import { INTENTS, type ChatHints } from "./intents";

export interface Classification {
  scope: "in" | "out";
  intent: string;
  intents: string[];
  language: Language;
  reason?: string;
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

function routerModel(): string {
  return process.env.GROQ_ROUTER_MODEL ?? process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";
}

export function parseClassification(raw: string): Classification | null {
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start < 0 || end <= start) return null;
    const parsed = JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>;
    const scope = parsed.scope === "out" ? "out" : parsed.scope === "in" ? "in" : null;
    if (!scope) return null;
    const language: Language = parsed.language === "en" ? "en" : "es";
    const intents = Array.isArray(parsed.intents)
      ? (parsed.intents as unknown[]).filter((i): i is string => typeof i === "string").slice(0, 6)
      : typeof parsed.intent === "string"
        ? [parsed.intent]
        : [];
    return {
      scope,
      intent: typeof parsed.intent === "string" ? parsed.intent : intents[0] ?? "unknown",
      intents,
      language,
      reason: typeof parsed.reason === "string" ? parsed.reason : undefined,
    };
  } catch {
    return null;
  }
}

export function buildRouterPrompt(message: string, hints: ChatHints): string {
  const entities =
    hints.entityLabels.length > 0
      ? `Detected entities/topics: ${hints.entityLabels.slice(0, 12).join(", ")}`
      : "Detected entities/topics: none";
  return `You are a strict scope router for the portfolio chat of Gustavo Garozzo (Backend Engineer, Node.js/TypeScript/NestJS, APIs, cloud AWS/Google Cloud, AI Engineering).

A message is ABOUT GUSTAVO (scope "in") when it asks about his identity and profile; his career, experience, roles, achievements or companies (Aiotek, Qwavee IT); his projects (Barking Dogs, Sinergy Consulting Platform, WatchDog Price Tracker, ClickCore Agency Landing, Weather API); the technologies he uses (Node.js, NestJS, TypeScript, PostgreSQL, Redis, AWS, Google Cloud, Docker, CI/CD, APIs, microservices, serverless); his AI Engineering line (Gemini, LLMs, structured outputs, tool calling); education, certifications, languages, contact, CV, location, availability; typos and informal spelling are normal and do not change the intent; discoverable entity names count as about him.

A message is NOT about him (scope "out") when it is a generic request: recipes, jokes, math, homework, generic coding help, script/code writing, translations, third-party opinions or comparisons, generic recommendations or "best X" questions, generic best-practices or career advice, forecasts, currency, prices, news, capitals, Bitcoin. A keyword alone (AWS, AI, cloud, Node, React, API, developer) is never decisive: the complete intention decides. A question that mentions a project name (like "Weather API") IS about him, but a question about weather/forecast in general is NOT.

${entities}

Examples:
"¿Qué es el proyecto Weather API?" -> in
"What is the Weather API?" -> in
"¿Qué es Barking Dogs?" -> in
"¿Qué construiste con Gemini y el clima?" -> in (his Weather API project)
"What is your tech stack?" -> in
"¿Qué estás aprendiendo?" -> in
"¿Qué es structured outputs y tool calling?" -> in
"¿Qué es un LLM?" -> in (his AI line)
"¿Qué experiencia tenés con Kubernetes?" -> in (conceptual; answer honestly)
"¿Usás TypeScript en producción?" -> in
"Aiotek" -> in
"weather api" -> in
"Hola" -> in
"¿Qué clima hace hoy?" -> out (weather forecast)
"What is the weather today?" -> out
"Explicame Kubernetes." -> out (generic explanation)
"¿Qué opinás de React?" -> out (third-party opinion)
"¿Cuál es el mejor proveedor de cloud para startups?" -> out (generic recommendation)
"Explain the best practices for API design in general." -> out (generic advice)
"Write me a Python script to scrape a website." -> out (code-writing service)
"What is Bitcoin?" -> out
"Can you translate this sentence to French?" -> out
"¿El dólar sube o baja?" -> out (news)
"Contame una receta de milanesas." -> out
"Como desarrollador, ¿qué estudiarías en 2026?" -> out (generic career advice)
"¿Quién ganó la última carrera de F1?" -> out (external news)
"¿Cuál es la capital de Francia?" -> out (geography fact)
"¿Cómo está el tiempo en Buenos Aires?" -> out (current forecast)
"¿Cómo está el clima hoy?" -> out (current forecast)
"How do you structure your REST APIs?" -> in (his approach/practice)
"¿Qué hiciste?" -> in (ambiguous; likely about his work, prefer to answer)

Precision rules:
- Current forecast questions ("cómo está el tiempo/clima", "pronóstico", "temperatura hoy", in any city) are ALWAYS "out", except when a Weather API project name is explicitly present.
- Geography facts ("capital de X", "población de X") and external news/results ("quién ganó", "resultado", "qué pasó en el mundo") are "out".
- Questions that ask HOW HE does something ("How do you structure your REST APIs?", "¿Cómo diseñás tus APIs?") are "in": they ask about his method, not generic advice.

Decision rules:
1. If the natural reading is generic/external (explanation, opinion, comparison, recommendation, service, forecast, news), scope "out" even if a tech keyword or a shared term appears.
2. Topics that exist ONLY in his profile ("Weather API", "Aiotek", skills like "Node") are normally "in" when the question asks about him or his project.
3. If the message can reasonably refer to Gustavo, prefer "in".

Respond ONLY with a single JSON object:
{"scope":"in"|"out","intent":"short topic","intents":["topic"],"language":"es"|"en","reason":"one short phrase"}

User message: ${message}`;
}

async function callRouter(
  apiKey: string,
  message: string,
  hints: ChatHints,
): Promise<string> {
  const body = {
    model: routerModel(),
    messages: [
      { role: "system" as const, content: buildRouterPrompt(message, hints) },
      { role: "user" as const, content: message },
    ],
    temperature: 0,
    max_tokens: 160,
    stream: false,
  };

  let res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ ...body, response_format: { type: "json_object" } }),
  });

  if (res.status === 400) {
    res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
    });
  }

  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 3500));
    res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
    });
  }

  if (!res.ok) {
    console.error("Chat router failed, status:", res.status);
    return ""; // parse will fall back to a safe default
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content ?? "";
}

export async function classifyMessage(
  message: string,
  hints: ChatHints,
  apiKey: string,
): Promise<Classification> {
  const fallbackLanguage = detectLanguage(message);
  const raw = await callRouter(apiKey, message, hints);
  const parsed = parseClassification(raw);
  if (!parsed) {
    return {
      scope: "in",
      intent: "unknown",
      intents: [] as string[],
      language: fallbackLanguage,
      reason: "router_error_or_parse_failure",
    };
  }
  return parsed;
}

export function validIntentToken(token: string): boolean {
  return (INTENTS as readonly string[]).includes(token);
}