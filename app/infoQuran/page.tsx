"use client";

import React, { useState } from "react";


import surahsData from "../../public/data/quranInfo/surahs.json";
import rubsData from "../../public/data/quranInfo/rubs.json";

export default function QuranInfoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSurahTableOpen, setIsSurahTableOpen] = useState(false);
  const [isRubTableOpen, setIsRubTableOpen] = useState(true);

  
  const filteredSurahInfo = surahsData.filter((s: any) =>
    s.name.includes(searchQuery),
  );

  const filteredRubInfo = rubsData.filter((r: any) =>
    r.surahName.includes(searchQuery),
  );

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
            
            <table className="w-full text-sm sm:text-base text-right text-gray-500 dark:text-gray-400 sm:min-w-[600px]">
              
              <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr className="border-2 border-white dark:border-gray-800">
                  
                  <th className="px-1 sm:px-3 py-2 sm:py-3">إسم السورة</th>
                  <th className="px-1 sm:px-3 py-2 sm:py-3">الصفحة</th>
                  <th className="px-1 sm:px-3 py-2 sm:py-3">الآيات</th>
                  <th className="px-1 sm:px-3 py-2 sm:py-3">مكية/مدنية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSurahInfo.length > 0 ? (
                  filteredSurahInfo.map((s: any) => (
                    <tr
                      key={s.id}
                      className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      
                      <td className="px-1 sm:px-3 py-3 sm:py-4 font-medium text-gray-900 dark:text-white">
                        {s.name}
                      </td>
                      <td className="px-1 sm:px-3 py-3 sm:py-4">{s.page}</td>
                      <td className="px-1 sm:px-3 py-3 sm:py-4">{s.count}</td>
                      
                      <td className="px-1 sm:px-3 py-3 sm:py-4 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${
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
                      className="px-3 py-8 text-center text-gray-500"
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
                  filteredRubInfo.map((r: any) => (
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
