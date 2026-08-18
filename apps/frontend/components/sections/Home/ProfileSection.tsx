"use client";

// UI components
import ElasticButton from "@/components/ui/elasticButton";
import TiltedCard from "@/components/TiltedCard";

// GSAP
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProfileSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.set(contentRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "+=350",
        scrub: 1,
      },
    });

    gsap.set(bgRef.current, {
      width: 0,
      height: 0,
      borderRadius: "999px",
      bottom: 0,
      left: "50%",
      xPercent: -50,
    });


    gsap.to(contentRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%",
        end: "top 0%",
        scrub: true,
      },
    });

    tl.to(bgRef.current, {
      width: "40vw",
      height: "40vw",
      duration: 0.8,
      ease: "power1.in",
    })
    .to(bgRef.current, {
      width: "100%",
      height: "100%",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      duration: 0.7,
      ease: "power1.out",
    })
  }, { scope: sectionRef });

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="bg-primary pt-2 overflow-hidden relative"
    >
      {/* Animated Background Layer */}
      <div
        ref={bgRef}
        className="absolute bg-background z-4"
        style={{ position: 'absolute' }}
      />

      {/* Content Layer */}
      <div
        ref={contentRef}
        className="
          relative
          grid
          grid-cols-2 xl:grid-cols-3
          grid-rows-none
          gap-8
          px-4 py-6 sm:p-20
          sm:p-20
          h-lvh
          rounded-t-sm sm:rounded-t-5xl
          z-5
        "
      >
        <div className="flex flex-col justify-center items-center lg:items-end col-span-full lg:col-span-1 xl:col-span-2 z-5">
          <div>
            <h1>Yohann RENAULD</h1>
            <p className="text-lg">
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
            <ElasticButton anchor="/about-me">Mieux me connaître</ElasticButton>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center lg:col-span-1 xl:col-span-1">
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
