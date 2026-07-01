"use client";

import { skills as skillsData } from "@/data/skills";
import { useLocale } from "@/lib/locale-context";

export default function Skills() {
  const { locale, t } = useLocale();
  const skills = skillsData[locale];

  const topologies = [
    { label: t("TOPOLOGY_LANGUAGES"), items: skills.languages },
    { label: t("TOPOLOGY_INFRASTRUCTURE"), items: [...skills.databases, ...skills.cloud] },
    { label: t("TOPOLOGY_MINDSET"), items: [...skills.architecture, ...skills.soft] },
  ];

  return (
    <div className="relative py-8 md:py-12 px-6 md:px-12 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <path
          d="M600,50 Q400,150 200,100 Q100,80 50,200 M600,50 Q800,150 1000,100 Q1100,80 1150,200 M600,50 L600,550 M200,100 Q300,300 200,500 M1000,100 Q900,300 1000,500 M50,200 Q200,300 350,300 M1150,200 Q1000,300 850,300 M350,300 Q500,400 600,550 M850,300 Q700,400 600,550"
          stroke="#c5a059"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      <p className="label-mono text-accent text-center mb-2 relative z-10">
        {t("ARCHITECTURE_TOPOLOGY")}
      </p>

      <div className="flex justify-center mb-12 relative z-10">
        <div className="inline-block px-8 py-3 border border-accent bg-surface-accent/20">
          <span className="label-mono text-accent">{t("BACKEND_CORE")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {topologies.map((group) => (
          <div key={group.label} className="flex flex-col items-center">
            <p className="label-mono text-text-muted mb-6">{group.label}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-block px-4 py-2 border border-border data-mono text-text-secondary hover:border-accent hover:text-accent transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
