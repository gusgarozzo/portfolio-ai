"use client";

import { recommendations as recommendationsData } from "@/data/recommendations";
import { useLocale } from "@/lib/locale-context";
import { useReveal } from "@/lib/use-reveal";
import type { Recommendation } from "@/types/portfolio";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function RecommendationCard({
  recommendation,
  index,
}: {
  recommendation: Recommendation;
  index: number;
}) {
  return (
    <article
      className={`reveal ${
        index % 2 === 1 ? "md:mt-12" : ""
      } flex h-full flex-col rounded-xl border border-line bg-paper p-6 md:p-8`}
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-[13px] font-semibold text-signal-strong"
        >
          {initials(recommendation.name)}
        </span>
        <div className="min-w-0">
          <h3 className="display-card text-ink">{recommendation.name}</h3>
          <p className="meta text-signal mt-1">{recommendation.role}</p>
          <p className="meta text-ink-mute mt-0.5">{recommendation.company}</p>
        </div>
      </div>
      <blockquote className="mt-6 border-t border-line pt-6">
        <p className="body-md text-ink-soft whitespace-pre-line">
          {recommendation.text}
        </p>
      </blockquote>
    </article>
  );
}

export default function Recommendations() {
  const { locale, t } = useLocale();
  const recommendations = recommendationsData[locale];
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="recomendaciones"
      ref={ref}
      className="scroll-mt-24 border-t border-line"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <div>
            <p className="eyebrow text-signal">{t("RECS_EYEBROW")}</p>
            <h2 className="display-section text-ink mt-4">{t("RECS_TITLE")}</h2>
          </div>
          <p className="body-md text-ink-soft max-w-[46ch]">{t("RECS_INTRO")}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((recommendation, index) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}