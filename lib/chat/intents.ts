import { normalize, expandSlang } from "./normalize";
import { personal } from "@/data/personal";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { education } from "@/data/education";

export const INTENTS = [
  "identity",
  "profile",
  "experience",
  "aiotek",
  "qwavee",
  "responsibilities",
  "achievements",
  "node",
  "typescript",
  "nestjs",
  "postgresql",
  "redis",
  "aws",
  "gcp",
  "integrations",
  "apis",
  "microservices",
  "serverless",
  "architecture",
  "projects",
  "barking-dogs",
  "weather-api",
  "watchdog",
  "sinergy",
  "clickcore",
  "ai-engineering",
  "gemini",
  "education",
  "certifications",
  "languages",
  "contact",
  "location",
  "availability",
  "cv",
  "linkedin",
  "github",
  "learning",
  "technologies",
  "interests",
  "greeting",
  "bot",
  "out-of-scope",
] as const;

export type Intent = (typeof INTENTS)[number];

interface EntityDef {
  id: string;
  phrase: string;
  intents: Intent[];
}

const canon = (s: string) => normalize(s);

function skillIntent(item: string): Intent[] {
  const t = item.toLowerCase();
  if (t.includes("kubernetes") || t.includes("mongodb") || t.includes("dynamodb") || t.includes("terraform") || t.includes("ddd"))
    return ["learning"];
  if (t.includes("node")) return ["node"];
  if (t.includes("nestjs")) return ["nestjs"];
  if (t.includes("typescript")) return ["typescript"];
  if (t.includes("postgres")) return ["postgresql"];
  if (t.includes("redis")) return ["redis"];
  if (t.includes("aws")) return ["aws"];
  if (t.includes("google cloud")) return ["gcp"];
  if (t.includes("gemini") || t.includes("llm") || t.includes("tool calling") || t.includes("structured output"))
    return ["gemini", "ai-engineering"];
  if (t.includes("serverless")) return ["serverless"];
  if (t.includes("microservicios") || t.includes("microservices")) return ["microservices"];
  if (t.includes("event-driven")) return ["microservices", "architecture"];
  if (t.includes("rest api") || t.includes("api")) return ["apis"];
  if (t.includes("arquitectura") || t.includes("architecture")) return ["architecture"];
  return ["technologies"];
}

function stripParenthetical(item: string): string {
  return item.replace(/\s*\([^)]*\)/g, "").trim();
}

const entityDefs: EntityDef[] = [];

// Identity (from personal data).
for (const loc of ["es", "en"] as const) {
  const p = personal[loc];
  entityDefs.push({ id: "identity", phrase: canon(p.name), intents: ["identity"] });
  entityDefs.push({ id: "identity", phrase: canon(p.name.split(" ")[0]), intents: ["identity"] });
}

// Companies (from experience).
for (const loc of ["es", "en"] as const) {
  for (const e of experience[loc]) {
    const id = e.id.startsWith("qwavee") ? ("qwavee" as Intent) : (e.id as Intent);
    entityDefs.push({ id, phrase: canon(e.company), intents: [id] });
  }
}

// Projects (names from es + en).
for (const loc of ["es", "en"] as const) {
  for (const pr of projects[loc]) {
    entityDefs.push({ id: pr.id as Intent, phrase: canon(pr.name), intents: [pr.id as Intent] });
  }
}

// Skills (core + supporting + learning + ai).
for (const loc of ["es", "en"]) {
  const sk = skills[loc];
  for (const tier of ["core", "supporting", "learning", "ai"] as const) {
    for (const item of sk[tier]) {
      const phrase = canon(stripParenthetical(item));
      if (!phrase || phrase.length > 56) continue;
      entityDefs.push({ id: `skill:${phrase}`, phrase, intents: skillIntent(item) });
    }
  }
}

// Short-token aliases for multi-word skills (hints only, not scope gates).
const STOP_ALIAS_WORDS = new Set([
  "de", "del", "la", "el", "en", "con", "y", "para",
  "and", "the", "of", "you", "your", "with",
]);
const aliasDefs: EntityDef[] = [];
for (const def of entityDefs) {
  if (!def.id.startsWith("skill:")) continue;
  const words = def.phrase
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3 && !STOP_ALIAS_WORDS.has(w));
  for (const w of words) {
    if (w === def.phrase) continue;
    aliasDefs.push({ id: `skill:${w}`, phrase: w, intents: def.intents });
  }
}
entityDefs.push(...aliasDefs);

// Education institutions.
for (const loc of ["es", "en"]) {
  for (const e of education[loc]) {
    const inst = canon(e.institution);
    const short = inst.includes("unicen") ? "unicen" : inst.includes("utn") ? "utn" : inst;
    entityDefs.push({ id: "education", phrase: short, intents: ["education"] });
  }
}

// Keyword -> intent hints (lexical only; NOT a scope verdict).
const KEYWORD_HINTS: Array<[RegExp, Intent[]]> = [
  [
    /\b(cv|curriculum|resume|hoja de vida|curriculo|descargar cv)\b/,
    ["cv"],
  ],
  [/\b(linkedin|linked in|linked)\b/, ["linkedin"]],
  [/\b(github|git hub)\b/, ["github"]],
  [
    /\b(email|mail|correo|telefono|phone|contacto|contact)\b/,
    ["contact"],
  ],
  [/\b(tandil|ubicacion|location|donde vive|dónde vive)\b/, ["location"]],
  [
    /\b(remoto|remote|hibrido|hybrid|disponibilidad|disponible|modalidad|presencial)\b/,
    ["availability"],
  ],
  [
    /\b(ingles|english|language|idioma|b2|ingles b2)\b/,
    ["languages"],
  ],
  [
    /\b(educacion|estudios|universidad|education|degree|facultad)\b/,
    ["education"],
  ],
  [
    /\b(certificacion|certificaciones|certificate|certificates|cursos|courses)\b/,
    ["certifications"],
  ],
  [/\b(f1|formula 1|formula uno|formula 1|giallo)\b/, ["interests"]],
  [/\b(proyecto|proyectos|project|projects)\b/, ["projects"]],
  [/\b(stack|tecnologias|tecnologia|technolog|tools)\b/, ["technologies"]],
  [
    /\b(responsabilidades|tareas|duties|que hacia|qué hacías)\b/,
    ["responsibilities"],
  ],
  [/\b(logros|achievements|impacto|impact)\b/, ["achievements"]],
  [
    /\b(arquitectura|architecture|diseno de sistemas|system design)\b/,
    ["architecture"],
  ],
  [
    /\b(integraciones|integrations|erp|marketplace|integra)\b/,
    ["integrations"],
  ],
  [/\b(microservicios|microservices|micro frontend)\b/, ["microservices"]],
  [/\b(serverless|lambda)\b/, ["serverless"]],
  [/\b(apis|api rest|rest api|api gateway)\b/, ["apis"]],
  [
    /\b(experiencia|experience|recorrido|career|carrera|empresas|companies|trabajaste|trabajos|trayectoria|background)\b/,
    ["experience"],
  ],
  [/\b(weather|clima|tiempo|pronostico|temperatura)\b/, ["weather-api"]],
  [
    /\b(ai|ia|inteligencia artificial|artificial intelligence|machine learning)\b/,
    ["ai-engineering"],
  ],
  [
    /\b(hola|hi|hello|buenas|buen dia|good morning|good afternoon)\b/,
    ["greeting"],
  ],
  [
    /\b(quien sos|quien eres|who are you|que haces|what do you do|asistente|assistant|bot)\b/,
    ["bot"],
  ],
];

const TERM_HINTS: Array<[RegExp, Intent[]]> = [
  [/\b(gustavo|garozzo)\b/, ["identity"]],
  [/\b(perfil|profile|backend|back end|seniority|semi senior|mid level)\b/, ["profile"]],
];

function buildHints(message: string): {
  entities: EntityDef[];
  kw: Intent[];
  terms: Intent[];
} {
  const expanded = expandSlang(message);
  const entities: EntityDef[] = [];
  const seen = new Set<string>();
  for (const def of entityDefs) {
    const key = `${def.id}:${def.phrase}`;
    if (!expanded.includes(def.phrase) || seen.has(key)) continue;
    seen.add(key);
    entities.push(def);
  }

  const kw: Intent[] = [];
  for (const [re, intents] of KEYWORD_HINTS) {
    if (re.test(message) || re.test(expanded)) kw.push(...intents);
  }

  const terms: Intent[] = [];
  for (const [re, intents] of TERM_HINTS) {
    if (re.test(message) || re.test(expanded)) terms.push(...intents);
  }

  return { entities, kw, terms };
}

export interface ChatHints {
  language: "es" | "en";
  normalized: string;
  tokens: string[];
  entities: string[];
  entityLabels: string[];
  intentHints: Intent[];
  hadEntity: boolean;
}

export function extractHints(message: string, language: "es" | "en" = "es"): ChatHints {
  const normalized = normalize(message);
  const { entities, kw, terms } = buildHints(message);
  const intentHints = Array.from(
    new Set([...terms, ...kw, ...entities.flatMap((e) => e.intents)]),
  );
  return {
    language,
    normalized,
    tokens: normalized.split(" "),
    entities: Array.from(new Set(entities.map((e) => e.id))),
    entityLabels: Array.from(new Set(entities.map((e) => e.phrase))).slice(0, 12),
    intentHints,
    hadEntity: entities.length > 0,
  };
}

export const intentDescriptions: Record<Intent, string> = {
  identity: "Quién es Gustavo",
  profile: "Perfil profesional / posicionamiento",
  experience: "Experiencia general / trayectoria",
  aiotek: "Experiencia en Aiotek",
  qwavee: "Experiencia en Qwavee IT",
  responsibilities: "Responsabilidades",
  achievements: "Logros / impacto",
  node: "Node.js",
  typescript: "TypeScript",
  nestjs: "NestJS",
  postgresql: "PostgreSQL",
  redis: "Redis",
  aws: "AWS",
  gcp: "Google Cloud",
  integrations: "Integraciones de sistemas",
  apis: "APIs / REST",
  microservices: "Microservicios",
  serverless: "Serverless",
  architecture: "Arquitectura",
  projects: "Proyectos (general)",
  "barking-dogs": "Barking Dogs",
  "weather-api": "Weather API",
  watchdog: "WatchDog Price Tracker",
  sinergy: "Sinergy Consulting Platform",
  clickcore: "ClickCore Agency Landing",
  "ai-engineering": "AI Engineering (línea en desarrollo)",
  gemini: "Gemini / LLMs",
  education: "Educación",
  certifications: "Certificaciones",
  languages: "Idiomas",
  contact: "Contacto",
  location: "Ubicación",
  availability: "Disponibilidad / modalidad",
  cv: "Curriculum",
  linkedin: "LinkedIn",
  github: "GitHub",
  learning: "Tecnologías en aprendizaje",
  technologies: "Tecnologías / stack",
  interests: "Intereses personales",
  greeting: "Saludo",
  bot: "Sobre el asistente",
  "out-of-scope": "Fuera de alcance",
};