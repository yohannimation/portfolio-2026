"use client";

// Decorative components
import HeroBackground from "@/components/decorative/HeroBackground";

// UI components
import { Badge } from "@/components/ui/badge";
import Cta from "@/components/ui/cta";

// Animation components
import FadeContent from "@/components/FadeContent";
import SplitText from "@/components/SplitText";

// Icons
import { ArrowDown, Briefcase } from "lucide-react";

export default function HeroSection() {
  const date = new Date();

  return (
    <section className="relative h-dvh">
      <div className="relative flex flex-col gap-8 justify-center w-full h-full px-5 sm:px-20 z-1">
        <FadeContent
          duration={1}
          delay={1.5}
          className="flex items-center gap-4"
        >
          <div className="flex flex-col">
            <p className="text-xl text-shadow-[0_0_5px_var(--background)]">
              <span className="underline">Yohann RENAULD</span>
              <br />
              Portfolio {date.getFullYear()}
            </p>
            <Badge variant="outline" className="relative mt-1 overflow-visible">
              <Briefcase data-icon="inline-start" />
              Open to work
              <span className="absolute inset-x-[23] inset-y-[1] block bg-primary -z-1 rounded-full animate-ping"></span>
            </Badge>
          </div>
        </FadeContent>

        <SplitText
          tag="h1"
          text="DEVELOPPEUR FRONTEND"
          delay={50}
          duration={0.5}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          textAlign="left"
          className="hero"
        />

        <FadeContent duration={1} delay={1.5}>
          <div className="flex flex-col items-center justify-end lg:flex-row gap-10">
            <p className="p-1 w-fit rounded-sm">
              Étant passionné de création visuel et d'animations,
              <br />
              je suis ouvert à tous type de projets.
            </p>
            <Cta size="xxl">
              <ArrowDown className="size-5 mt-1 animate-bounce" />
              Catégories
            </Cta>
          </div>
        </FadeContent>
      </div>

      <HeroBackground />
    </section>
  );
}
