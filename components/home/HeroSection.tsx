"use client";

import Link from "next/link";
import { useMemo } from "react";

import { BookOpen, Lightbulb } from "lucide-react";
import SadqaBadge from "@/components/ui/SadqaBadge";
import { useTheme } from "@/providers/ThemeProvider";

import { Quotes, getPeriodicQuote } from "@/lib/constants/dailyQuotes";
import PrayerDashboard from "./PrayerDashboard";

export default function HeroSection() {
  const { darkMode } = useTheme();
  const quote = useMemo(() => getPeriodicQuote(Quotes), []);

  return (
    <section className="relative flex flex-col xl:flex-row items-center justify-center px-4 md:px-6 lg:px-20 py-4 md:py-12 gap-4 xl:gap-12 grow min-h-[calc(100vh-160px)]">
      <div className="flex-1 text-center xl:text-right z-10 flex flex-col w-full max-w-2xl mx-auto xl:mx-0">
        <div className="mb-8">
          <SadqaBadge name="وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ " />
        </div>

        <h1 className="hidden xl:block text-3xl md:text-5xl lg:text-6xl font-bold font-amiri leading-tight mb-6">
          <span className="text-transparent bg-clip-text bg-linear-to-l from-amber-600 to-orange-600 flex items-center justify-center xl:justify-start gap-2 md:gap-3 drop-shadow-sm">
            رفيقك في رحلة الحياة
          </span>
        </h1>

        <div className="xl:hidden w-full max-w-85 mx-auto transform scale-90 origin-top transition-transform ">
          <PrayerDashboard darkMode={darkMode} />
        </div>

        <p
          className={`text-sm md:text-lg lg:text-xl font-amiri leading-loose max-w-full xl:max-w-2xl mx-auto xl:mx-0 my-4 xl:my-6 min-h-10 ${
            darkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {quote}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center xl:justify-start pt-2">
          <Link
            href="/hadiths/arbaeen"
            className="group px-6 py-3 bg-linear-to-r from-amber-600 to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 font-bold text-base w-full sm:w-auto"
          >
            <BookOpen size={20} />
            <span>الأربعين النووية لإبن عثيمين</span>
          </Link>

          <Link
            href="/hadiths/qisas"
            className={`group px-6 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 font-bold text-base w-full sm:w-auto border-2 ${
              darkMode
                ? "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/80"
                : "border-amber-200 bg-amber-50/60 text-amber-800 hover:bg-amber-100/80"
            }`}
          >
            <Lightbulb size={20} />
            <span>علمني رسول الله</span>
          </Link>
        </div>
      </div>

      <div className="hidden xl:block flex-1 w-full max-w-md lg:max-w-xl z-10 animate-fade-in-up">
        <PrayerDashboard darkMode={darkMode} />
      </div>
    </section>
  );
}
