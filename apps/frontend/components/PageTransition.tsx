"use client"

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// GSAP
import gsap from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const isTransitioning = useRef<boolean>(false);

  useEffect(() => {
    // Cover page function
    const coverPage = (url: string) => {
      const t1 = gsap.timeline({
        onComplete: () => router.push(url)
      })

      gsap.set(overlayRef.current, { opacity: 0 })
      t1.to(overlayRef.current, {
        opacity: 1,
        duration: .5
      })
    }

    // Reveal page function
    const revealPage = () => {
      isTransitioning.current = false;

      gsap.set(overlayRef.current, { opacity: 1 })
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5
      })
    }

    // Handle route change function
    const handleRouteChange = (url: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    }
    
    // Handle link click function
    const handleLinkClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (!target) return;
      const url = new URL(target.href).pathname;

      if (url !== pathname) {
        e.preventDefault();
        handleRouteChange(url);
      }
    }

    revealPage();

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      })
    }
  }, [router, pathname])

  return (
    <>
      <div
        className="fixed top-0 w-full h-screen bg-background flex justify-center items-center z-20 pointer-events-none"
        ref={overlayRef}
      >
        <div className="relative w-[clamp(150px,13vw,250px)] h-[clamp(160px,13vw,266px)]">
          <div className="absolute bottom-0 left-0 w-[clamp(140px,11.5vw,220px)] aspect-square">
            <Image
              src={"/images/mascot/loading-mascot.svg"}
              fill={true}
              alt="Loading mascot"
              className=""
            />
          </div>
          <div className="absolute top-0 right-0 w-[clamp(40px,3vw,60px)] aspect-square">
            <Image
              src={"/images/mascot/loading.svg"}
              fill={true}
              alt="Rotating circle"
              className="animate-spin"
            />
          </div>
        </div>
      </div>
      { children }
    </>
  );
}
