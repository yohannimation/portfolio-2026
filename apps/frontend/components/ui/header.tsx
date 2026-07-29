"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

// UI components
import Anchor from "@/components/ui/anchor"
import { Button } from "@/components/ui/button"
import GradualBlur from "@/components/GradualBlur"

// Framer motion
import { motion } from "motion/react"

// Libs
import { getPageKey } from "@/lib/utils"

// Icons
import { ArrowUp, Dot } from "lucide-react"

// Types
import { PagesInterface } from "@/types/page.interface"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const pageKey = getPageKey(usePathname());
  const pages: PagesInterface[] = [
    {
      "name": <>Accueil</>,
      "url": "/",
      "pageKey": "home"
    },
    {
      "name": <>Développement&nbsp;web</>,
      "url": "/category/1-web",
      "pageKey": "web"
    },
    {
      "name": <>Audiovisuel</>,
      "url": "/category/2-audiovisual",
      "pageKey": "audiovisual"
    },
    {
      "name": <>About&nbsp;me</>,
      "url": "/about-me",
      "pageKey": "about-me"
    },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    const handleResize = () => setIsMobile(window.innerWidth < 768)

    handleResize()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Header width
  const width = isScrolled
    ? (isMobile ? "90vw" : "fit-content")
    : (isMobile ? "95vw" : "80vw")

  // Top button position
  const right = isScrolled
    ? "right-0 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.75)]"
    : "right-20 shadow-[0_0_0_0_rgba(0,0,0,0)]"
  ;

  return (
    <div className="fixed top-0 w-full z-2">
      <header className="pt-5">
        <motion.nav
          animate={{ width }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 1
          }}
          className="mx-auto px-6 relative h-full bg-white rounded-md border border-primary shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)] z-6"
        >
          <ul className="flex justify-end items-center gap-4 h-full pt-1.5 bg-white">
            {
              pages.map(page => {
                if (pageKey === "home" && page.pageKey === "home") {
                  return null;
                }
              
                return (
                  <li key={page.pageKey}>
                    <Anchor
                      href={page.url}
                      className={`
                        after:rounded-[8px]
                        ${page.pageKey === pageKey ? "after:bg-secondary after:inset-[-.125rem_0_0_0]" : ""}
                      `}
                    >
                      <span className={`overflow-hidden duration-200 ${page.pageKey === pageKey ? "w-[18px]" : "w-0"}`}>
                        <Dot />
                      </span>
                      {page.name}
                      <span />
                    </Anchor>
                  </li>
                );
              })
            }
          </ul>

          <div className={`absolute top-0 ${right} translate-x-[calc(100%_+_1rem)] rounded-full -z-1 duration-200`}>
            <Button variant={"outline"} className="size-[39px]" onClick={scrollToTop}>
              <ArrowUp className="size-5" />
            </Button>
          </div>
        </motion.nav>
      </header>

      {
        pageKey !== "home" && (
          <GradualBlur
            target="parent"
            position="top"
            height="5rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential
            opacity={1}
          />
        )
      }
    </div>
  )
}
