import { CourseData, ExamData } from "./types/types";

import { infoAbnothemen, Abnothemen } from "./content/hadiths/othemen";

import { arbaeenExams } from "./content/hadiths/hadithExam";

import { arbaeenSharh } from "./content/hadiths/hadithSharh";

// 💡 تم حذف الاستيراد القديم لملف meditateQuran البطيء
// 💡 واستبداله باستيراد ملفات JSON الخفيفة التي أنشأناها
import meditateIndex from "@/lib/data/meditateQuran/index.json";
import meditateInfo from "@/lib/data/meditateQuran/info.json";

import {
  inforamadanCouncils,
  ramadanCouncils,
} from "./content/ramadan/ramadanCouncils";
import { infoRamadanEvent, RamadanEvent } from "./content/ramadan/ramadanEvent";
import { infoQuranStages, QuranStages } from "./content/quran/quranStages";
import { infota3zeem, ta3zeem } from "./content/ramadan/ta3zeem";
import { infoTafsir, Tafsir } from "./content/quran/Tafsir";

import { infodrNaif, drNaif } from "./content/podcasts/1/drNaif";
import { infodrOsman, drOsman } from "./content/podcasts/2/osman";
import { infoother, other } from "./content/podcasts/3/other";
import { infosahm, sahm } from "./content/podcasts/4/sahm";

export const allCourses: Record<string, CourseData> = {
  abnothemen: {
    info: infoAbnothemen,
    content: Abnothemen,
  },
  "ta3zeem-al3elm": {
    info: infota3zeem,
    content: ta3zeem,
  },
  tafsir: {
    info: infoTafsir,
    content: Tafsir,
  },
  "Meditate-Quran": {
    info: meditateInfo,
    content: meditateIndex, // 💡 هنا نمرر الفهرس الخفيف فقط (بدون المحتوى الطويل)
  },
  "Ramadan-Councils": {
    info: inforamadanCouncils,
    content: ramadanCouncils,
  },
  "Ramadan-Event": {
    info: infoRamadanEvent,
    content: RamadanEvent,
  },
  "Quran-Stages": {
    info: infoQuranStages,
    content: QuranStages,
  },
};

export const allHadithBooks: Record<string, CourseData> = {
  arbaeen: {
    info: infoAbnothemen || { title: "الأربعين النووية", desc: "" },
    content: Abnothemen || [],
  },
};

export const allHadithSharhByBook: Record<
  string,
  Record<string, { id: string; content: string }>
> = {
  arbaeen: arbaeenSharh,
};

export const allPodcasts: Record<string, CourseData> = {
  drNaif: {
    info: infodrNaif,
    content: drNaif,
  },
  drOsman: {
    info: infodrOsman,
    content: drOsman,
  },
  other: {
    info: infoother,
    content: other,
  },
  sahm: {
    info: infosahm,
    content: sahm,
  },
};

function buildExamsFromHadiths(
  bookSlug: string,
  hadiths: typeof Abnothemen,
  examQuestions: typeof arbaeenExams,
): Record<string, ExamData> {
  const exams: Record<string, ExamData> = {};
  for (const hadith of hadiths) {
    const questions = examQuestions[hadith.id];
    if (questions && questions.length > 0) {
      exams[`${bookSlug}-${hadith.id}`] = {
        title: `${hadith.title}`,
        questions,
      };
    }
  }
  return exams;
}

export const allExams: Record<string, ExamData> = {
  ...buildExamsFromHadiths("arbaeen", Abnothemen, arbaeenExams),
};
