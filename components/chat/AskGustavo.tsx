"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useLocale } from "@/lib/locale-context";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AskGustavo() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "rate_limited">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || status === "loading") return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setStatus("loading");

    const history = messages.map((m) => ({
      role: m.role as "user" | "assistant",
      text: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setStatus("rate_limited");
        setMessages((prev) => [...prev, { role: "assistant", text: t("CHAT_RATE_LIMITED") }]);
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setMessages((prev) => [...prev, { role: "assistant", text: t("CHAT_ERROR") }]);
        return;
      }

      setStatus("idle");
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setStatus("error");
      setMessages((prev) => [...prev, { role: "assistant", text: t("CHAT_ERROR") }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-200 label-mono text-text-secondary"
        aria-label={t("CHAT_OPEN")}
      >
        <span className="pip animate-pulse" />
        {t("ASK_GUSTAVO")}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6 pointer-events-none">
          <div
            className="pointer-events-auto w-full md:w-[400px] bg-surface border border-border shadow-xl flex flex-col"
            style={{ maxHeight: "min(600px, calc(100vh - 48px))" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="pip animate-pulse" />
                <span className="label-mono text-accent">{t("CHAT_TITLE")}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="label-mono text-text-muted hover:text-accent transition-colors"
                aria-label={t("CHAT_CLOSE")}
              >
                [ {t("CHAT_CLOSE")} ]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.length === 0 && (
                <p className="data-mono text-text-muted text-center pt-8">
                  {t("ASK_GUSTAVO")} — {t("CHAT_INPUT_PLACEHOLDER")}
                </p>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`data-mono leading-relaxed ${
                    msg.role === "user"
                      ? "text-text-primary"
                      : "text-accent"
                  }`}
                >
                  <span className="caption-mono text-text-muted block mb-0.5">
                    {msg.role === "user" ? ">" : "[ASK_GUSTAVO]"}
                  </span>
                  {msg.text}
                </div>
              ))}

              {status === "loading" && (
                <div className="data-mono text-text-muted animate-pulse">
                  <span className="caption-mono text-text-muted block mb-0.5">
                    [ASK_GUSTAVO]
                  </span>
                  {t("CHAT_PROCESSING")}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border p-3 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("CHAT_INPUT_PLACEHOLDER")}
                disabled={status === "loading"}
                className="flex-1 bg-surface-deep border border-border px-3 py-2 data-mono text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors disabled:opacity-40"
                aria-label={t("CHAT_INPUT_PLACEHOLDER")}
              />
              <button
                type="submit"
                disabled={!input.trim() || status === "loading"}
                className="px-4 py-2 bg-accent text-black data-mono font-medium hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Send"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
