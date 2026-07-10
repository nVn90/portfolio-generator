"use client";

import { useEffect, useState } from "react";
import { Sparkles, Brain, CheckCircle } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";

interface ParseProgressProps {
  fileName: string;
  progress: number;
}

const steps = [
  { at: 0, label: "Uploading CV...", icon: "⬆️" },
  { at: 25, label: "Extracting text content...", icon: "📄" },
  { at: 50, label: "AI is analyzing your experience...", icon: "🧠" },
  { at: 75, label: "Structuring your portfolio data...", icon: "✨" },
  { at: 95, label: "Almost done...", icon: "🚀" },
];

export default function ParseProgress({ fileName, progress }: ParseProgressProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const currentStep = steps.reduce(
    (acc, step) => (progress >= step.at ? step : acc),
    steps[0]
  );

  const isComplete = progress >= 100;

  return (
    <div className="flex flex-col items-center gap-8 py-12 px-4 text-center">
      {/* Animated icon */}
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
          {isComplete ? (
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          ) : (
            <Brain className="w-12 h-12 text-indigo-400 animate-pulse-slow" />
          )}
        </div>
        {!isComplete && (
          <>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 animate-ping" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500" />
          </>
        )}
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {isComplete ? "Analysis Complete!" : `AI is reading your CV${dots}`}
        </h2>
        <p className="text-white/50 text-sm max-w-sm">
          {isComplete
            ? "Your resume has been successfully parsed. Let's build your portfolio!"
            : `Analyzing "${fileName}"`}
        </p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-md space-y-3">
        <ProgressBar value={progress} />
        <p className="text-xs text-white/40">{Math.round(progress)}% complete</p>
      </div>

      {/* Current step */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
        <span className="text-xl">{currentStep.icon}</span>
        <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
        <span className="text-white/70 text-sm">{currentStep.label}</span>
      </div>

      {/* Fun facts */}
      <p className="text-xs text-white/30 max-w-xs">
        Using AI to extract structured career data with high accuracy
      </p>
    </div>
  );
}
