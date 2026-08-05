"use client";

import Link from "next/link";

// UI components
import { Button } from "@/components/ui/button";

export default function MoreSection() {
  return (
    <section
      id="why-me"
      className="
        bg-primary
        px-4 py-6 sm:p-20
      "
    >
      <h2 className="text-white text-center color-white">EN VOIR PLUS</h2>
      <div className="flex justify-center gap-5">
        <Button
          asChild
          variant={"secondary"} 
          size={"xxl"}
        >
          <Link href="/about-me">
            Moi même
          </Link>
        </Button>
        <Button
          variant={"outline"}
          size={"xxl"}
          onClick={() => { document.getElementById("category")?.scrollIntoView({ behavior: "smooth" }); }}
        >
          Mes projets
        </Button>
      </div>
    </section>
  );
}