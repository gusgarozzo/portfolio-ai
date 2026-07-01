"use client";

import { certifications as certsData } from "@/data/certifications";
import { formatYear } from "@/lib/format-date";
import { useLocale } from "@/lib/locale-context";
import LogWatch from "@/components/minigames/LogWatch";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const { locale, t } = useLocale();
  const certifications = certsData[locale];
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (listRef.current) {
        const lines = listRef.current.querySelectorAll(".terminal-line");
        gsap.fromTo(
          lines,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-[50vh]">
      <div className="col-span-12 md:col-span-4 vertical-border p-8 md:p-12 flex flex-col justify-center">
        <p className="label-mono text-accent mb-3">
          {t("AUDIT_LOG")}
        </p>
        <h2 className="headline-md text-text-primary mb-4">
          {t("CERT_TITLE")}
        </h2>
        <p className="caption-mono text-text-muted">
          {t("LAST_PARSED")}: {new Date().toISOString().split("T")[0]}
        </p>
      </div>

      <div className="col-span-12 md:col-span-8 p-8 md:p-12">
        <div
          ref={listRef}
          className="bg-surface-deep px-8 py-6 max-h-[500px] overflow-y-auto"
        >
          {certifications.map((cert) => (
            <div
              key={`${cert.name}-${cert.year}`}
              className="terminal-line flex items-baseline gap-4 py-2.5 hover:bg-surface-accent/30 px-2 -mx-2 transition-colors"
            >
              <span className="data-mono text-accent shrink-0 w-12">
                [{formatYear(cert.year)}]
              </span>
              <span className="data-mono text-text-primary flex-1">
                {cert.name}
              </span>
              <span className="caption-mono text-text-muted shrink-0">
                {cert.issuer}
              </span>
            </div>
          ))}
        </div>
        <LogWatch />
      </div>
    </div>
  );
}
