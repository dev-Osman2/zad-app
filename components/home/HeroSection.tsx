"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { BookOpen, Calendar, Lightbulb } from "lucide-react";
import SadqaBadge from "@/components/ui/SadqaBadge";
import { useTheme } from "@/providers/ThemeProvider";

import { Quotes } from "@/lib/constants/dailyQuotes";

const darkImg = "/landingDark.avif";
const lightImg = "/landing.avif";

const dailyQuotes = Quotes;

export default function HeroSection() {
  const { darkMode } = useTheme();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [data] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const dayFormatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
    });
    const hijriDay = dayFormatter.format(date);

    const fullFormatter = new Intl.DateTimeFormat(
      "ar-SA-u-ca-islamic-umalqura",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );

    return {
      hijriDate: fullFormatter.format(date),
      quote: dailyQuotes[hijriDay] || dailyQuotes["15"],
    };
  });

  return (
    <section className="relative flex flex-col xl:flex-row items-center justify-center px-4 md:px-6 lg:px-20 py-8 md:py-12 gap-10 lg:gap-12 grow min-h-[calc(100vh-160px)]">
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

      <div className="flex-1 w-full max-w-sm md:max-w-md lg:max-w-xl z-10 mt-8 xl:mt-0">
        <div
          className={`relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl transform xl:rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border-4 md:border-8 aspect-[4/3] md:aspect-auto md:h-100 lg:h-125 ${
            darkMode
              ? "border-slate-800 shadow-slate-900/50 bg-slate-800"
              : "border-white shadow-amber-900/10 ring-1 ring-slate-900/5 bg-amber-50"
          }`}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-1000 ${
              isImageLoaded
                ? "opacity-0 pointer-events-none"
                : "opacity-100 animate-pulse"
            }`}
          >
            <span
              className={`text-2xl md:text-4xl lg:text-5xl font-bold font-amiri text-center leading-loose md:leading-relaxed px-4 ${
                darkMode ? "text-amber-500/40" : "text-amber-700/40"
              }`}
            >
              لا إله إلا الله <br /> محمد رسول الله
            </span>
          </div>

          <Image
            src={darkMode ? darkImg : lightImg}
            alt="صورة منصة زاد"
            width={600}
            height={500}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            onLoad={() => setIsImageLoaded(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 md:p-8 z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
