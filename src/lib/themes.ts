import type { ThemeConfig, ThemeId } from "@/types";

export const themes: ThemeConfig[] = [
  {
    id: "midnight-architect",
    name: "Midnight Architect",
    description: "Dark elegance with indigo & purple accents",
    preview: "linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%)",
    isDark: true,
    colors: {
      background: "#0a0a1a",
      surface: "#111128",
      primary: "#818cf8",
      secondary: "#6366f1",
      accent: "#a78bfa",
      text: "#e2e8f0",
      textMuted: "#94a3b8",
      border: "#1e1e3f",
      cardBg: "#141430",
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
  },
  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    description: "Vibrant greens & teals on deep dark backgrounds",
    preview: "linear-gradient(135deg, #042f2e 0%, #065f46 50%, #0891b2 100%)",
    isDark: true,
    colors: {
      background: "#020d0c",
      surface: "#041f1e",
      primary: "#34d399",
      secondary: "#06b6d4",
      accent: "#10b981",
      text: "#ecfdf5",
      textMuted: "#a7f3d0",
      border: "#064e3b",
      cardBg: "#052e27",
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
  },
  {
    id: "paper-editorial",
    name: "Paper Editorial",
    description: "Light, clean editorial with serif typography",
    preview: "linear-gradient(135deg, #faf9f7 0%, #f5f0e8 50%, #e8ddd0 100%)",
    isDark: false,
    colors: {
      background: "#faf9f7",
      surface: "#f5f0e8",
      primary: "#44403c",
      secondary: "#78716c",
      accent: "#d97706",
      text: "#1c1917",
      textMuted: "#78716c",
      border: "#e7e5e4",
      cardBg: "#ffffff",
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
      mono: "monospace",
    },
  },
  {
    id: "terminal-hacker",
    name: "Terminal Hacker",
    description: "Dark green monospace — built for developers",
    preview: "linear-gradient(135deg, #000000 0%, #001a00 50%, #003300 100%)",
    isDark: true,
    colors: {
      background: "#000000",
      surface: "#001100",
      primary: "#00ff41",
      secondary: "#00cc33",
      accent: "#39ff14",
      text: "#00ff41",
      textMuted: "#008f11",
      border: "#003300",
      cardBg: "#001a00",
    },
    fonts: {
      heading: "'JetBrains Mono', monospace",
      body: "'JetBrains Mono', monospace",
      mono: "'JetBrains Mono', monospace",
    },
  },
  {
    id: "luxe-minimal",
    name: "Luxe Minimal",
    description: "Light, sophisticated with gold accents",
    preview: "linear-gradient(135deg, #ffffff 0%, #fffbeb 50%, #fef3c7 100%)",
    isDark: false,
    colors: {
      background: "#fefefe",
      surface: "#fff9f0",
      primary: "#92400e",
      secondary: "#78350f",
      accent: "#d97706",
      text: "#1c1917",
      textMuted: "#6b7280",
      border: "#fde68a",
      cardBg: "#fffbf0",
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
      mono: "monospace",
    },
  },
  {
    id: "brutalist-bold",
    name: "Brutalist Bold",
    description: "High contrast, raw energy — red & black",
    preview: "linear-gradient(135deg, #000000 0%, #1a0000 50%, #3d0000 100%)",
    isDark: true,
    colors: {
      background: "#0a0000",
      surface: "#140000",
      primary: "#ef4444",
      secondary: "#dc2626",
      accent: "#ff6b6b",
      text: "#fafafa",
      textMuted: "#a1a1aa",
      border: "#3d0000",
      cardBg: "#1a0000",
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
      mono: "monospace",
    },
  },
];

export const THEME_MAP = Object.fromEntries(
  themes.map((t) => [t.id, t])
) as Record<ThemeId, ThemeConfig>;

export function getTheme(id: ThemeId): ThemeConfig {
  return THEME_MAP[id] ?? themes[0];
}
