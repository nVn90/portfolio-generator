"use client";

import { themes } from "@/lib/themes";
import type { ThemeId } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  selected: ThemeId;
  onChange: (id: ThemeId) => void;
}

export default function ThemeSelector({ selected, onChange }: ThemeSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
        Choose a Theme
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {themes.map((theme) => {
          const isSelected = theme.id === selected;
          return (
            <button
              key={theme.id}
              onClick={() => onChange(theme.id)}
              className={cn(
                "relative group rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none text-left",
                isSelected
                  ? "border-indigo-400 ring-2 ring-indigo-500/30"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              {/* Color swatch */}
              <div
                className="h-16 w-full"
                style={{ background: theme.preview }}
              />
              {/* Info */}
              <div className="px-3 py-2 bg-white/5">
                <p className="text-xs font-semibold text-white truncate">{theme.name}</p>
                <p className="text-[10px] text-white/40 truncate">{theme.description}</p>
              </div>
              {/* Selected check */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
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
