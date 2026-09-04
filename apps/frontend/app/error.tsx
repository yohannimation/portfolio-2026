"use client";

import Image from "next/image";

// UI components
import ElasticButton from "@/components/ui/elasticButton";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="px-5 py-20 flex justify-center items-center flex-col lg:flex-row gap-10 lg:gap-15 xl:gap-30 h-dvh">
      <div className="flex justify-center items-center flex-col">
        <h1 className="uppercase">Une erreur est survenue</h1>
        <p className="text-center">
          Tu as découvert une erreur que je ne connaissais pas.<br/>
          Mais reviens avec nous, c'est dangeureux ici !
        </p>

        <ElasticButton anchor="/" className="mt-5 w-fit">
          Retourner à l'accueil
        </ElasticButton>
      </div>
      <div className="relative w-[calc(149px*2)] xl:w-[calc(149px*3)] h-[350px] xl:h-full">
        <Image src={"/images/mascot/bored-mascot.svg"} fill={true} alt="Bored mascot" />
      </div>
    </div>
  );
}