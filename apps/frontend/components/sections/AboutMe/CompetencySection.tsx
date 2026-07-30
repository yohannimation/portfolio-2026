"use client";

// UI components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// Libs
import { getBrandColor } from "@/lib/utils";

// Icons
import { Icon } from "@iconify/react";

// Data
import competencies from "@/data/competencies.json";

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
      className="relative p-5 sm:p-20 w-full h-[100dvh] flex flex-col items-center justify-center bg-background z-4"
    >
      <div
        className="
          flex
          flex-col
          justify-center
          gap-3
          w-full
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
    </section>
  );
}
