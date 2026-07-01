"use client";

import { personal as personalData } from "@/data/personal";
import { summary as summaryData } from "@/data/summary";
import { useLocale } from "@/lib/locale-context";
import Button from "@/components/ui/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { locale, t } = useLocale();
  const personal = personalData[locale];
  const summary = summaryData[locale];
  const { heroStats } = personal;
  const firstLine = summary.trim().split("\n")[0];
  const cmdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cmdRef.current) {
        const text = cmdRef.current.textContent || "";
        cmdRef.current.textContent = "";
        gsap.to(cmdRef.current, {
          duration: 0.03 * text.length,
          ease: "none",
          onUpdate: function () {
            const progress = Math.floor(this.progress() * text.length);
            if (cmdRef.current) {
              cmdRef.current.textContent = text.slice(0, progress);
            }
          },
          scrollTrigger: {
            trigger: cmdRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section data-testid="hero-section" className="section-border">
      <div className="grid grid-cols-12 min-h-[70vh]">
        <div className="col-span-12 md:col-span-4 vertical-border p-8 md:p-12 flex flex-col justify-center">
          <h1 className="display-lg text-text-primary mb-6">
            {personal.title.split(" ")[0]}{" "}
            <span className="italic text-accent">
              {personal.title.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="body-lg text-text-secondary mb-8">{firstLine}</p>
          <div className="space-y-3 mb-8">
            <div ref={cmdRef} className="data-mono text-text-muted">
              <span className="text-accent">[ CMD ]</span> INITIATE_HANDSHAKE
            </div>
            <a
              href={`mailto:${personal.email}`}
              className="data-mono text-accent hover:underline block"
            >
              {personal.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary">LinkedIn</Button>
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">GitHub</Button>
            </a>
          </div>
        </div>

        <div className="hidden md:col-span-5 md:flex relative overflow-hidden bg-surface-deep items-center justify-center">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 50%, rgba(197,160,89,0.05) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(197,160,89,0.03) 0%, transparent 40%),
                radial-gradient(circle at 50% 70%, rgba(197,160,89,0.04) 0%, transparent 45%),
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(197,160,89,0.03) 40px, rgba(197,160,89,0.03) 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(197,160,89,0.03) 40px, rgba(197,160,89,0.03) 41px)
              `,
            }}
          />
          <div
            className="absolute w-24 h-24 rounded-full animate-breathe"
            style={{
              top: "20%",
              left: "25%",
              background:
                "radial-gradient(circle, rgba(197,160,89,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute w-32 h-32 rounded-full animate-breathe-delayed"
            style={{
              bottom: "25%",
              right: "20%",
              background:
                "radial-gradient(circle, rgba(197,160,89,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute w-20 h-20 rounded-full animate-breathe-slow"
            style={{
              top: "60%",
              left: "15%",
              background:
                "radial-gradient(circle, rgba(197,160,89,0.1) 0%, transparent 70%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-surface-deep to-transparent" />
          <div className="relative z-10 px-8 text-center">
            <div className="label-mono text-accent mb-4">
              {t("LIVE_TELEMETRY")}
            </div>
            <div className="data-mono text-text-muted space-y-1 text-left inline-block">
              <TelemetryRow label={t("TELEM_NODE")} value="20.20.2" />
              <TelemetryRow label={t("TELEM_UPTIME")} value="99.97%" />
              <TelemetryRow label={t("TELEM_LATENCY")} value="42ms" />
              <TelemetryRow label={t("TELEM_THROUGHPUT")} value="1.2k rpm" />
              <TelemetryRow label={t("TELEM_MEMORY")} value="187 MB" isLast />
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3 p-8 md:p-12 flex flex-col justify-center gap-8">
          <StatBlock
            eyebrow={t("STAT_EXPERIENCE")}
            value={heroStats.experience}
          />
          <StatBlock
            eyebrow={t("STAT_STACK")}
            value={heroStats.primaryStack}
          />
          <StatBlock
            eyebrow={t("STAT_SENIORITY")}
            value={heroStats.seniority}
          />
        </div>
      </div>
    </section>
  );
}

function TelemetryRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex justify-between gap-6">
      <span>{label}</span>
      <span className="text-text-primary">
        {value}
        {isLast && (
          <span className="typewriter-cursor ml-0.5 text-accent">▌</span>
        )}
      </span>
    </div>
  );
}

function StatBlock({
  eyebrow,
  value,
}: {
  eyebrow: string;
  value: string;
}) {
  return (
    <div className="group">
      <p className="label-mono text-accent mb-2">{eyebrow}</p>
      <p className="headline-md text-text-primary group-hover:text-accent transition-colors">
        {value}
      </p>
      <div className="h-px w-0 bg-accent group-hover:w-full transition-all duration-500 mt-2" />
    </div>
  );
}
