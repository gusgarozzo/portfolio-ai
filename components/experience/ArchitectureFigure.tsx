"use client";

import { useLocale } from "@/lib/locale-context";

function Arrow() {
  return (
    <div className="flex justify-center py-1" aria-hidden="true">
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
        className="text-signal"
      >
        <line x1="6" y1="0" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="2,10 10,10 6,15" fill="currentColor" />
      </svg>
    </div>
  );
}

function Box({ title, sub }: { title: string; sub?: string }) {
  return (
    <div
      data-testid="arch-box"
      className="rounded-[7px] border border-line bg-white/70 px-3 py-2.5 text-center"
    >
      <p data-testid="arch-box-title" className="text-sm font-semibold leading-snug text-ink">
        {title}
      </p>
      {sub && (
        <p data-testid="arch-box-sub" className="mt-0.5 text-xs leading-snug text-ink-mute">
          {sub}
        </p>
      )}
    </div>
  );
}

function ColumnLabel({ text }: { text: string }) {
  return (
    <p data-testid="arch-col-label" className="mb-2 text-xs font-medium leading-snug text-ink-mute">
      {text}
    </p>
  );
}

export default function ArchitectureFigure() {
  const { t } = useLocale();

  return (
    <div role="img" aria-label={t("FIGURE_ARIA")}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <div>
          <ColumnLabel text={t("FIG_COL_AIOTEK")} />
          <div className="flex flex-col">
            <Box title={t("FIG_BOX_CLIENTS")} sub={t("FIG_BOX_CLIENTS_SUB")} />
            <Arrow />
            <Box title={t("FIG_BOX_APIS")} sub={t("FIG_BOX_APIS_SUB")} />
            <Arrow />
            <Box title={t("FIG_BOX_FTP")} sub={t("FIG_BOX_FTP_SUB")} />
            <Arrow />
            <div className="grid grid-cols-2 gap-3">
              <Box title={t("FIG_BOX_POSTGRES")} sub={t("FIG_BOX_POSTGRES_SUB")} />
              <Box title={t("FIG_BOX_REDIS")} sub={t("FIG_BOX_REDIS_SUB")} />
            </div>
          </div>
        </div>

        <div>
          <ColumnLabel text={t("FIG_COL_QWAVEE")} />
          <div className="flex flex-col">
            <Box title={t("FIG_BOX_GATEWAY")} />
            <Arrow />
            <Box title={t("FIG_BOX_LAMBDA")} sub={t("FIG_BOX_LAMBDA_SUB")} />
            <Arrow />
            <Box title={t("FIG_BOX_S3")} sub={t("FIG_BOX_S3_SUB")} />
          </div>
        </div>

        <div data-testid="arch-band" className="md:col-span-2">
          <div className="rounded-lg border border-line bg-signal-tint px-4 py-3 text-center">
            <p data-testid="arch-band-title" className="text-sm font-semibold text-signal">
              {t("FIG_BAND_SUPPORT")}
            </p>
            <p data-testid="arch-band-sub" className="mt-0.5 text-xs leading-snug text-ink-soft">
              {t("FIG_BAND_SUPPORT_SUB")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}