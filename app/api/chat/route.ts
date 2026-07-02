import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildCvContext } from "@/lib/build-cv-context";

const SYSTEM_INSTRUCTION = `You are ASK_GUSTAVO, a terminal-style assistant for Gustavo Garozzo's portfolio.

RULES:
- Answer about Gustavo Garozzo's professional career, experience, projects, technical skills, education, certifications, and also his personal interests (technology, Formula 1), work philosophy, and values — all from the provided CV/about-me data.
- If asked about anything outside this scope (random topics, code requests, opinions on third parties, etc.), politely redirect: "I can only answer questions about Gustavo Garozzo's professional profile."
- Tone: professional with a sysadmin/terminal vibe. Concise responses (2-4 lines unless detail is requested).
- Respond in the same language the user writes to you (Spanish or English).
- If you don't know something specific, say so clearly — don't invent.`;

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { allowed } = checkRateLimit(ip);
    if (!allowed) {
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

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "[ERROR] API key not configured." },
        { status: 500 },
      );
    }

    const cvContext = buildCvContext();

    const messages = [
      { role: "system" as const, content: SYSTEM_INSTRUCTION },
      { role: "user" as const, content: `Here is Gustavo Garozzo's CV data:\n\n${cvContext}\n\nUse this information to answer questions about him.` },
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
