"use client";

import { useState } from "react";
import type { PortfolioData, ThemeId, LayoutId } from "@/types";
import { themes } from "@/lib/themes";
import { layouts } from "@/lib/layouts";
import { Share2, Printer, ChevronUp, ChevronDown, Palette, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioToolbarProps {
  data: PortfolioData;
  onThemeChange: (themeId: ThemeId) => void;
  onLayoutChange: (layoutId: LayoutId) => void;
  currentThemeId: ThemeId;
  currentLayoutId: LayoutId;
}

export default function PortfolioToolbar({
  data,
  onThemeChange,
  onLayoutChange,
  currentThemeId,
  currentLayoutId,
}: PortfolioToolbarProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"theme" | "layout">("theme");

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      prompt("Copy this link:", url);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 no-print">
      {/* Expanded panel */}
      {expanded && (
        <div className="mb-3 w-[380px] rounded-2xl bg-gray-950/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab("theme")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
                activeTab === "theme" ? "text-white bg-white/5" : "text-white/40 hover:text-white/70"
              )}
            >
              <Palette className="w-4 h-4" /> Theme
            </button>
            <button
              onClick={() => setActiveTab("layout")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
                activeTab === "layout" ? "text-white bg-white/5" : "text-white/40 hover:text-white/70"
              )}
            >
              <Layout className="w-4 h-4" /> Layout
            </button>
          </div>

          <div className="p-4">
            {activeTab === "theme" ? (
              <div className="grid grid-cols-3 gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className={cn(
                      "rounded-xl overflow-hidden border-2 transition-all text-left",
                      currentThemeId === theme.id ? "border-indigo-400 ring-2 ring-indigo-500/30" : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <div className="h-10 w-full" style={{ background: theme.preview }} />
                    <div className="px-2 py-1 bg-white/5">
                      <p className="text-[10px] font-medium text-white truncate">{theme.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {layouts.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => onLayoutChange(layout.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
                      currentLayoutId === layout.id ? "border-indigo-400 bg-indigo-500/10" : "border-white/10 bg-white/5 hover:border-white/30"
                    )}
                  >
                    <span className="text-xl">{layout.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{layout.name}</p>
                      <p className="text-xs text-white/40">{layout.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main toolbar bar */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-950/95 backdrop-blur-xl border border-white/10 shadow-2xl">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all"
        >
          <Palette className="w-4 h-4" />
          Customise
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        <div className="w-px h-6 bg-white/10" />

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <Share2 className="w-4 h-4" />
          {copied ? "Copied!" : "Share"}
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>
    </div>
  );
}
