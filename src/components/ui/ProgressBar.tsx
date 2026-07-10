"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  color?: string;
  animated?: boolean;
}

export default function ProgressBar({ value, className, color, animated = true }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("h-2 w-full rounded-full bg-white/10 overflow-hidden", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-all duration-700 ease-out",
          animated && "relative overflow-hidden",
          color ?? "bg-gradient-to-r from-indigo-500 to-purple-500"
        )}
        style={{ width: `${clampedValue}%` }}
      >
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        )}
      </div>
    </div>
  );
}
