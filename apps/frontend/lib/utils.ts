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

export function getPageKey(pathname: string) {
  // Map the root path to the home page key.
  if (pathname === "/") return "home";

  // Handle category pages.
  if (pathname.startsWith("/category/")) {
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];

    // If the last segment contains a dash, return everything after the first one.
    // Example: "1-web" -> "web"
    const firstDashIndex = lastSegment.indexOf("-");
    if (firstDashIndex !== -1) {
      return lastSegment.substring(firstDashIndex + 1);
    }

    // Otherwise, return the last segment as-is.
    return lastSegment;
  }

  // For all other routes, remove the leading slash if present.
  return pathname.startsWith("/") ? pathname.substring(1) : pathname;
};