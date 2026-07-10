"use client";

import { useState, useCallback } from "react";
import type { BuildStep, LayoutId, PortfolioBuilderState, ResumeData, ThemeId } from "@/types";

const INITIAL_STATE: PortfolioBuilderState = {
  step: "idle",
  file: null,
  resumeData: null,
  themeId: "midnight-architect",
  layoutId: "single-page",
  portfolioId: null,
  error: null,
  parseProgress: 0,
};

export function usePortfolioBuilder() {
  const [state, setState] = useState<PortfolioBuilderState>(INITIAL_STATE);

  const set = useCallback((patch: Partial<PortfolioBuilderState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  // Step 1: File selected → start parsing
  const handleFileSelected = useCallback(
    async (file: File) => {
      set({ file, step: "uploading", error: null, parseProgress: 0 });

      // Simulate progress during real upload
      const progressInterval = setInterval(() => {
        setState((prev) => {
          if (prev.parseProgress >= 85) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, parseProgress: prev.parseProgress + Math.random() * 12 + 3 };
        });
      }, 600);

      try {
        set({ step: "parsing" });

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/parse-resume", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error ?? "Failed to parse resume");
        }

        set({ parseProgress: 100 });

        // Brief pause to show 100% before transitioning
        await new Promise((resolve) => setTimeout(resolve, 800));

        set({ resumeData: json.resumeData, step: "customising", parseProgress: 100 });
      } catch (err) {
        clearInterval(progressInterval);
        set({
          step: "idle",
          error: err instanceof Error ? err.message : "Upload failed",
          parseProgress: 0,
        });
      }
    },
    [set]
  );

  // Step 2 → 3: Generate portfolio
  const handleGenerate = useCallback(async () => {
    if (!state.resumeData) return;

    set({ step: "generating", error: null });

    try {
      const res = await fetch("/api/generate-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume: state.resumeData,
          themeId: state.themeId,
          layoutId: state.layoutId,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Failed to generate portfolio");
      }

      set({ portfolioId: json.id, step: "done" });
    } catch (err) {
      set({
        step: "customising",
        error: err instanceof Error ? err.message : "Generation failed",
      });
    }
  }, [state.resumeData, state.themeId, state.layoutId, set]);

  const setTheme = useCallback((themeId: ThemeId) => set({ themeId }), [set]);
  const setLayout = useCallback((layoutId: LayoutId) => set({ layoutId }), [set]);
  const setResumeData = useCallback((resumeData: ResumeData) => set({ resumeData }), [set]);
  const reset = useCallback(() => setState(INITIAL_STATE), []);
  const clearError = useCallback(() => set({ error: null }), [set]);



  const wizardStep: 1 | 2 | 3 =
    state.step === "idle" ? 1
    : state.step === "uploading" || state.step === "parsing" ? 2
    : 3;

  return {
    ...state,
    wizardStep,
    handleFileSelected,
    handleGenerate,
    setTheme,
    setLayout,
    setResumeData,
    reset,
    clearError,
  };
}
