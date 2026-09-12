// lib/seo.ts — génération centralisée des métadonnées et des données structurées.
import type { Metadata } from "next";
import { SITE, type Faq } from "@/content/site";

export function meta({ titre, description, chemin, image }: {
  titre: string; description: string; chemin: string; image?: string;
}): Metadata {
  const url = `${SITE.url}${chemin}`;
  return {
    title: titre,
    description,
    alternates: { canonical: url },   // canonique explicite : indispensable après la refonte
    openGraph: {
      title: titre, description, url, siteName: SITE.nom, locale: "fr_FR", type: "website",
      images: image ? [{ url: `${SITE.url}${image}` }] : undefined,
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  };
}

/* LocalBusiness : c'est ce qui alimente le pack local Google.
   Le NAP (nom, adresse, téléphone) doit être IDENTIQUE ici, sur la fiche
   Google Business Profile et sur tous les annuaires. Toute divergence
   affaiblit le référencement local. */
export function jsonLdEntreprise() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organisation`,
    name: SITE.nom,
    legalName: SITE.raisonSociale,
    description: "Cabinet de maîtrise d'œuvre TCE indépendant au Havre : permis de construire, conception, consultation des entreprises, OPC et direction de travaux.",
    url: SITE.url,
    telephone: SITE.telE164,
    email: SITE.email,
    address: {
      "@type": "PostalAddress", streetAddress: SITE.adresse, postalCode: SITE.cp,
      addressLocality: SITE.ville, addressRegion: "Normandie", addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 49.4938, longitude: 0.1077 },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      opens: "09:00", closes: "18:00",
    }],
    areaServed: [
      { "@type": "City", name: "Le Havre" }, { "@type": "City", name: "Fécamp" },
      { "@type": "City", name: "Rouen" }, { "@type": "City", name: "Caen" },
      { "@type": "AdministrativeArea", name: "Seine-Maritime" },
    ],
    sameAs: SITE.social,
    identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: SITE.siret },
  };
}

export function jsonLdFaq(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };
}

export function jsonLdFilAriane(items: { href: string; label: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.label, item: `${SITE.url}${it.href}`,
    })),
  };
}

export function jsonLdService(p: { h1: string; meta: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.h1,
    description: p.meta,
    provider: { "@id": `${SITE.url}/#organisation` },
    areaServed: { "@type": "AdministrativeArea", name: "Seine-Maritime, Eure, Calvados" },
    url: `${SITE.url}/prestations/${p.slug}`,
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
