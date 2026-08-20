import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://yohannimation.fr";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/legal-notices', '/2026-CV_Yohann-RENAULD.pdf'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}