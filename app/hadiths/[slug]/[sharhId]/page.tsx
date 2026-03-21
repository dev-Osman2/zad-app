import { allExams, allHadithBooks, allHadithSharhByBook } from "@/lib/data";
import HadithSidebarDrawer from "@/components/viewers/HadithSidebarDrawer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const params: Array<{ slug: string; sharhId: string }> = [];

  for (const [slug, sharhMap] of Object.entries(allHadithSharhByBook)) {
    for (const hadithId of Object.keys(sharhMap)) {
      params.push({ slug, sharhId: `sharh-${hadithId}` });
    }
  }

  return params;
}

export default async function HadithSharhPage({
  params,
}: {
  params: Promise<{ slug: string; sharhId: string }>;
}) {
  const { slug, sharhId } = await params;
  const sharhMap = allHadithSharhByBook[slug];
  const bookData = allHadithBooks[slug];

  if (!sharhMap || !bookData || !sharhId.startsWith("sharh-")) {
    notFound();
  }

  const hadithId = sharhId.replace("sharh-", "");
  const sharhData = sharhMap[hadithId];

  if (!sharhData) {
    notFound();
  }

  const examSlugs: Record<string, string> = {};
  const sharhSlugs: Record<string, string> = {};

  for (const section of bookData.content) {
    const examSlug = `${slug}-${section.id}`;
    if (allExams[examSlug]) {
      examSlugs[section.id] = examSlug;
    }
    if (sharhMap[section.id]) {
      sharhSlugs[section.id] = `sharh-${section.id}`;
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FFF7EA] text-slate-800 dark:bg-slate-900 dark:text-slate-100"
    >
      <HadithSidebarDrawer
        sections={bookData.content}
        bookSlug={slug}
        currentHadithId={hadithId}
        examSlugs={examSlugs}
        sharhSlugs={sharhSlugs}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <section className="bg-white/80 border border-amber-100 rounded-2xl p-6 md:p-8 shadow-sm dark:bg-slate-800/60 dark:border-slate-700">
          <div className="space-y-4 text-lg leading-loose text-slate-700 text-justify dark:text-slate-300">
            {sharhData.content.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
