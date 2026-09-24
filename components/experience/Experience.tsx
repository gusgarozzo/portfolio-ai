"use client";

import ArchitectureFigure from "./ArchitectureFigure";
import { experience as experienceData } from "@/data/experience";
import { useLocale } from "@/lib/locale-context";
import { useReveal } from "@/lib/use-reveal";

export default function Experience() {
  const { locale, t } = useLocale();
  const experience = experienceData[locale];
  const ref = useReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="scroll-mt-24 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <div>
            <p className="eyebrow text-signal">{t("EXP_EYEBROW")}</p>
            <h2 className="display-section text-ink mt-4">{t("EXP_TITLE")}</h2>
          </div>
          <p className="body-md text-ink-soft max-w-[46ch]">{t("EXP_INTRO")}</p>
        </div>

        <div className="mt-14 border-t border-line">
          {experience.map((entry) => (
            <article
              key={entry.id}
              className="grid lg:grid-cols-12 gap-x-8 gap-y-3 py-9 md:py-11 border-b border-line reveal"
            >
              <div className="lg:col-span-3 lg:pt-1">
                <p className="meta font-medium text-ink">{entry.period}</p>
                <p className="meta text-ink-mute mt-1.5">{entry.location}</p>
                <p className="meta text-ink-mute mt-1.5 lg:hidden">{entry.role}</p>
              </div>
              <div className="lg:col-span-9">
                <h3 className="display-card text-ink transition-colors group-hover:text-signal">
                  {entry.company}
                </h3>
                <p className="meta text-signal mt-1 hidden lg:block">{entry.role}</p>
                <ul className="mt-5 space-y-3.5">
                  {entry.highlights.map((highlight, index) => (
                    <li key={index} className="flex gap-3.5">
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-[2px] bg-signal"
                        aria-hidden="true"
                      />
                      <p className="body-md text-ink-soft max-w-[70ch]">
                        {highlight}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 reveal">
          <figure className="overflow-hidden rounded-xl border border-line bg-paper-2/70 p-5 md:p-8">
            <ArchitectureFigure />
            <figcaption className="mt-6 max-w-[68ch] text-sm leading-relaxed text-ink">
              {t("FIGURE_CAPTION")}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}