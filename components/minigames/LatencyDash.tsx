"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { endpoints, dashboardMeta } from "@/data/endpoints";

const MAX_LATENCY = 350;

const ERROR_POOL = [
  "[503] upstream_timeout",
  "[502] bad_gateway",
  "[504] gateway_timeout",
  "[429] rate_limit_exceeded",
  "[500] internal_error",
  "[503] service_unavailable",
  "[403] forbidden",
];

interface EndpointResult {
  status: "idle" | "success" | "error";
  latency: number;
  errorMsg: string | null;
}

function getRandomLatency(base: number): number {
  const variance = base * (0.3 + Math.random() * 0.5);
  return Math.round(base + variance);
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LatencyDash() {
  const [results, setResults] = useState<Record<string, EndpointResult>>(
    Object.fromEntries(
      endpoints.map((e) => [e.id, { status: "idle" as const, latency: 0, errorMsg: null }]),
    ),
  );
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setBarRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) barRefs.current.set(id, el);
    else barRefs.current.delete(id);
  }, []);

  const stats = (() => {
    const vals = Object.values(results);
    const errors = vals.filter((r) => r.status === "error").length;
    const successLatencies = vals.filter((r) => r.status === "success").map((r) => r.latency);
    const avg =
      successLatencies.length > 0
        ? Math.round(successLatencies.reduce((a, b) => a + b, 0) / successLatencies.length)
        : null;
    return { total: endpoints.length, errors, avg };
  })();

  useEffect(() => {
    const bars = barRefs.current;
    return () => {
      bars.forEach((bar) => gsap.killTweensOf(bar));
    };
  }, []);

  const runHealthCheck = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);

    const outcomes: Record<string, { latency: number; errorMsg: string | null }> = {};
    endpoints.forEach((ep) => {
      const latency = getRandomLatency(ep.baseLatency);
      const error = Math.random() < ep.errorRate;
      outcomes[ep.id] = { latency, errorMsg: error ? pickRandom(ERROR_POOL) : null };
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setResults((prev) =>
          Object.fromEntries(
            Object.entries(prev).map(([id, r]) => {
              const o = outcomes[id];
              return [id, { ...r, status: o.errorMsg ? "error" : "success", latency: o.latency }];
            }),
          ),
        );
        setIsRunning(false);
      },
    });

    endpoints.forEach((ep) => {
      const bar = barRefs.current.get(ep.id);
      if (!bar) return;
      const o = outcomes[ep.id];
      const pct = Math.min((o.latency / MAX_LATENCY) * 100, 100);

      tl.set(bar, { width: "0%" }, `+=0`);
      tl.to(bar, { width: `${pct}%`, duration: 0.8, ease: "power2.out" }, `-=0.6`);
    });
  }, [isRunning]);

  const handleRecover = useCallback(
    (id: string) => {
      if (isRunning) return;
      const result = results[id];
      if (result.status !== "error") return;

      const ep = endpoints.find((e) => e.id === id);
      if (!ep) return;

      const bar = barRefs.current.get(id);
      if (!bar) return;

      const recoveryLatency = getRandomLatency(ep.baseLatency * 0.6);
      const pct = Math.min((recoveryLatency / MAX_LATENCY) * 100, 100);

      gsap.to(bar, {
        width: `${pct}%`,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          setResults((prev) => ({
            ...prev,
            [id]: { status: "success", latency: recoveryLatency, errorMsg: null },
          }));
        },
      });
    },
    [results, isRunning],
  );

  return (
    <div className="grid grid-cols-12 min-h-[50vh]" ref={containerRef}>
      <div className="col-span-12 md:col-span-4 vertical-border p-8 md:p-12 flex flex-col justify-center">
        <p className="label-mono text-accent mb-3">SYS_DASHBOARD</p>
        <h2 className="headline-md text-text-primary mb-4">Health Check Dashboard</h2>
        <p className="caption-mono text-text-muted">
          Live API health monitoring panel. Each endpoint runs a simulated health check with
          realistic latency and error rates.
        </p>
      </div>

      <div className="col-span-12 md:col-span-8 p-8 md:p-12">
        <div className="bg-surface-deep border border-border">
          <div className="flex items-center justify-between px-6 py-3 border-b border-border">
            <span className="data-mono text-text-primary text-xs tracking-wider">
              {dashboardMeta.title}
            </span>
            <span className="caption-mono text-accent">
              UPTIME: {dashboardMeta.uptime}%
            </span>
          </div>

          <div className="px-6 py-5 space-y-5">
            {endpoints.map((ep) => {
              const result = results[ep.id];
              const isError = result.status === "error";
              const isIdle = result.status === "idle";
              const isSuccess = result.status === "success";
              const barWidth = isSuccess || isError ? Math.min((result.latency / MAX_LATENCY) * 100, 100) : 0;

              return (
                <div key={ep.id}>
                  <div className="flex items-center gap-4">
                    <span className="data-mono text-text-secondary w-32 shrink-0 text-xs">
                      {ep.label}
                    </span>

                    <div className="flex-1 h-2 bg-surface relative rounded overflow-hidden">
                      <div
                        ref={(el) => setBarRef(ep.id, el)}
                        style={{ width: isSuccess || isError ? `${barWidth}%` : "0%" }}
                        className={`h-full ${isError ? "bg-red-500/60" : "bg-accent"} rounded transition-colors duration-300`}
                      />
                    </div>

                    {!isIdle && (
                      <span
                        className={`data-mono text-xs w-16 text-right shrink-0 ${isError ? "text-red-400" : "text-text-primary"}`}
                      >
                        {result.latency}ms
                      </span>
                    )}

                    {isIdle && <span className="w-16" />}

                    <button
                      onClick={() => handleRecover(ep.id)}
                      disabled={!isError || isRunning}
                      aria-label={isError ? `Restart ${ep.label}` : undefined}
                      className={`w-3 h-3 rounded-full shrink-0 border border-border transition-colors ${
                        isError
                          ? "bg-red-500/60 border-red-500/60 cursor-pointer hover:bg-accent hover:border-accent"
                          : isSuccess
                            ? "bg-accent"
                            : "bg-surface"
                      }`}
                    />
                  </div>

                  {isError && result.errorMsg && (
                    <div className="flex items-center gap-2 mt-1.5 ml-36">
                      <span className="caption-mono text-red-400/70 text-[11px]">
                        {result.errorMsg}
                      </span>
                      <span className="caption-mono text-accent/60 text-[11px] cursor-pointer hover:text-accent transition-colors">
                        [click pip to recover]
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-6 py-3 border-t border-border flex justify-center">
            <button
              onClick={runHealthCheck}
              disabled={isRunning}
              className="data-mono text-xs px-5 py-2 bg-surface border border-border text-text-secondary hover:bg-surface-accent hover:text-accent hover:border-accent transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Run health check"
            >
              {isRunning ? "RUNNING..." : `[ ${dashboardMeta.cta} ]`}
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 px-6 py-2.5 border-t border-border caption-mono text-text-muted text-[11px]">
            <span>ENDPOINTS: {stats.total}</span>
            <span className="text-border">|</span>
            <span className={stats.errors > 0 ? "text-red-400" : ""}>
              ERRORS: {stats.errors}
            </span>
            <span className="text-border">|</span>
            <span>AVG: {stats.avg !== null ? `${stats.avg}ms` : "---"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
