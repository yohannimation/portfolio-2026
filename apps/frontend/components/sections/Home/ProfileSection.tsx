"use client";

// UI components
import ElasticButton from "@/components/ui/elasticButton";
import TiltedCard from "@/components/TiltedCard";

export default function ProfileSection() {
  return (
    <section id="profile" className="bg-primary pt-2 overflow-hidden">
      <div
        className="
          relative
          grid
          grid-cols-2 xl:grid-cols-3
          grid-rows-none
          gap-8
          px-4 py-6
          sm:p-20
          rounded-t-sm sm:rounded-t-4xl
          bg-background
        "
      >
        <div className="col-span-full lg:col-span-1 xl:col-span-2 flex flex-col justify-between items-center lg:items-end">
          <div>
            <h1>Yohann RENAULD</h1>
            <p>
              Développeur web passionné par les interfaces modernes et la
              création visuelle, je construis mon expérience depuis plusieurs
              années à travers l'alternance et des projets personnels. Dans la
              continuité de mon parcours professionnel et suite à ma formation
              dans l'Ingénierie du Web, je suis en{" "}
              <span className="underline">recherche</span> d'un{" "}
              <span className="underline">contrat à durée indéterminé</span>{" "}
              afin d'accroitre mes connaissances et mon expérience.
            </p>
          </div>

          <div className="mt-4 w-fit">
            <ElasticButton anchor="/about-me">Mieu me connaître</ElasticButton>
          </div>
        </div>
        <div className="col-span-full lg:col-span-1 xl:col-span-1 flex justify-center items-center">
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
    </section>
  );
}
