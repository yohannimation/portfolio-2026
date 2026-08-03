"use client";

import Link from "next/link";

// Translation
import { useTranslations } from 'next-intl';

// UI components
import { Button } from "@/components/ui/button";

export default function MoreSection() {
  const t = useTranslations('HomePage.MoreSection');

  return (
    <section
      id="why-me"
      className="
        bg-primary
        px-4 py-6 sm:p-20
      "
    >
      <h2 className="text-white text-center color-white">{t("title")}</h2>
      <div className="flex justify-center gap-5">
        <Button
          asChild
          variant={"secondary"} 
          size={"xxl"}
        >
          <Link href="/about-me">
            {t("cta1")}
          </Link>
        </Button>
        <Button
          variant={"outline"}
          size={"xxl"}
          onClick={() => { document.getElementById("category")?.scrollIntoView(); }}
        >
          {t("cta2")}
        </Button>
      </div>
    </section>
  );
}