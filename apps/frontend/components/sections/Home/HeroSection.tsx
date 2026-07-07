"use client";

import { useLayoutEffect, useRef } from 'react';

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

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Icons
import { ArrowDown, Briefcase } from "lucide-react";

export default function HeroSection() {
  const scrollVelocityRef = useRef(null);
  const blurRef = useRef(null);
  const date = new Date();

  useLayoutEffect(() => {
    gsap.fromTo(scrollVelocityRef.current,
      { yPercent: 100, zIndex: 1 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        delay: 2,
        onComplete: () => {
          gsap.set(scrollVelocityRef.current, { zIndex: 3 });
        }
      }
    );

    gsap.to(blurRef.current, {
      "--blur-amount": "24px",
      "--mask-radius-x": "150%",
      "--mask-radius-y": "100%",
      "--mask-radius": "100%",
      "--mask-radius-edge": "175%",
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: 0,
        end: 300,
        scrub: true,
      }
    });
  }, []);

  return (
    <section id="hero" className="relative h-dvh">
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
          duration={1.2}
          ease="elastic.out(1,0.3)"
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
              Développeur Front-End passionné par l'expérience utilisateur.<br />
              J'imagine et développe des interfaces performantes, tout en explorant la création visuelle et l'animation.
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

      <span
        ref={blurRef}
        className="absolute inset-0 z-2 pointer-events-none backdrop-blur-xl"
        style={{
          "--blur-amount": "0px",
          "--mask-radius-x": "0%",
          "--mask-radius-y": "0%",
          "--mask-radius": "0%",
          "--mask-radius-edge": "0%",
          backdropFilter: "blur(var(--blur-amount))",
          maskImage: "radial-gradient(ellipse var(--mask-radius-x) var(--mask-radius-y) at 50% 100%, black var(--mask-radius), transparent var(--mask-radius-edge))",
          WebkitMaskImage: "radial-gradient(ellipse var(--mask-radius-x) var(--mask-radius-y) at 50% 100%, black var(--mask-radius), transparent var(--mask-radius-edge))",
        }}
      />

      <div ref={scrollVelocityRef} className='absolute left-0 bottom-0 right-0 flex items-center min-h-[50px] bg-secondary overflow-hidden'>
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
