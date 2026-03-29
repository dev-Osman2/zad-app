"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  Circle,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import IntroSection from "@/components/sections/IntroSection";
import { CourseData } from "@/lib/types/types";
import HadithSidebarDrawer from "@/components/viewers/HadithSidebarDrawer";

interface HadithViewerProps {
  data: CourseData;
  hadithSlug: string;
  storageKey: string;
  sharhLabel?: string;
  hadithExamSlugs?: Record<string, string>;
  hadithSharhSlugs?: Record<string, string>;
}

export default function HadithViewer({
  data,
  hadithSlug,
  storageKey,
  sharhLabel = "شرح الشيخ إبن عثيمين",
  hadithExamSlugs = {},
  hadithSharhSlugs = {},
}: HadithViewerProps) {
  const { info, content: bookContent } = data;
  const { darkMode } = useTheme();

  const [activeSection, setActiveSection] = useState("intro");
  const [readHadiths, setReadHadiths] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedReads = localStorage.getItem(storageKey);
        if (savedReads) {
          setReadHadiths(JSON.parse(savedReads));
        }
      } catch (error) {
        console.error("Error parsing saved reads:", error);

        localStorage.removeItem(storageKey);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [storageKey]);

  const toggleRead = (id: string) => {
    let newReads;
    if (readHadiths.includes(id)) {
      newReads = readHadiths.filter((item) => item !== id);
    } else {
      newReads = [...readHadiths, id];
    }
    setReadHadiths(newReads);
    localStorage.setItem(storageKey, JSON.stringify(newReads));
    window.dispatchEvent(new Event("hadith-progress-updated"));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-amber-200 selection:text-amber-900 ${
        darkMode ? "bg-slate-900 text-slate-100" : "bg-[#FFF7EA] text-slate-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8 flex gap-8 items-start relative">
        <HadithSidebarDrawer
          sections={bookContent}
          bookSlug={hadithSlug}
          currentHadithId={activeSection}
          examSlugs={hadithExamSlugs}
          sharhSlugs={hadithSharhSlugs}
          readHadithIds={readHadiths}
          onSelectHadith={scrollToSection}
        />

        <main className="flex-1 min-w-0 pb-20 lg:p-12">
          <div className="space-y-12">
            <IntroSection {...info} />

            {bookContent.map((item) => {
              if (item.id === "0") return null;
              const isRead = readHadiths.includes(item.id);

              return (
                <article
                  id={item.id}
                  key={item.id}
                  className={`scroll-mt-32 rounded-2xl overflow-hidden transition-all duration-500
                  ${
                    darkMode
                      ? "bg-slate-800/40 border border-slate-700 hover:border-slate-600"
                      : "bg-[#FFFDF6] border border-amber-100 shadow-sm hover:shadow-md"
                  }
                  ${isRead ? "opacity-75 grayscale-[0.5]" : ""} 
                `}
                >
                  <div
                    className={`p-6 md:p-8 border-b flex flex-wrap items-center justify-between gap-4 
                    ${darkMode ? "bg-slate-800/80 border-slate-700" : "bg-linear-to-r from-amber-50/50 to-white border-amber-100"}`}
                  >
                    <div className="flex-1">
                      <h2
                        className={`text-xl md:text-3xl lg:text-4xl font-bold font-amiri leading-normal ${darkMode ? "text-slate-100" : "text-slate-800"}`}
                      >
                        {item.id !== "intro"
                          ? `${item.id.replace("h", "")}: `
                          : ""}{" "}
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-3 md:p-8 space-y-10">
                    {item.type === "intro" ? (
                      <div
                        className={`prose prose-lg max-w-none leading-loose font-amiri text-lg md:text-xl ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                      >
                        {(item.content || "")
                          .split("\n")
                          .map((paragraph, idx) => (
                            <p key={idx} className="mb-4">
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    ) : (
                      <>
                        {item.matn && (
                          <section className="relative">
                            <div
                              className={`relative hadith-text p-2  md:p-8 rounded-xl text-justify overflow-hidden transition-colors
                              ${darkMode ? "bg-slate-900/50 border border-slate-700" : "bg-amber-50/60 border-2 border-amber-200/70 shadow-inner"}`}
                            >
                              <p
                                className={`text-[18px] md:text-2xl  font-amiri leading-[2.5] md:leading-loose font-bold ${darkMode ? "text-amber-200" : "text-amber-900"}`}
                              >
                                {item.matn}
                              </p>
                            </div>
                          </section>
                        )}

                        {item.fawaid && item.fawaid.length > 0 && (
                          <section>
                            <h3
                              className={`flex items-center gap-2 text-xl font-bold mb-4 font-amiri ${darkMode ? "text-green-400" : "text-green-700"}`}
                            >
                              <Bookmark className="w-5 h-5" />
                              الفوائد المستنبطة
                            </h3>
                            <ul className="space-y-3 pr-2">
                              {item.fawaid.map((fayda, idx) => (
                                <li
                                  key={idx}
                                  className={`flex items-start gap-3 text-base md:text-lg leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                                >
                                  <span
                                    className={`mt-2 w-2 h-2 rounded-full shrink-0 ${darkMode ? "bg-green-500" : "bg-green-600"}`}
                                  />
                                  <span>{fayda}</span>
                                </li>
                              ))}
                            </ul>
                          </section>
                        )}

                        {item.sharh && (
                          <section>
                            <h3
                              className={`flex items-center gap-2 text-xl font-bold mb-4 font-amiri ${darkMode ? "text-blue-400" : "text-blue-800"}`}
                            >
                              <BookOpen className="w-5 h-5" />
                              {Number(item.id.replace("h", "")) <= 42 ? `${sharhLabel}` : "شرح إبن رجب"}
                            </h3>
                            <div
                              className={`prose prose-lg max-w-none text-base md:text-lg leading-loose text-justify ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                            >
                              {item.sharh.split("\n").map((line, idx) => (
                                <p key={idx} className="mb-4">
                                  {line}
                                </p>
                              ))}
                            </div>
                          </section>
                        )}
                      </>
                    )}
                  </div>
                  <div
                    className={`flex  items-center justify-center gap-2  py-2 `}
                  >
                    <button
                      onClick={() => toggleRead(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border
                      ${
                        isRead
                          ? "bg-green-50 border-green-200 text-green-700 shadow-sm"
                          : darkMode
                            ? "bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600 hover:text-white"
                            : "bg-white border-slate-200 text-slate-500 hover:border-green-400 hover:text-green-600 hover:shadow-sm"
                      }`}
                    >
                      {isRead ? (
                        <>
                          <CheckCircle2
                            size={20}
                            className="fill-green-600 text-white"
                          />
                          <span className="font-bold text-sm">مكتمل</span>
                        </>
                      ) : (
                        <>
                          <Circle size={20} strokeWidth={1.5} />
                          <span className="font-medium text-sm">تحديد</span>
                        </>
                      )}
                    </button>
                    {hadithSharhSlugs[item.id] && (
                      <Link
                        href={`/hadiths/${hadithSlug}/${hadithSharhSlugs[item.id]}`}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border ${
                          darkMode
                            ? "bg-slate-700 border-slate-600 text-blue-300 hover:bg-blue-900/30 hover:border-blue-600"
                            : "bg-white border-slate-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
                        }`}
                      >
                        <BookOpen size={18} />
                        <span className="font-medium text-sm">الشرح</span>
                      </Link>
                    )}
                    {hadithExamSlugs[item.id] && (
                      <Link
                        href={`/exam/${hadithExamSlugs[item.id]}`}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border ${
                          darkMode
                            ? "bg-slate-700 border-slate-600 text-amber-400 hover:bg-amber-900/30 hover:border-amber-600"
                            : "bg-white border-slate-200 text-amber-600 hover:border-amber-400 hover:bg-amber-50 hover:shadow-sm"
                        }`}
                      >
                        <ClipboardList size={18} />
                        <span className="font-medium text-sm">اختبار</span>
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
