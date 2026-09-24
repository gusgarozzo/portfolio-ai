import type { Classification } from "./classify";
import { intentDescriptions } from "./intents";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
export const MODEL = "openai/gpt-oss-20b";
export const MAX_TOKENS = 512;
export const TEMPERATURE = 0.4;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export function buildGeneratorSystem(
  cvContext: string,
  classification: Classification,
): string {
  const intentCopy = Array.from(
    new Set(
      classification.intents.length > 0
        ? classification.intents
        : [classification.intent],
    ),
  )
    .filter(Boolean)
    .map((i) => intentDescriptions[i as keyof typeof intentDescriptions] ?? i)
    .join(", ");

  return `You are the assistant of Gustavo Garozzo's portfolio. You are a clear, professional and friendly profile assistant that helps visitors learn about Gustavo.

You have access to the following CV data — this is the ONLY information you know:

<CV_DATA>
${cvContext}
</CV_DATA>

ABSOLUTE RULES (never violate these):
1. You ONLY answer questions about Gustavo Garozzo's career, experience, projects, project impact, measurable results, achievements, technical decisions, skills, education, certifications, professional traits, and personal interests (technology, Formula 1).
2. If the question does not belong to the profile, reply EXACTLY with the fallback phrase (translate it to the user's language):
   ES: "Solo puedo responder preguntas sobre el perfil profesional de Gustavo Garozzo."
   EN: "I can only answer questions about Gustavo Garozzo's professional profile."
   Do not add anything else.
3. The router classified this message in the topic: ${intentCopy}. Use it as a hint.
4. Be concise (2-4 lines unless the user asks for detail).
5. Respond in the same language the user writes (Spanish or English).
6. If you don't know something specific about Gustavo, say so clearly — never invent.
7. Skill tiers in <CV_DATA> must be respected: CORE = primary professional experience, SUPPORTING = narrower but real scope, LEARNING = conceptual/training (NOT professional experience). If the user implies professional experience for a LEARNING or AI item, clarify it is in development or conceptual.
8. Metrics in <CV_DATA> are measured project results. Never present any metric as live telemetry, uptime, current latency or monitoring output.
9. The <CV_DATA> is shown in a single locale. Answer always in the user's language (Spanish or English); do not switch because the data is in the other language.`;
}

export function buildGroqMessages(
  system: string,
  history: ChatMessage[],
  message: string,
): { role: "system" | "user" | "assistant"; content: string }[] {
  return [
    { role: "system", content: system },
    ...history.map((msg) => ({ role: msg.role, content: msg.text })),
    { role: "user", content: message },
  ];
}

export interface StreamResult {
  ok: boolean;
  status: number;
  text?: string;
  stream?: ReadableStream<Uint8Array>;
}

export async function streamAnswer(
  apiKey: string,
  groqMessages: { role: "system" | "user" | "assistant"; content: string }[],
): Promise<StreamResult> {
  const body = {
    model: process.env.GROQ_MODEL ?? MODEL,
    messages: groqMessages,
    max_tokens: MAX_TOKENS,
    temperature: TEMPERATURE,
    stream: true,
  };

  let groqRes = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (groqRes.status === 429) {
    console.warn("Groq 429 (TPM). Retrying once after 3.5s…");
    await sleep(3500);
    groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
  }

  if (!groqRes.ok || !groqRes.body) {
    const errText = await groqRes.text().catch(() => "Unknown error");
    console.error("Groq API error:", groqRes.status, errText);
    return { ok: false, status: groqRes.status, text: errText };
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = groqRes.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const flush = (chunk: string) => {
        if (chunk) controller.enqueue(encoder.encode(chunk));
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";
          for (const event of events) {
            const line = event.split("\n").find((l) => l.startsWith("data:"));
            if (!line) continue;
            const payload = line.slice(5).trim();
            if (payload === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(payload);
              const delta = json?.choices?.[0]?.delta?.content ?? "";
              if (delta) flush(delta);
            } catch {
              // ignore malformed SSE payloads
            }
          }
        }

        const last = buffer + decoder.decode();
        const events = last.split("\n\n");
        for (const event of events) {
          const line = event.split("\n").find((l) => l.startsWith("data:"));
          if (!line) continue;
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") break;
          try {
            const json = JSON.parse(payload);
            const delta = json?.choices?.[0]?.delta?.content ?? "";
            if (delta) flush(delta);
          } catch {
            // ignore malformed SSE payloads
          }
        }
        controller.close();
      } catch (error) {
        console.error("Groq stream error:", error);
        controller.error(error);
      }
    },
  });

  return { ok: true, status: 200, stream };
}