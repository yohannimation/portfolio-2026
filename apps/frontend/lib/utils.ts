import { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import * as simpleIcons from "simple-icons"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}

export function getBrandColor(iconName: string|null) {
  if (!iconName) return "var(--foreground)"

  const key = `si${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`
  const icon = (simpleIcons as any)[key]

  return icon?.hex ? `#${icon.hex}` : "var(--foreground)"
}