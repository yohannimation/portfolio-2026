"use client"

import HeroBackground from "@/components/decorative/HeroBackground";

import SplitText from "@/components/SplitText";
import FadeContent from "@/components/FadeContent"

export default function HeroSection() {
  return (
    <section className="relative h-dvh">
      <div className="relative flex flex-col justify-center w-full h-full px-5 sm:px-20 z-1">
        <SplitText
          tag="h1"
          text="DEVELOPPEUR FRONTEND"
          className="hero"
          delay={50}
          duration={0.5}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="left"
          threshold={0.1}
        />
        
        <FadeContent
          duration={1}
          delay={1.5}
        >
          <div className="flex flex-col lg:flex-row justify-between">
            <p className="p-3 w-fit bg-muted rounded-sm">
              Un court sous-titre de section.<br/>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, omnis.
            </p>
            <button>gregegr</button>
          </div>
        </FadeContent>
      </div>
      
      <HeroBackground />
    </section>
  );
}
