"use client";

import ProjectCard from "./ProjectCard";
import { projects as projectsData } from "@/data/projects";
import { useLocale } from "@/lib/locale-context";
import { useReveal } from "@/lib/use-reveal";
import type { Project } from "@/types/portfolio";

function TierGrid({ items, accentId = "" }: { items: Project[]; accentId?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((project, index) => (
        <div key={project.id} className={`reveal ${index % 2 === 1 ? "md:mt-12" : ""}`}>
          <ProjectCard project={project} accent={project.id === accentId} />
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  const { locale, t } = useLocale();
  const projects = projectsData[locale];
  const byId = new Map(projects.map((project) => [project.id, project]));
  const featured = byId.get("barking-dogs")!;
  const imageTier = [
    byId.get("weather-api")!,
    byId.get("watchdog-price-tracker")!,
  ];
  const codeTier = [
    byId.get("sinergy-consulting")!,
    byId.get("clickcore-agency")!,
  ];
  const ref = useReveal<HTMLElement>();

  return (
    <section id="projects" ref={ref} className="scroll-mt-24 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <div>
            <p className="eyebrow text-signal">{t("PROJECTS_EYEBROW")}</p>
            <h2 className="display-section text-ink mt-4">{t("PROJECTS_TITLE")}</h2>
          </div>
          <p className="body-md text-ink-soft max-w-[46ch]">{t("PROJECTS_INTRO")}</p>
        </div>

        <div className="mt-14 space-y-6 reveal">
          <ProjectCard project={featured} featured />
        </div>

        <div className="mt-6">
          <TierGrid items={imageTier} accentId="weather-api" />
        </div>

        <div className="mt-6">
          <TierGrid items={codeTier} />
        </div>
      </div>
    </section>
  );
}