"use client";

import { skills as skillsData } from "@/data/skills";
import { useLocale } from "@/lib/locale-context";
import { useReveal } from "@/lib/use-reveal";
import type { SkillCategory } from "@/types/portfolio";

export default function Skills() {
  const { locale, t } = useLocale();
  const skills = skillsData[locale];
  const ref = useReveal<HTMLElement>();

  const groups: {
    label: string;
    items: string[];
    key: keyof SkillCategory;
    highlight?: boolean;
  }[] = [
    { label: t("SKILLS_TIER_CORE"), items: skills.core, key: "core" },
    {
      label: t("SKILLS_TIER_SUPPORTING"),
      items: skills.supporting,
      key: "supporting",
    },
    {
      label: t("SKILLS_TIER_LEARNING"),
      items: skills.learning,
      key: "learning",
    },
    { label: t("SKILLS_AI_LINE"), items: skills.ai, key: "ai", highlight: true },
  ];

  return (
    <section id="skills" ref={ref} className="scroll-mt-24 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <div>
            <p className="eyebrow text-signal">{t("SKILLS_EYEBROW")}</p>
            <h2 className="display-section text-ink mt-4">{t("SKILLS_TITLE")}</h2>
          </div>
          <p className="body-md text-ink-soft max-w-[46ch]">{t("SKILLS_INTRO")}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div
              key={group.key}
              className={`reveal rounded-xl border p-6 md:p-8 ${
                group.highlight
                  ? "bg-signal-tint border-signal/40"
                  : "bg-paper border-line"
              }`}
            >
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                {group.label}
              </h3>
              <ul className="mt-5 divide-y divide-line">
                {group.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-3 py-2.5">
                    <span
                      className="mt-[0.55rem] size-1.5 shrink-0 rounded-[2px] bg-signal"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] leading-relaxed text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              {group.highlight && (
                <div className="mt-6 pt-4 border-t border-signal/30 flex flex-wrap items-center justify-between gap-3">
                  <span className="meta text-ink-soft">
                    {t("SKILLS_AI_NOTE")}
                  </span>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:text-signal-strong min-h-11 py-2"
                  >
                    {t("SKILLS_AI_CTA")} →
                  </a>
                </div>
              )}
              {group.key === "supporting" && (
                <p className="mt-6 pt-4 border-t border-line meta text-ink-mute leading-relaxed">
                  {t("SKILLS_GCP_NOTE")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}