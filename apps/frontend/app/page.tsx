// Section components
import CategorySection from "@/components/sections/Home/CategorySection";
import CompetencySection from "@/components/sections/Home/CompetencySection";
import HeroSection from "@/components/sections/Home/HeroSection";
import MoreSection from "@/components/sections/Home/MoreSection";
import ProfileSection from "@/components/sections/Home/ProfileSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProfileSection />
      <CompetencySection />
      <MoreSection />
    </>
  );
}
