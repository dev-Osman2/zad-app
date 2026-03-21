import ClientPage from "./ClientPage";

export function generateStaticParams() {
  return [
    { slug: 'abnothemen' }, { slug: 'ta3zeem-al3elm' }, { slug: 'tafsir' },
    { slug: 'Meditate-Quran' }, { slug: 'Ramadan-Councils' },
    { slug: 'Ramadan-Event' }, { slug: 'Quran-Stages' }
  ];
}

export default function Page({ params }: any) {
  return <ClientPage params={params} />;
}