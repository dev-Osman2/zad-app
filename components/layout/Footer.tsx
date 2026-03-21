"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function Footer() {
  const { darkMode } = useTheme();


  return (
    <footer
      className={`py-6 md:py-8 text-center border-t transition-colors ${
        darkMode
          ? "bg-slate-900 border-slate-800 text-amber-400 "
          : "bg-amber-50 text-amber-600 border-amber-100"
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-5">
        <div
          className={`text-2xl md:text-3xl font-bold ${
            darkMode ? "text-amber-400" : "text-amber-700"
          }`}
          style={{ fontFamily: "'Aref Ruqaa', serif" }}
        >
          &quot; يا باغيَ الخيرِ أقبل، ويا باغيَ الشَّرِّ أقصِر &quot;
        </div>


        <div
          dir="ltr"
          className={`font-mono text-xs md:text-sm flex items-center justify-center gap-2 flex-wrap ${
            darkMode ? "text-[#a3b18a]" : "text-slate-600"
          }`}
        >
          <span>{"< Developed By >"}</span>

          <a
            href="https://www.facebook.com/twshkndy.qlashy"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-2 py-1 md:px-3 md:py-1 rounded-md font-bold transition-all hover:scale-105 ${
              darkMode
                ? "bg-[#1f5f68] text-teal-50 hover:bg-[#2a7a85]"
                : "bg-amber-200 text-amber-900 hover:bg-amber-300"
            }`}
          >
            Osman
          </a>

          <span className="hidden sm:inline">{"< All Copy Rights Reserved @2026 >"}</span>
          <span className="sm:hidden">{"< / >"}</span>
        </div>
      </div>
    </footer>
  );
}