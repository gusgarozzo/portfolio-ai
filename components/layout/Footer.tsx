"use client";

import { personal as personalData } from "@/data/personal";
import { useLocale } from "@/lib/locale-context";

export default function Footer() {
  const { locale, t } = useLocale();
  const personal = personalData[locale];

  return (
    <footer
      className="border-t border-border mt-0"
      data-testid="footer"
    >
      <div className="flex items-center justify-between h-12 px-6 max-w-[1440px] mx-auto">
        <span className="caption-mono text-text-muted">
          {t("HYBRID_EDITION")}
        </span>
        <div className="flex items-center gap-6">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="caption-mono text-text-muted hover:text-accent transition-colors"
          >
            [ LINKEDIN ]
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="caption-mono text-text-muted hover:text-accent transition-colors"
          >
            [ GITHUB ]
          </a>
        </div>
        <span className="caption-mono text-text-muted">
          {t("VER")}
        </span>
      </div>
    </footer>
  );
}
