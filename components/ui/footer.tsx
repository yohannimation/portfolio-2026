"use client";

import { useLayoutEffect, useRef } from "react";
import Anchor from "@/components/ui/anchor";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (footerRef.current) {
      const height = footerRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--footer-height",
        `${height}px`
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        flex
        justify-between
        md:items-end
        flex-col md:flex-row
        gap-15 md:gap-0
        fixed
        bottom-0 left-0 right-0
        bg-black
        text-white
        px-4 py-5
        sm:px-20 sm:py-8
      "
    >
      <div className="flex flex-col md:flex-row gap-5 md:gap-10">
        <div>
          <p className="mb-1 underline">Informations diverses :</p>
          <ul className="flex flex-col gap-1 ml-5">
            <li>
              <Anchor href="" target="_blank" title="Copier l'email">renauldyohann@gmail.com</Anchor>
            </li>
            <li>
              <Anchor href="" title="Télécharger mon CV">Mon CV</Anchor>
            </li>
            <li>
              <Anchor href="">Mentions légales</Anchor>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-1 underline">Mes réseaux sociaux :</p>
          <ul className="flex flex-col gap-1 ml-5">
            <li>
              <Anchor href="" target="_blank" title="Visiter mon GitHub">GitHub</Anchor>
            </li>
            <li>
              <Anchor href="" target="_blank" title="Visiter mon LinkedIn">LinkedIn</Anchor>
            </li>
            <li>
              <Anchor href="" target="_blank" title="Visiter mon Instagram">Instagram</Anchor>
            </li>
          </ul>
        </div>
      </div>
      <div>
        Mascotte qui regarde à gauche
      </div>
    </footer>
  );
}
