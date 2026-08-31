import Image from "next/image";

// UI components
import ElasticButton from "@/components/ui/elasticButton";

// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: ""
};

export default function NotFound() {
  return (
    <div className="px-5 py-20 flex justify-center items-center flex-col lg:flex-row gap-10 lg:gap-15 xl:gap-30 h-dvh">
      <div className="flex justify-center items-center flex-col">
        <h1 className="uppercase">Page introuvable</h1>
        <p className="text-center">
          Comment t'as fais pour te retrouver ici ?! <br/>
          Il n'y a que 4 pages sur mon site...
        </p>

        <ElasticButton anchor="/" className="mt-5 w-fit">
          Retourner à l'accueil
        </ElasticButton>
      </div>
      <div className="relative w-[calc(149px*2)] xl:w-[calc(149px*3)] h-[350px] xl:h-full">
        <Image src={"/images/bored-mascot.svg"} fill={true} alt="Bored mascot" />
      </div>
    </div>
  );
}