// Section components
import CompetencySection from "@/components/sections/AboutMe/CompetencySection";
import FaqSection from "@/components/sections/AboutMe/FaqSection";
import HeroSection from "@/components/sections/AboutMe/HeroSection";
import PassionSection from "@/components/sections/AboutMe/PassionSection";
import TimelineSection from "@/components/sections/AboutMe/TimelineSection";

export default async function AboutMePage() {
  return (
    <>
      <HeroSection />
      <TimelineSection />
      <CompetencySection />
      <PassionSection />
      <FaqSection />
    </>
  );
}