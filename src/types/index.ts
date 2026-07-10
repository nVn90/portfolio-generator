// ─────────────────────────────────────────────
// Resume / Portfolio Types
// ─────────────────────────────────────────────

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string; // "Present" or date string
  location?: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  highlights?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  location?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  certifications?: string[];
  languages?: string[];
  awards?: string[];
}

// ─────────────────────────────────────────────
// Theme Types
// ─────────────────────────────────────────────

export type ThemeId =
  | "midnight-architect"
  | "aurora-borealis"
  | "paper-editorial"
  | "terminal-hacker"
  | "luxe-minimal"
  | "brutalist-bold";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  preview: string; // CSS gradient for swatches
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textMuted: string;
    border: string;
    cardBg: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  isDark: boolean;
}

// ─────────────────────────────────────────────
// Layout Types
// ─────────────────────────────────────────────

export type LayoutId =
  | "single-page"
  | "sidebar"
  | "magazine"
  | "timeline"
  | "card-grid";

export interface LayoutConfig {
  id: LayoutId;
  name: string;
  description: string;
  icon: string;
}

// ─────────────────────────────────────────────
// Portfolio Data Types
// ─────────────────────────────────────────────

export interface PortfolioData {
  id: string;
  resume: ResumeData;
  themeId: ThemeId;
  layoutId: LayoutId;
  createdAt: string;
}

// ─────────────────────────────────────────────
// App State
// ─────────────────────────────────────────────

export type BuildStep =
  | "idle"
  | "uploading"
  | "parsing"
  | "customising"
  | "generating"
  | "done";

export interface PortfolioBuilderState {
  step: BuildStep;
  file: File | null;
  resumeData: ResumeData | null;
  themeId: ThemeId;
  layoutId: LayoutId;
  portfolioId: string | null;
  error: string | null;
  parseProgress: number;
}
