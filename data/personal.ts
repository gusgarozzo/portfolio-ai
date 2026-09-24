import type { PersonalInfo } from "@/types/portfolio";

export const personal: Record<string, PersonalInfo> = {
  es: {
    name: "Gustavo Garozzo",
    title: "Backend Engineer",
    subtitle: "Node.js · NestJS · TypeScript · APIs REST · AWS · PostgreSQL",
    location: "Tandil, Buenos Aires, Argentina",
    email: "gustavogarozzo@gmail.com",
    phone: "+54 (249) 449-4994",
    linkedin: "https://www.linkedin.com/in/gusgarozzo/",
    github: "https://github.com/gusgarozzo",
    cvUrl: "/cv-gustavo-garozzo-es.pdf",
    openTo:
      "Abierto a roles de Desarrollador Backend Semi-Senior/Senior, Backend Engineer o Software Engineer en equipos donde la escalabilidad, la arquitectura limpia y la calidad del código sean una prioridad, en modalidad remota, híbrida o presencial.",
    heroStats: {
      experience: "4+ años",
      primaryStack: "Node.js · NestJS · AWS",
      seniority: "Semi-Senior",
    },
  },
  en: {
    name: "Gustavo Garozzo",
    title: "Backend Engineer",
    subtitle: "Node.js · NestJS · TypeScript · REST APIs · AWS · PostgreSQL",
    location: "Tandil, Buenos Aires, Argentina",
    email: "gustavogarozzo@gmail.com",
    phone: "+54 (249) 449-4994",
    linkedin: "https://www.linkedin.com/in/gusgarozzo/",
    github: "https://github.com/gusgarozzo",
    cvUrl: "/cv-gustavo-garozzo-en.pdf",
    openTo:
      "Open to Backend Developer (Mid-level/Senior), Backend Engineer, or Software Engineer roles in teams where scalability, clean architecture, and code quality are a priority — remote, hybrid, or on-site.",
    heroStats: {
      experience: "4+ years",
      primaryStack: "Node.js · NestJS · AWS",
      seniority: "Mid-level",
    },
  },
};
