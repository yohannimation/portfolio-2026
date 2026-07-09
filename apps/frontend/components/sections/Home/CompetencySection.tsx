"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// UI components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icon } from "@iconify/react";

// Animation components
import AnimatedContent from "@/components/AnimatedContent";
import { Badge } from "@/components/ui/badge";

import competencies from "@/data/competencies.json";
import { getBrandColor } from "@/lib/utils";

interface accordionItem {
  value: string;
  trigger: string;
  content: React.ReactNode;
}
interface competencyCategoryInterface {
  id: string;
  name: string;
  competencies: competenciesInterface[];
}
interface competenciesInterface {
  name: string;
  icon: string | null;
}

export default function CompetencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const targetRadius = window.innerWidth < 640 ? "0.75rem" : "3rem";
    const paddingSection = window.innerWidth < 640 ? "16px 8px" : "16px 12px";

    gsap.set(wrapperRef.current, { padding: 0 });
    gsap.set(innerRef.current, { borderRadius: 0 });
    gsap.set(contentRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
      },
    });

    tl.to(wrapperRef.current, {
        padding: paddingSection,
        duration: 1
      }, ">"
    )
    .to(innerRef.current, {
      borderRadius: targetRadius,
      duration: 1
    }, "<")
    .to(contentRef.current, {
      opacity: 1,
      duration: 300 / (1.5 * window.innerHeight)
    }, ">");
  }, { scope: sectionRef });

  const accordionItemsMobile: accordionItem[] = competencies.map(
    (item: competencyCategoryInterface) => ({
      value: item.id,
      trigger: item.name,
      content: (
        <div className="flex flex-col gap-2 overflow-x-auto pb-2">
          {[0, 1].map((rowIdx) => (
            <ul key={rowIdx} className="flex gap-2 whitespace-nowrap">
              {item.competencies
                .filter((_, i) => i % 2 === rowIdx)
                .map((competency) => {
                  const color = getBrandColor(competency.icon);

                  return (
                    <li key={competency.name} className="shrink-0">
                      <Badge
                        variant="outline"
                        className="hover:bg-[var(--icon-color)]/10 transition-colors"
                        style={
                          {
                            "--icon-color": color,
                          } as React.CSSProperties
                        }
                      >
                        {competency.icon && (
                          <Icon
                            icon={`simple-icons:${competency.icon}`}
                            style={{ color: "var(--icon-color)" }}
                          />
                        )}

                        {competency.name}
                      </Badge>
                    </li>
                  );
                })}
            </ul>
          ))}
        </div>
      ),
    })
  );

  const accordionItemsDesktop: accordionItem[] = competencies.map(
    (item: competencyCategoryInterface) => ({
      value: item.id,
      trigger: item.name,
      content: (
        <div className="flex flex-col gap-2 overflow-x-auto pb-2">
          <ul className="flex gap-2 flex-wrap whitespace-nowrap">
            {item.competencies.map((competency) => {
                const color = getBrandColor(competency.icon);

                return (
                  <li key={competency.name} className="shrink-0">
                    <Badge
                      variant="outline"
                      className="hover:bg-[var(--icon-color)]/10 transition-colors"
                      style={
                        {
                          "--icon-color": color,
                        } as React.CSSProperties
                      }
                    >
                      {competency.icon && (
                        <Icon
                          icon={`simple-icons:${competency.icon}`}
                          style={{ color: "var(--icon-color)" }}
                        />
                      )}

                      {competency.name}
                    </Badge>
                  </li>
                );
              })}
          </ul>
        </div>
      ),
    })
  );

  return (
    <section
      id="competencies"
      ref={sectionRef}
      className="relative p-0 py-0 h-[100dvh] bg-primary flex flex-col items-center justify-center z-4 overflow-hidden"
    >
      <div ref={wrapperRef} className="w-full h-full">
        <div
          ref={innerRef}
          className="w-full h-full p-5 sm:p-20 bg-background rounded-xl sm:rounded-4xl"
        >
          <div
            // container="competencies"
            // delay={0.2}
            ref={contentRef}
            className="
              flex
              flex-col
              justify-center
              gap-3
              h-full
            "
          >
            <h2>COMPETENCES</h2>
            <div className="relative">
              <Accordion type="single" collapsible defaultValue="frontend" className="block lg:hidden">
                {accordionItemsMobile.map((accordion) => (
                  <AccordionItem key={accordion.value} value={accordion.value}>
                    <AccordionTrigger>{accordion.trigger}</AccordionTrigger>
                    <AccordionContent>{accordion.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Accordion type="single" collapsible defaultValue="frontend" className="hidden lg:block">
                {accordionItemsDesktop.map((accordion) => (
                  <AccordionItem key={accordion.value} value={accordion.value}>
                    <AccordionTrigger>{accordion.trigger}</AccordionTrigger>
                    <AccordionContent>{accordion.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
