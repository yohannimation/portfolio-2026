"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";

// UI components
import { Button, buttonVariants } from "@/components/ui/button";

// Animation components
import Magnet from "@/components/Magnet";
import ClickSpark from "@/components/ClickSpark";

import { useIsMobile } from "@/lib/utils";

export default function Cta({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const isMobile = useIsMobile();

  const content = (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
      extraScale={1}
    >
      <Button
        className={className}
        variant={variant}
        size={size}
        asChild={asChild}
        {...props}
      />
    </ClickSpark>
  );

  if (isMobile) {
    return content;
  }

  return (
    <Magnet padding={50} magnetStrength={7}>
      {content}
    </Magnet>
  );
}