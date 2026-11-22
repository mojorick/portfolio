export type Language = 'fr' | 'en';
export type ViewMode = 'recruiter' | 'researcher';

export interface Project {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  category: 'data-engineering' | 'ai-ro' | 'web-dev';
  period: string;
  company?: string;
  description: Record<Language, string>;
  impact: Record<Language, string[]>;
  academicFormulation?: Record<Language, string>;
  tags: string[];
  metrics?: { label: Record<Language, string>; value: string }[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: Record<Language, string>;
  company: string;
  location: string;
  period: string;
  type: Record<Language, string>;
  description: Record<Language, string>;
  bulletPoints: Record<Language, string[]>;
  technicalStack: string[];
  logo?: string;
  color: string;
}

export interface Education {
  id: string;
  degree: Record<Language, string>;
  institution: string;
  location: string;
  period: string;
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
  badge?: string;
}

export interface ResearchAxiom {
  id: string;
  title: Record<Language, string>;
  problem: Record<Language, string>;
  methodology: Record<Language, string>;
  mathEquation: string;
  potentialIndustrialApplication: Record<Language, string>;
}
