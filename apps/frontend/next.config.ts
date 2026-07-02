import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'simpleicons.org',
      },
    ],
  },
};

export default nextConfig;
