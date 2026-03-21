
"use client";

import { useTheme } from "@/providers/ThemeProvider";
import FeedbackForm from "@/components/forms/FeedbackForm";

export default function FeedbackPage() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-28 pb-16 transition-colors duration-500 font-sans ${
        darkMode
          ? "bg-slate-900 text-slate-100"
          : "bg-linear-to-br from-[#fdfbf7] via-[#fffefc] to-[#fefaf0] text-slate-800"
      }`}
    >
      <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-10 animate-fade-in-up">
          <h1
            className={`text-4xl md:text-5xl font-bold font-amiri mb-4 ${darkMode ? "text-amber-500" : "text-amber-700"}`}
          >
            شاركنا رأيك
          </h1>
          <p
            className={`text-lg font-amiri leading-loose ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            ملاحظاتك واقتراحاتك هي الزاد الذي يعيننا على تطوير المنصة وتقديم
            تجربة أفضل للجميع.
          </p>
        </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
