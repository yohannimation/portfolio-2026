"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// UI components
import ElasticButton from "@/components/ui/elasticButton";
import TiltedCard from "@/components/TiltedCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProfileSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
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
    gsap.set(titleRef.current, { opacity: 0, y: 500, x: 0 });
    gsap.set([cardRef.current, textRef.current, buttonRef.current], { opacity: 0 });

    tl.to(bgRef.current, {
      width: "40vw",
      height: "40vw",
      duration: 0.8,
      ease: "power1.in",
    })
    .to(bgRef.current, {
      width: "100%",
      height: "100%",
      borderRadius: "2rem 2rem 0 0",
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
        className="absolute bg-background z-0"
        style={{ position: 'absolute' }}
      />

      {/* Content Layer */}
      <div
        className="
          relative
          z-10
          grid
          grid-cols-2 xl:grid-cols-3
          grid-rows-none
          gap-8
          px-4 py-6
          sm:p-20
          rounded-t-sm sm:rounded-t-4xl
        "
      >
        <div className="col-span-full lg:col-span-1 xl:col-span-2 flex flex-col justify-between items-center lg:items-end">
          <div ref={titleRef}>
            <h1 className="text-4xl font-bold mb-4">Yohann RENAULD</h1>
            <div ref={textRef}>
              <p className="text-lg leading-relaxed">
                Développeur web passionné par les interfaces modernes et la
                création visuelle, je construis mon expérience depuis plusieurs
                années à travers l'alternance et des projets personnels. Dans la
                continuité de mon parcours professionnel et suite à ma formation
                dans l'Ingénierie du Web, je suis en{" "}
                <span className="underline decoration-primary">recherche</span> d'un{" "}
                <span className="underline decoration-primary">contrat à durée indéterminé</span>{" "}
                afin d'accroitre mes connaissances et mon expérience.
              </p>
            </div>
          </div>

          <div className="mt-4 w-fit" ref={buttonRef}>
            <ElasticButton anchor="/about-me">Mieux me connaître</ElasticButton>
          </div>
        </div>
        <div
          ref={cardRef}
          className="col-span-full lg:col-span-1 xl:col-span-1 flex justify-center items-center"
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
    </section>
  );
}
