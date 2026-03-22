"use client";

import { useState } from "react";
import Link from "next/link";
import { Library, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { sectionsData } from "@/lib/contentData";
import { useTheme } from "@/providers/ThemeProvider";

const BookCard = ({
  book,
  darkMode,
}: {
  book: { title: string; author: string; link: string };
  darkMode: boolean;
}) => (
  <div
    className={`relative  flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
      darkMode
        ? "bg-slate-800 border-slate-700 hover:border-slate-600 shadow-lg"
        : "bg-white border-slate-100 hover:border-amber-200 shadow-sm hover:shadow-md"
    }`}
  >
    <div
      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:rotate-6 transition-transform ${
        darkMode
          ? "bg-emerald-900/30 text-emerald-400"
          : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <BookOpen size={28} strokeWidth={1.5} />
    </div>
    <h3
      className={`text-xl font-bold font-amiri mb-1 leading-relaxed ${
        darkMode ? "text-slate-100" : "text-slate-800"
      }`}
    >
      {book.title}
    </h3>
    <p
      className={`text-xs mb-6 font-medium ${
        darkMode ? "text-slate-400" : "text-slate-500"
      }`}
    >
      {book.author}
    </p>
    <div
      className={`w-full pt-4 border-t mt-auto ${
        darkMode ? "border-slate-700" : "border-slate-100"
      }`}
    >
      <Link
        href={book.link}
        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm transition-colors ${
          darkMode
            ? "hover:bg-slate-700 text-slate-300 hover:text-white"
            : "hover:bg-amber-50 text-slate-600 hover:text-amber-700"
        }`}
      >
        <BookOpen size={16} />
        <span>فتح</span>
      </Link>
    </div>
  </div>
);

export default function BooksSection() {
  const { darkMode } = useTheme();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((sec) => sec !== id) : [...prev, id],
    );
  };

  return (
    <section className={`px-6 lg:px-20 py-12 relative z-10 space-y-8 ${darkMode ? "bg-[#131C30]!" : ""}`}  >
      <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
        <Library className="text-amber-500" size={28} />
        <h2 className="text-3xl font-bold font-amiri">المتون المشروحة</h2>
      </div>

      <div className="space-y-6 max-w-7xl mx-auto">
        {sectionsData.map((section) => {
          const isOpen = openSections.includes(section.id);
          return (
            <div
              key={section.id}
              className={`rounded-3xl  transition-all duration-300 overflow-hidden border ${
                darkMode
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-white/80 border-amber-100 shadow-sm"
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-6 text-right transition-colors  ${
                  darkMode ? "hover:bg-slate-700/50" : "hover:bg-amber-50/50"
                }`}
              >
                <div className="flex items-center gap-4 ">
                  <div
                    className={`p-3 rounded-xl ${
                      darkMode
                        ? "bg-slate-700 text-amber-400"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-amiri">
                    {section.title}
                  </h3>
                </div>
                <div
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "max-h-500 opacity-100 p-6 pt-0"
                    : "max-h-0 opacity-0 p-0 overflow-hidden"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  pt-6">
                  {section.items.map((book) => (
                    <BookCard key={book.id} book={book} darkMode={darkMode} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
