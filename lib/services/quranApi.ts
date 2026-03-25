export interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name?: {
    language_name: string;
    name: string;
  };
}

export interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
  page_number: number;
  juz_number: number;
  verse_number?: number;
  hizb_number?: number;
  rub_el_hizb_number?: number;
  ruku_number?: number;
  manzil_number?: number;
  sajdah_number?: null | number;
}

export interface SurahDetail {
  meta: Chapter;
  verses: Verse[];
}

export async function getAllSurahs(): Promise<Chapter[]> {
  try {
    const data = await import("@/public/data/quran/chapters.json");
    return data.default || data;
  } catch (error) {
    console.error("Error loading chapters from local file:", error);
    return [];
  }
}

export async function getSurah(id: number): Promise<SurahDetail | null> {
  try {
    const data = await import(`@/public/data/quran/${id}.json`);
    return data.default || data;
  } catch (error) {
    console.error(`Error loading surah ${id} from local file:`, error);
    return null;
  }
}
