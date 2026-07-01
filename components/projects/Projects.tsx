"use client";

import Image from "next/image";
import { projects as projectsData } from "@/data/projects";
import { useLocale } from "@/lib/locale-context";
import Badge from "@/components/ui/Badge";

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function Projects() {
  const { locale, t } = useLocale();
  const projects = projectsData[locale];

  return (
    <div className="py-8 md:py-12 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const Wrapper = project.url
            ? ({ children }: { children: React.ReactNode }) => (
                <a
                  href={project.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-surface border border-border flex flex-col"
                >
                  {children}
                </a>
              )
            : ({ children }: { children: React.ReactNode }) => (
                <div className="group bg-surface border border-border flex flex-col">
                  {children}
                </div>
              );

          return (
            <Wrapper key={project.id}>
              <div className="relative h-[180px] md:h-[200px] bg-surface-deep overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <span className="label-mono text-accent">
                    {project.code}
                  </span>
                </div>
                {project.url && (
                  <div className="absolute top-4 right-4">
                    <span className="caption-mono text-accent border border-accent/40 px-2 py-0.5">
                      {project.url.includes("play.google.com")
                        ? t("OPEN_APP")
                        : t("VISIT_SITE")}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="headline-md text-text-primary mb-2 group-hover:text-accent transition-colors text-[28px]">
                  {project.name}
                </h3>
                {project.url && (
                  <p className="caption-mono text-text-muted mb-3">
                    {extractDomain(project.url)}
                  </p>
                )}
                <p className="body-md text-text-secondary mb-4 flex-1">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="border-t border-border pt-4 mb-4 space-y-1.5">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex justify-between items-center data-mono opacity-60 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="text-text-muted">{m.label}</span>
                        <span className="text-accent">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
