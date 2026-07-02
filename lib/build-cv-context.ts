import { personal } from "@/data/personal";
import { summary } from "@/data/summary";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { aboutMe } from "@/data/about-me";

function formatList(items: string[]): string {
  return items.map((i) => `  - ${i}`).join("\n");
}

function buildLocaleSection(locale: "es" | "en"): string {
  const p = personal[locale];
  const exp = experience[locale];
  const proj = projects[locale];
  const sk = skills[locale];
  const certs = certifications[locale];
  const edu = education[locale];
  const about = aboutMe[locale];

  const lines: string[] = [];

  lines.push(`--- ${locale.toUpperCase()} ---`);
  lines.push("");

  lines.push(`Name: ${p.name}`);
  lines.push(`Title: ${p.title}`);
  lines.push(`Location: ${p.location}`);
  lines.push(`Email: ${p.email}`);
  lines.push(`Open to: ${p.openTo}`);
  lines.push("");

  lines.push("About:");
  lines.push(about);
  lines.push("");

  lines.push("Summary:");
  lines.push(summary[locale].trim());
  lines.push("");

  lines.push("Experience:");
  for (const e of exp) {
    lines.push(`  ${e.role} @ ${e.company} (${e.period})`);
    for (const h of e.highlights) {
      lines.push(`    - ${h}`);
    }
  }
  lines.push("");

  lines.push("Projects:");
  for (const pr of proj) {
    lines.push(`  ${pr.name} (${pr.subtitle}) — ${pr.role}`);
    lines.push(`    Stack: ${pr.stack.join(", ")}`);
    lines.push(`    Description: ${pr.description}`);
  }
  lines.push("");

  lines.push("Skills:");
  lines.push(`  Languages: ${sk.languages.join(", ")}`);
  lines.push(`  Frameworks: ${sk.frameworks.join(", ")}`);
  lines.push(`  Databases: ${sk.databases.join(", ")}`);
  lines.push(`  Cloud & Infrastructure: ${sk.cloud.join(", ")}`);
  lines.push(`  Architecture & Practices: ${sk.architecture.join(", ")}`);
  lines.push(`  Soft Skills: ${sk.soft.join(", ")}`);
  lines.push("");

  lines.push("Certifications:");
  for (const c of certs) {
    lines.push(`  ${c.name} — ${c.issuer} (${c.year})`);
  }
  lines.push("");

  lines.push("Education:");
  for (const e of edu) {
    lines.push(`  ${e.title} — ${e.institution}`);
    if (e.period) lines.push(`    Period: ${e.period}`);
    if (e.note) lines.push(`    Note: ${e.note}`);
  }
  lines.push("");

  return lines.join("\n");
}

export function buildCvContext(): string {
  return `${buildLocaleSection("es")}\n${buildLocaleSection("en")}`;
}
