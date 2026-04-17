"use client";
import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";

export default function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isApp = Capacitor.getPlatform() !== "web";
    if (isApp) return;

    const isDismissed = localStorage.getItem("install_banner_dismissed");
    if (!isDismissed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowBanner(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("install_banner_dismissed", "true");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-100 p-3 shadow-lg animate-in slide-in-from-top duration-500 transition-colors bg-amber-50 dark:bg-slate-900 border-b border-amber-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="زاد" className="w-8 h-8" />
          <p className="text-sm md:text-base font-bold font-amiri text-slate-800 dark:text-slate-200">
            &quot;زاد&quot; بدون إنترنت، حمل التطبيق
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://download.zad-islam.app/zad.apk"
            download
            className="px-4 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:text-slate-900 dark:hover:bg-amber-400"
          >
            تثبيت الآن
          </a>
          <button
            onClick={handleDismiss}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
