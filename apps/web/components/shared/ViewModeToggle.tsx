"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export type ViewMode = "grid" | "list" | "poster";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const modes = [
  { id: "grid" as const, icon: LayoutGrid, labelTh: "ตาราง", labelEn: "Grid" },
  { id: "list" as const, icon: List, labelTh: "รายการ", labelEn: "List" },
  { id: "poster" as const, icon: ImageIcon, labelTh: "โปสเตอร์", labelEn: "Poster" },
];

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-[var(--ct-bg-hover)] border border-[var(--ct-border)] rounded-xl p-1">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = value === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className="relative px-3 py-1.5 rounded-lg text-xs font-thai flex items-center gap-1.5 transition-colors duration-200"
            title={lang === "th" ? mode.labelTh : mode.labelEn}
          >
            {isActive && (
              <motion.div
                layoutId="viewmode-indicator"
                className="absolute inset-0 bg-[#EC1C72]/15 border border-[#EC1C72]/20 rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <Icon className={`w-3.5 h-3.5 relative z-10 transition-colors ${isActive ? "text-[#EC1C72]" : "text-[var(--ct-text-muted)]"}`} />
            <span className={`relative z-10 hidden sm:inline transition-colors ${isActive ? "text-[#EC1C72]" : "text-[var(--ct-text-muted)]"}`}>
              {lang === "th" ? mode.labelTh : mode.labelEn}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Hook for persisting view mode per page
export function useViewMode(key: string, defaultMode: ViewMode = "grid"): [ViewMode, (mode: ViewMode) => void] {
  const [mode, setMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return defaultMode;
    return (localStorage.getItem(`viewMode-${key}`) as ViewMode) || defaultMode;
  });

  const setViewMode = (newMode: ViewMode) => {
    setMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem(`viewMode-${key}`, newMode);
    }
  };

  return [mode, setViewMode];
}
