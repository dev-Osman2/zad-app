import { allExams, allHadithBooks, allHadithSharhByBook } from "@/lib/data";
// افترض وجود بيانات الصحابة هنا أو جلبها ديناميكياً
// import { sahaba1Content } from "@/lib/content/sahaba/sahaba-1"; 
import { notFound } from "next/navigation";
import ExamViewer from "@/components/viewers/ExamViewer";

export default async function ExamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const examData = allExams[slug];

  if (!examData) return notFound();

  // --- منطق التعميم الجديد ---
  let sidebarSections;
  let category: "hadith" | "sahaba" | "general" = "general";
  let bookSlug;
  let currentId;
  const examSlugs: Record<string, string> = {};
  const sharhSlugs: Record<string, string> = {};

  // 1. التحقق إذا كان اختبار صحابة (مثال: sahaba-1-exam-1)
  if (slug.includes("sahaba")) {
    category = "sahaba";
    // sidebarSections = sahaba1Content; // أو المصدر المناسب للجزء 1 أو 2
    // هنا لا نحتاج لروابط شرح، فقط الفهرس
  } 
  // 2. التحقق إذا كان اختبار أحاديث (المنطق القديم)
  else {
    const parts = slug.match(/^(.+?)-(h\d+)$/);
    if (parts) {
      category = "hadith";
      bookSlug = parts[1];
      currentId = parts[2];
      const bookData = allHadithBooks[bookSlug];
      if (bookData) {
        sidebarSections = bookData.content;
        const sharhMap = allHadithSharhByBook[bookSlug] || {};
        for (const section of bookData.content) {
          const eSlug = `${bookSlug}-${section.id}`;
          if (allExams[eSlug]) examSlugs[section.id] = eSlug;
          if (sharhMap[section.id]) sharhSlugs[section.id] = `sharh-${section.id}`;
        }
      }
    }
  }

  return (
    <ExamViewer
      data={examData}
      sections={sidebarSections}
      category={category}
      bookSlug={bookSlug}
      currentId={currentId}
      examSlugs={examSlugs}
      sharhSlugs={sharhSlugs}
    />
  );
}