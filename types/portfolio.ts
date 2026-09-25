export interface HeroStats {
  experience: string;
  primaryStack: string;
  seniority: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  cvUrl: string;
  openTo: string;
  heroStats: HeroStats;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export type ProjectCategory =
  | "studio"
  | "co-founded-product"
  | "personal"
  | "ai-experiment";

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  period: string | null;
  url: string | null;
  description: string;
  stack: string[];
  category: ProjectCategory;
  highlights?: string[];
}

export interface SkillCategory {
  core: string[];
  supporting: string[];
  learning: string[];
  ai: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  featured?: boolean;
}

export interface Education {
  title: string;
  institution: string;
  period: string | null;
  note: string | null;
}

export interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
}