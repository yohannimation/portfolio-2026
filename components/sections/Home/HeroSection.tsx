"use client";

// Decorative components
import dynamic from 'next/dynamic';
const HeroBackground = dynamic(() => import('@/components/decorative/HeroBackground'), {
  ssr: false,
});

// UI components
import { Badge } from "@/components/ui/badge";
import ElasticButton from '@/components/ui/elasticButton';
import Image from 'next/image';

// Animation components
import FadeContent from "@/components/FadeContent";
import ScrollVelocity from '@/components/ScrollVelocity';
import SplitText from "@/components/SplitText";
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

// Icons
import { ArrowDown, Briefcase } from "lucide-react";



export default function HeroSection() {
  const date = new Date();
  const scrollVelocityRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(scrollVelocityRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 1, ease: "power3.out", delay: 2 }
    );
  }, []);

  return (
    <section className="relative h-dvh">
      <div className="relative flex flex-col gap-[5dvh] justify-center w-full h-full px-5 sm:px-20 z-1">
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
              <span className="absolute inset-x-[35] inset-y-[3] block bg-primary -z-1 rounded-full animate-ping"></span>
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
          <div className="flex flex-col lg:items-center justify-end lg:flex-row gap-2 lg:gap-10">
            <p className="p-1 w-fit rounded-sm">
              Étant passionné de création visuel et d'animations,
              <br />
              je suis ouvert à tous type de projets.
            </p>
            <ElasticButton
              onClick={() => { document.getElementById("category")?.scrollIntoView(); }}
            >
              <ArrowDown className="size-5 mt-1 animate-bounce" />
              Catégories
            </ElasticButton>
          </div>
        </FadeContent>
      </div>

      <div ref={scrollVelocityRef} className='absolute left-0 bottom-0 right-0 flex items-center min-h-[50px] bg-secondary z-1 overflow-hidden'>
        <ScrollVelocity
          texts={[<>YOHANNIMATION&nbsp;<Image src={"/images/happy-mascot.png"} width={32} height={32} alt='Yohannimation mascot' loading="lazy" /></>]}
          velocity={90}
          damping={100}
          stiffness={600}
          numCopies={8}
        />
      </div>

      <HeroBackground />
    </section>
  );
}
