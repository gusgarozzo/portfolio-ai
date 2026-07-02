import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildCvContext } from "@/lib/build-cv-context";
import { checkScope } from "@/lib/scope-guard";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { allowed: rateLimitOk } = checkRateLimit(ip);
    if (!rateLimitOk) {
      return NextResponse.json(
        { reply: "[RATE_LIMIT_EXCEEDED] Too many requests. Please wait before sending another message." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const message = body?.message;
    const history: { role: "user" | "assistant"; text: string }[] = body?.history ?? [];

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "[ERROR] Invalid request. 'message' field is required." },
        { status: 400 },
      );
    }

    const scopeCheck = checkScope(message);
    if (!scopeCheck.allowed) {
      return NextResponse.json({ reply: scopeCheck.reply! });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "[ERROR] API key not configured." },
        { status: 500 },
      );
    }

    const cvContext = buildCvContext();

    const systemPrompt = `You are ASK_GUSTAVO, a strict terminal assistant for Gustavo Garozzo's portfolio.

You have access to the following CV data — this is the ONLY information you know:

<CV_DATA>
${cvContext}
</CV_DATA>

ABSOLUTE RULES (never violate these):
1. You ONLY answer questions about Gustavo Garozzo's career, experience, projects, technical skills, education, certifications, professional traits, and personal interests (technology, Formula 1).
2. If the question is about ANYTHING else — including recipes, coding help, math, science, news, weather, translations, poems, stories, opinions on third parties, prices, games, movies — you MUST reply EXACTLY with: "I can only answer questions about Gustavo Garozzo's professional profile." Do not add anything else.
3. Be concise (2-4 lines unless detail is requested).
4. Respond in the same language the user writes (Spanish or English).
5. If you don't know something specific about Gustavo, say so clearly — never invent.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.text,
      })),
      { role: "user" as const, content: message },
    ];

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.4,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => "Unknown error");
      console.error("Groq API error:", groqRes.status, errText);
      return NextResponse.json(
        { reply: "[ERROR] AI service unavailable. Please try again later." },
        { status: 502 },
      );
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content ?? "";

    if (!reply) {
      return NextResponse.json(
        { reply: "[ERROR] Empty response from AI service." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "[ERROR] Internal server error. Please try again." },
      { status: 500 },
    );
  }
}
