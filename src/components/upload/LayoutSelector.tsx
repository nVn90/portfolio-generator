"use client";

import { layouts } from "@/lib/layouts";
import type { LayoutId } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface LayoutSelectorProps {
  selected: LayoutId;
  onChange: (id: LayoutId) => void;
}

export default function LayoutSelector({ selected, onChange }: LayoutSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Choose a Layout
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {layouts.map((layout) => {
          const isSelected = layout.id === selected;
          return (
            <button
              key={layout.id}
              onClick={() => onChange(layout.id)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left focus:outline-none",
                isSelected
                  ? "border-indigo-400 bg-indigo-500/10 ring-2 ring-indigo-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/8"
              )}
            >
              <span className="text-2xl shrink-0">{layout.icon}</span>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-semibold truncate", isSelected ? "text-indigo-300" : "text-white")}>
                  {layout.name}
                </p>
                <p className="text-xs text-white/40 truncate">{layout.description}</p>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
