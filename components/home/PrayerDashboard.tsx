"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchPrayerTimes, PrayerTimings } from "@/lib/services/prayerApi";
import PrayerCircle from "./PrayerCircle";
import { RefreshCw, MapPin } from "lucide-react";

// دالة مساعدة لتحويل الأرقام الإنجليزية إلى أرقام عربية (هندية)
const toArabicDigits = (str: string | number) => {
  return String(str).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
};

export default function PrayerDashboard({ darkMode }: { darkMode: boolean }) {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false); // حالة التحميل أثناء جلب الموقع

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // دالة جلب البيانات مع التخزين المحلي (Local Storage)
  const updateData = async (lat: number, lng: number) => {
    try {
      const data = await fetchPrayerTimes(lat, lng);
      setTimings(data);
      localStorage.setItem("zad_prayer_times", JSON.stringify(data));
      localStorage.setItem("zad_last_update", new Date().toDateString());
    } catch (error) {
      console.error("خطأ في جلب المواقيت:", error);
    }
  };

  // التحميل المبدئي من الـ LocalStorage إذا توفر
  useEffect(() => {
    const saved = localStorage.getItem("zad_prayer_times");
    if (saved) {
      setTimings(JSON.parse(saved));
    } else {
      // جلب الموقع تلقائياً في أول مرة فقط إذا لم يكن هناك بيانات محفوظة
      handleRefreshLocation();
    }
  }, []);

  // دالة التحديث التلقائي بناءً على الموقع (GPS)
  const handleRefreshLocation = () => {
    setIsRefreshing(true);
    
    if (!navigator.geolocation) {
      alert("عذراً، متصفحك أو جهازك لا يدعم تحديد الموقع.");
      setIsRefreshing(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateData(pos.coords.latitude, pos.coords.longitude).finally(() => {
          setIsRefreshing(false);
        });
      },
      (err) => {
        console.error(err);
        alert("يرجى تفعيل صلاحيات الموقع (GPS) لتحديث مواقيت الصلاة بدقة.");
        setIsRefreshing(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // منطق حساب الصلاة القادمة والنسبة المئوية
  const nextPrayerLogic = useMemo(() => {
    if (!timings) return null;
    
    const prayers = [
      { name: "الفجر", time: timings.Fajr },
      { name: "الظهر", time: timings.Dhuhr },
      { name: "العصر", time: timings.Asr },
      { name: "المغرب", time: timings.Maghrib },
      { name: "العشاء", time: timings.Isha },
    ];

    const now = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
    
    let next = prayers.find(p => {
      const [h, m] = p.time.split(":").map(Number);
      return (h * 3600 + m * 60) > now;
    }) || prayers[0];

    const [nh, nm] = next.time.split(":").map(Number);
    const nextInSeconds = nh * 3600 + nm * 60;
    
    const diff = nextInSeconds > now ? nextInSeconds - now : (86400 - now) + nextInSeconds;
    
    // تنسيق الوقت (ساعات:دقائق:ثواني)
    const h = Math.floor(diff / 3600).toString().padStart(2, '0');
    const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
    const s = (diff % 60).toString().padStart(2, '0');

    const progress = (diff / (4 * 3600)) * 100; 

    return { 
      name: next.name, 
      // تحويل العداد التنازلي للأرقام العربية
      countdown: toArabicDigits(`${h}:${m}:${s}`), 
      progress: Math.min(progress, 100) 
    };
  }, [timings, currentTime]);

  if (!timings) return (
    <div className={`text-center font-amiri p-10 animate-pulse ${darkMode ? 'text-amber-500' : 'text-amber-700'}`}>
      جاري تحديد الموقع وجلب المواقيت...
    </div>
  );

  return (
    <div className={`w-full max-w-md mx-auto p-8 rounded-[3rem] border-4 transition-all duration-500 shadow-2xl ${
      darkMode 
        ? "bg-slate-900/80 border-slate-800 shadow-black/40" 
        : "bg-white border-amber-200 shadow-amber-900/20"
    }`}>
      
      {nextPrayerLogic && (
        <PrayerCircle 
          nextPrayerName={nextPrayerLogic.name}
          timeRemaining={nextPrayerLogic.countdown}
          progress={nextPrayerLogic.progress}
          darkMode={darkMode}
        />
      )}

      {/* قائمة الصلوات مع الأرقام العربية */}
      <div className="grid grid-cols-5 gap-3 mt-4">
        {[
          {n: "فجر", t: timings.Fajr},
          {n: "ظهر", t: timings.Dhuhr},
          {n: "عصر", t: timings.Asr},
          {n: "مغرب", t: timings.Maghrib},
          {n: "عشاء", t: timings.Isha}
        ].map((p) => (
          <div key={p.n} className={`flex flex-col items-center py-3 rounded-2xl border ${
            darkMode ? "bg-slate-800/50 border-slate-700" : "bg-amber-50 border-amber-100"
          }`}>
            <span className={`text-[11px] font-bold mb-1 ${darkMode ? "text-amber-400" : "text-amber-700"}`}>{p.n}</span>
            {/* تحويل مواقيت الصلاة للأرقام العربية المشرقية */}
            <span className={`text-sm font-bold font-amiri ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
              {toArabicDigits(p.t)}
            </span>
          </div>
        ))}
      </div>

      {/* زر التحديث الآلي المرتبط بالـ GPS */}
      <button 
        onClick={handleRefreshLocation}
        disabled={isRefreshing}
        className={`mt-8 w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
          darkMode 
            ? "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20" 
            : "bg-amber-700 hover:bg-amber-800 text-white shadow-lg shadow-amber-900/30"
        }`}
      >
        <MapPin size={18} className={isRefreshing ? "animate-bounce" : ""} />
        <span>{isRefreshing ? "جاري التحديث..." : "تحديث الموقع والمواقيت"}</span>
      </button>
    </div>
  );
}