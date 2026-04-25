
export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export const fetchPrayerTimes = async (lat: number, lng: number): Promise<PrayerTimings> => {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=4`
    );
    const result = await response.json();
    if (result.code === 200) {
      return result.data.timings;
    }
    throw new Error("Failed to fetch timings");
  } catch (error) {
    console.error("Prayer API Error:", error);
    throw error;
  }
};