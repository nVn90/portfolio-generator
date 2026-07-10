"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import PortfolioRenderer from "@/components/portfolio/PortfolioRenderer";
import PortfolioToolbar from "@/components/portfolio/PortfolioToolbar";
import type { PortfolioData, ThemeId, LayoutId } from "@/types";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PortfolioPage({ params }: PageProps) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewTheme, setPreviewTheme] = useState<ThemeId | undefined>();
  const [previewLayout, setPreviewLayout] = useState<LayoutId | undefined>();

  useEffect(() => {
    async function load() {
      const { id } = await params;
      try {
        const res = await fetch(`/api/generate-portfolio?id=${encodeURIComponent(id)}`);
        if (res.status === 404) {
          setError("not_found");
          return;
        }
        if (!res.ok) throw new Error("Failed to load portfolio");
        const json = await res.json();
        setData(json);
        setPreviewTheme(json.themeId);
        setPreviewLayout(json.layoutId);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-white/50 text-sm">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  if (error === "not_found" || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-6xl mb-6">🔍</p>
          <h1 className="text-2xl font-bold text-white mb-3">Portfolio Not Found</h1>
          <p className="text-white/50 mb-8">
            This portfolio may have expired or the link is incorrect. Portfolios are stored in-memory and reset when the server restarts.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            ← Generate a new portfolio
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <PortfolioRenderer
        data={data}
        previewThemeId={previewTheme}
        previewLayoutId={previewLayout}
      />
      <PortfolioToolbar
        data={data}
        currentThemeId={previewTheme ?? data.themeId}
        currentLayoutId={previewLayout ?? data.layoutId}
        onThemeChange={setPreviewTheme}
        onLayoutChange={setPreviewLayout}
      />
    </>
  );
}
