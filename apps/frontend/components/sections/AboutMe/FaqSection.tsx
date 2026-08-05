"use client"

import FadeContent from "@/components/FadeContent";
import { MotionAccordion } from "@/components/unlumen-ui/motion-faqs-accordion";

// UI components

export default function FaqSection() {
  const faqItems = [
    {
      question: <>Je suis développeur Full-Stack ou Front-End ?</>,
      answer:
        <>Mon expérience en alternance s'est déroulé en tant que développeur Full-Stack, j'ai les compétences aussi bien en Front-end qu'en Back-end.<br/>Cependant, j'aspire vraiment à me spécialiser dans le domaine du développement Front-End</>,
    },
    {
      question: <>Ai-je toutes les compétences ?</>,
      answer:
        <>Si je ne les ai pas, je les aurais forcement. Curieux, j'apprends rapidement et je m'adapte aux différents projets.</>,
    },
    {
      question: <>Mon travail est de qualité ?</>,
      answer:
        <>De part mon expérience en entreprise et grâce aux outils moderne (tel que l'IA), je travaille efficacement tout en prêtant une grande attention à la qualité du code que j'apporte.</>,
    },
    {
      question: <>Je push vraiment les <code>.env</code> ?</>,
      answer:
        <>Non, fort heureusement. <span className="text-xs">(référence à mon GitHub)</span></>,
    },
    {
      question: <>Je ne réponds pas à toutes vos questions ?</>,
      answer:
        <>N'hésitez pas à me les poser via mes différents moyen de contact dans le pied de page.</>,
    },
  ];

  return (
    <section id="github" className="relative p-5 pb-20 sm:p-20 flex flex-col justify-center gap-3">
      <h2>FAQ</h2>

      <MotionAccordion items={faqItems} />
    </section>
  );
}
