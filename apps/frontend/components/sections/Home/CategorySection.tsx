"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// UI components
import FlowingMenu from "@/components/FlowingMenu";

// Types
import type { CategoryInterface } from "@/types/category.interface"
import CountUp from "@/components/CountUp";

interface CategoryItem {
  link: string;
  text: string;
  image: string | string[];
}

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(contentWrapperRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 35%",
        end: "bottom 10%",
        scrub: true,
      },
    });
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
    image: [`https://picsum.photos/600/400?random=${index + 1}`, `https://picsum.photos/600/400?random=${index + 2}`, `https://picsum.photos/600/400?random=${index + 3}`],
  }));

  return (
    <section
      id="category"
      ref={sectionRef}
      className="
        relative
        px-4 py-6
        sm:p-20
        flex
        items-center
        justify-end
        flex-col
        min-h-[75dvh]
        text-white
        bg-primary
        z-2
      "
    >
      <div ref={contentWrapperRef} className="flex flex-col items-center">
        <div
          className="
            flex
            flex-col lg:flex-row
            justify-center
            gap-10
          "
        >
          <div className="flex-1">
            <h2>CATEGORIES</h2>
            <p>
              Du développement web à la création audiovisuelle, chaque projet est
              l{"'"}occasion d{"'"}explorer de nouvelles idées et de perfectionner mes
              compétences.
              <br />
              Parcourez mes réalisations et découvrez les univers qui m{"'"}inspirent à travers ces catégories.
            </p>
          </div>

          <div className="flex-1 relative mx-auto w-full max-w-full h-full overflow-hidden">
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
        <p className="h1 text-center mt-8">
          <CountUp
            from={0}
            to={17}
            separator=" "
          /> PROJETS
        </p>
      </div>
    </section>
  );
}
