"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

// UI components
import Anchor from "@/components/ui/anchor"
import { Button } from "@/components/ui/button"
import GradualBlur from "@/components/GradualBlur"

// Framer motion
import { motion, AnimatePresence } from "motion/react"

// Libs
import { getPageKey } from "@/lib/utils"

// Icons
import { ArrowUp, Dot, Menu, X } from "lucide-react"

// Types
import { PagesInterface } from "@/types/page.interface"

interface HeaderDesktopProps {
  pages: PagesInterface[],
  pageKey: string,
  isScrolled: boolean
}
interface HeaderMobileProps {
  pages: PagesInterface[],
  pageKey: string
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="fixed top-0 w-full z-2">
      <header className="relative pt-5 px-5">
        { !isMobile ? <HeaderDesktop pages={pages} pageKey={pageKey} isScrolled={isScrolled} /> : <HeaderMobile pages={pages} pageKey={pageKey} />}
      </header>
    </div>
  )
}

function HeaderDesktop({ pages, pageKey, isScrolled }: HeaderDesktopProps) {
  const width = isScrolled ? "fit-content" : "80vw";
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const topButtonStyle = isScrolled
    ? "right-0 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.75)]"
    : "right-20 shadow-[0_0_0_0_rgba(0,0,0,0)]"
  ;

  return (
    <>
      <motion.nav
        animate={{ width }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 1
        }}
        className="
          hidden md:block
          mx-auto px-6
          relative
          h-full
          bg-white
          rounded-md
          border border-primary
          shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)]
          z-6
        "
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

        <div className={`absolute top-0 ${topButtonStyle} translate-x-[calc(100%_+_1rem)] rounded-full -z-1 duration-200`}>
          <Button variant={"outline"} className="size-[39px]" onClick={scrollToTop}>
            <ArrowUp className="size-5" />
          </Button>
        </div>
      </motion.nav>

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
    </>
  )
}

function HeaderMobile({ pages, pageKey }: HeaderMobileProps) {
  const [isMobileHeaderOpened, setIsMobileHeaderOpened] = useState(false);

  return (
    <>
      <div className="absolute right-5 w-fit rounded-full shadow-[0_12px_30px_-8px_rgba(0,0,0,0.75)] z-12">
        <motion.div
          animate={{ rotate: isMobileHeaderOpened ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 480, damping: 25 }}
        >
          <Button
            variant={"outline"}
            size={"icon-lg"}
            onClick={() => setIsMobileHeaderOpened(!isMobileHeaderOpened)}
            className="size-10"
          >
            {isMobileHeaderOpened ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMobileHeaderOpened && (
          <>
            {/* Foreground */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-10"
              onClick={() => setIsMobileHeaderOpened(false)}
            />

            <motion.nav
              initial={{ x: '105%' }}
              animate={{ x: '5%' }}
              exit={{ x: '105%' }}
              transition={{ type: "spring", stiffness: 480, damping: 30 }}
              className="
                fixed top-0 right-0
                pt-20 px-6
                h-dvh w-[280px]
                bg-white
                border border-primary
                rounded-s-md
                z-11
              "
            >
              <ul className="flex flex-col gap-6 pt-5">
                {
                  pages.map(page => {
                    if (pageKey === "home" && page.pageKey === "home") {
                      return null;
                    }

                    return (
                      <li key={page.pageKey}>
                        <Anchor
                          href={page.url}
                          onClick={() => setIsMobileHeaderOpened(false)}
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
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}