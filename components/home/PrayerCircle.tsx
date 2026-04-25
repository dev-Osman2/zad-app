interface PrayerCircleProps {
  nextPrayerName: string;
  timeRemaining: string;
  progress: number;
  darkMode: boolean;
}

export default function PrayerCircle({
  nextPrayerName,
  timeRemaining,
  progress,
  darkMode,
}: PrayerCircleProps) {
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const offset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-56 h-56 mx-auto  ">
      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
        <circle
          cx="112"
          cy="112"
          r={radius}
          strokeWidth="5"
          fill="transparent"
          className={darkMode ? "stroke-slate-800" : "stroke-amber-100"}
        />
        <circle
          cx="112"
          cy="112"
          r={radius}
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="stroke-amber-500 transition-all duration-1000"
        />
      </svg>

      <div className="text-center z-10">
        <p
          className={`text-sm font-amiri ${
            darkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          باقي على {nextPrayerName}
        </p>
        <p
          className={`text-3xl font-mono font-bold mt-1 ${
            darkMode ? "text-white" : "text-amber-900"
          }`}
          dir="ltr"
        >
          {timeRemaining}
        </p>
      </div>
    </div>
  );
}
