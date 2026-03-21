import { CourseInfo, Section } from "@/lib/types/types";
import { ep1, ep2, ep3, ep4 } from "./ep2";


export const infodrOsman: CourseInfo = {
  title: "بودكاست العلم والأثر | د. عثمان الخميس",
  desc: "جلسات إيمانية وعلمية تجمع بين التأصيل الفقهي والعقدي والنصح الأبوي، تناقش قضايا الشباب والمجتمع المعاصرة (كالزواج، المعاملات المالية، والفتن)، مع التركيز على أهمية العلم الشرعي وتنظيم الوقت لبناء شخصية مسلمة متزنة."
};


export const drOsman: Section[] = [
  {
    id: "1",
    title: "رحلة العلم والعمل.. كيف تصنع أثراً يبقى ",
    content: ep1,
    videoLink: "https://youtu.be/8BqBVpBLfzA?si=fM6XBtAEcFaoqROZ",
  },
  {
    id: "2",
    title: "اضاءات دينية: جلسة استفهام(1/2)",
    content: ep2,
    videoLink: "https://www.youtube.com/watch?v=lAxcOeXXyPQ&t=15s",
  },
  {
    id: "3",
    title: "اضاءات دينية: جلسة استفهام (2/2) ",
    content: ep3,
    videoLink: "https://www.youtube.com/watch?v=mqBr30BigKQ",
  },
  {
    id: "4",
    title: "حياة الطالب في رمضان ",
    content: ep4,
    videoLink: "https://www.youtube.com/watch?v=0tmfqF6Ba_Y",
  },
]