import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildCvContext } from "@/lib/build-cv-context";
import { checkGuard } from "@/lib/chat/guard";
import { extractHints } from "@/lib/chat/intents";
import { gateExternalAccess } from "@/lib/chat/gate";
import { classifyMessage } from "@/lib/chat/classify";
import {
  buildGeneratorSystem,
  buildGroqMessages,
  streamAnswer,
} from "@/lib/chat/answer";
import { t } from "@/lib/messages";

const MAX_HISTORY = 20;
const MAX_TEXT_LENGTH = 2000;

function replyJson(
  messageKey: string,
  language: "es" | "en",
  status = 200,
  scope = "other",
  intent = "",
) {
  return NextResponse.json(
    { reply: messageKey === "REPLY_EMPTY_STRING" ? "" : t(messageKey, language) },
    {
      status,
      headers: {
        "x-chat-scope": scope,
        "x-chat-intent": intent || "n/a",
      },
    },
  );
}

function isAuthorizedFrom(from: string | null): boolean {
  if (!from) return false;
  if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(from)) {
    return true;
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return true;
  try {
    const a = new URL(from);
    const b = new URL(siteUrl);
    return a.protocol === b.protocol && a.host === b.host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) {
      const from = request.headers.get("origin") ?? request.headers.get("referer");
      if (!isAuthorizedFrom(from)) {
        return NextResponse.json(
          { reply: "Unauthorized request." },
          { status: 403 },
        );
      }
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { allowed: rateLimitOk } = checkRateLimit(ip);
    if (!rateLimitOk) {
      return NextResponse.json(
        { reply: "Too many requests. Please wait before sending another message." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const message = body?.message;
    const history: { role?: string; text?: string }[] = body?.history ?? [];

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Invalid request. The 'message' field is required." },
        { status: 400 },
      );
    }

    const safeMessage = message.slice(0, MAX_TEXT_LENGTH);

    const guard = checkGuard(safeMessage);
    if (!guard.allowed) {
      const key =
        guard.reason === "empty"
          ? "CHAT_EMPTY"
          : guard.reason === "length"
            ? "CHAT_BLOCKED"
            : "CHAT_BLOCKED";
      return replyJson(key, guard.language);
    }

    const hints = extractHints(safeMessage, guard.language);

    const gate = gateExternalAccess(safeMessage, hints);
    if (gate === "out") {
      return replyJson("CHAT_OUT_OF_SCOPE", guard.language, 200, "out", "external-request");
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return replyJson("CHAT_UNCONFIGURED", guard.language, 500);
    }

    const classification = await classifyMessage(safeMessage, hints, apiKey);
    const scopeLabel = classification.scope === "out" ? "out" : "in";

    if (classification.scope === "out") {
      return replyJson("CHAT_OUT_OF_SCOPE", classification.language, 200, scopeLabel, classification.intent);
    }

    const scopeOnly = request.headers.get("x-chat-scope-only") === "1";
    if (scopeOnly) {
      return replyJson("REPLY_EMPTY_STRING", classification.language, 200, scopeLabel, classification.intent);
    }

    const cvContext = buildCvContext(classification.language);

    const trimmedHistory: { role: "user" | "assistant"; text: string }[] =
      Array.isArray(history)
        ? history
            .filter(
              (m): m is { role: "user" | "assistant"; text: string } =>
                (m.role === "user" || m.role === "assistant") &&
                typeof m.text === "string",
            )
            .map((m) => ({ role: m.role, text: m.text.slice(0, MAX_TEXT_LENGTH) }))
            .slice(-MAX_HISTORY)
        : [];

    const system = buildGeneratorSystem(cvContext, classification);
    const groqMessages = buildGroqMessages(system, trimmedHistory, safeMessage);

    const result = await streamAnswer(apiKey, groqMessages);

    if (!result.ok || !result.stream) {
      console.error("Chat stream failed, status:", result.status);
      return replyJson("CHAT_ERROR", classification.language, 502, scopeLabel, classification.intent);
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
        "x-chat-scope": scopeLabel,
        "x-chat-intent": classification.intent,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Internal server error. Please try again." },
      { status: 500 },
    );
  }
}