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

export interface LighthouseMetrics {
  performance: number;
  seo: number;
}

export interface Subproject {
  name: string;
  url: string;
  description: string;
  metrics: LighthouseMetrics | null;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  subtitle: string;
  role: string;
  period: string | null;
  url: string | null;
  image: string;
  description: string;
  stack: string[];
  highlights?: string[];
  metrics?: ProjectMetric[];
  subprojects?: Subproject[];
}

export interface SkillCategory {
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloud: string[];
  architecture: string[];
  soft: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export interface Education {
  title: string;
  institution: string;
  period: string | null;
  note: string | null;
}
