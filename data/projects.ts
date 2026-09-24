import type { Project } from "@/types/portfolio";

const es: Project[] = [
  {
    id: "barking-dogs",
    name: "Barking Dogs",
    subtitle: "Software Engineering Studio",
    role: "Co-founder / Desarrollador Full-Stack",
    period: "Presente",
    category: "studio",
    url: "https://barkingdogs.tech",
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
  },
  {
    id: "sinergy-consulting",
    name: "Sinergy Consulting Platform",
    subtitle: "Producto Barking Dogs",
    role: "Desarrollador Full-Stack",
    period: "Presente",
    category: "co-founded-product",
    url: "https://sinergy.guru",
    description:
      "Plataforma full-stack para consultora B2B con enfoque en rendimiento, SEO y experiencia de usuario.",
    stack: ["TypeScript", "Next.js", "NestJS", "AWS", "PostgreSQL"],
  },
  {
    id: "watchdog-price-tracker",
    name: "WatchDog Price Tracker",
    subtitle: "Producto Barking Dogs",
    role: "Desarrollador Full-Stack",
    period: "Presente",
    category: "co-founded-product",
    url: "https://play.google.com/store/apps/details?id=com.gusgarozzo.offerwatchdog&pcampaignid=web_share",
    description:
      "Aplicación nativa Android para seguimiento de productos en tiendas online, con detección automática de cambios de precio o disponibilidad mediante notificaciones push en tiempo real. Lógica del lado del cliente, sin servidores ni registros requeridos.",
    stack: ["TypeScript", "Kotlin", "Android"],
  },
  {
    id: "clickcore-agency",
    name: "ClickCore Agency Landing",
    subtitle: "Producto Barking Dogs",
    role: "Desarrollador Full-Stack",
    period: "Presente",
    category: "co-founded-product",
    url: "https://clickcore.com.ar",
    description: "Landing page de alto rendimiento para agencia digital.",
    stack: ["Next.js", "TypeScript", "AWS"],
  },
  {
    id: "weather-api",
    name: "Weather API",
    subtitle: "Proyecto personal",
    role: "Backend Engineer",
    period: null,
    category: "ai-experiment",
    url: "https://github.com/gusgarozzo/weather_api",
    description:
      "API REST para obtener información meteorológica en tiempo real por ciudad, con interpretación en lenguaje natural mediante IA.",
    stack: ["NestJS", "TypeScript", "Redis", "Gemini Flash 2.5"],
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
    subtitle: "Software Engineering Studio",
    role: "Co-founder / Full-Stack Developer",
    period: "Present",
    category: "studio",
    url: "https://barkingdogs.tech",
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
  },
  {
    id: "sinergy-consulting",
    name: "Sinergy Consulting Platform",
    subtitle: "Barking Dogs Product",
    role: "Full-Stack Developer",
    period: "Present",
    category: "co-founded-product",
    url: "https://sinergy.guru",
    description:
      "Full-stack platform for a B2B consultancy focused on performance, SEO, and user experience.",
    stack: ["TypeScript", "Next.js", "NestJS", "AWS", "PostgreSQL"],
  },
  {
    id: "watchdog-price-tracker",
    name: "WatchDog Price Tracker",
    subtitle: "Barking Dogs Product",
    role: "Full-Stack Developer",
    period: "Present",
    category: "co-founded-product",
    url: "https://play.google.com/store/apps/details?id=com.gusgarozzo.offerwatchdog&pcampaignid=web_share",
    description:
      "Native Android application for tracking products in online stores, with automatic price and availability change detection via real-time push notifications. Client-side logic, no servers or registration required.",
    stack: ["TypeScript", "Kotlin", "Android"],
  },
  {
    id: "clickcore-agency",
    name: "ClickCore Agency Landing",
    subtitle: "Barking Dogs Product",
    role: "Full-Stack Developer",
    period: "Present",
    category: "co-founded-product",
    url: "https://clickcore.com.ar",
    description: "High-performance landing page for a digital agency.",
    stack: ["Next.js", "TypeScript", "AWS"],
  },
  {
    id: "weather-api",
    name: "Weather API",
    subtitle: "Personal project",
    role: "Backend Engineer",
    period: null,
    category: "ai-experiment",
    url: "https://github.com/gusgarozzo/weather_api",
    description:
      "REST API for real-time weather information by city, with natural language interpretation via AI.",
    stack: ["NestJS", "TypeScript", "Redis", "Gemini Flash 2.5"],
    highlights: [
      "Built a REST API with NestJS and TypeScript for real-time weather data by city.",
      "Integrated the Gemini-Flash 2.5 API to interpret climate variables and generate structured natural language responses.",
      "Optimized response times and reduced latency through Redis caching.",
    ],
  },
];

export const projects = { es, en };
