import ClientPage from "./ClientPage";
import { allCourses } from "@/lib/constants/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { slug: "abnothemen" },
    { slug: "ta3zeem-al3elm" },
    { slug: "tafsir" },
    { slug: "Meditate-Quran" },
    { slug: "Ramadan-Councils" },
    { slug: "Ramadan-Event" },
    { slug: "Quran-Stages" },
    { slug: "sahaba-1" },
    { slug: "sahaba-2" },
    { slug: "sahabiyat" },
    { slug: "tabi3een" },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const courseData = allCourses[slug];

  if (!courseData) {
    return notFound();
  }

  return <ClientPage courseData={courseData} />;
}
