"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/messages";
import { t as translate } from "@/lib/messages";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "es",
  setLocale: () => {},
  t: (key: string) => key,
});

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const stored = localStorage.getItem("portfolio-locale");
  if (stored === "en" || stored === "es") return stored;
  return "es";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("portfolio-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: string) => translate(key, locale),
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
