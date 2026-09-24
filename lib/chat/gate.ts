import { normalize } from "./normalize";
import type { ChatHints } from "./intents";

type GateDecision = "out" | "skip";

const OWNERSHIP =
  /\b(?:gustavo|mi\b|mis|tu\b|tus|su\b|sus|suy[oa]s?|tuy[oa]s?|nuestr[oa]s?|m[ií][oa]|proyecto|experiencia|perfil|cv|linkedin|github|usted|your|you're)\b|(?:us[áa]s|usaste|ten[eé]s|trabaj[áa]ste|laburaste|hiciste|construiste|desarrollaste|aprend[eé]s|est[úu]dias|aprendo|estudio)/i;

const SELF_ADDRESSED =
  /\b(what are you|what you|que estas|en que estas|que estás|what is your|what's your|cuál es tu|cual es tu)\b/i;

const AI_TOPIC =
  /structured outputs|tool calling|\bllms?\b|large language|evaluaci[oó]n|\bevaluation\b|\bprompt[s]?\b|gemini|openai|langchain|agentic|\braq\b|r a g|inteligencia artificial/;

const PATTERNS: { name: string; re: RegExp }[] = [
  {
    name: "generic-explanation",
    re: /^(que es|que son|que significa|que hace|que seria|what is|what are|what does|explica|explicame|explicar|explain|explain to me|defini|definime|describe)\b/,
  },
  { name: "cooking-recipe", re: /receta|milanesa/ },
  { name: "translation", re: /traduc|translat/ },
  { name: "code-generation", re: /(write me|escrib[ií]me|hac[ée]me|gener[aa]me|pas[aa]me|create).{0,40}(script|c[oó]digo)/ },
  { name: "currency", re: /d[oó]lar/ },
  { name: "best-recommendation", re: /(mejor|best) (proveedor|herramienta|framework|lenguaje|servicio|plataforma|provider|tool|framework|language|platform|service|solution|practice|practica)/ },
  { name: "opinion-compare", re: /(opin[ae]s? (de|sobre|acerca de)|que te parece|que opinas de|in your opinion|what do you think about|what you think about|think about).{0,30}(vs|versus|comparad)?/ },
  { name: "best-practices", re: /best practices|buenas practicas/ },
  {
    name: "career-hypothetical",
    re: /(como desarrollador|as a developer|si fueras|if you were).{0,60}(estudiar|learn|recomend|consej|futur|ver[ií]as|elegir)/,
  },
  { name: "joke-story", re: /(tell me|contame|hac[ée]me reir|make me laugh).{0,25}(joke|story|poem|riddle|chiste|poes[ií]a|historia|cuento|reir|laugh)/ },
  { name: "current-forecast", re: /(c[oó]mo est[áa] el (tiempo|clima)|what'?s the weather|what is the weather|pron[oó]stico del tiempo|temperatura h[oó]y|clima h[oó]y|weather forecast)/ },
  { name: "news-results", re: /(qui[ée]n gan[oó]|who won|gan[oó] la [úu]ltima|qu[ée] pas[oó] en el mundo|resultado del partido)/ },
  { name: "geography", re: /(capital|poblaci[oón]) de [a-záéíóúñ]{2,}|capital of [a-z]{2,}/ },
];

export function gateExternalAccess(message: string, hints: ChatHints): GateDecision {
  const text = normalize(message);
  if (!text) return "skip";

  if (OWNERSHIP.test(text)) return "skip";
  if (SELF_ADDRESSED.test(text)) return "skip";
  if (AI_TOPIC.test(text)) return "skip";

  const hasProfileEntity = hints.entities.some(
    (id) => id !== undefined && !id.startsWith("skill:") && id !== "education",
  );
  if (hasProfileEntity) return "skip";

  for (const p of PATTERNS) {
    if (p.re.test(text)) return "out";
  }
  return "skip";
}