"use client";

import { personal as personalData } from "@/data/personal";
import { useLocale } from "@/lib/locale-context";
import Button from "@/components/ui/Button";

export default function Contact() {
  const { locale, t } = useLocale();
  const personal = personalData[locale];

  const links = [
    {
      label: t("LINK_EMAIL"),
      href: `mailto:${personal.email}`,
      value: personal.email,
      variant: "primary" as const,
    },
    {
      label: t("LINK_PHONE"),
      href: `tel:${personal.phone}`,
      value: personal.phone,
      variant: "secondary" as const,
    },
    {
      label: t("LINK_LINKEDIN"),
      href: personal.linkedin,
      value: "linkedin.com/in/gustavogarozzo",
      variant: "secondary" as const,
    },
    {
      label: t("LINK_GITHUB"),
      href: personal.github,
      value: "github.com/gusgarozzo",
      variant: "secondary" as const,
    },
  ];

  return (
    <div className="p-8 md:p-12">
      <p className="label-mono text-accent mb-3">{t("CONTACT_REACH_OUT")}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
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
          >
            <Button variant={link.variant} className="w-full">
              <span className="flex flex-col items-start gap-0.5">
                <span className="caption-mono text-text-muted">
                  {link.label}
                </span>
                <span className="data-mono text-text-primary">
                  {link.value}
                </span>
              </span>
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
}
