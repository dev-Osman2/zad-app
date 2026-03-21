import { CourseInfo, Section } from "@/lib/types/types";
import { ep1, ep2, ep3, ep4 } from "./ep1";
export const infodrNaif: CourseInfo = {
  title: "بودكاست البوصلة القرآنية | د.نايف بن نهار",
  desc: "حوارات فكرية عميقة تسعى لاستعادة مركزية القرآن الكريم كمنهج للمعرفة وبناء الوعي، وتفكيك مفاهيم الحداثة الغربية (كالليبرالية والعلمانية) ونقدها، مع تقديم النموذج القرآني كبوصلة أخلاقية وتربوية لإدارة الحياة والمجتمع.",
};

export const drNaif: Section[] = [
  {
    id: "1",
    title: "كيف يفتح لنا القرآن أبوابه",
    content: ep1,
    videoLink: "https://www.youtube.com/watch?v=TGUsvlJIXXw",
  },
  {
    id: "2",
    title: "كيف يمكن فهمك للقرآن أن يغيّر حياتك بالكامل؟",
    content: ep2,
    videoLink: "https://www.youtube.com/watch?v=Pfj4niPP0DY",
  },
  {
    id: "3",
    title: "الحرية: بين الاسلام والليبرالية",
    content: ep3,
    videoLink:
      "https://www.youtube.com/watch?v=QqIV0fsK2uw&list=PLdk8aQPGcSOwBIGH6zOwbYFvS_lY-lnh6&index=2",
  },
  {
    id: "4",
    title: "تفكيك السردية الصهيونية وبناء مشروع فلسطيني",
    content: ep4,
    videoLink:
      "https://www.youtube.com/watch?v=5fzQszm4AJo&list=PLdk8aQPGcSOwBIGH6zOwbYFvS_lY-lnh6&index=3",
  },
];
