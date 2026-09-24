"use client";

import Image from "next/image";
import { cta } from "@/components/ui/cta-classes";
import { personal as personalData } from "@/data/personal";
import { summary as summaryData } from "@/data/summary";
import { useLocale } from "@/lib/locale-context";
import { useReveal } from "@/lib/use-reveal";

export default function Hero() {
  const { locale, t } = useLocale();
  const personal = personalData[locale];
  const summary = summaryData[locale];
  const { experience, seniority } = personal.heroStats;
  const firstSentence = summary.trim().match(/^[^.!?]*[.!?]/)?.[0] ?? summary;
  const locationShort = (() => {
    const parts = personal.location.split(",").map((part) => part.trim());
    return parts.length > 1
      ? `${parts[0]}, ${parts[parts.length - 1]}`
      : parts[0];
  })();
  const ref = useReveal<HTMLElement>();

  const facts = [
    { value: experience, label: t("FACT_EXPERIENCE") },
    { value: seniority, label: t("FACT_SENIORITY") },
    { value: locationShort, label: t("FACT_LOCATION") },
  ];

  return (
    <section id="top" ref={ref} className="relative scroll-mt-24" data-testid="hero-section">
      <div className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-16 pb-16 md:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        <div className="lg:col-span-7 xl:col-span-6 reveal">
          <p className="eyebrow text-signal">{t("HERO_KICKER")}</p>
          <h1 className="display-hero text-ink mt-5">
            {personal.name}
          </h1>
          <p className="mt-3 text-[1.0625rem] md:text-[1.125rem] font-medium leading-relaxed text-ink">
            {personal.subtitle}
          </p>
          <p className="display-card text-ink mt-7">
            {t("HERO_SUMMARY_LEAD")}
          </p>
          <p className="body-lg text-ink-soft mt-6 max-w-[56ch]">
            {firstSentence}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={cta.primary}>
              {t("SEE_PROJECTS")}
            </a>
            <a href="#contact" className={cta.secondary}>
              {t("HERO_CONTACT_CTA")}
            </a>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-1">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cta.text}
            >
              LinkedIn
              <span aria-hidden="true">↗</span>
            </a>
            <a href={personal.cvUrl} download className={cta.text}>
              {t("DOWNLOAD_CV")}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 md:gap-10 border-t border-line pt-8">
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="font-display text-[1.05rem] md:text-xl font-bold tracking-tight text-ink">
                  {fact.value}
                </p>
                <p className="meta text-ink-mute mt-2">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-6 reveal">
          <figure className="relative overflow-hidden rounded-xl border border-line bg-paper-2">
            <Image
              src="/images/portrait.webp"
              alt={t("PORTRAIT_ALT")}
              width={717}
              height={960}
              sizes="(min-width:1024px) 44vw, 92vw"
              className="aspect-[4/5] w-full object-cover object-[center_25%]"
              priority
            />
          </figure>
        </div>
      </div>
    </section>
  );
}