"use client";

import { useLocale } from "@/lib/locale-context";
import type { Project } from "@/types/portfolio";

const categoryKeys: Record<string, string> = {
  studio: "PROJECT_CAT_STUDIO",
  "co-founded-product": "PROJECT_CAT_COFOUNDED",
  personal: "PROJECT_CAT_PERSONAL",
  "ai-experiment": "PROJECT_CAT_AI",
};

function linkLabelKey(url: string | null, t: (k: string) => string): string | null {
  if (!url) return null;
  if (url.includes("github.com")) return t("VIEW_CODE");
  if (url.includes("play.google.com")) return t("OPEN_APP");
  return t("VISIT_SITE");
}

export default function ProjectCard({
  project,
  featured = false,
  accent = false,
}: {
  project: Project;
  featured?: boolean;
  accent?: boolean;
}) {
  const { t } = useLocale();
  const label = linkLabelKey(project.url, t);

  const inner = (
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <div className="flex items-center gap-3">
        <span className="meta text-signal font-medium">
          {t(categoryKeys[project.category])}
        </span>
        {project.period && (
          <span className="meta text-ink-mute">· {project.period}</span>
        )}
      </div>
      <h3
        className={`display-card text-ink mt-4 transition-colors group-hover:text-signal ${
          featured ? "text-[clamp(1.8rem,3.4vw,2.6rem)]" : ""
        }`}
      >
        {project.name}
      </h3>
      <p className="meta text-ink-mute mt-1.5">{project.subtitle}</p>
      {featured && (
        <p className="meta text-ink-soft mt-1.5">{project.role}</p>
      )}
      <p className="body-md text-ink-soft mt-4 flex-1">{project.description}</p>
      <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="meta text-ink-mute">{project.stack.join(" · ")}</p>
        {label && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal shrink-0">
            {label}
            <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        )}
      </div>
    </div>
  );

  const classes = `group flex flex-col rounded-xl border bg-paper transition-colors ${
    accent
      ? "border-signal/40 hover:border-signal/70"
      : "border-line hover:border-signal/50"
  }`;

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={`${project.name} — ${label ?? project.subtitle}`}
      >
        {inner}
      </a>
    );
  }

  return <article className={classes}>{inner}</article>;
}