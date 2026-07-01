"use client";

import { personal as personalData } from "@/data/personal";
import { useLocale } from "@/lib/locale-context";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SystemStatusBar() {
  const { locale, setLocale, t } = useLocale();
  const personal = personalData[locale];
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const statusRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const locRef = useRef<HTMLSpanElement>(null);

  const sections = [
    { id: "experience", label: t("NAV_EXPERIENCE") },
    { id: "projects", label: t("NAV_PROJECTS") },
    { id: "skills", label: t("NAV_SKILLS") },
    { id: "certifications", label: t("NAV_CERTIFICATIONS") },
    { id: "contact", label: t("NAV_CONTACT") },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(locale === "en" ? "en-US" : "es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Argentina/Buenos_Aires",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      );
      gsap.fromTo(
        locRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.6, ease: "power2.out" },
      );
      gsap.fromTo(
        statusRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.2, ease: "power2.out" },
      );
    });

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [locale]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-surface border-b border-border"
      data-testid="navbar"
    >
      <div className="flex items-center justify-between h-12 px-6 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3 min-w-0">
          <span className="label-mono text-text-muted shrink-0">
            {t("SYS_AUTH")}
          </span>
          <span
            ref={nameRef}
            className="label-mono text-text-primary truncate"
          >
            {personal.name}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <span ref={locRef} className="label-mono text-text-muted truncate max-w-64">
            {personal.location}
          </span>
          <span className="label-mono text-text-muted mx-1">·</span>
          <span className="label-mono text-text-muted">{time || "..."}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="label-mono text-text-muted hover:text-accent transition-colors mr-2"
            aria-label="Toggle language"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <span className="pip animate-pulse" />
          <span
            ref={statusRef}
            className="hidden md:inline label-mono text-accent"
          >
            {t("STATUS")}
          </span>
          <button
            className="md:hidden label-mono text-text-muted ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("NAV_MENU_LABEL")}
          >
            {menuOpen ? t("CLOSE") : t("MENU")}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border">
          <ul className="flex flex-col px-6 py-4 gap-3">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => handleClick(s.id)}
                  className="label-mono text-text-secondary hover:text-accent w-full text-left transition-colors"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
