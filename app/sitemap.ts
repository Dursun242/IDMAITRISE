// app/sitemap.ts — sitemap généré automatiquement depuis le modèle de contenu.
// À soumettre dans la Search Console le jour de la bascule.
import type { MetadataRoute } from "next";
import { PRESTATIONS, GUIDES, GENEREES, ZONES, REALISATIONS, SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const d = new Date();
  const u = (p: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") =>
    ({ url: `${SITE.url}${p}`, lastModified: d, changeFrequency, priority });

  return [
    u("/", 1.0, "weekly"),
    u("/particuliers", 0.9, "monthly"),
    u("/professionnels", 0.9, "monthly"),
    u("/prestations", 0.8, "monthly"),
    u("/guides", 0.7, "weekly"),
    u("/realisations", 0.7, "monthly"),
    u("/contact", 0.8, "yearly"),
    ...PRESTATIONS.map((p) => u(`/prestations/${p.slug}`, 0.9, "monthly")),
    ...GUIDES.map((p) => u(`/guides/${p.slug}`, 0.7, "monthly")),
    // Pages issues de l'analyse SEO, uniquement celles validées
    ...GENEREES.map((p) => u(`/guides/${p.slug}`, 0.6, "monthly")),
    ...ZONES.map((z) => u(`/zones/${z.slug}`, 0.8, "monthly")),
    ...REALISATIONS.map((r) => u(`/realisations/${r.slug}`, 0.6, "yearly")),
    u("/mentions-legales", 0.1, "yearly"),
    u("/politique-confidentialite", 0.1, "yearly"),
  ];
}
