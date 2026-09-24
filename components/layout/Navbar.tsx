"use client";

import { personal as personalData } from "@/data/personal";
import { useLocale } from "@/lib/locale-context";
import { useEffect, useRef, useState } from "react";

const SECTION_IDS = ["about", "experience", "projects", "skills", "formacion", "contact"];

export default function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const personal = personalData[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const sections = [
    { id: "about", label: t("NAV_ABOUT") },
    { id: "experience", label: t("NAV_EXPERIENCE") },
    { id: "projects", label: t("NAV_PROJECTS") },
    { id: "skills", label: t("NAV_SKILLS") },
    { id: "formacion", label: t("NAV_FORMACION") },
    { id: "contact", label: t("NAV_CONTACT") },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-line"
      data-testid="navbar"
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 md:h-[68px] flex items-center justify-between gap-6">
        <a
          href="#top"
          className="flex items-baseline gap-3 min-w-0 shrink-0"
          aria-label={personal.name}
          onClick={closeMenu}
        >
          <span className="font-display text-[15px] font-bold tracking-tight text-ink whitespace-nowrap">
            {personal.name}
          </span>
          <span className="hidden md:inline meta text-ink-mute truncate">
            {personal.title}
          </span>
        </a>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label={t("NAV_MENU_LABEL")}
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={activeId === s.id ? "true" : undefined}
              className={`px-3 py-2 min-h-11 inline-flex items-center rounded-md text-[14px] font-medium transition-colors ${
                activeId === s.id
                  ? "text-signal font-semibold"
                  : "text-ink-soft hover:text-ink"
              }`}
              onClick={closeMenu}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center rounded-full border border-line bg-paper-2 p-0.5"
            role="group"
            aria-label={t("NAV_LANGUAGE")}
          >
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={locale === l}
                onClick={() => setLocale(l)}
                className={`rounded-full px-3 py-1.5 min-h-[32px] text-[13px] font-semibold transition-colors ${
                  locale === l
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden xl:inline-flex items-center rounded-md bg-signal text-white text-[14px] font-semibold px-5 min-h-11 hover:bg-signal-strong transition-colors"
          >
            {t("NAV_CONTACT_CTA")}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden inline-flex flex-col items-center justify-center gap-1.5 w-11 h-11 -mr-2 rounded-md text-ink hover:bg-paper-2 transition-colors"
            aria-label={menuOpen ? t("CLOSE") : t("MENU")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block h-0.5 w-5 bg-current rounded-full transition-transform duration-200 ${
                menuOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current rounded-full transition-transform duration-200 ${
                menuOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="lg:hidden border-t border-line bg-paper"
          aria-label={t("NAV_MENU_LABEL")}
        >
          <ul className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={closeMenu}
                  aria-current={activeId === s.id ? "true" : undefined}
                  className={`block py-3.5 min-h-12 text-[15px] font-semibold border-b border-line last:border-b-0 transition-colors ${
                    activeId === s.id ? "text-signal" : "text-ink hover:text-signal"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}