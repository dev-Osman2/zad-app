"use client";

import React, { useState, useEffect } from "react";

export interface Chapter {
  id: number;
  revelation_place: string;
  verses_count: number;
  name_arabic: string;
}

export interface Verse {
  verse_number: number;
  text_uthmani: string;
  page_number: number;
  rub_el_hizb_number?: number;
}

export interface SurahDetail {
  meta: Chapter;
  verses: Verse[];
}

export default function QuranInfoPage() {
  const [surahInfo, setSurahInfo] = useState<any[]>([]);
  const [rubInfo, setRubInfo] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSurahTableOpen, setIsSurahTableOpen] = useState(true);
  const [isRubTableOpen, setIsRubTableOpen] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchQuranData() {
      try {
        const chaptersRes = await fetch("/data/quran/chapters.json");
        if (!chaptersRes.ok) throw new Error("فشل في تحميل الفهرس الرئيسي");

        const chaptersData = await chaptersRes.json();
        const chapters: Chapter[] = Array.isArray(chaptersData)
          ? chaptersData
          : chaptersData.chapters || [];

        const tempSurahInfo = [];
        const tempRubInfo: React.SetStateAction<any[]> = [];
        let currentRubId = 0;

        for (const chapter of chapters) {
          const res = await fetch(`/data/quran/${chapter.id}.json`);
          if (!res.ok) continue;

          const surahDetail = await res.json();
          const verses: Verse[] =
            surahDetail.verses ||
            (Array.isArray(surahDetail) ? surahDetail : []);

          if (!verses || verses.length === 0) continue;

          tempSurahInfo.push({
            id: chapter.id,
            name: chapter.name_arabic,
            page: verses[0]?.page_number || "غير متوفر",
            count: chapter.verses_count,
            type: chapter.revelation_place === "makkah" ? "مكية" : "مدنية",
          });

          verses.forEach((verse) => {
            if (
              verse.rub_el_hizb_number &&
              verse.rub_el_hizb_number !== currentRubId
            ) {
              currentRubId = verse.rub_el_hizb_number;
              const safeText = verse.text_uthmani || "";
              const words = safeText.split(" ");
              const preview =
                words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");

              tempRubInfo.push({
                number: currentRubId,
                location: `${chapter.name_arabic} (${verse.verse_number})`,
                text: preview,
                surahName: chapter.name_arabic,
              });
            }
          });
        }

        if (isMounted) {
          setSurahInfo(tempSurahInfo);
          setRubInfo(tempRubInfo);
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error("Error loading Quran info:", error);
        if (isMounted) {
          setErrorMsg(error.message || "حدث خطأ غير معروف");
          setIsLoading(false);
        }
      }
    }

    fetchQuranData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSurahInfo = surahInfo.filter((s) =>
    s.name.includes(searchQuery),
  );

  const filteredRubInfo = rubInfo.filter((r) =>
    r.surahName.includes(searchQuery),
  );

  if (errorMsg) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-red-600 font-sans p-8 text-center"
        dir="rtl"
      >
        <h2 className="text-2xl font-bold mb-4">
          عذراً، حدث خطأ أثناء معالجة البيانات
        </h2>
        <p className="bg-red-50 p-4 rounded-lg border border-red-200 text-sm">
          {errorMsg}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-amber-600 font-sans"
        dir="rtl"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
        <h2 className="text-xl font-semibold">
          جاري معالجة بيانات القرآن الكريم...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto font-sans" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-amber-600">
        إحصائيات وبيانات القرآن الكريم
      </h1>

      <div className="mb-8 relative max-w-md">
        <input
          type="text"
          placeholder="ابحث باسم السورة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pr-10 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-amber-500 outline-none transition-all shadow-sm"
        />
        <span className="absolute right-3 top-3.5 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute left-3 top-3 text-gray-400 hover:text-red-500 transition-colors"
            title="مسح البحث"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <section className="mb-8">
        <button
          onClick={() => setIsSurahTableOpen(!isSurahTableOpen)}
          className="flex justify-between items-center w-full text-right mb-4 focus:outline-none group"
        >
          <h2 className="text-xl font-semibold border-r-4 border-amber-500 pr-3 group-hover:text-amber-600 transition-colors">
            بيانات السور
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${
              isSurahTableOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isSurahTableOpen && (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-all">
            <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400 min-w-[600px]">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-3">إسم السورة</th>
                  <th className="px-6 py-3">رقم الصفحة</th>
                  <th className="px-6 py-3">عدد الآيات</th>
                  <th className="px-6 py-3">مكية أو مدنية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSurahInfo.length > 0 ? (
                  filteredSurahInfo.map((s) => (
                    <tr
                      key={s.id}
                      className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {s.name}
                      </td>
                      <td className="px-6 py-4">{s.page}</td>
                      <td className="px-6 py-4">{s.count}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            s.type === "مكية"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {s.type}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      لا توجد نتائج مطابقة للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <button
          onClick={() => setIsRubTableOpen(!isRubTableOpen)}
          className="flex justify-between items-center w-full text-right mb-4 focus:outline-none group"
        >
          <h2 className="text-xl font-semibold border-r-4 border-amber-500 pr-3 group-hover:text-amber-600 transition-colors">
            مواضع الأرباع (240 ربعاً)
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${
              isRubTableOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isRubTableOpen && (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-all">
            <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400 min-w-[600px]">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-3">رقم الربع</th>
                  <th className="px-6 py-3">سورة (رقم الآية)</th>
                  <th className="px-6 py-3">بداية الربع</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRubInfo.length > 0 ? (
                  filteredRubInfo.map((r) => (
                    <tr
                      key={r.number}
                      className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-amber-600">
                        {r.number}
                      </td>
                      <td className="px-6 py-4">{r.location}</td>
                      <td className="px-6 py-4 italic text-gray-700 dark:text-gray-300">
                        &quot;{r.text}&quot;
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      لا توجد أرباع مطابقة للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
