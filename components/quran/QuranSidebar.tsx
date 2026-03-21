"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ScrollText, X } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useSidebar } from "@/providers/SidebarProvider";
import { Chapter } from "@/lib/services/quranApi";
import { useParams } from "next/navigation";

export default function QuranSidebar({ surahs }: { surahs: Chapter[] }) {
  const { darkMode } = useTheme();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const params = useParams();

  const currentChapter = params?.chapterId ? Number(params.chapterId) : null;

  const filteredSurahs = surahs.filter(
    (s) => s.name_arabic.includes(searchTerm) || s.id.toString() === searchTerm,
  );

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-80 z-50 pt-4 flex flex-col transition-transform duration-300 border-l shadow-2xl
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        ${darkMode ? "bg-slate-900 border-slate-800" : "bg-[#FFFDF6] border-amber-100"}`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute top-4 left-4 p-2 rounded-full ${darkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-amber-100 text-amber-800"}`}
        >
          <X size={24} />
        </button>

        <div className="p-4 mt-8 border-b border-gray-100/10 shrink-0">
          <div
            className={`flex items-center gap-2 mb-4 px-2 ${darkMode ? "text-amber-500" : "text-amber-700"}`}
          >
            <ScrollText size={20} />
            <h3 className="font-bold text-lg font-amiri">فهرس السور</h3>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="ابحث باسم السورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pr-10 pl-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2
              ${
                darkMode
                  ? "bg-slate-800 text-slate-100 focus:ring-amber-500/50"
                  : "bg-white text-slate-800 border border-amber-100 focus:ring-amber-400/50"
              }`}
            />
            <Search
              size={16}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1 no-scrollbar">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.id}
              href={`/quran/${surah.id}`}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.02] group
              ${
                currentChapter === surah.id
                  ? darkMode
                    ? "bg-amber-900/20 text-amber-400 border border-amber-500/30"
                    : "bg-amber-50 text-amber-900 border border-amber-200"
                  : darkMode
                    ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    : "text-slate-600 hover:bg-white hover:text-amber-800 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                >
                  {surah.id}
                </span>
                <div className="flex flex-col">
                  <span className="font-amiri font-bold text-lg leading-none">
                    {surah.name_arabic}
                  </span>
                  <span className="text-[10px] opacity-70 mt-1">
                    {surah.revelation_place === "makkah" ? "مكية" : "مدنية"} •{" "}
                    {surah.verses_count} آية
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
