"use client"

import { MotionAccordion } from "@/components/unlumen-ui/motion-faqs-accordion";

// UI components

export default function FaqSection() {
  const faqItems = [
    {
      question: "Ai-je toutes les compétences ?",
      answer:
        "Si je ne les ai pas, je les aurais forcement. Curieux, j'apprends rapidement et je m'adapte aux différents projets.",
    },
    {
      question: "Mon travail est de qualité ?",
      answer:
        "De part mon expérience en entreprise et grâce aux outils moderne (tel que l'IA), je travaille efficacement tout en pretant une grande attention à la qualité du code que j'apporte.",
    },
    {
      question: "Je push vraiment les .env ?",
      answer:
        "Non, fort heureusement.",
    },
    {
      question: "Je ne réponds pas à toutes vos questions ?",
      answer:
        "N'hésitez pas à me les poser via mes différents moyen de contact dans le footer.",
    },
  ];

  return (
    <section id="github" className="relative p-5 sm:p-20 flex flex-col justify-center gap-3">
      <h2>FAQ</h2>

      <MotionAccordion items={faqItems} />
    </section>
  );
}
