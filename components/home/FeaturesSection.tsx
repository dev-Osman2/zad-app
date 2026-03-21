"use client";

import { Zap, GraduationCap, Coffee } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  darkMode: boolean;
}

const FeatureCard = ({ icon, title, desc, darkMode }: FeatureCardProps) => (
  <div
    className={`p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 group ${
      darkMode
        ? "bg-slate-800 border border-slate-700 hover:bg-slate-750"
        : "bg-white border border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(251,191,36,0.1)] hover:border-amber-100"
    }`}
  >
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
        darkMode
          ? "bg-slate-900 group-hover:bg-slate-800"
          : "bg-slate-50 group-hover:bg-amber-50/50"
      }`}
    >
      {icon}
    </div>
    <h3
      className={`text-xl font-bold font-amiri mb-3 ${
        darkMode ? "text-slate-100" : "text-slate-800"
      }`}
    >
      {title}
    </h3>
    <p
      className={`leading-relaxed text-sm lg:text-base ${
        darkMode ? "text-slate-400" : "text-slate-500"
      }`}
    >
      {desc}
    </p>
  </div>
);

export default function FeaturesSection() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`py-20 px-6 lg:px-20 relative z-10 ${
        darkMode
          ? "bg-slate-800/30"
          : "bg-white/40 backdrop-blur-md border-t border-amber-50"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard
          icon={<Zap size={32} className="text-amber-500" />}
          title="همم رمضانية عالية"
          desc="رمضان مضمار السابقين؛ نساعدك على شحذ همتك وتجديد عزيمتك لاغتنام ساعاته، لتجعل من الشهر الفضيل نقطة انطلاق نحو معالي الأمور."
          darkMode={darkMode}
        />
        <FeatureCard
          icon={<GraduationCap size={32} className="text-blue-500" />}
          title="علم يُحيي القلوب"
          desc="لا نكتفي بسرد المعلومات، بل ننتقي لك ما يجمع بين صحة الدليل ورقة الموعظة، ليكون علماً نافعاً يورث الخشية ويزكي النفس ويهذب السلوك."
          darkMode={darkMode}
        />
        <FeatureCard
          icon={<Coffee size={32} className="text-emerald-500" />}
          title="زادٌ معرفي متنوع"
          desc="بين متون الكتب وخلاصات البودكاست، نقدم لك وجبة معرفية متكاملة (مقروءة ومسموعة) في واجهة هادئة تعينك على التركيز والتدبر."
          darkMode={darkMode}
        />
      </div>
    </section>
  );
}
