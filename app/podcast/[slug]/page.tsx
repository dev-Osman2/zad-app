import ClientPage from "./ClientPage";

export function generateStaticParams() {
  return [
    { slug: 'drNaif' },
    { slug: 'drOsman' },
    { slug: 'other' },
    { slug: 'sahm' }
  ];
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function Page({ params }: PageProps) {
  return <ClientPage params={params} />;
}
