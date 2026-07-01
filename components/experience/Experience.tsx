"use client";

import { experience as experienceData } from "@/data/experience";
import { useLocale } from "@/lib/locale-context";
import { useState } from "react";

export default function Experience() {
  const { locale, t } = useLocale();
  const experience = experienceData[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const current = experience[activeIndex];

  return (
    <div className="grid grid-cols-12 min-h-[50vh]">
      <div className="col-span-12 md:col-span-4 vertical-border p-8 md:p-12 flex flex-col justify-center">
        <p className="label-mono text-accent mb-6">
          {t("TENURE_MANIFEST")}
        </p>
        <div className="space-y-1">
          {experience.map((exp, i) => (
            <button
              key={exp.id}
              onClick={() => setActiveIndex(i)}
              className={`w-full text-left px-4 py-3 transition-all duration-300 ${
                i === activeIndex
                  ? "bg-surface-accent border-l-2 border-accent"
                  : "hover:bg-surface-accent/50 border-l-2 border-transparent"
              }`}
            >
              <span className="data-mono text-text-primary block">
                {exp.company}
              </span>
              <span className="caption-mono text-text-muted">
                {exp.role}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-12 md:col-span-8 p-8 md:p-12">
        <h3 className="headline-md text-text-primary mb-2">
          {current.company}
        </h3>
        <p className="label-mono text-accent mb-1">{current.role}</p>
        <p className="caption-mono text-text-muted mb-6">
          <span>{current.period}</span>
          <span className="mx-2">·</span>
          <span>{current.location}</span>
        </p>
        <div className="space-y-4">
          {current.highlights.map((h, i) => (
            <div key={i} className="flex gap-4">
              <span className="data-mono text-accent shrink-0 mt-0.5">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <p className="body-md text-text-secondary">{h}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
