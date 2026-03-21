export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-amber-200 dark:border-amber-900"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin"></div>
      </div>
      <p className="text-sm font-amiri text-slate-500 dark:text-slate-400 animate-pulse">
        جارٍ تحميل السورة...
      </p>
    </div>
  );
}
