"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type GameState = "idle" | "playing" | "finished";

interface Score {
  detected: number;
  missed: number;
  falseAlarms: number;
}

const INFO_LOGS = [
  "service health check passed",
  "connection pool stable: {n} connections",
  "request processed in {n}ms",
  "cache hit ratio: {n}%",
  "queue depth: {n}",
  "heartbeat received from worker-{n}",
  "response time within threshold",
  "database query completed: {n}ms",
  "session count: {n} active",
  "rate limit remaining: {n}",
];

const WARN_LOGS = [
  "memory usage above 85% ({n}MB/{n2}MB)",
  "response time exceeding threshold: {n}ms",
  "connection pool at {n}% capacity",
  "retry attempt {n}/3 for request id-{n2}",
  "slow query detected: {n}ms",
  "disk usage at {n}%",
  "certificate expires in {n} days",
  "replica lag: {n}s behind primary",
];

const ERROR_LOGS = [
  "upstream connection refused: {code}",
  "unhandled exception in worker-{n}",
  "database timeout after {n}ms",
  "authentication failed for service-{n}",
  "rate limit exceeded: retry after {n}ms",
  "deadlock detected on table 'sessions'",
  "out of memory: process worker-{n} terminated",
  "connection reset by peer: {n}.{n2}.{n3}.{n4}:{port}",
];

const ERROR_CODES = [500, 502, 503, 504, 429, 408];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fill(tpl: string): string {
  return tpl
    .replace("{n}", String(rand(1, 999)))
    .replace("{n2}", String(rand(1, 500)))
    .replace("{n3}", String(rand(1, 255)))
    .replace("{n4}", String(rand(1, 255)))
    .replace("{port}", String(rand(1024, 65535)))
    .replace("{code}", String(pick(ERROR_CODES)));
}

function generateLine(): {
  text: string;
  type: "info" | "warn" | "error";
} {
  const ts = new Date().toISOString().replace("T", " ").slice(0, 19);
  const r = Math.random();

  if (r < 0.12) {
    return { text: `[${ts}] [ERROR] ${fill(pick(ERROR_LOGS))}`, type: "error" };
  }
  if (r < 0.35) {
    return { text: `[${ts}] [WARN] ${fill(pick(WARN_LOGS))}`, type: "warn" };
  }
  return { text: `[${ts}] [INFO] ${fill(pick(INFO_LOGS))}`, type: "info" };
}

export default function LogWatch() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [logs, setLogs] = useState<{ text: string; type: string }[]>([]);
  const [score, setScore] = useState<Score>({
    detected: 0,
    missed: 0,
    falseAlarms: 0,
  });
  const [timeLeft, setTimeLeft] = useState(20);

  const containerRef = useRef<HTMLDivElement>(null);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushLog = useCallback(() => {
    const line = generateLine();
    setLogs((prev) => [...prev.slice(-50), line]);

    if (line.type === "error") {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => {
        setScore((prev) => ({ ...prev, missed: prev.missed + 1 }));
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(pushLog, 600 + Math.random() * 600);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, [gameState, pushLog]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();

      if (errorTimeoutRef.current !== null) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
        setScore((prev) => ({ ...prev, detected: prev.detected + 1 }));
      } else {
        setScore((prev) => ({ ...prev, falseAlarms: prev.falseAlarms + 1 }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const start = () => {
    setLogs([]);
    setScore({ detected: 0, missed: 0, falseAlarms: 0 });
    setTimeLeft(20);
    setGameState("playing");
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = null;
  };

  const totalErrors = score.detected + score.missed;
  const rate = totalErrors > 0 ? Math.round((score.detected / totalErrors) * 100) : 0;

  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      {gameState === "idle" && (
        <button
          onClick={start}
          className="caption-mono text-text-muted hover:text-accent transition-colors"
          aria-label="Start log watch"
        >
          [TAIL_FEED] press to initialize
        </button>
      )}

      {gameState === "playing" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="caption-mono text-accent">
              LOG_WATCH &#8212; {timeLeft}s
            </span>
            <span className="caption-mono text-text-muted">
              HITS: {score.detected} | FA: {score.falseAlarms}
            </span>
          </div>
          <div
            ref={containerRef}
            className="bg-black/40 border border-border h-48 overflow-y-auto p-3 font-mono text-[11px] leading-relaxed"
          >
            {logs.length === 0 && (
              <span className="text-text-muted">Awaiting log stream...</span>
            )}
            {logs.map((log, i) => (
              <div
                key={i}
                className={`${
                  log.type === "error"
                    ? "text-red-400/90"
                    : log.type === "warn"
                      ? "text-accent/80"
                      : "text-text-muted"
                } whitespace-pre-wrap`}
              >
                {log.text}
              </div>
            ))}
          </div>
          <p className="caption-mono text-text-muted mt-1.5">
            Press &lt;SPACE&gt; on [ERROR]
          </p>
        </div>
      )}

      {gameState === "finished" && (
        <div className="border border-accent/30 bg-accent/5 py-3 px-4">
          <p className="label-mono text-accent mb-2">SCORE</p>
          <div className="space-y-0.5 caption-mono text-text-secondary">
            <p>DETECTED: {score.detected}</p>
            <p>MISSED: {score.missed}</p>
            <p>FALSE_ALARMS: {score.falseAlarms}</p>
            <p className="text-accent pt-1">
              DETECTION_RATE: {rate}%
            </p>
          </div>
          <button
            onClick={start}
            className="data-mono text-xs text-accent hover:text-text-primary transition-colors mt-2"
          >
            [PLAY_AGAIN]
          </button>
        </div>
      )}
    </div>
  );
}
