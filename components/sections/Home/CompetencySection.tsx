"use client";

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
  competency: competencyInterface[];
}
interface competencyInterface {
  name: string;
  icon: string | null;
}

export default function CompetencySection() {
  const accordionItems: accordionItem[] = competencies.map(
    (item: competencyCategoryInterface) => ({
      value: item.id,
      trigger: item.name,
      content: (
        <div className="flex flex-col gap-2 overflow-x-auto pb-2">
          {[0, 1].map((rowIdx) => (
            <ul key={rowIdx} className="flex gap-2 whitespace-nowrap">
              {item.competency
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

  return (
    <section
      id="competencies"
      className="relative p-2 py-4 sm:p-3 sm:py-4 min-h-screen bg-primary flex flex-col"
    >
      <div className="flex-1 p-5 sm:p-20 bg-background rounded-xl sm:rounded-4xl">
        <AnimatedContent
          container="competencies"
          delay={0.2}
          className="
            flex
            flex-col
            gap-3
            h-full
          "
        >
          <h2>COMPETENCES</h2>

          <div className="relative">
            <Accordion type="single" collapsible defaultValue="frontend">
              {accordionItems.map((accordion) => (
                <AccordionItem key={accordion.value} value={accordion.value}>
                  <AccordionTrigger>{accordion.trigger}</AccordionTrigger>
                  <AccordionContent>{accordion.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
