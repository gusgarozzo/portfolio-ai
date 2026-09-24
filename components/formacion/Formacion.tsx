"use client";

import { education as educationData } from "@/data/education";
import { certifications as certsData } from "@/data/certifications";
import { useLocale } from "@/lib/locale-context";
import { useReveal } from "@/lib/use-reveal";
import type { Certification } from "@/types/portfolio";

const byYearThenName = (a: Certification, b: Certification) =>
  b.year - a.year || a.name.localeCompare(b.name);

function CertRow({ cert }: { cert: Certification }) {
  return (
    <li
      key={`${cert.name}-${cert.year}`}
      className="flex items-baseline gap-4 py-3 border-b border-line last:border-b-0"
    >
      <span className="meta text-signal w-10 shrink-0">{cert.year}</span>
      <span className="flex-1 text-[15px] leading-relaxed text-ink">{cert.name}</span>
      <span className="meta text-ink-mute shrink-0 hidden sm:block">{cert.issuer}</span>
    </li>
  );
}

export default function Formacion() {
  const { locale, t } = useLocale();
  const education = educationData[locale];
  const certifications = [...certsData[locale]].sort(byYearThenName);
  const featuredList = certifications.filter((cert) => cert.featured);
  const rest = certifications.filter((cert) => !cert.featured);
  const showMore = t("CERT_SHOW_MORE").replace("{n}", String(rest.length));
  const ref = useReveal<HTMLElement>();

  return (
    <section id="formacion" ref={ref} className="scroll-mt-24 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-4 reveal">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-signal">{t("FORMATION_EYEBROW")}</p>
            <h2 className="display-section text-ink mt-4">{t("FORMATION_TITLE")}</h2>
            <p className="meta text-ink-mute mt-5 leading-relaxed">
              {t("CERT_SUB")}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="reveal">
            <h3 className="display-card text-ink">{t("EDUCATION_TITLE")}</h3>
            <dl className="mt-5 border-t border-line">
              {education.map((item) => (
                <div
                  key={`${item.title}-${item.institution}`}
                  className="py-5 border-b border-line"
                >
                  <dt className="text-[16px] font-semibold leading-snug text-ink">
                    {item.title}
                  </dt>
                  <dd className="meta text-ink-mute mt-1.5">{item.institution}</dd>
                  {(item.period || item.note) && (
                    <dd className="meta text-ink-soft mt-1">
                      {[item.period, item.note].filter(Boolean).join(" · ")}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 reveal">
            <h3 className="display-card text-ink">{t("CERT_TITLE")}</h3>
            <ul className="mt-5 border-t border-line">
              {featuredList.map((cert) => (
                <CertRow key={`${cert.name}-${cert.year}`} cert={cert} />
              ))}
            </ul>

            {rest.length > 0 && (
              <details className="group mt-2 border-b border-line">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-semibold text-signal hover:text-signal-strong [&::-webkit-details-marker]:hidden">
                  {showMore}
                  <span
                    aria-hidden="true"
                    className="text-lg leading-none transition-transform duration-150 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <ul className="border-t border-line pb-1">
                  {rest.map((cert) => (
                    <CertRow key={`${cert.name}-${cert.year}`} cert={cert} />
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}