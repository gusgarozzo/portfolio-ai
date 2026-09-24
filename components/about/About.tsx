"use client";

import { aboutMe } from "@/data/about-me";
import { useLocale } from "@/lib/locale-context";
import { useReveal } from "@/lib/use-reveal";

export default function About() {
  const { locale, t } = useLocale();
  const text = aboutMe[locale].trim();
  const paragraphs = text.split(/\n\n+/);
  const [first = "", ...middle] = paragraphs.slice(0, -1);
  const lastParagraph = paragraphs[paragraphs.length - 1];
  const ref = useReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="scroll-mt-24 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="reveal max-w-[68ch]">
          <p className="eyebrow text-signal">{t("ABOUT_EYEBROW")}</p>
          <h2 className="display-section text-ink mt-4">{t("ABOUT_TITLE")}</h2>
          {first && (
            <p className="mt-10 text-[1.125rem] md:text-[1.2rem] font-medium leading-relaxed text-ink">
              {first}
            </p>
          )}
          {middle.map((paragraph, index) => (
            <p key={index} className="body-lg text-ink-soft mt-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p className="body-md text-ink-mute italic mt-8">{lastParagraph}</p>
        </div>
      </div>
    </section>
  );
}