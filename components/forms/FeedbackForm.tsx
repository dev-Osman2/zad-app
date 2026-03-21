"use client";

import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import emailjs from "@emailjs/browser";

import { Send, CheckCircle2, AlertCircle, Loader2, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function FeedbackForm() {
  const { darkMode } = useTheme();
  const router = useRouter(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<string>("");

  const [easeOfAccess, setEaseOfAccess] = useState("ماشي الحال");
  const [designRating, setDesignRating] = useState<number>(5);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const emojis = [
    { label: "ممتاز", emoji: "😍", value: "😍" },
    { label: "جيد", emoji: "🙂", value: "🙂" },
    { label: "عادي", emoji: "😐", value: "😐" },
    { label: "سيء", emoji: "😞", value: "😞" },
  ];

  const accessOptions = ["بسيط", "ماشي الحال", "معقد"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError("حقل الرسالة مطلوب!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: name || "Anonymous user",
          reply_to: email || "Mail was not provided",
          message: message,
          rating: rating || "Not evaluated",
          ease_of_access: easeOfAccess, 
          design_rating: designRating,  
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الإرسال. تأكد من اتصالك أو حاول لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`p-8 rounded-3xl text-center border transition-all duration-500 animate-fade-in-up ${
        darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-amber-100 shadow-xl shadow-amber-900/5"
      }`}>
        <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className={`text-2xl font-bold font-amiri mb-2 ${darkMode ? "text-amber-400" : "text-amber-700"}`}>
          شكراً لك!
        </h3>
        <p className={`text-lg font-amiri mb-8 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
          تم إرسال ملاحظاتك بنجاح وسنعمل على دراستها بعناية.
        </p>

        <Link
          href="/"
          className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all bg-linear-to-r from-amber-600 to-orange-600 hover:scale-[1.02] hover:shadow-lg active:scale-95`}
        >
          <Home size={20} />
          <span>العودة للصفحة الرئيسية</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={`p-6 md:p-8 rounded-3xl border transition-all ${
      darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-amber-100 shadow-xl shadow-amber-900/5"
    }`}>
      
            <div className="mb-8 flex justify-start" dir="rtl">
        <button
          type="button"
          onClick={() => router.back()} 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            darkMode 
              ? "text-slate-400 hover:text-amber-400 hover:bg-slate-800" 
              : "text-slate-500 hover:text-amber-700 hover:bg-amber-50"
          }`}
        >
          <ArrowRight size={18} />
          <span>الرجوع للخلف</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">
        
        <div>
          <label className={`block font-bold mb-4 text-center ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            كيف تقيم تجربتك معنا بشكل عام؟ <span className="text-sm font-normal opacity-70">(اختياري)</span>
          </label>
          <div className="flex justify-center gap-4 sm:gap-6">
            {emojis.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRating(item.value)}
                className={`text-3xl sm:text-4xl transition-transform hover:scale-125 ${
                  rating === item.value 
                    ? "scale-125 drop-shadow-md grayscale-0" 
                    : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                }`}
                title={item.label}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>

        <hr className={darkMode ? "border-slate-700" : "border-amber-50"} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-slate-50 border-slate-100"}`}>
            <label className={`flex justify-between items-center text-sm font-bold mb-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              <span>تصميم الموقع والواجهة</span>
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs">
                {designRating} / 10
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={designRating}
              onChange={(e) => setDesignRating(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 dark:bg-slate-700"
            />
            <div className={`flex justify-between text-xs mt-2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              <span>سيء</span>
              <span>ممتاز</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-slate-50 border-slate-100"}`}>
             <label className={`block text-sm font-bold mb-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              سهولة الوصول للمحتوى
            </label>
            <div className="flex flex-wrap gap-2">
              {accessOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setEaseOfAccess(option)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all border ${
                    easeOfAccess === option
                      ? "bg-amber-500 border-amber-500 text-white shadow-md"
                      : darkMode 
                        ? "bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

        </div>

        <hr className={darkMode ? "border-slate-700" : "border-amber-50"} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-bold mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              الاسم <span className="text-xs font-normal opacity-70">(اختياري)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
              }`}
              placeholder="اكتب اسمك هنا"
            />
          </div>
          <div>
            <label className={`block text-sm font-bold mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              البريد الإلكتروني <span className="text-xs font-normal opacity-70">(اختياري)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
              }`}
              placeholder="إذا كنت تنتظر رداً"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-bold mb-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            نص الملاحظة <span className="text-red-500">*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none ${
              darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="اكتب اقتراحك، مشكلتك، أو ملاحظاتك هنا..."
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm font-bold">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all ${
            isSubmitting 
              ? "bg-slate-400 cursor-not-allowed" 
              : "bg-linear-to-r from-amber-600 to-orange-600 hover:scale-[1.02] hover:shadow-lg active:scale-95"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>جاري الإرسال...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>إرسال التقييم والملاحظات</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}