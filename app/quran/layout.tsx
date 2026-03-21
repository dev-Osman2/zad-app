import { getAllSurahs } from "@/lib/services/quranApi";
import QuranLayoutContent from "./QuranLayoutContent";

export default async function QuranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const surahs = await getAllSurahs();

  return (
    
    <QuranLayoutContent surahs={surahs}>{children}</QuranLayoutContent>
  );
}
