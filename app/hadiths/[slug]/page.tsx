import ClientPage from "./ClientPage";

export function generateStaticParams() {
  return [{ slug: 'arbaeen' }, { slug: 'qisas' }];
}
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function Page({ params }: PageProps) {
  return <ClientPage params={params} />;
}
