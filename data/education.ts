import type { Education } from "@/types/portfolio";

export const education: Record<string, Education[]> = {
  es: [
    {
      title:
        "Tecnicatura Universitaria en Desarrollo de Aplicaciones Informáticas",
      institution:
        "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
      period: "2020 – 2023",
      note: "Cursada parcial",
    },
    {
      title: "Certificación de Idioma Inglés B2 (Upper Intermediate)",
      institution: "Universidad Tecnológica Nacional (UTN)",
      period: null,
      note: null,
    },
  ],
  en: [
    {
      title:
        "University Degree in Computer Application Development",
      institution:
        "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
      period: "2020 – 2023",
      note: "Partial completion",
    },
    {
      title: "English Language Certification B2 (Upper Intermediate)",
      institution: "Universidad Tecnológica Nacional (UTN)",
      period: null,
      note: null,
    },
  ],
};
