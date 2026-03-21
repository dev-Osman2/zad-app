export default function ExamLoading() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-[#FFF7EA] dark:bg-slate-900"
    >
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-amber-700 dark:text-amber-400 font-bold font-amiri text-lg">
          جاري تحميل الاختبار...
        </p>
      </div>
    </div>
  );
}
