import type { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin';

type RemotePattern = NonNullable<NextConfig["images"]>["remotePatterns"] extends
  (infer P)[] | undefined ? P : never;

const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

const remotePatterns: RemotePattern[] = [
  {
    protocol: "https",
    hostname: "simpleicons.org",
  },
];

if (imageBaseUrl) {
  try {
    const url = new URL(imageBaseUrl);
    if (url.protocol === "http:" || url.protocol === "https:") {
      remotePatterns.push({
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
      });
    } else {
      console.warn(`Protocole non supporté pour NEXT_PUBLIC_IMAGE_BASE_URL: ${url.protocol}`);
    }
  } catch (e) {
    console.warn(`NEXT_PUBLIC_IMAGE_BASE_URL invalide: "${imageBaseUrl}"`, e);
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);