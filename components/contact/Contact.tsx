"use client";

import { personal as personalData } from "@/data/personal";
import { useLocale } from "@/lib/locale-context";
import { useReveal } from "@/lib/use-reveal";

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

interface ContactLink {
  label: string;
  href: string;
  value?: string;
  external?: boolean;
  download?: boolean;
  downloadLabel?: boolean;
}

export default function Contact() {
  const { locale, t } = useLocale();
  const personal = personalData[locale];
  const ref = useReveal<HTMLElement>();

  const links: ContactLink[] = [
    {
      label: t("LINK_EMAIL"),
      href: `mailto:${personal.email}`,
      value: personal.email,
    },
    {
      label: t("LINK_PHONE"),
      href: `tel:${personal.phone}`,
      value: personal.phone,
    },
    {
      label: t("LINK_LINKEDIN"),
      href: personal.linkedin,
      value: displayUrl(personal.linkedin),
      external: true,
    },
    {
      label: t("LINK_GITHUB"),
      href: personal.github,
      value: displayUrl(personal.github),
      external: true,
    },
    {
      label: t("LINK_CV"),
      href: personal.cvUrl,
      download: true,
      downloadLabel: true,
    },
  ];

  return (
    <section id="contact" ref={ref} className="scroll-mt-24 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-28 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6 reveal">
          <p className="eyebrow text-signal">{t("CONTACT_EYEBROW")}</p>
          <h2 className="display-section text-ink mt-4">{t("CONTACT_TITLE")}</h2>
          <p className="body-lg text-ink-soft mt-6 max-w-[46ch]">
            {t("CONTACT_INTRO")}
          </p>
          <div className="mt-6 max-w-[52ch]">
            <p className="meta text-ink-mute">{t("CONTACT_AVAILABILITY")}</p>
            <p className="body-md text-ink-soft mt-2">
              {personal.openTo}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 reveal">
          <div className="border-y border-line divide-y divide-line">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                download={link.download || undefined}
                className="group flex items-center justify-between gap-6 py-5 min-h-12"
              >
                <span className="meta text-ink-mute shrink-0">{link.label}</span>
                <span className="text-[15px] font-semibold text-ink group-hover:text-signal transition-colors flex items-center gap-2 truncate">
                  <span className="truncate">
                    {link.downloadLabel ? t("DOWNLOAD_CV") : link.value}
                  </span>
                  {link.external && (
                    <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  )}
                  {link.downloadLabel && (
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 transition-transform duration-150 group-hover:translate-y-0.5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}