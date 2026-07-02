"use client";

import DotField from "@/components/DotField";

export default function HeroBackground() {
  return (
    <>
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={15}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom="black"
        gradientTo="#48c634"
        glowColor="transparent"
        className="
          absolute
          inset-0
          

        "
      />
    </>
  );
}
