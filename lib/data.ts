import { CourseData, ExamData } from "./types/types";

import { infoAbnothemen, Abnothemen } from "./content/hadiths/arbaeen/othemen";
import { infoQisas, qisas } from "./content/hadiths/qisas-nabawi/qisas";
import { Sahaba2, infoSahaba2 } from "./content/sahaba/sahaba-2";

import { arbaeenExams } from "./content/hadiths/arbaeen/hadithExam";
import { qisasExam } from "./content/hadiths/qisas-nabawi/qisasExam";

import { arbaeenSharh } from "./content/hadiths/arbaeen/hadithSharh";
import { qisasSharh } from "./content/hadiths/qisas-nabawi/qisasSharh";

import meditateIndex from "@/lib/data/meditateQuran/index.json";
import meditateInfo from "@/lib/data/meditateQuran/info.json";

import sahaba1Index from "@/lib/data/sahaba-1/index.json";
import sahaba1Info from "@/lib/data/sahaba-1/info.json";


import { sahaba2ExamsData } from "./content/sahaba/sahaba2Exam";
import { sahaba1ExamsData } from "./content/sahaba/sahaba1Exam";

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
    content: meditateIndex,
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

  "sahaba-1": {
    info: sahaba1Info,
    content: sahaba1Index,
  },
  "sahaba-2": {
    info: infoSahaba2,
    content: Sahaba2,
  },
};

export const allHadithBooks: Record<string, CourseData> = {
  arbaeen: {
    info: infoAbnothemen || { title: "الأربعين النووية", desc: "" },
    content: Abnothemen || [],
  },
  qisas: {
    info: infoQisas || { title: "قصص نبوية", desc: "" },
    content: qisas || [],
  },
};

export const allHadithSharhByBook: Record<
  string,
  Record<string, { id: string; content: string }>
> = {
  arbaeen: arbaeenSharh,
  qisas: qisasSharh,
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
  hadiths: typeof Abnothemen | typeof qisas,
  examQuestions: typeof arbaeenExams | typeof qisasExam,
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

// 2. إنشاء كائن يجمع اختبارات الصحابة وتحويلها لتطابق واجهة ExamData
const sahabaExams: Record<string, ExamData> = {};

// تحويل sahaba2
Object.entries(sahaba1ExamsData).forEach(([examSlug, questions]) => {
  sahabaExams[examSlug] = {
    title: "الإختبار " + examSlug.split("-").pop(), // مجرد مثال لتوليد عنوان، يمكنك تغييره
    questions: questions,
  };
});

Object.entries(sahaba2ExamsData).forEach(([examSlug, questions]) => {
  sahabaExams[examSlug] = {
    title: "الإختبار " + examSlug.split("-").pop(), // مجرد مثال لتوليد عنوان، يمكنك تغييره
    questions: questions,
  };
});


export const allExams: Record<string, ExamData> = {
  ...buildExamsFromHadiths("arbaeen", Abnothemen, arbaeenExams),
  ...buildExamsFromHadiths("qisas", qisas, qisasExam),
  ...sahabaExams,
};
