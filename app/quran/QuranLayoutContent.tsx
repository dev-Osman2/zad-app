"use client";
import { useEffect } from "react";
import QuranSidebar from "@/components/quran/QuranSidebar";
import { Chapter } from "@/lib/services/quranApi";
import { useSidebar } from "@/providers/SidebarProvider";

export default function QuranLayoutContent({
  surahs,
  children,
}: {
  surahs: Chapter[];
  children: React.ReactNode;
}) {
  const { setIsSidebarOpen } = useSidebar();

  useEffect(() => {
    setIsSidebarOpen(true);
  }, [setIsSidebarOpen]);

  return (
    <div className="flex min-h-screen relative">
      <QuranSidebar surahs={surahs} />

      <div className="flex-1 w-full transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
