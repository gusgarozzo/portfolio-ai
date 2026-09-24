import { personal as personalData } from "@/data/personal";
import { hasSiteUrl, SITE_URL } from "@/lib/site";

export interface PersonJsonLd {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  email: string;
  telephone: string;
  address: string;
  sameAs: string[];
  url?: string;
}

export function buildPersonJsonLd(): PersonJsonLd {
  const p = personalData.es;
  const ld: PersonJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.title,
    email: p.email,
    telephone: p.phone,
    address: p.location,
    sameAs: [p.linkedin, p.github].filter(Boolean),
  };
  if (hasSiteUrl) ld.url = SITE_URL;
  return ld;
}