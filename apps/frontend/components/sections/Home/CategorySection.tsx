"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// UI components
import FlowingMenu from "@/components/FlowingMenu";

// Animation components
import AnimatedContent from "@/components/AnimatedContent";

// Types
import type { CategoryInterface } from "@/types/category.interface"

interface CategoryItem {
  link: string;
  text: string;
  image: string;
}

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=95%",
      pin: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
      },
    });

    tl.to(contentWrapperRef.current, { y: -75, duration: 1 })
      .to(contentWrapperRef.current, { opacity: 0, y: -150, duration: 1 }, ">")
      .to(sectionRef.current, { backgroundColor: "var(--background)", duration: 0.4 }, "<");
  }, { scope: sectionRef });

  const categories: CategoryInterface[] = [
    {
      id: 1,
      name: "Développement web",
      description: "",
      slug: "web",
    },
    {
      id: 2,
      name: "Audiovisuel",
      description: "",
      slug: "audiovisual",
    },
  ];

  const categoryItems: CategoryItem[] = categories.map((category, index) => ({
    link: `category/${category.id}-${category.slug}`,
    text: category.name,
    image: `https://picsum.photos/600/400?random=${index + 1}`,
  }));

  return (
    <section
      id="category"
      ref={sectionRef}
      className="
        relative
        px-4 py-6
        sm:p-20
        text-white
        bg-primary
        z-2
        min-h-[100dvh]
        flex
        items-center
        justify-center
      "
    >
      <div ref={contentWrapperRef} className="w-full">
        <div
          // container="category"
          // delay={0.2}
          className="
            flex
            flex-col
            justify-center
            gap-10
            h-full
          "
        >
          <div>
            <h2>CATEGORIES</h2>
            <p>
              Du développement web à la création audiovisuelle, chaque projet est
              l{"'"}occasion d{"'"}explorer de nouvelles idées et de perfectionner mes
              compétences.
              <br />
              Parcourez mes réalisations et découvrez les univers qui m{"'"}inspirent.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-full h-full overflow-hidden">
            <FlowingMenu
              items={categoryItems}
              speed={10}
              bgColor="var(--primary-foreground)"
              textColor="var(--foreground)"
              marqueeBgColor="var(--secondary)"
              borderColor="var(--primary)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
