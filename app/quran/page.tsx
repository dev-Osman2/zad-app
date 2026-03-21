"use client";
import { useTheme } from "@/providers/ThemeProvider";
import { BookOpen } from "lucide-react";

export default function QuranIndexPage() {
  const { darkMode } = useTheme();

  return (
    <div className={`h-[80vh] flex flex-col items-center justify-center p-6 text-center ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${darkMode ? "bg-slate-800 text-amber-500" : "bg-amber-50 text-amber-600"}`}>
        <BookOpen size={48} strokeWidth={1.5} />
      </div>
      <h1 className="text-3xl font-bold font-amiri mb-2">القرآن الكريم</h1>
      <p>اختر سورة من القائمة الجانبية للبدء في التلاوة</p>
    </div>
  );
}