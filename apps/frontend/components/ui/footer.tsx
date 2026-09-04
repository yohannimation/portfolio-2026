"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

// UI components
import Anchor from "@/components/ui/anchor";
import MyEmail from "@/components/ui/myEmail";

// Icons
import { SquareArrowOutUpRight } from "lucide-react";

import footerData from "@/data/footer.json";

type FooterItem = {
  type: "link" | "email";
  label?: string;
  email?: string;
  href?: string;
  target?: "_blank";
  title?: string;
};

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
    <>
      <div className="h-[var(--footer-height)] w-full" />
      <footer
        ref={footerRef}
        className="
          flex
          justify-between
          md:items-end
          flex-col md:flex-row
          gap-15 md:gap-0
          fixed
          bottom-0
          bg-black
          text-white
          px-4 py-5
          sm:px-20 sm:py-8
          w-full
          max-w-[1920px]
        "
      >
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          {footerData.sections.map((section) => (
            <div key={section.title}>
              <p className="mb-1 underline">{section.title}</p>
              <ul className="flex flex-col gap-1 ml-5">
                {(section.items as FooterItem[]).map((item) =>
                  item.type === "email" ? (
                    <li key={item.email}>
                      <MyEmail email={item.email!} />
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Anchor href={item.href ?? ""} target={item.target} title={item.title}>
                        {item.label} {item.target === "_blank" && <SquareArrowOutUpRight size={18} />}
                      </Anchor>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <Image
          src={"/images/mascot/looked-up-mascot.svg"}
          width={200}
          height={112}
          alt="Looked up mascot"
          className="-mb-5 mx-auto sm:mx-[unset] sm:-mb-8"
        />
      </footer>
    </>
  );
}
