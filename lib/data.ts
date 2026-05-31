// ─────────────────────────────────────────────────────────────────────────
// Données éditoriales du site (conversion + SEO local).
//
// ⚠️ IMPORTANT — À PERSONNALISER :
// Les témoignages et réalisations ci-dessous sont des EXEMPLES de structure.
// Remplace-les par tes vrais avis Google et tes vrais chantiers (avec photos)
// avant la mise en ligne. Ne laisse jamais de faux avis sur un site public.
// ─────────────────────────────────────────────────────────────────────────

export type Testimonial = {
  quote: string
  author: string
  role: string
  city: string
  rating: number // sur 5
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Un seul interlocuteur du début à la fin, des artisans sérieux et un budget tenu au centime près. Notre maison est exactement celle qu'on avait imaginée.",
    author: "Famille M.",
    role: "Construction neuve",
    city: "Le Havre",
    rating: 5,
  },
  {
    quote:
      "Permis obtenu du premier coup. Le dossier était carré, le suivi de chantier impeccable. On a gagné un temps fou et beaucoup de sérénité.",
    author: "Julien R.",
    role: "Extension de maison",
    city: "Montivilliers",
    rating: 5,
  },
  {
    quote:
      "Ouverture d'un mur porteur que tout le monde nous déconseillait. Étude de structure précise, plans clairs, artisans rassurés. Résultat parfait.",
    author: "Sophie L.",
    role: "Rénovation",
    city: "Sainte-Adresse",
    rating: 5,
  },
  {
    quote:
      "Accompagnement professionnel pour notre bâtiment d'activité. Planning respecté, coordination des corps d'état au cordeau. Je recommande sans réserve.",
    author: "C. Lemaire",
    role: "Bâtiment professionnel",
    city: "Gonfreville-l'Orcher",
    rating: 5,
  },
]

export type Project = {
  slug: string
  title: string
  category: string
  city: string
  year: string
  surface: string
  summary: string
  highlights: string[]
}

// ⚠️ Exemples — remplace par tes vrais chantiers + ajoute des photos dans /public.
export const projects: Project[] = [
  {
    slug: "maison-contemporaine-sainte-adresse",
    title: "Maison contemporaine à Sainte-Adresse",
    category: "Construction neuve",
    city: "Sainte-Adresse",
    year: "2024",
    surface: "165 m²",
    summary:
      "Maison de plain-pied à toiture plate, grandes baies orientées sud, conforme RE2020. Conception, permis et pilotage complet du chantier.",
    highlights: ["Conception sur-mesure", "Permis de construire", "RE2020", "Clé en main"],
  },
  {
    slug: "extension-bois-montivilliers",
    title: "Extension ossature bois à Montivilliers",
    category: "Extension",
    city: "Montivilliers",
    year: "2024",
    surface: "42 m²",
    summary:
      "Extension d'une pièce de vie en ossature bois, raccordée à l'existant avec une grande verrière. Déclaration préalable et coordination des artisans.",
    highlights: ["Ossature bois", "Déclaration préalable", "Verrière sur-mesure"],
  },
  {
    slug: "renovation-lourde-le-havre",
    title: "Rénovation lourde d'une maison de ville au Havre",
    category: "Rénovation",
    city: "Le Havre",
    year: "2023",
    surface: "120 m²",
    summary:
      "Restructuration complète : ouverture de murs porteurs, redistribution des volumes, mise aux normes et rénovation énergétique.",
    highlights: ["Mur porteur", "Étude de structure", "Réno énergétique"],
  },
  {
    slug: "batiment-activite-gonfreville",
    title: "Bâtiment d'activité à Gonfreville-l'Orcher",
    category: "Professionnel",
    city: "Gonfreville-l'Orcher",
    year: "2023",
    surface: "600 m²",
    summary:
      "Construction d'un bâtiment professionnel mixte (bureaux + atelier). Mission OPC et maîtrise d'œuvre d'exécution tous corps d'état.",
    highlights: ["OPC", "MOE EXE", "Tous corps d'état"],
  },
]

export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: "Quelle différence entre un maître d'œuvre et un architecte ?",
    a: "L'architecte est obligatoire pour toute construction neuve de plus de 150 m² de surface de plancher. En dessous de ce seuil, et pour la plupart des extensions et rénovations, un maître d'œuvre peut concevoir votre projet, monter le permis et piloter l'intégralité du chantier. Le maître d'œuvre coordonne les artisans et garantit le respect du budget, des délais et de la qualité.",
  },
  {
    q: "Combien coûte une maîtrise d'œuvre ?",
    a: "Les honoraires d'un maître d'œuvre se situent généralement entre 8 % et 12 % du montant des travaux, selon l'ampleur et la complexité du projet. Ce coût est largement compensé par la mise en concurrence des entreprises, l'absence d'erreurs coûteuses et le respect du planning. Le premier échange et le devis sont gratuits et sans engagement.",
  },
  {
    q: "Intervenez-vous en dehors du Havre ?",
    a: "Oui. Basés au Havre, nous intervenons sur toute la Seine-Maritime (Montivilliers, Sainte-Adresse, Étretat, Fécamp, Rouen…) ainsi que dans le Calvados (Caen, Honfleur, Deauville…). N'hésitez pas à nous contacter pour vérifier que votre commune est couverte.",
  },
  {
    q: "Faut-il un permis de construire ou une déclaration préalable ?",
    a: "Cela dépend de la surface créée et de la nature des travaux. En règle générale, une déclaration préalable suffit pour les extensions modérées, abris et modifications de façade ; un permis de construire s'impose pour les constructions neuves et les projets de plus grande ampleur. Nous analysons votre parcelle et le PLUi pour vous orienter dès le premier rendez-vous.",
  },
  {
    q: "Combien de temps dure un projet de construction ?",
    a: "Comptez environ 2 à 3 mois pour la conception et le dépôt du permis, 2 à 3 mois d'instruction par la mairie, puis 8 à 12 mois de chantier pour une maison individuelle. Nous établissons un planning détaillé dès le démarrage et vous tenons informé à chaque étape.",
  },
  {
    q: "Travaillez-vous avec vos propres artisans ?",
    a: "Nous nous appuyons sur un réseau d'artisans normands sélectionnés sur la qualité de leur travail et le respect de leurs engagements. Pour chaque lot, nous mettons les entreprises en concurrence et vous présentons des devis comparés. Vous gardez la décision finale ; nous coordonnons l'ensemble.",
  },
]

export type Zone = {
  slug: string
  city: string
  dept: string
  intro: string
  localite: string // phrase d'ancrage local
  neighborhoods: string[]
}

export const zones: Zone[] = [
  {
    slug: "le-havre",
    city: "Le Havre",
    dept: "Seine-Maritime (76)",
    intro:
      "Cabinet de maîtrise d'œuvre installé au cœur du Havre, nous connaissons parfaitement le PLUi, les contraintes du centre reconstruit classé UNESCO et les règles des Architectes des Bâtiments de France.",
    localite:
      "De la Ville Haute aux quartiers de Sanvic, Graville ou Bléville, nous accompagnons vos projets de construction, d'extension et de rénovation.",
    neighborhoods: ["Centre UNESCO", "Sanvic", "Graville", "Bléville", "Dollemard", "Aplemont"],
  },
  {
    slug: "rouen",
    city: "Rouen",
    dept: "Seine-Maritime (76)",
    intro:
      "Nous intervenons sur la métropole de Rouen pour vos projets de construction neuve, d'extension et de rénovation, avec une parfaite maîtrise des règles d'urbanisme locales.",
    localite:
      "Maison de ville, secteur sauvegardé, périphérie résidentielle : nous adaptons chaque projet à son contexte rouennais.",
    neighborhoods: ["Centre historique", "Mont-Saint-Aignan", "Bois-Guillaume", "Bihorel", "Sotteville-lès-Rouen"],
  },
  {
    slug: "caen",
    city: "Caen",
    dept: "Calvados (14)",
    intro:
      "Sur Caen et son agglomération, nous pilotons vos projets de la conception à la réception, en tout corps d'état, pour les particuliers comme pour les professionnels.",
    localite:
      "De la presqu'île aux communes périphériques, nous concevons des bâtiments performants et conformes à la réglementation en vigueur.",
    neighborhoods: ["Centre", "Hérouville-Saint-Clair", "Mondeville", "Ifs", "Ouistreham"],
  },
  {
    slug: "montivilliers",
    city: "Montivilliers",
    dept: "Seine-Maritime (76)",
    intro:
      "À Montivilliers et dans la vallée de la Lézarde, nous accompagnons particuliers et professionnels sur tous leurs projets de bâtiment.",
    localite:
      "Extension, surélévation, construction neuve : nous tenons compte du tissu pavillonnaire et des règles locales d'urbanisme.",
    neighborhoods: ["Centre ancien", "Saint-Sauveur", "Fréville", "Épouville", "Manéglise"],
  },
  {
    slug: "etretat",
    city: "Étretat",
    dept: "Seine-Maritime (76)",
    intro:
      "Sur la Côte d'Albâtre, à Étretat et ses environs, nous concevons et pilotons des projets respectueux d'un cadre paysager d'exception et des contraintes ABF.",
    localite:
      "Résidence secondaire, rénovation de caractère ou construction contemporaine, nous sécurisons votre dossier d'urbanisme.",
    neighborhoods: ["Étretat", "Le Tilleul", "Bénouville", "Les Loges", "Bordeaux-Saint-Clair"],
  },
  {
    slug: "honfleur",
    city: "Honfleur",
    dept: "Calvados (14)",
    intro:
      "À Honfleur et sur la Côte Fleurie, nous intervenons sur des projets exigeants, souvent en secteur protégé, avec un soin particulier porté au patrimoine.",
    localite:
      "Maison de caractère, extension contemporaine ou réhabilitation, nous conjuguons performance et respect de l'architecture locale.",
    neighborhoods: ["Vieux Bassin", "Côte de Grâce", "Équemauville", "Pennedepie", "Vasouy"],
  },
]
