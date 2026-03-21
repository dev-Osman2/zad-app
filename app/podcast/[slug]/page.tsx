import ClientPage from "./ClientPage";

export function generateStaticParams() {
  return [
    { slug: 'drNaif' },
    { slug: 'drOsman' },
    { slug: 'other' },
    { slug: 'sahm' }
  ];
}

export default function Page({ params }: any) {
  return <ClientPage params={params} />;
}