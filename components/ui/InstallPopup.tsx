"use client";
import { useState, useEffect } from "react";

export default function InstallBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
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
    <div className="fixed top-0 left-0 right-0 z-[100] bg-[#0f172a] text-white p-3 shadow-lg animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="زاد" className="w-8 h-8" />
          <p className="text-sm font-medium">
            &quot;زاد&quot; بدون إنترنت، حمل تطبيق الأندرويد
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/dev-Osman2/zad-app/releases/download/latest/zad-app.apk"
            className="bg-white text-[#0f172a] px-4 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap hover:bg-slate-200 transition-colors"
          >
            تثبيت الآن
          </a>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white transition-colors"
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
