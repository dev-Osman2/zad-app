import { CourseInfo, Section } from "@/lib/types/types";
import { ep1, ep2, ep3} from "./ep4";

export const infosahm: CourseInfo = {
  title: "بودكاست سهم | خريطة العلوم الإسلامية",
  desc: "مدخل تأصيلي لعلوم الشريعة ونظرية المعرفة، يهدف لتأسيس طالب العلم منهجياً وروحياً.",
};

export const sahm: Section[] = [
  {
    id: "1",
    title:
      "ما الفرق بين العلم عند المسلمين والعلم عند غيرهم؟ سهم: بودكاست سياق 1",
    content: ep1,
    videoLink: "https://www.youtube.com/watch?v=_gh0aA7qMNc",
  },
  {
    id: "2",
    title: "تعرف على العلوم الإسلامية في ٦٠ دقيقة! | سهم: سياق بودكاست 2",
    content: ep2,
    videoLink: "https://www.youtube.com/watch?v=pszNxezNErU",
  },
  {
    id: "3",
    title: "مواصفات طالب العلم! سهم: بودكاست سياق 3",
    content: ep3,
    videoLink: "https://youtu.be/mosq9ZoYs_I?si=DXWx4KQtJkRlgZbq",
  },
];
