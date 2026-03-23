import fs from 'fs';
import path from 'path';
// نستدعي البيانات القديمة الضخمة من ملفك الحالي
import { MeditateQuran, infoMeditateQuran } from '../lib/content/quran/meditateQuran';

const DIR = path.join(process.cwd(), 'lib/data/meditateQuran');

// 1. إنشاء المجلد إذا لم يكن موجوداً
if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

// 2. ملء البيانات: كل سورة في ملف منفصل (1.json, 2.json...)
MeditateQuran.forEach((surah) => {
  fs.writeFileSync(
    path.join(DIR, `${surah.id}.json`),
    JSON.stringify(surah, null, 2)
  );
});

// 3. إنشاء ملف "الفهرس" الخفيف جداً (يحتوي فقط على الأرقام والعناوين)
const indexData = MeditateQuran.map((s) => ({
  id: s.id,
  title: s.title,
  content: "", // 💡 تركنا المحتوى فارغاً هنا ليكون التحميل سريعاً جداً
}));

fs.writeFileSync(
  path.join(DIR, 'index.json'),
  JSON.stringify(indexData, null, 2)
);

// 4. حفظ بيانات الكتاب (info)
fs.writeFileSync(
  path.join(DIR, 'info.json'),
  JSON.stringify(infoMeditateQuran, null, 2)
);

console.log("✅ تم إنشاء الملفات وملؤها بالبيانات بنجاح!");