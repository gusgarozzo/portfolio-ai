"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { useLocale } from "@/lib/locale-context";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTION_KEYS = [
  "SUGGESTION_EXPERIENCE",
  "SUGGESTION_SKILLS",
  "SUGGESTION_AI",
  "SUGGESTION_WEATHER",
];

export default function AskGustavo() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streamText, setStreamText] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "rate_limited">("idle");
  const [cooldown, setCooldown] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, streamText]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        openButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setStatus("idle");
    openButtonRef.current?.focus();
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "loading") return;

      setInput("");
      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setStatus("loading");
      setStreamText("");

      const history = messages.map((m) => ({
        role: m.role as "user" | "assistant",
        text: m.text,
      }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const contentType = res.headers.get("content-type") ?? "";

        if (res.status === 429) {
          setStatus("rate_limited");
          setStreamText(null);
          setMessages((prev) => [...prev, { role: "assistant", text: t("CHAT_RATE_LIMITED") }]);
          return;
        }

        if (!res.ok) {
          setStatus("error");
          setStreamText(null);
          setMessages((prev) => [...prev, { role: "assistant", text: t("CHAT_ERROR") }]);
          return;
        }

        if (contentType.includes("text/plain") && res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let acc = "";

          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            acc += decoder.decode(value, { stream: true });
            setStreamText(acc);
          }

          const finalText = acc.trim();
          setStreamText(null);
          if (finalText) {
            setMessages((prev) => [...prev, { role: "assistant", text: finalText }]);
          } else {
            setMessages((prev) => [...prev, { role: "assistant", text: t("CHAT_ERROR") }]);
          }
          setStatus("idle");
          setCooldown(15);
          return;
        }

        const data = await res.json();
        setStatus("idle");
        setStreamText(null);
        setMessages((prev) => [...prev, { role: "assistant", text: data?.reply ?? t("CHAT_ERROR") }]);
        setCooldown(15);
      } catch {
        setStatus("error");
        setStreamText(null);
        setMessages((prev) => [...prev, { role: "assistant", text: t("CHAT_ERROR") }]);
      }
    },
    [messages, status, t],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const isLoading = status === "loading";

  return (
    <>
      <button
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-ink text-paper md:pl-3 md:pr-5 px-3 py-2.5 min-h-12 shadow-lg shadow-ink/20 hover:bg-signal transition-colors duration-200"
        aria-label={t("CHAT_OPEN")}
        aria-haspopup="dialog"
      >
        <span
          className="inline-flex size-7 items-center justify-center rounded-full bg-signal text-white"
          aria-hidden="true"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className="hidden md:inline text-sm font-semibold">{t("ASK_GUSTAVO")}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-3 md:p-6 pointer-events-none">
          <div
            role="dialog"
            aria-modal="false"
            aria-label={t("CHAT_TITLE")}
            tabIndex={-1}
            className="pointer-events-auto w-full md:w-[400px] bg-paper border border-line rounded-2xl shadow-2xl shadow-ink/10 flex flex-col overflow-hidden max-h-[calc(100dvh-24px)] md:max-h-[min(620px,calc(100vh-48px))]"
          >
            <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-line bg-paper-2/50">
              <div>
                <p className="font-display text-[15px] font-bold tracking-tight text-ink">
                  {t("CHAT_TITLE")}
                </p>
                <p className="meta text-ink-mute mt-0.5">{t("CHAT_SUBTITLE")}</p>
              </div>
              <button
                onClick={closeChat}
                className="inline-flex size-9 items-center justify-center rounded-md text-ink-mute hover:text-ink hover:bg-paper-3 transition-colors -mr-1.5"
                aria-label={t("CHAT_CLOSE")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              role="log"
              aria-live="polite"
              aria-busy={isLoading}
              aria-label={t("CHAT_LOG_LABEL")}
              className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 text-left"
            >
              {messages.length === 0 && streamText === null && (
                <div className="pt-2 pb-4 text-center flex flex-col items-center">
                  <p className="text-[15px] font-medium text-ink max-w-[30ch]">
                    {t("CHAT_INTRO")}
                  </p>
                  <p className="eyebrow text-signal mt-6 mb-3">
                    {t("SUGGESTED_PROMPTS_LABEL")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTION_KEYS.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => sendMessage(t(key))}
                        disabled={isLoading || cooldown > 0}
                        className="rounded-full border border-line bg-paper px-4 py-2 min-h-11 text-[14px] font-medium text-ink-soft hover:border-signal hover:text-signal transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {t(key)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === "user"
                        ? "bg-signal text-white rounded-2xl rounded-br-md"
                        : "bg-paper-2 border border-line text-ink-soft rounded-2xl rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}

              {streamText !== null && (
                <div className="flex justify-start">
                  <p className="max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap break-words bg-paper-2 border border-line text-ink-soft rounded-2xl rounded-bl-md">
                    {streamText}
                    <span className="ml-0.5 inline-block w-1.5 h-4 align-middle bg-signal animate-pulse" aria-hidden="true" />
                  </p>
                </div>
              )}

              {isLoading && streamText === null && (
                <div className="flex justify-start">
                  <p className="px-4 py-2.5 text-[15px] bg-paper-2 border border-line text-ink-mute rounded-2xl rounded-bl-md flex items-center gap-2">
                    <span className="inline-flex gap-1" aria-hidden="true">
                      <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                      <span className="size-1.5 rounded-full bg-signal animate-pulse [animation-delay:120ms]" />
                      <span className="size-1.5 rounded-full bg-signal animate-pulse [animation-delay:240ms]" />
                    </span>
                    {t("CHAT_PROCESSING")}
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-line p-3 md:p-4 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("CHAT_INPUT_PLACEHOLDER")}
                disabled={isLoading || cooldown > 0}
                className="flex-1 min-w-0 bg-paper-2 border border-line rounded-full px-4 py-2.5 min-h-11 text-[15px] text-ink placeholder:text-ink-mute outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition-colors disabled:opacity-40"
                aria-label={t("CHAT_INPUT_PLACEHOLDER")}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || cooldown > 0}
                className="px-5 py-2.5 min-h-11 rounded-full bg-ink text-paper text-[14px] font-semibold hover:bg-signal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={t("CHAT_SEND")}
              >
                {cooldown > 0 ? `${cooldown}s` : t("CHAT_SEND")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}