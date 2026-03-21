import { allHadithBooks, allExams, allHadithSharhByBook } from "@/lib/data";
import { notFound } from "next/navigation";
import HadithViewer from "@/components/viewers/HadithViewer";


export default async function HadithPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const courseData = allHadithBooks[slug];

  if (!courseData) {
    return notFound();
  }

  const hadithExamSlugs: Record<string, string> = {};
  for (const section of courseData.content) {
    const examSlug = `${slug}-${section.id}`;
    if (allExams[examSlug]) {
      hadithExamSlugs[section.id] = examSlug;
    }
  }

  const bookSharh = allHadithSharhByBook[slug] || {};
  const hadithSharhSlugs: Record<string, string> = {};
  for (const section of courseData.content) {
    if (bookSharh[section.id]) {
      hadithSharhSlugs[section.id] = `sharh-${section.id}`;
    }
  }


  return (
    <HadithViewer
      data={courseData}
      hadithSlug={slug}
      storageKey={`hadith_progress_${slug}`}
      hadithExamSlugs={hadithExamSlugs}
      hadithSharhSlugs={hadithSharhSlugs}
    />
  );
}
