"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { BookOpen, Calendar, Lightbulb } from "lucide-react";
import SadqaBadge from "@/components/ui/SadqaBadge";
import { useTheme } from "@/providers/ThemeProvider";

import { Quotes, getPeriodicQuote } from "@/lib/constants/dailyQuotes";

// استيراد المكون الجديد الذي قمنا بإنشائه
import PrayerDashboard from "./PrayerDashboard"; 

const dailyQuotes = Quotes;

export default function HeroSection() {
  const { darkMode } = useTheme();
  
  // استخدام الحالة المبدئية فارغة لتجنب مشاكل الخادم/المتصفح (Hydration Error)
  const [data, setData] = useState({ hijriDate: "", quote: "" });

  // حساب التاريخ والاقتباس بعد تحميل المكون في المتصفح
  useEffect(() => {
    const date = new Date();
    // يبدو أنك تقوم بإنقاص يوم لضبط التاريخ الهجري
    date.setDate(date.getDate() - 1);

    const fullFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setData({
      hijriDate: fullFormatter.format(date),
      quote: getPeriodicQuote(dailyQuotes),
    });
  }, []);

  return (
    <section className="relative flex flex-col xl:flex-row items-center justify-center px-4 md:px-6 lg:px-20 py-8 md:py-12 gap-10 lg:gap-12 grow min-h-[calc(100vh-160px)]">
      
      {/* القسم الأول: النصوص والأزرار */}
      <div className="flex-1 text-center xl:text-right z-10 space-y-6 md:space-y-8 animate-fade-in-up w-full max-w-2xl mx-auto xl:mx-0">
        <SadqaBadge name="وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ " />

        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-amiri leading-tight relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-600 to-orange-600 flex items-center justify-center xl:justify-start gap-2 md:gap-3 drop-shadow-sm">
              رفيقك في رحلة الحياة
            </span>
          </h1>

          {data.hijriDate && (
            <div
              className={`flex items-center justify-center xl:justify-start gap-2 text-base md:text-lg font-amiri ${
                darkMode ? "text-amber-400/80" : "text-amber-700/80"
              }`}
            >
              <Calendar size={18} />
              <span>{data.hijriDate}</span>
            </div>
          )}
        </div>

        <p
          className={`text-base md:text-lg lg:text-xl font-amiri leading-loose max-w-full xl:max-w-2xl mx-auto xl:mx-0 min-h-[3rem] ${
            darkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {data.quote}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start pt-2 md:pt-4">
          <Link
            href="/hadiths/arbaeen"
            className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 font-bold text-base md:text-lg w-full sm:w-auto"
          >
            <BookOpen size={20} className="md:w-6 md:h-6" />
            <span>الأربعين النووية لإبن عثيمين</span>
          </Link>

          <Link
            href="/hadiths/qisas"
            className={`group px-6 md:px-8 py-3 md:py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 font-bold text-base md:text-lg w-full sm:w-auto border-2 ${
              darkMode
                ? "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/80"
                : "border-amber-200 bg-amber-50/60 text-amber-800 hover:bg-amber-100/80"
            }`}
          >
            <Lightbulb size={20} className="md:w-6 md:h-6" />
            <span>علمني رسول الله</span>
          </Link>
        </div>
      </div>

      {/* القسم الثاني: لوحة مواقيت الصلاة (بدلاً من الصورة) */}
      <div className="flex-1 w-full max-w-sm md:max-w-md lg:max-w-xl z-10 mt-8 xl:mt-0 animate-fade-in-up">
        <PrayerDashboard darkMode={darkMode} />
      </div>

    </section>
  );
}