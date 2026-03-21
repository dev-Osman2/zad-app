"use client";

import { useState } from "react";
import {
  ScrollText,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Podcast,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import IntroSection from "@/components/sections/IntroSection";
import { useTheme } from "@/providers/ThemeProvider";
import { useSidebar } from "@/providers/SidebarProvider";
import { CourseInfo, Section } from "@/lib/types/types";

interface CourseViewerProps {
  info: CourseInfo;
  content: Section[];
  variant?: "books" | "podcast";
}

export default function CourseViewer({
  info,
  content,
  variant = "books",
}: CourseViewerProps) {
  const { darkMode } = useTheme();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [activeSection, setActiveSection] = useState("intro");
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>(
    variant === "podcast" ? info.videoLink : undefined,
  );

  const isPodcast = variant === "podcast";

  const toggleCard = (id: string) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handlePlayVideo = (link?: string) => {
    if (link && isPodcast) {
      setCurrentVideo(link);
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    if (!isPodcast) {
      setExpandedCards((prev) => (!prev.includes(id) ? [...prev, id] : prev));
    }

    const element = document.getElementById(id);
    if (element) {
      if (isPodcast) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(id);
      }
      setIsSidebarOpen(false);
    }
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isPodcast ? "selection:bg-amber-200 selection:text-amber-900" : ""
      } ${
        darkMode
          ? "bg-slate-900 text-slate-100"
          : isPodcast
            ? "bg-[#FFF7EA] text-slate-800"
            : "bg-[#fdfbf7] text-slate-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8 flex gap-8 items-start relative">
        <aside
          className={`
          fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out
          ${isPodcast ? "pt-24 lg:pt-24" : ""}
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          ${
            darkMode
              ? "bg-slate-900/95 border-l border-slate-800"
              : isPodcast
                ? "bg-[#FFFDF6]/95 border-l border-amber-100"
                : "bg-white/95 border-l border-amber-100"
          }
          shadow-2xl backdrop-blur-lg overflow-y-auto no-scrollbar
        `}
        >
          <div className={`p-4 ${isPodcast ? "" : "pt-20 lg:pt-6"}`}>
            <div
              className={`flex items-center gap-2 mb-6 px-2 ${
                darkMode ? "text-amber-500" : "text-amber-700"
              }`}
            >
              <ScrollText size={18} />
              <h3 className="font-bold text-sm uppercase tracking-wider">
                {isPodcast ? "قائمة الحلقات" : "فهرس المحتوى"}
              </h3>
            </div>

            <nav className="space-y-1.5">
              {content.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-right px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group
            ${
              !isPodcast && activeSection === section.id
                ? darkMode
                  ? "bg-amber-900/20 text-amber-400 font-bold border-r-4 border-amber-500"
                  : "bg-amber-50 text-amber-900 font-bold border-r-4 border-amber-600 shadow-sm"
                : darkMode
                  ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  : "text-slate-600 hover:bg-white hover:text-amber-800 hover:shadow-sm"
            }
          `}
                >
                  <span
                    className={`shrink-0 w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold
            ${
              !isPodcast && activeSection === section.id
                ? darkMode
                  ? "bg-amber-500 text-slate-900"
                  : "bg-amber-600 text-white"
                : darkMode
                  ? "bg-slate-800 text-slate-500"
                  : "bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-700"
            }
          `}
                  >
                    {isPodcast
                      ? index + 1
                      : section.id === "intro" || section.id === "1"
                        ? "م"
                        : section.id.replace("m", "").replace("h", "")}
                  </span>
                  <span className="truncate font-amiri text-base">
                    {section.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main
          className={`flex-1 min-w-0 ${isPodcast ? "pb-20 lg:p-12" : "pb-16 lg:p-15"}`}
        >
          <div className={isPodcast ? "space-y-12" : "space-y-8"}>
            {isPodcast ? (
              <IntroSection
                title={info.title}
                desc={info.desc}
                videoLink={currentVideo}
                bookLink={info.bookLink}
              />
            ) : (
              <IntroSection {...info} />
            )}

            <div className="grid grid-cols-1 gap-6">
              {content.map((section, index) => {
                const isExpanded = expandedCards.includes(section.id);

                return (
                  <article
                    id={section.id}
                    key={section.id}
                    className={`${!isPodcast ? "scroll-mt-24" : ""} rounded-2xl transition-all duration-300 border
                    ${
                      darkMode
                        ? "bg-slate-800/40 border-slate-700 hover:border-slate-600"
                        : "bg-white border-amber-100 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div
                      className="p-5 flex items-center justify-between gap-4 cursor-pointer"
                      onClick={() => toggleCard(section.id)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {isPodcast ? (
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
                            ${darkMode ? "bg-slate-700 text-amber-500" : "bg-amber-50 text-amber-600"}`}
                          >
                            <Podcast size={24} />
                          </div>
                        ) : (
                          <span
                            className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold mt-1
                            ${
                              darkMode
                                ? "bg-slate-700 text-amber-500"
                                : "bg-amber-100 text-amber-800"
                            }
                          `}
                          >
                            {index === 0 ? "م" : index}
                          </span>
                        )}
                        <div>
                          <h3
                            className={`${isPodcast ? "text-sm md:text-xl" : "text-lg md:text-xl lg:text-2xl"} font-bold ${
                              isPodcast
                                ? darkMode
                                  ? "text-slate-200"
                                  : "text-slate-800"
                                : darkMode
                                  ? "text-amber-400"
                                  : "text-amber-800"
                            } ${isPodcast ? "font-amiri" : ""}`}
                          >
                            {section.title}
                          </h3>
                          {isPodcast && (
                            <p
                              className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                            >
                              الحلقة رقم {index + 1}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPodcast && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayVideo(section.videoLink);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all
                            ${
                              darkMode
                                ? "bg-amber-600 hover:bg-amber-500 text-white"
                                : "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                            }`}
                          >
                            <PlayCircle size={18} />
                            <span className="hidden sm:inline">تشغيل</span>
                          </button>
                        )}

                        <button
                          onClick={
                            isPodcast
                              ? (e) => {
                                  e.stopPropagation();
                                  toggleCard(section.id);
                                }
                              : undefined
                          }
                          className={`p-2 rounded-full transition-colors
                          ${
                            darkMode
                              ? "hover:bg-slate-700 text-slate-400"
                              : "hover:bg-amber-50 text-slate-500"
                          }`}
                        >
                          {isExpanded ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-[max-height] duration-700 ease-in-out
                      ${
                        isExpanded
                          ? isPodcast
                            ? "max-h-2500 opacity-100"
                            : "max-h-[5000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div
                        className={`p-6 md:p-8 pt-2 border-t ${
                          darkMode ? "border-slate-700" : "border-amber-50"
                        }`}
                      >
                        <ReactMarkdown
                          components={{
                            h3: ({ ...props }) => (
                              <h3
                                className={`text-xl md:text-2xl font-bold font-amiri mt-10 mb-4 pb-2 border-b
                                ${
                                  darkMode
                                    ? "text-amber-400 border-slate-700"
                                    : "text-amber-800 border-amber-100"
                                }`}
                                {...props}
                              />
                            ),
                            p: ({ ...props }) => (
                              <p
                                className={`text-base md:text-lg leading-loose mb-6 font-amiri text-justify
                                ${
                                  darkMode ? "text-slate-300" : "text-slate-700"
                                }`}
                                {...props}
                              />
                            ),
                            ul: ({ ...props }) => (
                              <ul
                                className="space-y-4 my-6 list-none pr-0"
                                {...props}
                              />
                            ),
                            li: ({ ...props }) => (
                              <li
                                className={`relative pr-6 text-base md:text-lg leading-relaxed
                                ${
                                  darkMode ? "text-slate-300" : "text-slate-700"
                                }`}
                              >
                                <span
                                  className={`absolute top-2.5 right-0 w-2 h-2 rounded-full
                                  ${darkMode ? "bg-amber-500" : "bg-amber-600"}`}
                                />
                                <span {...props} />
                              </li>
                            ),
                            strong: ({ ...props }) => (
                              <strong
                                className={`font-bold mx-1 px-1 rounded
                                ${
                                  darkMode
                                    ? "text-amber-300 bg-amber-900/20"
                                    : "text-amber-900 bg-amber-50"
                                }`}
                                {...props}
                              />
                            ),
                          }}
                        >
                          {section.content || ""}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
