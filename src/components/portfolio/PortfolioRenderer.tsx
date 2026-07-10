"use client";

import type { PortfolioData, ThemeId, LayoutId } from "@/types";
import SinglePageLayout from "./layouts/SinglePageLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import MagazineLayout from "./layouts/MagazineLayout";
import TimelineLayout from "./layouts/TimelineLayout";
import CardGridLayout from "./layouts/CardGridLayout";

interface PortfolioRendererProps {
  data: PortfolioData;
  previewThemeId?: ThemeId;
  previewLayoutId?: LayoutId;
}

export default function PortfolioRenderer({ data, previewThemeId, previewLayoutId }: PortfolioRendererProps) {
  const effectiveData: PortfolioData = {
    ...data,
    themeId: previewThemeId ?? data.themeId,
    layoutId: previewLayoutId ?? data.layoutId,
  };

  switch (effectiveData.layoutId) {
    case "sidebar":
      return <SidebarLayout data={effectiveData} />;
    case "magazine":
      return <MagazineLayout data={effectiveData} />;
    case "timeline":
      return <TimelineLayout data={effectiveData} />;
    case "card-grid":
      return <CardGridLayout data={effectiveData} />;
    case "single-page":
    default:
      return <SinglePageLayout data={effectiveData} />;
  }
}
