import {
  Headphones,
  BookOpen,
  Clock,
  Smartphone,
  LucideIcon,
  Compass,
  MoonStar,
} from "lucide-react";

export interface AppItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  deepLink: string;
  fallbackUrl: string;
}

export interface AppCategory {
  id: string;
  title: string;
  apps: AppItem[];
}

export interface YouTubeChannel {
  id: string;
  name: string;
  url: string; // تم التعديل لرابط ويب عادي
}

export interface TelegramBot {
  id: string;
  name: string;
  description: string;
  deepLink: string;
  fallbackUrl: string;
}

export interface DriveResource {
  id: string;
  name: string;
  description: string;
  url: string;
}

export const recommendedApps: AppCategory[] = [
  {
    id: "quran",
    title: "حفظ القرآن الكريم",
    apps: [
      {
        id: "abdo-quran",
        name: "تطبيق المصحف",
        description: "مصحف إلكتروني مميز للقراءة، الحفظ، والتلاوة العذبة.",
        icon: BookOpen,
        deepLink: "market://details?id=com.abdo.quran",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.abdo.quran",
      },
    ],
  },
  {
    id: "listening",
    title: "الاستماع والدورات العلمية",
    apps: [
      {
        id: "mantooq",
        name: "تطبيق منطوق",
        description:
          "رفيقك في السماع الشرعي؛ استمع لدورات وشروحات ابن عثيمين بجودة عالية.",
        icon: Headphones,
        deepLink: "market://details?id=ca.basira.mantooqapp",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=ca.basira.mantooqapp",
      },
      {
        id: "soundcloud",
        name: "SoundCloud",
        description:
          "مكتبة صوتية شاملة للدروس والمحاضرات لأبرز المشايخ والعلماء.",
        icon: Headphones,
        deepLink: "market://details?id=com.soundcloud.android",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.soundcloud.android",
      },
    ],
  },
  {
    id: "mutoon",
    title: "المتون وكتب الحديث",
    apps: [
      {
        id: "mutoon-app",
        name: "حفظ المتون",
        description: "أداتك الرئيسية لحفظ وضبط المتون العلمية الشرعية.",
        icon: BookOpen,
        deepLink: "market://details?id=com.tamayyuzcenter.huffazulmutoon",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.tamayyuzcenter.huffazulmutoon",
      },
      {
        id: "sunna-9",
        name: "جامع الكتب التسعة",
        description: "مكتبة حديثية ضخمة تضم أمهات كتب الحديث النبوي الشريف.",
        icon: BookOpen,
        deepLink: "market://details?id=com.arabiait.sunna",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.arabiait.sunna",
      },
    ],
  },
  {
    id: "productivity",
    title: "تنظيم الوقت والفوائد",
    apps: [
      {
        id: "muslim-house",
        name: "أنا مسلم",
        description: "حقيبة المسلم اليومية من أذكار، مواقيت، وعبادات منظمـة.",
        icon: Clock,
        deepLink: "market://details?id=com.mfk4apps.muslimhouse",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.mfk4apps.muslimhouse",
      },
      {
        id: "yaqeen-athan-adhkar",
        name: "يقين - أذكار ومواقيت الصلاة",
        description:
          "تطبيق إسلامي شامل يضم مواقيت الصلاة، الأذكار اليومية، السبحة الإلكترونية، وتحديد اتجاه القبلة بدقة.",
        icon: MoonStar,
        deepLink: "market://details?id=com.learrnsimply.yaqeen",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.learrnsimply.yaqeen",
      },
      {
        id: "athan-qibla-quran",
        name: "أذان، قبلة وقرآن",
        description:
          "تطبيق شامل يجمع لك مواقيت الصلاة الدقيقة، التنبيه بالأذان، وتحديد القبلة مع تلاوة القرآن الكريم.",
        icon: Compass, // يمكنك استخدام أيقونة Compass أو Mosque حسب مكتبة الأيقونات لديك
        deepLink: "market://details?id=com.fyxtech.muslim",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.fyxtech.muslim",
      },
      {
        id: "athan-qibla-quran",
        name: "أذان، قبلة وقرآن",
        description:
          "تطبيق شامل يجمع لك مواقيت الصلاة الدقيقة، التنبيه بالأذان، وتحديد القبلة مع تلاوة القرآن الكريم.",
        icon: Compass, // يمكنك استخدام أيقونة Compass أو Mosque حسب مكتبة الأيقونات لديك
        deepLink: "market://details?id=com.fyxtech.muslim",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.fyxtech.muslim",
      },
      {
        id: "colornote",
        name: "ColorNote",
        description:
          "لن تفوتك فائدة بعد الآن؛ سجل ملاحظاتك ونظم دروسك العلمية.",
        icon: Smartphone,
        deepLink:
          "market://details?id=com.socialnmobile.dictapps.notepad.color.note",
        fallbackUrl:
          "https://play.google.com/store/apps/details?id=com.socialnmobile.dictapps.notepad.color.note",
      },
    ],
  },
];

export const recommendedChannels: YouTubeChannel[] = [
  {
    id: "alaa-hamed",
    name: "م. علاء حامد",
    url: "https://www.youtube.com/@3laaHamed",
  },
  {
    id: "mostafa-aladwy",
    name: "الشيخ مصطفى العدوي",
    url: "https://www.youtube.com/@ftawamostafaaladwy",
  },
  {
    id: "alshuwayer",
    name: "د. عبدالسلام الشويعر",
    url: "https://www.youtube.com/@alshuwayer9",
  },
  {
    id: "osaimi",
    name: "د. صالح العصيمي (قطوف)",
    url: "https://www.youtube.com/@Qutofosaimi",
  },
  {
    id: "osman",
    name: "الشيخ عثمان الخميس",
    url: "https://www.youtube.com/@othmanalkamees",
  },
  {
    id: "waie",
    name: "قناة وعي",
    url: "https://www.youtube.com/@Waie",
  },
];

export const recommendedBots: TelegramBot[] = [
  {
    id: "alaa-hamed-bot",
    name: "بوت المهندس علاء حامد",
    description: "أرشيف جامع ومنظم لكل ما يخص دروس وسلاسل المهندس علاء حامد.",
    deepLink: "tg://resolve?domain=Alaahamed_bot",
    fallbackUrl: "https://t.me/Alaahamed_bot",
  },
  {
    id: "athrrrr-bot",
    name: "بوت الشامل",
    description:
      "بوت شامل لكل ما يحتاجه المسلم من صوتيات، بودكاست، ومكتبة إسلامية.",
    deepLink: "tg://resolve?domain=athrrrrBot",
    fallbackUrl: "https://t.me/athrrrrBot",
  },
  {
    id: "riyadh-aljannah-channel",
    name: "رياض الجنة",
    description:
      "قناة إسلامية تهتم بنشر الفوائد والتذكير بالسنن والأعمال الصالحة ومجالس العلم.",
    deepLink: "tg://join?invite=4ICL5WhCUfQ5MTQ0",
    fallbackUrl: "https://t.me/+4ICL5WhCUfQ5MTQ0",
  },
];



export const recommendedDriveFolders: DriveResource[] = [
  {
    id: "zad-books-drive",
    name: "مكتبة المتون",
    description: "مجلد يحتوي على جميع الكتب والمتون الخاصة بمحتوى التطبيق.",
    url: "https://drive.google.com/drive/folders/1gc5O5FL3eKi6536QVmy-kxgYMu9CrMRa?usp=sharing",
  },
  {
    id: "alaa-hamed-drive",
    name: "علاء حامد",
    description: "مجلد يحتوى على ملفات المهندس علاء حامد الخاصة بدوراته",
    url: "https://drive.google.com/drive/folders/1D6NmPImuxQxVxS9eYfwFJffUsslCZgXh?usp=sharing",
  },
];