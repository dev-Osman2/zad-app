"use client";

import { SurahDetail } from "@/lib/services/quranApi";
import { useTheme } from "@/providers/ThemeProvider";
import { BookOpen } from "lucide-react";

export default function SurahContent({ surah }: { surah: SurahDetail }) {
  const { darkMode } = useTheme();

  const startPage = surah.verses[0]?.page_number;
  const startJuz = surah.verses[0]?.juz_number;
  const showBismillahHeader = surah.meta.id !== 1 && surah.meta.id !== 9;

  return (
    <div
      className={`min-h-screen pb-20 px-4 md:px-8 pt-20 ${darkMode ? "bg-slate-900" : "bg-[#fdfbf7]"}`}
    >
      <div className="container mx-auto py-8 max-w-4xl">
        <div
          className={`rounded-3xl p-8 mb-8 text-center relative overflow-hidden border transition-colors duration-500
          ${
            darkMode
              ? "bg-slate-800/50 border-slate-700"
              : "bg-white border-amber-100 shadow-sm"
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h1
              className={`text-4xl md:text-6xl font-amiri font-bold mb-6 ${darkMode ? "text-amber-400" : "text-amber-700"}`}
            >
              سورة {surah.meta.name_arabic}
            </h1>
            <div
              className={`inline-flex flex-wrap justify-center items-center gap-3 text-sm font-medium px-6 py-3 rounded-2xl border
              ${darkMode ? "bg-slate-900 border-slate-700 text-slate-400" : "bg-amber-50 border-amber-200 text-amber-900"}`}
            >
              <span className="flex items-center gap-2">
                <BookOpen size={16} className="text-amber-500" /> صفحة{" "}
                {startPage}
              </span>
              <span className="w-px h-4 bg-current opacity-20"></span>
              <span>الجزء {startJuz}</span>
              <span className="w-px h-4 bg-current opacity-20"></span>
              <span>
                {surah.meta.revelation_place === "makkah" ? "مكية" : "مدنية"}
              </span>
              <span className="w-px h-4 bg-current opacity-20"></span>
              <span>{surah.meta.verses_count} آية</span>
            </div>
          </div>
        </div>

        {showBismillahHeader && (
          <div
            className={`text-center mb-12 font-amiri text-3xl md:text-4xl select-none ${darkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        )}

        <div
          className={`text-justify leading-[2.5] md:leading-[3] font-amiri text-2xl md:text-4xl px-6 py-10 rounded-[2rem] border-2 shadow-sm
          ${
            darkMode
              ? "bg-slate-800/20 text-slate-200 border-slate-800"
              : "bg-white text-slate-800 border-[#f0eadd]"
          }`}
          dir="rtl"
        >
          {surah.verses.map((ayah, index) => {
            let text = ayah.text_uthmani;

            if (
              showBismillahHeader &&
              index === 0 &&
              text.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ")
            ) {
              text = text
                .replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "")
                .trim();
            }

            return (
              <span
                key={ayah.id}
                className="inline relative text-xl md:text-2xl"
              >
                {text}
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 mx-2 align-middle text-[0.6em] border-2 rounded-full font-bold select-none
                  ${darkMode ? "border-amber-600 text-amber-400 bg-slate-800" : "border-amber-600 text-amber-800 bg-[#fbf9f5]"}`}
                >
                  {ayah.verse_key.split(":")[1]}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
