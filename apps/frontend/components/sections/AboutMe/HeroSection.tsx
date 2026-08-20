"use client"

// UI components
import Anchor from '@/components/ui/anchor';
import ElasticButton from '@/components/ui/elasticButton';
import { GithubGraph } from "@/components/unlumen-ui/github-graph";
import TiltedCard from "@/components/TiltedCard";

// Icons
import { SquareArrowOutUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen p-5 pt-10 sm:p-20 sm:pt-25 flex flex-col justify-center">
      <div
        className="
          grid
          grid-cols-2 xl:grid-cols-3
          grid-rows-none
          gap-8
        "
      >
        <div className="col-span-full lg:col-span-1 xl:col-span-2 flex flex-col items-center lg:items-end">
          <h1 className="w-full text-left">Yohann RENAULD</h1>

          <p className="text-lg">
            Passionné par l'interaction entre le développement et la créativité visuelle, je poursuis actuellement un Mastère en Ingénierie du Web à L'<Anchor href={"https://esgi.fr"} target="_blank">ESGI <SquareArrowOutUpRight size={18} /></Anchor> de Grenoble, où je combine théorie et pratique pour créer des solutions innovantes.<br/>
            En parallèle, j'ai la chance de prendre en compétence grâce à mon alternance chez <Anchor href={"https://evolutis.fr"} target="_blank">Evolutis <SquareArrowOutUpRight size={18} /></Anchor>, où je développe des projets e-commerce centrés sur les besoins clients.
          </p>

          <div className="mt-4 w-fit">
            <ElasticButton anchor="/2026-CV_Yohann-RENAULD.pdf">Mon CV</ElasticButton>
          </div>
        </div>

        <div
          className="
            col-span-full lg:col-span-1 xl:col-span-1
            flex
            justify-center
            items-center
          "
        >
          <TiltedCard
            imageSrc={"/images/aboutme.png"}
            altText="Photo de Yohann"
            captionText="C'est moi :)"
            scaleOnHover={1.05}
            containerWidth={"fit-content"}
            containerHeight={"fit-content"}
          />
        </div>
      </div>
    </section>
  );
}
