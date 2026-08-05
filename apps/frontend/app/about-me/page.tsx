// Section components
import CompetencySection from "@/components/sections/AboutMe/CompetencySection";
import FaqSection from "@/components/sections/AboutMe/FaqSection";
import GithubSection from "@/components/sections/AboutMe/GithubSection";
import HeroSection from "@/components/sections/AboutMe/HeroSection";
import PassionSection from "@/components/sections/AboutMe/PassionSection";
import TimelineSection from "@/components/sections/AboutMe/TimelineSection";

// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "Passionné par l'interaction entre le développement et la créativité visuelle, je poursuis actuellement un Mastère en Ingénierie du Web à L'ESGI de Grenoble, où je combine théorie et pratique pour créer des solutions innovantes.",
  category: "À propos",
  alternates: {
    canonical: `https://yohannimation.fr/about-me`
  },
  openGraph: {
    title: "À propos",
    description: "Passionné par l'interaction entre le développement et la créativité visuelle, je poursuis actuellement un Mastère en Ingénierie du Web à L'ESGI de Grenoble, où je combine théorie et pratique pour créer des solutions innovantes.",
    siteName: "Yohannimation portfolio",
    locale: "fr",
    url: "https://yohannimation.fr/about-me",
    countryName: "France"
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function AboutMePage() {
  return (
    <>
      <HeroSection />
      <TimelineSection />
      <GithubSection />
      <CompetencySection />
      <PassionSection />
      <FaqSection />
    </>
  );
}