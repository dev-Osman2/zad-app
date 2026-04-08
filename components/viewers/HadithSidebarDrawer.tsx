"use client";

import { useEffect, useState, type MouseEvent } from "react";
import {
  ScrollText,
  ClipboardList,
  BookOpen,
  CheckCircle2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { useSidebar } from "@/providers/SidebarProvider";
import { Section } from "@/lib/types/types";

interface HadithSidebarDrawerProps {
  sections: Section[];
  bookSlug: string;
  currentHadithId: string;
  examSlugs?: Record<string, string>;
  sharhSlugs?: Record<string, string>;
  readHadithIds?: string[];
  onSelectHadith?: (hadithId: string) => void;
}

export default function HadithSidebarDrawer({
  sections,
  bookSlug,
  currentHadithId,
  examSlugs = {},
  sharhSlugs = {},
  readHadithIds = [],
  onSelectHadith,
}: HadithSidebarDrawerProps) {
  const { darkMode } = useTheme();
  const { isSidebarOpen, setIsSidebarOpen, closeSidebar } = useSidebar();
  const [storedReadHadithIds, setStoredReadHadithIds] = useState<string[]>([]);

  const storageKey = `hadith_progress_${bookSlug}`;

  useEffect(() => {
    const loadReads = () => {
      try {
        const savedReads = localStorage.getItem(storageKey);
        setStoredReadHadithIds(savedReads ? JSON.parse(savedReads) : []);
      } catch {
        setStoredReadHadithIds([]);
      }
    };

    loadReads();
    window.addEventListener("storage", loadReads);
    window.addEventListener("hadith-progress-updated", loadReads);

    return () => {
      window.removeEventListener("storage", loadReads);
      window.removeEventListener("hadith-progress-updated", loadReads);
    };
  }, [storageKey]);

  const mergedReadHadithIds = Array.from(
    new Set([...storedReadHadithIds, ...readHadithIds]),
  );

  const handleHadithClick = (
    event: MouseEvent<HTMLAnchorElement>,
    hadithId: string,
  ) => {
    if (onSelectHadith) {
      event.preventDefault();
      onSelectHadith(hadithId);
    }
    closeSidebar();
  };

  return (
    <>
      <aside
        className={`
          fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out pt-24 lg:pt-24
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          ${darkMode ? "bg-slate-900/95 border-l border-slate-800" : "bg-[#FFFDF6]/95 border-l border-amber-100"}
          shadow-2xl backdrop-blur-lg overflow-y-auto no-scrollbar
        `}
      >
        <div className="p-4">
          <div
            className={`flex items-center justify-between mb-6 px-2 ${darkMode ? "text-amber-500" : "text-amber-700"}`}
          >
            <ScrollText size={18} />
            <h3 className="font-bold text-sm uppercase tracking-wider">
              فهرس الأحاديث
            </h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={` p-2 rounded-full left-0${
                darkMode
                  ? "hover:bg-slate-800 text-slate-400"
                  : "hover:bg-amber-100 text-amber-800"
              }`}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-1.5">
            {sections.map((section) => {
              if (section.id === "0" || section.type === "intro") return null;

              const examSlug = examSlugs[section.id];
              const sharhSlug = sharhSlugs[section.id];
              const isCurrent = section.id === currentHadithId;
              const isRead = mergedReadHadithIds.includes(section.id);

              return (
                <div key={section.id} className="space-y-0.5">
                  <Link
                    href={`/hadiths/${bookSlug}#${section.id}`}
                    onClick={(event) => handleHadithClick(event, section.id)}
                    className={`w-full text-right px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group
                      ${
                        isCurrent
                          ? darkMode
                            ? "bg-amber-900/20 text-amber-400 font-bold border-r-4 border-amber-500"
                            : "bg-amber-50 text-amber-900 font-bold border-r-4 border-amber-600 shadow-sm"
                          : darkMode
                            ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            : "text-slate-600 hover:bg-white hover:text-amber-800 hover:shadow-sm"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`shrink-0 w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold
                          ${
                            isCurrent
                              ? darkMode
                                ? "bg-amber-500 text-slate-900"
                                : "bg-amber-600 text-white"
                              : darkMode
                                ? "bg-slate-800 text-slate-500"
                                : "bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-700"
                          }`}
                      >
                        {section.id.replace(/h|m/, "")}
                      </span>
                      {isRead && (
                        <CheckCircle2
                          size={14}
                          className={
                            darkMode ? "text-green-400" : "text-green-600"
                          }
                        />
                      )}
                    </div>
                    <span className="truncate font-amiri text-base">
                      {section.title}
                    </span>
                  </Link>

                  {sharhSlug && (
                    <Link
                      href={`/hadiths/${bookSlug}/${sharhSlug}`}
                      onClick={closeSidebar}
                      className={`flex items-center gap-2 px-8 py-2 rounded-lg text-xs transition-all duration-200
                        ${
                          isCurrent
                            ? darkMode
                              ? "bg-blue-900/30 text-blue-300 font-bold"
                              : "bg-blue-50 text-blue-700 font-bold"
                            : darkMode
                              ? "text-slate-500 hover:bg-slate-800 hover:text-blue-300"
                              : "text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                      <BookOpen size={13} />
                      <span className="font-amiri">الشرح</span>
                    </Link>
                  )}

                  {examSlug && (
                    <Link
                      href={`/exam/${examSlug}`}
                      onClick={closeSidebar}
                      className={`flex items-center gap-2 px-8 py-2 rounded-lg text-xs transition-all duration-200
                        ${
                          isCurrent
                            ? darkMode
                              ? "bg-teal-900/30 text-teal-400 font-bold"
                              : "bg-teal-50 text-teal-700 font-bold"
                            : darkMode
                              ? "text-slate-500 hover:bg-slate-800 hover:text-teal-400"
                              : "text-slate-400 hover:bg-teal-50 hover:text-teal-600"
                        }`}
                    >
                      <ClipboardList size={13} />
                      <span className="font-amiri">اختبار</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
