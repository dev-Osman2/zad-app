"use client"; 

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileQuestion, Home, ArrowRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider"; 

export default function NotFound() {
  const router = useRouter();
  const { darkMode } = useTheme(); 

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 text-center transition-colors duration-300
      ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#fdfbf7] text-slate-800"}
      `}
    >
      <div className="relative mb-8">
        <div
          className={`absolute inset-0 rounded-full blur-xl animate-pulse
          ${darkMode ? "bg-amber-500/10" : "bg-amber-200/20"}
          `}
        />
        <div
          className={`relative p-6 rounded-full shadow-lg border
          ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-amber-100"
          }
          `}
        >
          <FileQuestion
            size={64}
            className={darkMode ? "text-amber-400" : "text-amber-500"}
          />
        </div>
      </div>

      <h2
        className={`text-4xl md:text-5xl font-bold font-amiri mb-4
        ${darkMode ? "text-slate-100" : "text-slate-800"}
        `}
      >
        عذراً، الصفحة غير موجودة
      </h2>

      <p
        className={`text-lg max-w-md mb-10 leading-relaxed
        ${darkMode ? "text-slate-400" : "text-slate-600"}
        `}
      >
        يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح، أو أن المحتوى قد تم نقله
        إلى مكان آخر.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition-all shadow-lg font-bold
          ${
            darkMode
              ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/20"
              : "bg-amber-600 hover:bg-amber-700 text-white hover:shadow-amber-500/20"
          }
          `}
        >
          <Home size={20} />
          <span>العودة للرئيسية</span>
        </Link>

        <button
          onClick={() => router.back()}
          className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition-all border shadow-sm cursor-pointer
          ${
            darkMode
              ? "bg-slate-800 border-slate-700 text-slate-200 hover:border-amber-500 hover:text-amber-400"
              : "bg-white border-slate-200 text-slate-700 hover:border-amber-500 hover:shadow-md"
          }
          `}
        >
          <span>الرجوع للخلف</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}