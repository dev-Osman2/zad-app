import { BookOpen, ScrollText, Moon, Mic } from "lucide-react";

export type SectionData = {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: {
    id: number;
    title: string;
    author: string;
    link: string;
  }[];
};

export const sectionsData: SectionData[] = [
  {
    id: "sec1",
    title: "القرآن الكريم وعلومه",
    icon: <BookOpen size={24} />,
    items: [
      {
        id: 0,
        title: "القرآن الكريم",
        author: "وَإِنَّهُ لَتَنزِيلُ رَبِّ الْعَالَمِينَ",
        link: "/quran",
      },
      {
        id: 2,
        title: "أول مرة أتدبر القرآن",
        author: "الشيخ عادل محمد خليل",
        link: "/books/Meditate-Quran",
      },
      {
        id: 7,
        title: "المراحل الثمان لطالب فهم القرآن",
        author: "الشيخ عصام بن صالح العويد",
        link: "/books/Quran-Stages",
      },
    ],
  },
  {
    id: "sec2",
    title: "السنة النبوية",
    icon: <ScrollText size={24} />,
    items: [
      {
        id: 1,
        title: "شرح الأربعين النووية",
        author: "الشيخ محمد بن صالح العثيمين",
        link: "/hadiths/arbaeen",
      },
    ],
  },
  {
    id: "sec3",
    title: "مجالس شهر رمضان",
    icon: <Moon size={24} />,
    items: [
      {
        id: 5,
        title: "مجالس شهر رمضان",
        author: "الشيخ محمد بن صالح العثيمين",
        link: "/books/Ramadan-Councils",
      },
      {
        id: 6,
        title: "حدث في رمضان",
        author: "الشيخ عبدالرحمن رأفت الباشا",
        link: "/books/Ramadan-Event",
      },
      {
        id: 3,
        title: "كتاب خلاصة تعظيم العلم",
        author: "الشيخ صالح العصيمي",
        link: "/books/ta3zeem-al3elm",
      },
    ],
  },
  {
    id: "sec4",
    title: "بودكاست ديني",
    icon: <Mic size={24} />,
    items: [
      {
        id: 8,
        title: "بودكاست فهمك للقرآن",
        author: "دكتور نايف بن نهار",
        link: "/podcast/drNaif",
      },
      {
        id: 9,
        title: "بودكاست حياة الطالب",
        author: "دكتور عثمان الخميس",
        link: "/podcast/drOsman",
      },
      {
        id: 10,
        title: "بودكاست وعي وبناء",
        author: "نخبة من العظماء",
        link: "/podcast/other",
      },
      {
        id: 11,
        title: "بودكاست سهم",
        author: "أ. أيمن الشناوي",
        link: "/podcast/sahm",
      },
    ],
  },
];