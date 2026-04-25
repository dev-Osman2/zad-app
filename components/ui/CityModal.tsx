// components/ui/CityModal.tsx
"use client";

import { useState } from "react";
import { Search, X, MapPin } from "lucide-react";

interface City {
  name: string;
  lat: number;
  lng: number;
}

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: City) => void;
  darkMode: boolean;
}

// قائمة مبدئية للمدن (يمكنك لاحقاً ربطها بـ API للبحث)
const POPULAR_CITIES: City[] = [
  { name: "القاهرة، مصر", lat: 30.0444, lng: 31.2357 },
  { name: "مكة المكرمة، السعودية", lat: 21.3891, lng: 39.8579 },
  { name: "المدينة المنورة، السعودية", lat: 24.5247, lng: 39.5692 },
  { name: "الرياض، السعودية", lat: 24.7136, lng: 46.6753 },
  { name: "دبي، الإمارات", lat: 25.2048, lng: 55.2708 },
];

export default function CityModal({ isOpen, onClose, onSelectCity, darkMode }: CityModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  // تصفية المدن بناءً على البحث
  const filteredCities = POPULAR_CITIES.filter((city) =>
    city.name.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-md p-6 rounded-3xl shadow-2xl transform transition-all animate-scale-up ${
          darkMode ? "bg-slate-900 border border-slate-800" : "bg-white"
        }`}
      >
        {/* رأس النافذة */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold font-amiri ${darkMode ? "text-amber-400" : "text-amber-700"}`}>
            تحديد المدينة
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              darkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* حقل البحث */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="ابحث عن مدينتك..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-3 pr-10 pl-4 rounded-xl border-2 outline-none transition-colors font-amiri ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white focus:border-amber-500 placeholder-slate-500"
                : "bg-amber-50/50 border-amber-100 text-slate-800 focus:border-amber-400 placeholder-slate-400"
            }`}
          />
          <Search
            size={18}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              darkMode ? "text-slate-500" : "text-slate-400"
            }`}
          />
        </div>

        {/* قائمة المدن */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-right ${
                  darkMode
                    ? "hover:bg-slate-800 text-slate-300"
                    : "hover:bg-amber-50 text-slate-700"
                }`}
              >
                <MapPin size={16} className={darkMode ? "text-amber-500" : "text-amber-600"} />
                <span className="font-amiri text-lg">{city.name}</span>
              </button>
            ))
          ) : (
            <p className={`text-center py-4 font-amiri ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              لا توجد نتائج مطابقة
            </p>
          )}
        </div>
      </div>
    </div>
  );
}