/* eslint-disable prefer-const */
"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchPrayerTimes, PrayerTimings } from "@/lib/services/prayerApi";
import PrayerCircle from "./PrayerCircle";
import { MapPin } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";

const toArabicDigits = (str: string | number) => {
  return String(str).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
};

const parseTimeToSeconds = (time: string) => {
  const match = time.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  return hours * 3600 + minutes * 60;
};

const formatTo12h = (time24: string) => {
  if (!time24) return "";
  let [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "م" : "ص";
  hours = hours % 12 || 12;
  return toArabicDigits(
    `${hours}:${minutes.toString().padStart(2, "0")} ${period}`,
  );
};

export default function PrayerDashboard({ darkMode }: { darkMode: boolean }) {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const updateData = async (lat: number, lng: number) => {
    try {
      const data = await fetchPrayerTimes(lat, lng);
      setTimings(data);
      localStorage.setItem("zad_prayer_times", JSON.stringify(data));
      setErrorMessage(null);
    } catch (error) {
      console.error("Error fetching timings:", error);
      setErrorMessage("تعذر جلب المواقيت حالياً. حاول مرة أخرى.");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("zad_prayer_times");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as PrayerTimings;
      setTimings(parsed);
    } catch {
      localStorage.removeItem("zad_prayer_times");
    }
  }, []);

  const dateKey = `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}`;

  const dateInfo = useMemo(() => {
    const greg = new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(currentTime);
    const hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(currentTime);
    return { gregorian: toArabicDigits(greg), hijri: toArabicDigits(hijri) };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKey]);

  const handleRefreshLocation = async () => {
    setIsRefreshing(true);
    setErrorMessage(null);

    try {
      if (Capacitor.isNativePlatform()) {
        const permissions = await Geolocation.checkPermissions();
        if (permissions.location !== "granted")
          await Geolocation.requestPermissions();
      }
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });
      await updateData(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      console.error("Location error:", error);
      setErrorMessage("يرجى التأكد من تفعيل الموقع الجغرافي ومنح الصلاحية.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const nextPrayerLogic = useMemo(() => {
    if (!timings) return null;

    const prayers = [
      { name: "الفجر", time: timings.Fajr },
      { name: "الظهر", time: timings.Dhuhr },
      { name: "العصر", time: timings.Asr },
      { name: "المغرب", time: timings.Maghrib },
      { name: "العشاء", time: timings.Isha },
    ].map((prayer) => ({
      ...prayer,
      seconds: parseTimeToSeconds(prayer.time),
    }));

    if (prayers.some((prayer) => prayer.seconds === null)) {
      return null;
    }

    const safePrayers = prayers as Array<{
      name: string;
      time: string;
      seconds: number;
    }>;

    const nowInSec =
      currentTime.getHours() * 3600 +
      currentTime.getMinutes() * 60 +
      currentTime.getSeconds();

    const nextIndex = safePrayers.findIndex((p) => p.seconds > nowInSec);
    const resolvedNextIndex = nextIndex === -1 ? 0 : nextIndex;
    const next = safePrayers[resolvedNextIndex];
    const previous =
      resolvedNextIndex === 0
        ? safePrayers[safePrayers.length - 1]
        : safePrayers[resolvedNextIndex - 1];

    const nextSecondsAdjusted =
      next.seconds <= nowInSec ? next.seconds + 86400 : next.seconds;
    const previousSecondsAdjusted =
      previous.seconds > nowInSec ? previous.seconds - 86400 : previous.seconds;

    const fullWindow = nextSecondsAdjusted - previousSecondsAdjusted;
    const diff = nextSecondsAdjusted - nowInSec;
    const elapsed = nowInSec - previousSecondsAdjusted;

    const h = Math.floor(diff / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((diff % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (diff % 60).toString().padStart(2, "0");

    return {
      name: next.name,
      countdown: toArabicDigits(`${h}:${m}:${s}`),
      progress: fullWindow > 0 ? (elapsed / fullWindow) * 100 : 0,
    };
  }, [timings, currentTime]);

  if (!timings)
    return (
      <div className="p-10 text-center font-amiri animate-pulse">
        جاري التحميل...
      </div>
    );

  return (
    <div
      className={`w-full max-w-md mx-auto p-8 rounded-[3rem] border-4 transition-all shadow-2xl ${
        darkMode
          ? "bg-slate-900/80 border-slate-800"
          : "bg-white border-amber-200"
      }`}
    >
      <div className="text-center   space-y-1">
        <p
          className={`text-lg font-bold font-amiri ${
            darkMode ? "text-amber-400" : "text-amber-800"
          }`}
        >
          {dateInfo.hijri}
        </p>
        <p
          className={`text-xs opacity-70 font-amiri ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {dateInfo.gregorian}
        </p>
      </div>

      {nextPrayerLogic && (
        <PrayerCircle
          nextPrayerName={nextPrayerLogic.name}
          timeRemaining={nextPrayerLogic.countdown}
          progress={nextPrayerLogic.progress}
          darkMode={darkMode}
        />
      )}

      {errorMessage && (
        <p
          className={`mt-3 text-center text-xs font-amiri ${
            darkMode ? "text-red-300" : "text-red-700"
          }`}
        >
          {errorMessage}
        </p>
      )}

      <div className="grid grid-cols-5 gap-2 mt-4">
        {[
          { n: "فجر", t: timings.Fajr },
          { n: "ظهر", t: timings.Dhuhr },
          { n: "عصر", t: timings.Asr },
          { n: "مغرب", t: timings.Maghrib },
          { n: "عشاء", t: timings.Isha },
        ].map((p) => (
          <div
            key={p.n}
            className={`flex flex-col items-center py-3 rounded-2xl border ${
              darkMode
                ? "bg-slate-800/50 border-slate-700"
                : "bg-amber-50 border-amber-100"
            }`}
          >
            <span
              className={`text-[10px] font-bold mb-1 ${
                darkMode ? "text-amber-500" : "text-amber-600"
              }`}
            >
              {p.n}
            </span>
            <span
              className={`text-[11px] font-bold ${
                darkMode ? "text-slate-200" : "text-slate-800"
              }`}
            >
              {formatTo12h(p.t)}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleRefreshLocation}
        className={`mt-8 w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold transition-all ${
          darkMode ? "bg-amber-600 text-white" : "bg-amber-700 text-white"
        }`}
      >
        <MapPin size={18} className={isRefreshing ? "animate-spin" : ""} />
        <span>تحديث الموقع والمواقيت</span>
      </button>
    </div>
  );
}
