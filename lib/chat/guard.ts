import { detectLanguage, normalize, type Language } from "./normalize";

export type GuardReason = "empty" | "length" | "abuse";

export interface GuardResult {
  allowed: boolean;
  reason?: GuardReason;
  language: Language;
}

export const MAX_MESSAGE_LENGTH = 2000;

/**
 * Deterministic hard gates. Semantic scope decisions belong to the LLM router
 * (`lib/chat/classify.ts`), NOT here. This layer only blocks requests that
 * must never reach the model: empty, over-length, or abusive/credential-seeking.
 */
const ABUSE_PATTERNS: RegExp[] = [
  /password|contrasen[ae]?|api[\s_-]*key|access[\s_-]*token|secret|credenciales|credentials/i,
  /dni|cuil|cuit|pasaporte|num(ero)?\s*de\s*(tarjeta|cuenta|tarjeta de credito)|card\s*number/i,
  /ignore\s+(all\s+|previous\s+|your\s+)?(instructions|rules|prompt)|system\s+prompt|jailbreak|prompt\s+injection|ignora\s+tus\s+(instrucciones|reglas)|desobedece/i,
  /hacke|hackear|ataca(me|r)?|phishing/i,
];

export function checkGuard(
  raw: string,
  maxLength: number = MAX_MESSAGE_LENGTH,
): GuardResult {
  const trimmed = raw.trim();
  const language = detectLanguage(trimmed);

  if (!trimmed) {
    return { allowed: false, reason: "empty", language };
  }

  if (trimmed.length > maxLength) {
    return { allowed: false, reason: "length", language };
  }

  const normalized = normalize(trimmed);

  for (const pattern of ABUSE_PATTERNS) {
    if (pattern.test(trimmed) || pattern.test(normalized)) {
      return { allowed: false, reason: "abuse", language };
    }
  }

  return { allowed: true, language };
}