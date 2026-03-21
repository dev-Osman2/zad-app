"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useSidebar } from "@/providers/SidebarProvider";
import QuickAccessSidebar from "@/components/layout/QuickAccessSidebar";

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const pathname = usePathname();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isQuickAccessOpen, setIsQuickAccessOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  const isQuickAccessPage = pathname === "/" || pathname === "/feedback";

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    if (isQuickAccessPage) {
      setIsQuickAccessOpen(!isQuickAccessOpen);
    } else {
      toggleSidebar();
    }
  };

  const isMenuCurrentlyOpen = isQuickAccessPage
    ? isQuickAccessOpen
    : isSidebarOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full shadow-sm transition-all duration-300 ease-in-out md:px-10 ${
          isVisible ? "translate-y-0" : "-translate-y-[calc(100%-4px)]"
        } ${
          darkMode
            ? "bg-slate-900 border-b border-slate-700"
            : "bg-white border-b border-amber-200"
        }`}
      >
        <div className="absolute inset-0 z-0 md:hidden overflow-hidden">
          <Image
            src="/bgHeader.png"
            alt="Header Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className={`absolute inset-0 z-10 transition-colors ${
            darkMode ? "bg-slate-900/95" : "bg-white/95"
          }`}
        />

        <div className="container mx-auto px-4 h-20 flex items-center justify-between relative z-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold font-amiri bg-clip-text text-transparent bg-linear-to-l from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-200">
              زاد
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all border ${
                darkMode
                  ? "bg-slate-800/80 text-amber-400 border-slate-700 hover:bg-slate-700"
                  : "bg-amber-50/80 text-amber-600 border-amber-100 hover:bg-amber-100"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={handleMenuClick}
              className={`p-2.5 rounded-lg transition-all border ${
                darkMode
                  ? "bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700"
                  : "bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
              aria-label="Toggle Menu"
            >
              {isMenuCurrentlyOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent z-30">
          <div
            className="h-full transition-all duration-150 ease-out"
            style={{
              width: `${scrollProgress}%`,
              backgroundColor: darkMode ? "#2DD4BF" : "#E17100",
            }}
          />
        </div>
      </header>

      <QuickAccessSidebar
        isOpen={isQuickAccessOpen}
        onClose={() => setIsQuickAccessOpen(false)}
      />
    </>
  );
}
