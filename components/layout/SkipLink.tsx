"use client";

import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/messages";

export default function SkipLink() {
  const { locale } = useLocale();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-paper focus:text-ink focus:rounded-md focus:border focus:border-line-strong focus:px-4 focus:min-h-11 focus:inline-flex focus:items-center"
    >
      {t("SKIP_TO_CONTENT", locale)}
    </a>
  );
}