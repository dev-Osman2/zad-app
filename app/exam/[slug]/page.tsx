import ClientPage from "./ClientPage";
import { allExams } from "../../../lib/data";

export function generateStaticParams() {
  return Object.keys(allExams).map((examKey) => ({
    slug: examKey,
  }));
}

export default function Page({ params }: any) {
  return <ClientPage params={params} />;
}
