import { CourseData, ExamData } from "./types/types";

import { infoAbnothemen, Abnothemen } from "./content/hadiths/arbaeen/othemen";
import { infoQisas, qisas } from "./content/hadiths/qisas-nabawi/qisas";

import { arbaeenExams } from "./content/hadiths/arbaeen/hadithExam";
import { qisasExam } from "./content/hadiths/qisas-nabawi/qisasExam";

import { arbaeenSharh } from "./content/hadiths/arbaeen/hadithSharh";
import { qisasSharh } from "./content/hadiths/qisas-nabawi/qisasSharh";

import meditateIndex from "@/public/data/meditateQuran/index.json";
import meditateInfo from "@/public/data/meditateQuran/info.json";

import sahaba1Index from "@/public/data/sahaba-1/index.json";
import sahaba1Info from "@/public/data/sahaba-1/info.json";

import sahaba2Index from "@/public/data/sahaba-2/index.json";
import sahaba2Info from "@/public/data/sahaba-2/info.json";

import tabi3een2Index from "@/public/data/tabi3een/index.json";
import tabi3een2Info from "@/public/data/tabi3een/info.json";

import { sahabiyatInfo, sahabiyat } from "./content/sahaba/sahabiyat";

import { sahaba1ExamsData } from "./content/sahaba/sahaba1Exam";
import { sahaba2ExamsData } from "./content/sahaba/sahaba2Exam";
import { sahabiyatExamsData } from "./content/sahaba/sahabiyatExam";
import { tabi3eenExamsData } from "./content/sahaba/tabi3eenExam";

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
    info: sahaba2Info,
    content: sahaba2Index,
  },
  sahabiyat: {
    info: sahabiyatInfo,
    content: sahabiyat,
  },
  tabi3een: {
    info: tabi3een2Info,
    content: tabi3een2Index,
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

const sahabaExams: Record<string, ExamData> = {};

Object.entries(sahaba1ExamsData).forEach(([examSlug, questions]) => {
  sahabaExams[examSlug] = {
    title: "الإختبار " + examSlug.split("-").pop(),
    questions: questions,
  };
});

Object.entries(sahaba2ExamsData).forEach(([examSlug, questions]) => {
  sahabaExams[examSlug] = {
    title: "الإختبار " + examSlug.split("-").pop(),
    questions: questions,
  };
});

Object.entries(sahabiyatExamsData).forEach(([examSlug, questions]) => {
  sahabaExams[examSlug] = {
    title: "الإختبار " + examSlug.split("-").pop(),
    questions: questions,
  };
});

Object.entries(tabi3eenExamsData).forEach(([examSlug, questions]) => {
  sahabaExams[examSlug] = {
    title: "الإختبار " + examSlug.split("-").pop(),
    questions: questions,
  };
});

export const allExams: Record<string, ExamData> = {
  ...buildExamsFromHadiths("arbaeen", Abnothemen, arbaeenExams),
  ...buildExamsFromHadiths("qisas", qisas, qisasExam),
  ...sahabaExams,
};
