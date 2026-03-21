"use client";

import { ScrollText, BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useRouter } from "next/navigation";

interface IntroSectionProps {
  title: string;
  desc: string;
  bookLink?: string;
  videoLink?: string;
}

export default function IntroSection({
  title,
  desc,
  bookLink,
  videoLink,
}: IntroSectionProps) {
  const { darkMode } = useTheme();
  const router = useRouter();

  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&mute=0&rel=0`;
    }

    return url;
  };

  return (
    <div className="space-y-8 mb-12 ">
      <div className="mb-8 flex justify-end r ">
        <button
          onClick={() => router.back()}
          className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full transition-colors cursor-pointer ${
            darkMode
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-white hover:bg-amber-50 shadow-sm"
          }`}
        >
          <ArrowRight size={16} />
          رجوع
        </button>
      </div>

      <div
        className={`rounded-3xl p-8 text-center relative overflow-hidden ${
          darkMode ? "bg-slate-800/40" : "bg-amber-100/50"
        }`}
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ScrollText size={120} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <ScrollText
            className={`w-14 h-14 mb-4 ${
              darkMode ? "text-amber-500" : "text-amber-700"
            }`}
          />

          <h2 className={`text-2xl  md:text-5xl font-bold mb-4 leading-tight ${darkMode? ` text-stone-400`: `text-gray-700`}`}>
            {title}
          </h2>

          <p
            className={`text-lg md:text-xl max-w-2xl mb-8 ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {desc}
          </p>

          {bookLink && (
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/40 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            >
              <BookOpen
                size={24}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              <span>افتح الكتاب</span>
              <ExternalLink
                size={18}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>
          )}
        </div>
      </div>

      {videoLink && (
        <div
          className={`w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 ${
            darkMode ? "border-slate-800" : "border-white"
          }`}
        >
          <iframe
            className="w-full h-full bg-black"
            src={getEmbedUrl(videoLink)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
