"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { X, ChevronDown, MessageSquareHeart } from "lucide-react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sectionsData } from "@/lib/contentData"; 

interface QuickAccessSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAccessSidebar({ isOpen, onClose }: QuickAccessSidebarProps) {
  const { darkMode } = useTheme();
  const pathname = usePathname();

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "القرآن الكريم وعلومه": true,
  });

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity h-[100dvh]"
          onClick={onClose}
        />
      )}

      <aside
        className={` border-2 ${darkMode ? "border-slate-800" : "border-white"}
          fixed top-0 right-0 h-[100dvh] w-80 z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          ${darkMode ? "bg-slate-900/95 border-l border-slate-800" : "bg-white/95 border-l border-amber-100"}
          shadow-2xl backdrop-blur-lg overflow-y-auto no-scrollbar
        `}
        dir="rtl"
      >
        <div className="p-4 pt-6 lg:pt-8 min-h-[100dvh] pb-24 flex flex-col">
          
          <div className="flex items-center justify-between mb-6 px-2 mt-16 md:mt-0 border-b border-amber-500/20 pb-4 shrink-0">
            <h3 className={`font-bold text-lg uppercase tracking-wider ${darkMode ? "text-amber-500" : "text-amber-700"}`}>
              فهرس المحتوى
            </h3>
            
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors lg:hidden ${
                darkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600"
              }`}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-4 flex-grow">
            
            {sectionsData.map((category) => {
              const isCategoryOpen = openCategories[category.title];

              return (
                <div key={category.id} className="flex flex-col">
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all
                      ${darkMode ? "bg-slate-800/50 hover:bg-slate-800" : "bg-slate-50 hover:bg-slate-100"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold
                        ${darkMode ? "bg-slate-700 text-amber-500" : "bg-amber-100 text-amber-700"}
                      `}>
                        {category.icon} 
                      </span>
                      <span className={`font-bold font-amiri text-base ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                        {category.title}
                      </span>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform duration-300 ${darkMode ? "text-slate-400" : "text-slate-500"} ${isCategoryOpen ? "rotate-180" : ""}`} 
                    />
                  </button>

                  {isCategoryOpen && (
                    <div className={`flex flex-col gap-1 mt-2 mr-6 pr-4 border-r-2 ${darkMode ? "border-slate-800" : "border-amber-100"}`}>
                      {category.items.map((item) => {
                        const isActive = pathname === item.link;
                        return (
                          <Link
                            key={item.id}
                            href={item.link}
                            onClick={onClose}
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 relative
                              ${isActive 
                                ? darkMode ? "text-amber-400 bg-amber-900/10" : "text-amber-700 bg-amber-50"
                                : darkMode ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50" : "text-slate-600 hover:text-amber-600 hover:bg-slate-50"
                              }
                            `}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-amber-500" : "bg-slate-400 opacity-50"}`} />
                            <span className="font-amiri text-base">{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <hr className={`my-2 border-t-2 ${darkMode ? "border-slate-800/50" : "border-amber-100/50"}`} />

            <Link
              href="/feedback"
              onClick={onClose}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all
                ${darkMode 
                  ? "bg-slate-800/80 hover:bg-slate-800" 
                  : "bg-amber-50 hover:bg-amber-100"
                }
              `}
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold
                ${darkMode ? "bg-amber-900/50 text-amber-500" : "bg-amber-200 text-amber-800"}
              `}>
                <MessageSquareHeart size={18} />
              </span>
              <span className={`font-bold font-amiri text-base ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                شاركنا رأيك ومقترحاتك
              </span>
            </Link>

          </nav>
        </div>
      </aside>
    </>
  );
}