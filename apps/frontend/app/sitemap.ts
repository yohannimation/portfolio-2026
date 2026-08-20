import type { MetadataRoute } from 'next'

// Services
import { categoryService } from "@/services/category.service";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yohannimation.fr";
  const lastmodTime = new Date(2026, 7, 20, 0, 0);

  const categories = await categoryService.getCategories();
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category.id}-${category.slug}`,
    lastModified: lastmodTime,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: `${baseUrl}`,
      lastModified: lastmodTime,
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...categoryUrls,
    {
      url: `${baseUrl}/about-me`,
      lastModified: lastmodTime,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}