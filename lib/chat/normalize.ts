export type Language = "es" | "en";

/** Removes diacritics, question marks and collapses whitespace; lowercase. */
export function normalize(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[?!.]+$/, "")
    .toLowerCase();
}

/** Slang / abbreviations expanded at token boundaries (informal Spanish chat). */
const SLANG_TOKENS: Record<string, string> = {
  q: "que",
  k: "que",
  qs: "que es",
  xq: "porque",
  porq: "porque",
  d: "de",
  pa: "para",
  tb: "tambien",
  tmb: "tambien",
  nd: "nada",
  p: "para",
};

export function expandSlang(raw: string): string {
  const normalized = normalize(raw);
  return normalized
    .split(" ")
    .map((token) => SLANG_TOKENS[token] ?? token)
    .join(" ");
}

const ES_WORDS = new Set([
  "el",
  "la",
  "los",
  "las",
  "que",
  "de",
  "en",
  "del",
  "con",
  "para",
  "por",
  "un",
  "una",
  "es",
  "mi",
  "tu",
  "cual",
  "como",
  "donde",
  "cuando",
  "cuanto",
  "cuantos",
  "hay",
  "tenes",
  "tienes",
  "tuvo",
  "trabajaste",
  "trabajas",
  "trabaja",
  "trabajo",
  "hiciste",
  "hizo",
  "estudiaste",
  "estudi",
  "contame",
  "cuentame",
  "explicame",
  "decime",
  "hablame",
  "sos",
  "vos",
  "proyecto",
  "proyectos",
  "experiencia",
  "stack",
  "certificaciones",
  "educacion",
  "formacion",
  "contacto",
  "ubicacion",
  "disponibilidad",
]);

const EN_WORDS = new Set([
  "the",
  "a",
  "an",
  "of",
  "for",
  "to",
  "and",
  "with",
  "on",
  "in",
  "you",
  "your",
  "my",
  "is",
  "are",
  "was",
  "has",
  "have",
  "had",
  "did",
  "do",
  "what",
  "how",
  "where",
  "when",
  "who",
  "which",
  "can",
  "could",
  "would",
  "tell",
  "explain",
  "about",
  "work",
  "worked",
  "working",
  "experience",
  "project",
  "projects",
  "stack",
  "certifications",
  "education",
  "contact",
  "location",
  "availability",
  "career",
  "company",
  "companies",
]);

const ACCENT_RE = /[\u00e1\u00e9\u00ed\u00f3\u00fa\u00fc\u00f1]/;

export function detectLanguage(raw: string): Language {
  const original = raw.toLowerCase();
  let score = 0;
  const tokens = original
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .split(" ")
    .filter(Boolean);

  for (const token of tokens) {
    if (ES_WORDS.has(token)) score += 1;
    if (EN_WORDS.has(token)) score -= 1;
  }

  if (ACCENT_RE.test(original)) score += 1;

  return score >= 0 ? "es" : "en";
}