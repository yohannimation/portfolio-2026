"use client";

// UI components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Icon } from "@iconify/react";

// Animation components
import AnimatedContent from "@/components/AnimatedContent";
import { Badge } from "@/components/ui/badge";

import competencies from "@/data/competencies.json";
import { getBrandColor } from "@/lib/utils";

interface accordionItem {
  value: string,
  trigger: string,
  content: React.ReactNode,
}
interface competencyCategoryInterface {
  id: string,
  name: string,
  competency: competencyInterface[]
}
interface competencyInterface {
  name: string,
  icon: string | null
}

export default function CompetencySection() {
  const accordionItems: accordionItem[] = competencies.map((item: competencyCategoryInterface) => ({
    value: item.id,
    trigger: item.name,
    content: (
      <ul className="flex flex-wrap gap-2">
        {item.competency.map((competency) => {
          const color = getBrandColor(competency.icon)

          return (
            <li key={competency.name}>
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
          )
        })}
      </ul>
    ),
  }));

  return (
    <section id="competencies" className="relative min-h-dvh px-5 py-[5dvh] sm:px-20">
      <AnimatedContent
        container="competencies"
        delay={.2}
        className="
          flex
          flex-col
          gap-3
          h-full
        "
      >
        <h2>COMPETENCES</h2>

        <div className="relative mx-auto w-full max-w-full lg:max-w-[75%]">
          <Accordion
            type="single"
            collapsible
            defaultValue="frontend"
          >
              {
                accordionItems.map((accordion) => (
                  <AccordionItem key={accordion.value} value={accordion.value}>
                    <AccordionTrigger>{accordion.trigger}</AccordionTrigger>
                    <AccordionContent>{accordion.content}</AccordionContent>
                  </AccordionItem>
                ))
              }
              
          </Accordion>
        </div>
      </AnimatedContent>
    </section>
  );
}