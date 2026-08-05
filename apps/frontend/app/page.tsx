// Section components
import CategorySection from "@/components/sections/Home/CategorySection";
import CompetencySection from "@/components/sections/Home/CompetencySection";
import HeroSection from "@/components/sections/Home/HeroSection";
import MoreSection from "@/components/sections/Home/MoreSection";
import ProfileSection from "@/components/sections/Home/ProfileSection";

// Services
import { categoryService } from "@/services/category.service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const categories = await categoryService.getCategories();

  return (
    <>
      <HeroSection />
      <CategorySection categories={categories} />
      <ProfileSection />
      <CompetencySection />
      <MoreSection />
    </>
  );
}
