"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold font-amiri mb-4 text-red-600 dark:text-red-400">
        حدث خطأ أثناء تحميل السورة
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors font-bold"
      >
        حاول مرة أخرى
      </button>
    </div>
  );
}
