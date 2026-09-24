"use client";

import { personal as personalData } from "@/data/personal";
import { useLocale } from "@/lib/locale-context";

export default function Footer() {
  const { locale, t } = useLocale();
  const personal = personalData[locale];

  const links = [
    { label: t("LINK_LINKEDIN"), href: personal.linkedin },
    { label: t("LINK_GITHUB"), href: personal.github },
    { label: t("LINK_CV"), href: personal.cvUrl },
  ];

  return (
    <footer
      className="border-t border-line bg-paper-2/50 pb-28 md:pb-24"
      data-testid="footer"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-[15px] font-bold tracking-tight text-ink">
            {personal.name}
          </p>
          <p className="meta text-ink-mute mt-1">{t("FOOTER_ROLE")}</p>
          <p className="meta text-ink-mute mt-0.5">
            {t("FOOTER_MADE")} · 2022–2026
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Footer">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="text-sm font-medium text-ink-soft hover:text-signal link-sweep py-1 min-h-11 inline-flex items-center transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}