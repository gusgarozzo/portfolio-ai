import type { Project } from "@/types/portfolio";

const es: Project[] = [
  {
    id: "barking-dogs",
    name: "Barking Dogs",
    code: "BD_STUDIO_00",
    subtitle: "Software Engineering Studio",
    role: "Co-founder / Desarrollador Full-Stack",
    period: "Presente",
    url: "https://barkingdogs.tech",
    image: "/projects/barking-dogs.svg",
    description:
      "Junto a un socio, desarrollo productos full-stack en producción (web y mobile) para clientes reales, aplicando arquitectura cloud-native, TypeScript estricto y prácticas de CI/CD.",
    stack: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "AWS",
      "PostgreSQL",
      "Android",
      "React Native",
    ],
    metrics: [
      { label: "LATENCIA MEDIA", value: "124ms" },
      { label: "COBERTURA", value: "92%" },
      { label: "DEUDA TÉCNICA", value: "4.2%" },
    ],
  },
  {
    id: "sinergy-consulting",
    name: "Sinergy Consulting Platform",
    code: "SINERGY_01",
    subtitle: "Producto Barking Dogs",
    role: "Desarrollador Full-Stack",
    period: "Presente",
    url: "https://sinergy.guru",
    image: "/projects/sinergy-consulting.svg",
    description:
      "Plataforma full-stack para consultora B2B con enfoque en rendimiento, SEO y experiencia de usuario.",
    stack: ["TypeScript", "Next.js", "NestJS", "AWS", "PostgreSQL"],
    metrics: [
      { label: "PERFORMANCE", value: "96" },
      { label: "SEO", value: "100" },
    ],
  },
  {
    id: "watchdog-price-tracker",
    name: "WatchDog Price Tracker",
    code: "WATCHDOG_02",
    subtitle: "Producto Barking Dogs",
    role: "Desarrollador Full-Stack",
    period: "Presente",
    url: "https://play.google.com/store/apps/details?id=com.gusgarozzo.offerwatchdog&pcampaignid=web_share",
    image: "/projects/watchdog-price-tracker.svg",
    description:
      "Aplicación nativa Android para seguimiento de productos en tiendas online, con detección automática de cambios de precio o disponibilidad mediante notificaciones push en tiempo real. Lógica del lado del cliente, sin servidores ni registros requeridos.",
    stack: ["TypeScript", "Kotlin", "Android"],
  },
  {
    id: "clickcore-agency",
    name: "ClickCore Agency Landing",
    code: "CLICKCORE_03",
    subtitle: "Producto Barking Dogs",
    role: "Desarrollador Full-Stack",
    period: "Presente",
    url: "https://clickcore.com.ar",
    image: "/projects/clickcore-agency.svg",
    description: "Landing page de alto rendimiento para agencia digital.",
    stack: ["Next.js", "TypeScript", "AWS"],
    metrics: [
      { label: "PERFORMANCE", value: "98" },
      { label: "SEO", value: "100" },
    ],
  },
  {
    id: "weather-api",
    name: "Weather API",
    code: "WTHR_GEMINI_04",
    subtitle: "Proyecto personal",
    role: "Desarrollador Backend",
    period: null,
    url: "https://github.com/gusgarozzo/weather_api",
    image: "/projects/weather-api.svg",
    description:
      "API REST para obtener información meteorológica en tiempo real por ciudad, con interpretación en lenguaje natural mediante IA.",
    stack: ["NestJS", "TypeScript", "Redis", "Gemini Flash 2.5"],
    metrics: [
      { label: "LATENCIA MEDIA", value: "89ms" },
      { label: "CACHE HIT", value: "94%" },
    ],
    highlights: [
      "Desarrollé una API REST con NestJS y TypeScript para obtener información meteorológica en tiempo real por ciudad.",
      "Implementé integración con la API de Gemini-Flash 2.5 para interpretar variables climáticas y generar respuestas estructuradas en lenguaje natural.",
      "Optimicé tiempos de respuesta y reduje latencia mediante caching con Redis.",
    ],
  },
];

const en: Project[] = [
  {
    id: "barking-dogs",
    name: "Barking Dogs",
    code: "BD_STUDIO_00",
    subtitle: "Software Engineering Studio",
    role: "Co-founder / Full-Stack Developer",
    period: "Present",
    url: "https://barkingdogs.tech",
    image: "/projects/barking-dogs.svg",
    description:
      "Together with a partner, I build full-stack products in production (web and mobile) for real clients, applying cloud-native architecture, strict TypeScript, and CI/CD practices.",
    stack: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "AWS",
      "PostgreSQL",
      "Android",
      "React Native",
    ],
    metrics: [
      { label: "AVG_LATENCY", value: "124ms" },
      { label: "COVERAGE", value: "92%" },
      { label: "TECH_DEBT", value: "4.2%" },
    ],
  },
  {
    id: "sinergy-consulting",
    name: "Sinergy Consulting Platform",
    code: "SINERGY_01",
    subtitle: "Barking Dogs Product",
    role: "Full-Stack Developer",
    period: "Present",
    url: "https://sinergy.guru",
    image: "/projects/sinergy-consulting.svg",
    description:
      "Full-stack platform for a B2B consultancy focused on performance, SEO, and user experience.",
    stack: ["TypeScript", "Next.js", "NestJS", "AWS", "PostgreSQL"],
    metrics: [
      { label: "PERFORMANCE", value: "96" },
      { label: "SEO", value: "100" },
    ],
  },
  {
    id: "watchdog-price-tracker",
    name: "WatchDog Price Tracker",
    code: "WATCHDOG_02",
    subtitle: "Barking Dogs Product",
    role: "Full-Stack Developer",
    period: "Present",
    url: "https://play.google.com/store/apps/details?id=com.gusgarozzo.offerwatchdog&pcampaignid=web_share",
    image: "/projects/watchdog-price-tracker.svg",
    description:
      "Native Android application for tracking products in online stores, with automatic price and availability change detection via real-time push notifications. Client-side logic, no servers or registration required.",
    stack: ["TypeScript", "Kotlin", "Android"],
  },
  {
    id: "clickcore-agency",
    name: "ClickCore Agency Landing",
    code: "CLICKCORE_03",
    subtitle: "Barking Dogs Product",
    role: "Full-Stack Developer",
    period: "Present",
    url: "https://clickcore.com.ar",
    image: "/projects/clickcore-agency.svg",
    description: "High-performance landing page for a digital agency.",
    stack: ["Next.js", "TypeScript", "AWS"],
    metrics: [
      { label: "PERFORMANCE", value: "98" },
      { label: "SEO", value: "100" },
    ],
  },
  {
    id: "weather-api",
    name: "Weather API",
    code: "WTHR_GEMINI_04",
    subtitle: "Personal project",
    role: "Backend Developer",
    period: null,
    url: "https://github.com/gusgarozzo/weather_api",
    image: "/projects/weather-api.svg",
    description:
      "REST API for real-time weather information by city, with natural language interpretation via AI.",
    stack: ["NestJS", "TypeScript", "Redis", "Gemini Flash 2.5"],
    metrics: [
      { label: "AVG_LATENCY", value: "89ms" },
      { label: "CACHE_HIT", value: "94%" },
    ],
    highlights: [
      "Built a REST API with NestJS and TypeScript for real-time weather data by city.",
      "Integrated the Gemini-Flash 2.5 API to interpret climate variables and generate structured natural language responses.",
      "Optimized response times and reduced latency through Redis caching.",
    ],
  },
];

export const projects = { es, en };
