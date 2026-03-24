import fs from 'fs';
import path from 'path';

// 💡 ملاحظة: تأكد من أن أسماء التصدير (SahabaData و infoSahaba) تطابق ما هو موجود داخل ملف sahaba-1.ts
// إذا كانت المصفوفة تسمى Sahaba1 فقم بتغيير الاسم هنا
import { Sahaba1, infoSahaba1 } from '../lib/content/sahaba/sahaba-1Exam'; 

const DIR = path.join(process.cwd(), 'lib/data/sahaba');

// 1. إنشاء المجلد إذا لم يكن موجوداً
if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

// 2. ملء البيانات: كل صحابي في ملف منفصل (43.json, 44.json...)
// نستخدم الـ id الخاص بالصحابي كاسم للملف
Sahaba1.forEach((person) => {
  fs.writeFileSync(
    path.join(DIR, `${person.id}.json`),
    JSON.stringify(person, null, 2)
  );
  console.log(`✅ تم إنشاء ملف الصحابي: ${person.id}.json`);
});

// 3. إنشاء ملف "الفهرس" الخفيف جداً (يحتوي فقط على المعرفات والعناوين)
const indexData = Sahaba1.map((s) => ({
  id: s.id,
  title: s.title,
  content: "", // 💡 نتركه فارغاً ليكون الفهرس خفيفاً جداً عند العرض في القائمة
}));

fs.writeFileSync(
  path.join(DIR, 'index.json'),
  JSON.stringify(indexData, null, 2)
);

// 4. حفظ بيانات الكتاب (info) مثل العنوان والوصف العام
fs.writeFileSync(
  path.join(DIR, 'info.json'),
  JSON.stringify(infoSahaba1, null, 2)
);

console.log("\n🚀 تمت عملية التحويل بنجاح! مجلد lib/data/sahaba جاهز الآن.");