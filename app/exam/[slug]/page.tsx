import ClientPage from "./ClientPage";
import { allExams } from "@/lib/constants/data";

export function generateStaticParams() {
  return Object.keys(allExams).map((examKey) => ({
    slug: examKey,
  }));
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function Page({ params }: PageProps) {
  return <ClientPage params={params} />;
}
