import type { LayoutConfig, LayoutId } from "@/types";

export const layouts: LayoutConfig[] = [
  {
    id: "single-page",
    name: "Single Page",
    description: "Classic scrollable full-width layout",
    icon: "📄",
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "Two-column with navigation sidebar",
    icon: "⬛",
  },
  {
    id: "magazine",
    name: "Magazine",
    description: "Editorial multi-column magazine style",
    icon: "📰",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Chronological timeline with milestones",
    icon: "🕐",
  },
  {
    id: "card-grid",
    name: "Card Grid",
    description: "Modern card-based grid layout",
    icon: "⊞",
  },
];

export const LAYOUT_MAP = Object.fromEntries(
  layouts.map((l) => [l.id, l])
) as Record<LayoutId, LayoutConfig>;

export function getLayout(id: LayoutId): LayoutConfig {
  return LAYOUT_MAP[id] ?? layouts[0];
}
