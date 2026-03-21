import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BooksSection from "@/components/home/BooksSection";

export default function Home() {
  return (
    <div
      className="flex flex-col transition-colors duration-500 font-sans min-h-screen
        bg-linear-to-br from-[#fdfbf7] via-[#fffefc] to-[#fefaf0] text-slate-800
        dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 dark:text-slate-100"
    >
      <HeroSection />
      <FeaturesSection />
      <BooksSection />
    </div>
  );
}
