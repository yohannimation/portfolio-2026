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
import Image from "next/image";

import competences from "@/data/competences.json";

interface accordionItem {
  value: string,
  trigger: string,
  content: React.ReactNode,
}

export default function CompetenceSection() {
  const iconSize = 20;

  const accordionItems: accordionItem[] = competences.map((item) => ({
    value: item.id,
    trigger: item.name,
    content: (
      <>
        {item.competence.map((competence) => (
          <Badge key={competence.name} variant={"outline"}>
            <Icon
              icon={`simple-icons:${competence.icon.name}`}
              width={iconSize}
              style={{ color: competence.icon.color }}
            />
            {competence.name}
          </Badge>
        ))}
      </>
    ),
  }))

  return (
    <section id="competences" className="relative h-dvh px-5 py-[10dvh] sm:px-20">
      <AnimatedContent
        container="competences"
        delay={.5}
        className="
          flex
          flex-col
          gap-[12dvh]
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