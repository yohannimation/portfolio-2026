"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";

// UI components
import { Button, buttonVariants } from "@/components/ui/button";

// Animation components
import Magnet from "@/components/Magnet";

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
    <>
      <Button
        className={className}
        variant={variant}
        size={size}
        asChild={asChild}
        {...props}
      />
    </>
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