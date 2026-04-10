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
  const [isNotFound, setIsNotFound] = useState(false);

  const isQuickAccessPage =
    isNotFound ||
    pathname === "/" ||
    pathname === "/feedback" ||
    pathname === "/recommended-apps" ||
    pathname.includes("/exam/sahaba") ||
    pathname.includes("/exam/sahabiyat") ||
    pathname.includes("/exam/tabi3een");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleNotFound = () => setIsNotFound(true);
    const handleResetNotFound = () => setIsNotFound(false);

    window.addEventListener("set-not-found", handleNotFound);
    window.addEventListener("reset-not-found", handleResetNotFound);

    return () => {
      window.removeEventListener("set-not-found", handleNotFound);
      window.removeEventListener("reset-not-found", handleResetNotFound);
    };
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
        className={`fixed top-0 left-0 right-0 z-40 w-full shadow-sm md:px-10 border-b transition-colors duration-300 pt-[env(safe-area-inset-top,28px)] md:pt-0 ${
          darkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-amber-200"
        }`}
      >
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

      <div className="h-[calc(5rem+env(safe-area-inset-top,28px))] md:h-20" />

      <QuickAccessSidebar
        isOpen={isQuickAccessOpen}
        onClose={() => setIsQuickAccessOpen(false)}
      />
    </>
  );
}
