"use client";

// UI components
import Anchor from "@/components/ui/anchor";
import { Timeline } from "@/components/ui/timeline";

// Icons
import { SquareArrowOutUpRight } from "lucide-react";

export default function TimelineSection() {
  const timelineItems = [
    {
      title: "Développeur web full-stack e-commerce et module d'IA",
      date:
        new Intl.DateTimeFormat("fr-FR", {
          month: "long",
          year: "numeric",
        }).format(new Date("2024-09-01T00:00:00+00:00")) + " - maintenant",
      content: (
        <p>
          Poste chez{" "}
          <Anchor href={"https://evolutis.fr"} target="_blank">
            Evolutis <SquareArrowOutUpRight size={18} />
          </Anchor>{" "}
          en Alternance à l'
          <Anchor href={"https://esgi.fr"} target="_blank">
            ESGI <SquareArrowOutUpRight size={18} />
          </Anchor>{" "}
          pour un Mastère parcours Ingénierie du Web.
        </p>
      ),
    },
    {
      title: "Développeur web full-stack e-commerce",
      date:
        new Intl.DateTimeFormat("fr-FR", {
          month: "long",
          year: "numeric",
        }).format(new Date("2022-09-01T00:00:00+00:00")) +
        " - " +
        new Intl.DateTimeFormat("fr-FR", {
          month: "long",
          year: "numeric",
        }).format(new Date("2024-08-31T00:00:00+00:00")),
      content: (
        <p>
          Poste chez{" "}
          <Anchor href={"https://evolutis.fr"} target="_blank">
            Evolutis <SquareArrowOutUpRight size={18} />
          </Anchor>{" "}
          en Alternance à l'
          <Anchor
            href={
              "https://formations.univ-grenoble-alpes.fr/fr/catalogue-2021/but-bachelor-universitaire-de-technologie-BUT/but-metiers-du-multimedia-et-de-l-internet-KI4YX5MN.html"
            }
            target="_blank"
          >
            IUT1 Grenoble <SquareArrowOutUpRight size={18} />
          </Anchor>{" "}
          pour un BUT MMI spécialité Développement web.
        </p>
      ),
    }
  ];

  return (
    <section id="timeline" className="relative p-5 sm:p-20 flex flex-col gap-3">
      <h2>PARCOURS</h2>
      <Timeline data={timelineItems} />
    </section>
  );
}
