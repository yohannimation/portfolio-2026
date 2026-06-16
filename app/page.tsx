// Section components
import CategorySection from "@/components/sections/Home/CategorySection";
import CompetencySection from "@/components/sections/Home/CompetencySection";
import HeroSection from "@/components/sections/Home/HeroSection";

// UI components
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <Separator />
      <CompetencySection />
    </>
  );
}
