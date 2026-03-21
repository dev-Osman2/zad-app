"use client";

import { Heart } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface SadqaBadgeProps {
  name: string;
  className?: string;
}

export default function SadqaBadge({
  name,
  className = "",
}: SadqaBadgeProps) {
  const { darkMode } = useTheme();

  return (
    <div className={`  ${className}`}>
      <div
        className={`group relative  overflow-hidden inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] cursor-default
        ${
          darkMode
            ? "bg-gradient-to-r from-slate-800 to-slate-900 border border-amber-500/30 text-amber-100 shadow-[0_0_15px_-3px_rgba(245,158,11,0.15)]"
            : "bg-gradient-to-r from-amber-50 to-white border border-amber-200 text-amber-900 shadow-sm shadow-amber-100/50"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-full translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 
          bg-gradient-to-r from-transparent ${
            darkMode ? "via-white/20" : "via-amber-900/10"
          } to-transparent`}
        />

        <div className="relative flex items-center justify-center">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping ${
              darkMode ? "bg-amber-500" : "bg-amber-400"
            }`}
          ></span>

          <Heart
            size={16}
            className={`${
              darkMode
                ? "text-amber-500 fill-amber-500/20"
                : "text-amber-600 fill-amber-600/20"
            } relative z-10`}
          />
        </div>

        <span className="font-bold border-b border-amber-500/30 pb-0.5">
          {name}
        </span>
      </div>
    </div>
  );
}
