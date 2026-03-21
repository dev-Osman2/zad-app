import ClientPage from "./ClientPage";

export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    chapterId: (i + 1).toString(),
  }));
}

export default function Page() {
  return <ClientPage />;
}