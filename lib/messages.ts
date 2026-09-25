export type Locale = "es" | "en";

type MessagesMap = Record<string, { es: string; en: string }>;

export const messages: MessagesMap = {
  // Chat
  ASK_GUSTAVO: { es: "Preguntá por Gustavo", en: "Ask about Gustavo" },
  SKIP_TO_CONTENT: { es: "Saltar al contenido", en: "Skip to content" },
  CHAT_TITLE: {
    es: "Asistente del portfolio",
    en: "Portfolio assistant",
  },
  CHAT_SUBTITLE: {
    es: "Respondo sobre Gustavo a partir de su perfil verificado.",
    en: "I answer about Gustavo based on his verified profile.",
  },
  CHAT_INPUT_PLACEHOLDER: {
    es: "Escribí tu pregunta…",
    en: "Type your question…",
  },
  CHAT_PROCESSING: { es: "Pensando…", en: "Thinking…" },
  CHAT_RATE_LIMITED: {
    es: "Recibí muchas consultas en poco tiempo. Esperá unos segundos y volvé a intentar.",
    en: "Too many questions in a short time. Wait a moment and try again.",
  },
  CHAT_ERROR: {
    es: "No pude procesar la consulta. Intentá de nuevo.",
    en: "I couldn't process that. Please try again.",
  },
  CHAT_EMPTY: {
    es: "Escribí una pregunta sobre Gustavo Garozzo.",
    en: "Please write a question about Gustavo Garozzo.",
  },
  CHAT_OUT_OF_SCOPE: {
    es: "Solo puedo responder preguntas sobre el perfil profesional de Gustavo Garozzo.",
    en: "I can only answer questions about Gustavo Garozzo's professional profile.",
  },
  CHAT_BLOCKED: {
    es: "Esa consulta no puede procesarse.",
    en: "That request can't be processed.",
  },
  CHAT_UNCONFIGURED: {
    es: "El servicio de IA aún no está configurado.",
    en: "The AI service is not configured yet.",
  },
  CHAT_CLOSE: { es: "Cerrar", en: "Close" },
  CHAT_OPEN: { es: "Abrir chat", en: "Open chat" },
  CHAT_SEND: { es: "Enviar", en: "Send" },
  CHAT_LOG_LABEL: {
    es: "Conversación con el asistente",
    en: "Assistant conversation",
  },
  CHAT_INTRO: {
    es: "Hola, soy el asistente de Gustavo. Preguntame sobre su experiencia, proyectos o stack.",
    en: "Hi, I'm Gustavo's assistant. Ask me about his experience, projects, or tech stack.",
  },
  SUGGESTED_PROMPTS_LABEL: {
    es: "Consultas sugeridas",
    en: "Suggested questions",
  },
  SUGGESTION_EXPERIENCE: {
    es: "¿En qué empresas trabajó Gustavo?",
    en: "Where has Gustavo worked?",
  },
  SUGGESTION_SKILLS: {
    es: "¿Cuáles son sus skills principales?",
    en: "What are his main skills?",
  },
  SUGGESTION_AI: {
    es: "Contame sobre su línea de IA",
    en: "Tell me about his AI work",
  },
  SUGGESTION_WEATHER: {
    es: "¿Qué es la Weather API?",
    en: "What is the Weather API?",
  },

  // Navigation
  MENU: { es: "Menú", en: "Menu" },
  CLOSE: { es: "Cerrar", en: "Close" },
  NAV_MENU_LABEL: { es: "Menú de navegación", en: "Navigation menu" },
  NAV_LANGUAGE: { es: "Idioma", en: "Language" },
  NAV_ABOUT: { es: "Acerca", en: "About" },
  NAV_EXPERIENCE: { es: "Experiencia", en: "Experience" },
  NAV_RECOMENDACIONES: { es: "Recomendaciones", en: "Recommendations" },
  NAV_PROJECTS: { es: "Proyectos", en: "Projects" },
  NAV_SKILLS: { es: "Capacidades", en: "Capabilities" },
  NAV_FORMACION: { es: "Formación", en: "Education" },
  NAV_CONTACT: { es: "Contacto", en: "Contact" },
  NAV_CONTACT_CTA: { es: "Contacto", en: "Contact" },

  // Hero
  HERO_KICKER: { es: "Portfolio · Backend Engineer", en: "Portfolio · Backend Engineer" },
  HERO_SUMMARY_LEAD: {
    es: "Diseño APIs, integraciones y sistemas distribuidos.",
    en: "I design APIs, integrations, and distributed systems.",
  },
  DOWNLOAD_CV: { es: "Descargar CV", en: "Download CV" },
  SEE_PROJECTS: { es: "Ver proyectos", en: "See projects" },
  HERO_CONTACT_CTA: { es: "Contactar", en: "Get in touch" },
  FACT_EXPERIENCE: { es: "Experiencia", en: "Experience" },
  FACT_SENIORITY: { es: "Nivel", en: "Level" },
  FACT_LOCATION: { es: "Ubicación", en: "Location" },
  FIGURE_CAPTION: {
    es: "Fig. 02 — Arquitectura de producción real: integración con ERPs y marketplaces en Aiotek (APIs REST, batch FTP, PostgreSQL, Redis) y procesamiento serverless en AWS en Qwavee IT (API Gateway, Lambda, S3). Google Cloud figura como soporte en su alcance real: Cloud SQL, Pub/Sub, Cloud Monitoring y GKE (básico).",
    en: "Fig. 02 — Real production architecture: ERP and marketplace integration at Aiotek (REST APIs, FTP batch, PostgreSQL, Redis) and AWS serverless processing at Qwavee IT (API Gateway, Lambda, S3). Google Cloud appears as support at its real scope: Cloud SQL, Pub/Sub, Cloud Monitoring, and basic GKE.",
  },
  FIGURE_ARIA: {
    es: "Diagrama de arquitectura real. Izquierda: integración en Aiotek — clientes web, mobile y ERP, APIs REST en Node.js y NestJS para integración con ERPs y marketplaces, pipeline FTP con sincronización de facturas por lotes, y datos en PostgreSQL con Sequelize y Redis como caché. Derecha: arquitectura serverless en AWS de Qwavee IT — API Gateway, Lambda y S3 con monitoreo CloudWatch. Abajo: Google Cloud como soporte en su alcance real: Cloud SQL, Pub/Sub, Cloud Monitoring y GKE (básico).",
    en: "Real architecture diagram. Left: integration at Aiotek — web, mobile and ERP clients, REST APIs in Node.js and NestJS for ERP and marketplace integration, an FTP pipeline with batch invoice sync, and data in PostgreSQL with Sequelize and Redis as cache. Right: AWS serverless architecture at Qwavee IT — API Gateway, Lambda and S3 with CloudWatch monitoring. Bottom: Google Cloud as support at its real scope: Cloud SQL, Pub/Sub, Cloud Monitoring and basic GKE.",
  },
  FIG_COL_AIOTEK: { es: "AIOTEK · INTEGRACIONES", en: "AIOTEK · INTEGRATIONS" },
  FIG_COL_QWAVEE: { es: "QWAVEE IT · SERVERLESS AWS", en: "QWAVEE IT · AWS SERVERLESS" },
  FIG_BOX_CLIENTS: { es: "Web · Mobile · ERP", en: "Web · Mobile · ERP" },
  FIG_BOX_CLIENTS_SUB: { es: "e-commerce de alto tráfico", en: "high-traffic e-commerce" },
  FIG_BOX_APIS: { es: "APIs REST · Node.js / NestJS", en: "APIs REST · Node.js / NestJS" },
  FIG_BOX_APIS_SUB: { es: "ERPs y marketplaces · Swagger", en: "ERPs and marketplaces · Swagger" },
  FIG_BOX_FTP: { es: "Pipeline FTP", en: "Pipeline FTP" },
  FIG_BOX_FTP_SUB: {
    es: "facturas · procesamiento por lotes",
    en: "invoices · batch processing",
  },
  FIG_BOX_POSTGRES: { es: "PostgreSQL", en: "PostgreSQL" },
  FIG_BOX_POSTGRES_SUB: { es: "Sequelize", en: "Sequelize" },
  FIG_BOX_REDIS: { es: "Redis", en: "Redis" },
  FIG_BOX_REDIS_SUB: { es: "caché", en: "cache" },
  FIG_BOX_GATEWAY: { es: "API Gateway", en: "API Gateway" },
  FIG_BOX_LAMBDA: { es: "Lambda", en: "Lambda" },
  FIG_BOX_LAMBDA_SUB: { es: "procesamiento serverless", en: "serverless processing" },
  FIG_BOX_S3: { es: "S3", en: "S3" },
  FIG_BOX_S3_SUB: { es: "CloudWatch · monitoreo", en: "CloudWatch · monitoring" },
  FIG_BAND_SUPPORT: { es: "GOOGLE CLOUD · SOPORTE", en: "GOOGLE CLOUD · SUPPORT" },
  FIG_BAND_SUPPORT_SUB: {
    es: "Cloud SQL · Pub/Sub · Cloud Monitoring · GKE (básico)",
    en: "Cloud SQL · Pub/Sub · Cloud Monitoring · GKE (basic)",
  },

  // About
  ABOUT_EYEBROW: { es: "Acerca", en: "About" },
  ABOUT_TITLE: { es: "Acerca de mí", en: "About me" },
  PORTRAIT_ALT: {
    es: "Retrato editorial de Gustavo Garozzo, Backend Engineer en Node.js y NestJS.",
    en: "Editorial portrait of Gustavo Garozzo, Backend Engineer in Node.js and NestJS.",
  },

  // Experience
  EXP_EYEBROW: { es: "Trayectoria", en: "Career" },
  EXP_TITLE: { es: "Experiencia", en: "Experience" },
  EXP_INTRO: {
    es: "Cuatro años de backend en producción: integraciones críticas, datos consistentes y arquitectura serverless.",
    en: "Four years of backend in production: critical integrations, consistent data, and serverless architecture.",
  },

  // Projects
  PROJECTS_EYEBROW: { es: "Portafolio", en: "Portfolio" },
  PROJECTS_TITLE: { es: "Proyectos", en: "Projects" },
  PROJECTS_INTRO: {
    es: "Trabajo en producción, productos co-fundados y experimentos personales.",
    en: "Production work, co-founded products, and personal experiments.",
  },

  // Recommendations
  RECS_EYEBROW: { es: "Testimonios", en: "Testimonials" },
  RECS_TITLE: { es: "Recomendaciones", en: "Recommendations" },
  RECS_INTRO: {
    es: "Opiniones de compañeros y líderes con los que compartí proyectos y equipos de trabajo.",
    en: "Comments from colleagues and leaders I shared projects and teams with.",
  },
  VISIT_SITE: { es: "Visitar sitio", en: "Visit site" },
  OPEN_APP: { es: "Abrir app", en: "Open app" },
  VIEW_CODE: { es: "Ver código", en: "View source" },
  PROJECT_CAT_STUDIO: { es: "Estudio co-fundado", en: "Co-founded studio" },
  PROJECT_CAT_COFOUNDED: {
    es: "Producto de Barking Dogs",
    en: "Barking Dogs product",
  },
  PROJECT_CAT_PERSONAL: { es: "Proyecto personal", en: "Personal project" },
  PROJECT_CAT_AI: { es: "Proyecto personal · IA", en: "Personal project · AI" },

  // Skills
  SKILLS_EYEBROW: { es: "Stack", en: "Stack" },
  SKILLS_TITLE: { es: "Capacidades", en: "Capabilities" },
  SKILLS_INTRO: {
    es: "Lo que llevo a producción, lo que sostengo con alcance real y lo que estoy incorporando.",
    en: "What I ship to production, what I hold at real scope, and what I'm taking on.",
  },
  SKILLS_TIER_CORE: { es: "Núcleo profesional", en: "Professional core" },
  SKILLS_TIER_SUPPORTING: { es: "Soporte · alcance real", en: "Supporting · real scope" },
  SKILLS_TIER_LEARNING: {
    es: "En aprendizaje · conceptual",
    en: "Learning · conceptual",
  },
  SKILLS_AI_LINE: { es: "Línea de IA · en desarrollo", en: "AI line · in development" },
  SKILLS_AI_NOTE: {
    es: "Línea en desarrollo · proyectos personales",
    en: "Line in development · personal projects",
  },
  SKILLS_AI_CTA: { es: "Ver Weather API", en: "See Weather API" },
  SKILLS_GCP_NOTE: {
    es: "Google Cloud solo en su alcance real: Cloud SQL, Pub/Sub, Cloud Monitoring y GKE (básico). No como expertise cloud equivalente a AWS.",
    en: "Google Cloud only at its real scope: Cloud SQL, Pub/Sub, Cloud Monitoring, and basic GKE — not as cloud expertise equivalent to AWS.",
  },

  // Education & certifications
  FORMATION_EYEBROW: { es: "Formación", en: "Education" },
  FORMATION_TITLE: { es: "Formación", en: "Education" },
  EDUCATION_TITLE: { es: "Formación académica", en: "Academic background" },
  CERT_TITLE: { es: "Certificaciones", en: "Certifications" },
  CERT_SUB: {
    es: "Entrenamiento y certificaciones alineados con el rol de backend y la transición hacia IA.",
    en: "Training and certifications aligned with the backend role and the shift toward AI.",
  },
  CERT_SHOW_MORE: { es: "Ver las {n} restantes", en: "View the {n} remaining" },

  // Contact
  CONTACT_EYEBROW: { es: "Contacto", en: "Contact" },
  CONTACT_TITLE: { es: "¿Trabajamos?", en: "Let's work together" },
  CONTACT_INTRO: {
    es: "Estoy abierto a roles de backend. Elegí el canal que prefieras.",
    en: "I'm open to backend roles. Pick whichever channel works for you.",
  },
  CONTACT_AVAILABILITY: { es: "Disponibilidad", en: "Availability" },
  LINK_EMAIL: { es: "Email", en: "Email" },
  LINK_PHONE: { es: "Teléfono", en: "Phone" },
  LINK_LINKEDIN: { es: "LinkedIn", en: "LinkedIn" },
  LINK_GITHUB: { es: "GitHub", en: "GitHub" },
  LINK_CV: { es: "Currículum", en: "Résumé" },

  // Footer
  FOOTER_ROLE: {
    es: "Backend Engineer · Node.js · AWS · PostgreSQL",
    en: "Backend Engineer · Node.js · AWS · PostgreSQL",
  },
  FOOTER_MADE: {
    es: "Hecho en Tandil, Argentina",
    en: "Made in Tandil, Argentina",
  },
};

export function t(key: string, locale: Locale): string {
  return messages[key]?.[locale] ?? key;
}