export const site = {
  name: "ID Maîtrise",
  legalName: "ID MAITRISE",
  tagline: "Maître d'œuvre indépendant au Havre",
  description:
    "Cabinet indépendant de maîtrise d'œuvre au Havre. Conception, permis de construire, coordination et suivi de vos projets de construction et de rénovation en Seine-Maritime et en Normandie.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.id-maitrise.com",
  phone: "+33244101382",
  phoneDisplay: "02 44 10 13 82",
  email: "contact@id-maitrise.com",
  address: {
    street: "9 Rue Henry Genestal",
    postalCode: "76600",
    city: "Le Havre",
    region: "Seine-Maritime",
    country: "FR",
  },
  mapUrl: "https://maps.app.goo.gl/SEy3ZoFnfdFiGmS26",
  areaServed: ["Le Havre", "Seine-Maritime", "Rouen", "Caen", "Normandie"],
  hoursDisplay: "Lun–Ven · 9h–18h",
  social: {
    facebook: "https://www.facebook.com/113601834946402",
    instagram: "https://www.instagram.com/idmaitrise/",
    linkedin: "https://www.linkedin.com/company/id-conseil-lehavre",
  },
}

export type ServiceLink = { slug: string; title: string; short: string }

// L'ordre ici pilote la navigation, le footer et les cartes d'accueil.
// Le contenu de chaque page vit dans content/services/<slug>.md
export const services: ServiceLink[] = [
  {
    slug: "construction-maison-individuelle",
    title: "Construction de maison individuelle",
    short: "Votre maison contemporaine et sur-mesure, de la conception à la réception.",
  },
  {
    slug: "permis-de-construire",
    title: "Permis & déclarations préalables",
    short: "Montage et dépôt de vos dossiers d'urbanisme au Havre.",
  },
  {
    slug: "maitre-oeuvre-habitat",
    title: "Maître d'œuvre — Habitat",
    short: "Construction, extension, surélévation et rénovation de maison.",
  },
  {
    slug: "maitre-oeuvre-professionnels",
    title: "Maître d'œuvre — Professionnels",
    short: "OPC, AMO et MOE EXE pour bâtiments pro et collectivités.",
  },
  {
    slug: "ouverture-mur-porteur",
    title: "Ouverture de mur porteur",
    short: "Étude de structure, IPN/HEA et plans d'exécution.",
  },
  {
    slug: "etudes-de-sol",
    title: "Études de sol G1 / G2",
    short: "Missions géotechniques au Havre et en Normandie.",
  },
  {
    slug: "etude-thermique-re2020",
    title: "Étude thermique RE2020",
    short: "Conformité réglementaire pour le neuf et la rénovation.",
  },
]
