"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AlertCircle, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { usePortfolioBuilder } from "@/hooks/usePortfolioBuilder";
import DropZone from "@/components/upload/DropZone";
import ParseProgress from "@/components/upload/ParseProgress";
import StepIndicator from "@/components/upload/StepIndicator";
import ThemeSelector from "@/components/upload/ThemeSelector";
import LayoutSelector from "@/components/upload/LayoutSelector";
import ResumePreview from "@/components/upload/ResumePreview";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const router = useRouter();
  const {
    step,
    file,
    resumeData,
    themeId,
    layoutId,
    portfolioId,
    error,
    parseProgress,
    wizardStep,
    handleFileSelected,
    handleGenerate,
    setTheme,
    setLayout,
    reset,
    clearError,
  } = usePortfolioBuilder();

  // Redirect when portfolio is ready
  useEffect(() => {
    if (step === "done" && portfolioId) {
      router.push(`/portfolio/${portfolioId}`);
    }
  }, [step, portfolioId, router]);

  const isLoading = step === "uploading" || step === "parsing" || step === "generating";

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white font-[var(--font-inter)]">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-600/8 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/8 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/5 blur-3xl" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            PortfolioAI
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Powered by AI
        </div>
      </header>

      <main className="relative z-10 px-4 py-16">
        {/* Hero — shown only at step 1 */}
        {step === "idle" && (
          <div className="text-center mb-16 animate-fadein-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Resume Parser
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                Turn your CV into
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                a stunning portfolio
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Upload your resume and AI will extract your career data and generate a beautiful, themed portfolio website in seconds.
            </p>
          </div>
        )}

        {/* Step indicator */}
        {step !== "idle" && (
          <div className="flex justify-center mb-12">
            <StepIndicator currentStep={wizardStep} />
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium mb-1">Something went wrong</p>
              <p className="text-red-400/70">{error}</p>
            </div>
            <button onClick={clearError} className="hover:text-red-300 transition-colors">✕</button>
          </div>
        )}

        {/* ── Step 1: Upload ── */}
        {(step === "idle") && (
          <div className="max-w-2xl mx-auto">
            <DropZone onFileSelected={handleFileSelected} disabled={isLoading} />

            {/* Feature grid */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { icon: "🤖", title: "AI Parsing", desc: "AI extracts every detail from your CV" },
                { icon: "🎨", title: "6 Themes", desc: "Dark, light, editorial, terminal & more" },
                { icon: "📐", title: "5 Layouts", desc: "Single page, sidebar, magazine & more" },
              ].map((f) => (
                <div key={f.title} className="p-5 rounded-2xl bg-white/3 border border-white/8 text-center">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <p className="text-xs font-semibold text-white mb-1">{f.title}</p>
                  <p className="text-xs text-white/40">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Parsing progress ── */}
        {(step === "uploading" || step === "parsing") && file && (
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl bg-white/3 border border-white/10 overflow-hidden">
              <ParseProgress fileName={file.name} progress={parseProgress} />
            </div>
          </div>
        )}

        {/* ── Step 3: Customise ── */}
        {(step === "customising" || step === "generating") && resumeData && (
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Selectors */}
              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-white/3 border border-white/10">
                  <ThemeSelector selected={themeId} onChange={setTheme} />
                </div>
                <div className="p-6 rounded-2xl bg-white/3 border border-white/10">
                  <LayoutSelector selected={layoutId} onChange={setLayout} />
                </div>
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  loading={step === "generating"}
                  className="w-full"
                >
                  {step === "generating" ? "Generating your portfolio…" : (
                    <>Generate Portfolio <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
                <button onClick={reset} className="w-full flex items-center justify-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" /> Upload a different file
                </button>
              </div>

              {/* Right: Resume preview */}
              <div className="p-6 rounded-2xl bg-white/3 border border-white/10 max-h-[700px] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Extracted from CV</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    ✓ AI Parsed
                  </span>
                </div>
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
