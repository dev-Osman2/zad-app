import ClientPage from "./ClientPage";
import { allCourses } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { slug: 'abnothemen' }, { slug: 'ta3zeem-al3elm' }, { slug: 'tafsir' },
    { slug: 'Meditate-Quran' }, { slug: 'Ramadan-Councils' },
    { slug: 'Ramadan-Event' }, { slug: 'Quran-Stages' }, { slug: 'sahaba-1'},
    { slug: 'sahaba-2' }, { slug: 'sahabiyat' }, { slug: 'Tabi3een' },
  ];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // 1. ننتظر حتى نحصل على المسار (slug)
  const { slug } = await params;

  // 2. نستدعي البيانات هنا في السيرفر
  const courseData = allCourses[slug];

  // 3. إذا لم يجد البيانات يعرض صفحة 404
  if (!courseData) {
    return notFound();
  }

  // 4. نمرر البيانات الخاصة بهذا الكتاب فقط (وليس كل الملفات) إلى صفحة العميل
  return <ClientPage courseData={courseData} />;
}