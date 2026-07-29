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
    <section id="hero" className="relative min-h-screen p-5 sm:p-20 flex flex-col justify-center gap-3">
      <h1>Yohann RENAULD</h1>

      <div
        className="
          grid
          grid-cols-2 xl:grid-cols-3
          grid-rows-none
          gap-8
        "
      >
        <div className="col-span-full lg:col-span-1 xl:col-span-2 flex flex-col justify-center items-center lg:items-end">
          <div className="text-md">
            <p>
              Passionné par l'interaction entre le développement et la créativité visuelle, je poursuis actuellement un Mastère en Ingénierie du Web à L'<Anchor href={"https://esgi.fr"} target="_blank">ESGI <SquareArrowOutUpRight size={18} /></Anchor> de Grenoble, où je combine théorie et pratique pour créer des solutions innovantes.<br/>
              En parallèle, j'ai la chance de prendre en compétence grâce à mon alternance chez <Anchor href={"https://evolutis.fr"} target="_blank">Evolutis <SquareArrowOutUpRight size={18} /></Anchor>, où je développe des projets e-commerce centrés sur les besoins clients.<br/>
              Actuellement développeur full-stack, j'aspire me spécialiser dans le front-end pour utiliser des technologies modernes et optimisées.
            </p>
            <p>
              Étant ouvert à toutes opportunités de projet web ou audiovisuel, mon CV et mes informations de contact sont dans le pied de page. 
            </p>
          </div>

          <div className="mt-4 w-fit">
            <ElasticButton>Mon CV</ElasticButton>
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
            imageSrc={
              "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
            }
            altText="Photo de Yohann"
            captionText="C'est moi :)"
            scaleOnHover={1.05}
            containerWidth={"fit-content"}
            containerHeight={"fit-content"}
          />
        </div>
      </div>

      <GithubGraph
        account="yohannimation"
        months={12}
        variant="github"
        animation="cascade"
        animationSpeed={1.4}
        cellSize={20}
        cellGap={4}
        cellRadius={6}
        ambientEffect="none"
        className="mx-auto"
      />
    </section>
  );
}
