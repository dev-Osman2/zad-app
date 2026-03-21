import ClientPage from "./ClientPage";

export function generateStaticParams() {
  return [{ slug: 'arbaeen' }];
}

export default function Page({ params }: any) {
  return <ClientPage params={params} />;
}