export type Locale = "es" | "en";

type MessagesMap = Record<string, { es: string; en: string }>;

export const messages: MessagesMap = {
  // Navbar
  SYS_AUTH: { es: "SYS.AUTH", en: "SYS.AUTH" },
  STATUS: { es: "STATUS: READY_FOR_INTEGRATION", en: "STATUS: READY_FOR_INTEGRATION" },
  MENU: { es: "MENU", en: "MENU" },
  CLOSE: { es: "CERRAR", en: "CLOSE" },
  NAV_MENU_LABEL: { es: "Menú de navegación", en: "Navigation menu" },
  NAV_EXPERIENCE: { es: "Experiencia", en: "Experience" },
  NAV_PROJECTS: { es: "Proyectos", en: "Projects" },
  NAV_SKILLS: { es: "Habilidades", en: "Skills" },
  NAV_CERTIFICATIONS: { es: "Certificaciones", en: "Certifications" },
  NAV_CONTACT: { es: "Contacto", en: "Contact" },

  // Hero telemetry
  LIVE_TELEMETRY: { es: "LIVE_TELEMETRY_FEED", en: "LIVE_TELEMETRY_FEED" },
  TELEM_NODE: { es: "NODE_VERSION", en: "NODE_VERSION" },
  TELEM_UPTIME: { es: "UPTIME", en: "UPTIME" },
  TELEM_LATENCY: { es: "LATENCY_P50", en: "LATENCY_P50" },
  TELEM_THROUGHPUT: { es: "THROUGHPUT", en: "THROUGHPUT" },
  TELEM_MEMORY: { es: "MEMORY", en: "MEMORY" },

  // Hero stat blocks
  STAT_EXPERIENCE: { es: "EXPERIENCE_CYCLE", en: "EXPERIENCE_CYCLE" },
  STAT_STACK: { es: "PRIMARY_STACK", en: "PRIMARY_STACK" },
  STAT_SENIORITY: { es: "SENIORITY_GRADE", en: "SENIORITY_GRADE" },

  // Experience section
  TENURE_MANIFEST: { es: "COMPANY_TENURE_MANIFEST", en: "COMPANY_TENURE_MANIFEST" },

  // Skills section
  ARCHITECTURE_TOPOLOGY: { es: "ARCHITECTURE_TOPOLOGY", en: "ARCHITECTURE_TOPOLOGY" },
  BACKEND_CORE: { es: "BACKEND_SYSTEM_CORE", en: "BACKEND_SYSTEM_CORE" },
  TOPOLOGY_LANGUAGES: { es: "Languages", en: "Languages" },
  TOPOLOGY_INFRASTRUCTURE: { es: "Infrastructure", en: "Infrastructure" },
  TOPOLOGY_MINDSET: { es: "Mindset", en: "Mindset" },

  // Certifications section
  AUDIT_LOG: { es: "AUDIT_LOG / CERTIFICATIONS", en: "AUDIT_LOG / CERTIFICATIONS" },
  LAST_PARSED: { es: "LAST_PARSED", en: "LAST_PARSED" },
  CERT_TITLE: { es: "Certificaciones", en: "Certifications" },

  // Contact section
  CONTACT_REACH_OUT: { es: "CONTACT / REACH_OUT", en: "CONTACT / REACH_OUT" },
  LINK_EMAIL: { es: "Email", en: "Email" },
  LINK_PHONE: { es: "Teléfono", en: "Phone" },
  LINK_LINKEDIN: { es: "LinkedIn", en: "LinkedIn" },
  LINK_GITHUB: { es: "GitHub", en: "GitHub" },

  // Projects section
  VISIT_SITE: { es: "VISIT_SITE", en: "VISIT_SITE" },
  OPEN_APP: { es: "OPEN_APP", en: "OPEN_APP" },

  // Footer
  HYBRID_EDITION: { es: "// HYBRID_EDITION.SYS", en: "// HYBRID_EDITION.SYS" },
  VER: { es: "VER: 4.2.0-STABLE", en: "VER: 4.2.0-STABLE" },
};

export function t(key: string, locale: Locale): string {
  return messages[key]?.[locale] ?? key;
}
