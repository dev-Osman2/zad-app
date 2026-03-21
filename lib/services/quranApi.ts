
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
}

export interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
  page_number: number;
  juz_number: number;
}

export interface SurahDetail {
  meta: Chapter;
  verses: Verse[];
}

const BASE_URL = "https://api.quran.com/api/v4";


export async function getAllSurahs(): Promise<Chapter[]> {
  try {
    const res = await fetch(`${BASE_URL}/chapters?language=ar`, {
      next: { revalidate: 604800 },
    });
    if (!res.ok) throw new Error("Failed to fetch chapters");
    const data = await res.json();
    return data.chapters;
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function getSurah(id: number): Promise<SurahDetail | null> {
  try {
    const [metaRes, versesRes] = await Promise.all([
      fetch(`${BASE_URL}/chapters/${id}?language=ar`, { next: { revalidate: 604800 } }),

      fetch(
        `${BASE_URL}/verses/by_chapter/${id}?language=ar&words=false&fields=text_uthmani,page_number,juz_number&per_page=300`,
        { next: { revalidate: 604800 } }
      ),
    ]);

    if (!metaRes.ok || !versesRes.ok) throw new Error("Failed to fetch surah data");

    const metaData = await metaRes.json();
    const versesData = await versesRes.json();

    return {
      meta: metaData.chapter,
      verses: versesData.verses,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
