import type { MetadataRoute } from "next"
import { getSlugs } from "@/lib/content"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = getSlugs("services").map((s) => ({
    url: `${base}/${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = getSlugs("blog").map((s) => ({
    url: `${base}/blog/${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...postRoutes]
}
