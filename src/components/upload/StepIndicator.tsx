"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Upload CV" },
  { id: 2, label: "AI Parse" },
  { id: 3, label: "Customise" },
];

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                  isCompleted
                    ? "bg-indigo-500 border-indigo-500 text-white"
                    : isActive
                    ? "bg-white/10 border-indigo-400 text-indigo-400 ring-4 ring-indigo-500/20"
                    : "bg-transparent border-white/20 text-white/30"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium transition-colors duration-300 whitespace-nowrap",
                  isActive ? "text-indigo-400" : isCompleted ? "text-white/60" : "text-white/20"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-16 h-0.5 mb-5 mx-1 transition-all duration-500",
                  isCompleted ? "bg-indigo-500" : "bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
