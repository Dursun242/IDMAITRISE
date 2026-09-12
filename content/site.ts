// content/site.ts — modèle de contenu unique. Une entrée = une page = une intention de recherche.
// Règle absolue anti-cannibalisation : un mot-clé principal ne doit apparaître
// que dans UNE seule entrée. Avant d'ajouter une page, vérifier `motCle`.

export const SITE = {
  nom: "ID Maîtrise",
  raisonSociale: "SARL ID MAÎTRISE",
  siret: "921 536 181 00024",
  tel: "02 44 10 13 82",
  telE164: "+33244101382",
  email: "contact@id-maitrise.com",
  adresse: "9 rue Henry Genestal",
  cp: "76600",
  ville: "Le Havre",
  horaires: "Lundi au vendredi, 9 h – 18 h",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.id-maitrise.com",
  maps: "https://maps.app.goo.gl/SEy3ZoFnfdFiGmS26",
  social: [
    "https://www.instagram.com/idmaitrise/",
    "https://www.linkedin.com/company/id-conseil-lehavre",
    "https://www.facebook.com/113601834946402",
  ],
};

export type Bloc = { titre: string; texte: string; liste?: string[] };
export type Faq = { q: string; r: string };

export type Page = {
  slug: string;
  titre: string;          // <title> — 55/60 car. max, mot-clé en tête
  h1: string;             // différent du title : évite la sur-optimisation
  meta: string;           // 150/160 car., doit contenir un bénéfice + une action
  motCle: string;         // mot-clé principal — UNIQUE dans tout le site
  chapo: string;
  cible: "particulier" | "professionnel" | "les-deux";
  blocs: Bloc[];
  faq?: Faq[];
  lies?: string[];        // maillage interne : slugs des pages connexes
  ctaTexte?: string;      // CTA contextualisé (meilleure conversion qu'un CTA générique)
};

/* ─────────────────────────── PRESTATIONS ─────────────────────────── */
/* Priorisées d'après la Search Console : les 6 premières concentrent
   les impressions non converties. Contenu rédigé. Les suivantes ont
   une trame à compléter (marquées TODO dans les blocs).                */

export const PRESTATIONS: Page[] = [
  {
    slug: "permis-de-construire-le-havre",
    titre: "Permis de construire au Havre — dépôt et suivi | ID Maîtrise",
    h1: "Déposer un permis de construire au Havre sans se tromper",
    meta: "Montage complet de votre permis de construire au Havre : plans, notice, dépôt et suivi d'instruction. Maître d'œuvre indépendant. Premier avis gratuit.",
    motCle: "permis de construire Le Havre",
    cible: "les-deux",
    ctaTexte: "Faire vérifier mon projet",
    chapo:
      "Un permis refusé, c'est trois à six mois perdus. La plupart des refus au Havre tiennent à des règles de PLUi mal lues au moment de la conception, pas à des erreurs de formulaire.",
    blocs: [
      {
        titre: "Ce que comprend le dossier",
        texte:
          "Nous montons l'intégralité des pièces exigées par le service instructeur et nous suivons le dossier jusqu'à l'arrêté.",
        liste: [
          "Vérification préalable du règlement de votre zone PLUi",
          "Plan de situation, plan de masse, plans de façades et coupes",
          "Notice descriptive et insertion paysagère",
          "Formulaire Cerfa complet et attestation thermique RE2020 si construction neuve",
          "Dépôt en mairie ou sur le guichet numérique, et réponse aux demandes de pièces complémentaires",
        ],
      },
      {
        titre: "Les délais réels au Havre",
        texte:
          "Le délai légal est de deux mois pour une maison individuelle et de trois mois pour les autres constructions. Il est majoré d'un mois en périmètre de monument historique, cas fréquent au Havre en raison du centre reconstruit classé à l'UNESCO. Comptez en plus quatre à six semaines de montage du dossier. Un projet déposé en janvier démarre rarement avant mai.",
      },
      {
        titre: "Quand le permis n'est pas nécessaire",
        texte:
          "En dessous de 20 m² d'emprise au sol, une déclaration préalable suffit. Le seuil monte à 40 m² en zone urbaine du PLUi, à condition que la surface totale après travaux reste sous 150 m². Nous vous le disons dès le premier échange, ce qui vous évite parfois une procédure entière.",
      },
    ],
    faq: [
      {
        q: "Faut-il un architecte pour déposer un permis de construire ?",
        r: "Le recours à un architecte est obligatoire au-delà de 150 m² de surface de plancher pour une maison individuelle. En dessous, un maître d'œuvre peut monter et déposer le dossier. Pour les personnes morales (SCI, société), le seuil ne s'applique pas de la même façon : le recours est obligatoire quelle que soit la surface, sauf exploitation agricole.",
      },
      {
        q: "Combien coûte le montage d'un permis de construire ?",
        r: "Nous facturons cette mission au forfait, indépendamment du montant des travaux. Le tarif dépend de la complexité du dossier : une extension simple et une construction neuve en secteur protégé ne demandent pas le même travail. Le devis est établi après le premier échange, sans engagement.",
      },
      {
        q: "Que faire en cas de refus ?",
        r: "Un refus doit être motivé. Dans la plupart des cas, un recours gracieux auprès du maire dans les deux mois, accompagné d'un dossier corrigé, suffit à débloquer la situation. Nous analysons l'arrêté et reprenons le projet sur les points contestés.",
      },
    ],
    lies: ["declaration-prealable", "etude-thermique-re2020", "construction-maison-le-havre"],
  },

  {
    slug: "declaration-prealable",
    titre: "Déclaration préalable de travaux au Havre (76) | ID Maîtrise",
    h1: "Déclaration préalable : la procédure courte, bien montée",
    meta: "Extension, abri, clôture, ravalement, piscine : montage de votre déclaration préalable au Havre et en Seine-Maritime. Instruction en un mois. Devis rapide.",
    motCle: "déclaration préalable Le Havre",
    cible: "particulier",
    ctaTexte: "Savoir si ma DP suffit",
    chapo:
      "La déclaration préalable est instruite en un mois au lieu de deux. Encore faut-il que votre projet y ait droit, et que le dossier ne déclenche pas de demande de pièces qui annule ce gain.",
    blocs: [
      {
        titre: "Les travaux concernés",
        texte: "La déclaration préalable couvre les projets de faible ampleur qui modifient l'aspect extérieur ou créent une surface limitée.",
        liste: [
          "Extension entre 5 et 20 m² (40 m² en zone urbaine du PLUi)",
          "Abri de jardin, carport, véranda de petite surface",
          "Piscine dont le bassin fait entre 10 et 100 m²",
          "Modification de façade : ouverture, fenêtre de toit, ravalement en secteur protégé",
          "Clôture, mur, portail lorsque le PLUi l'impose",
          "Changement de destination sans travaux sur la structure",
        ],
      },
      {
        titre: "Le piège du seuil des 150 m²",
        texte:
          "Une extension de 30 m² en zone urbaine relève de la déclaration préalable, sauf si la surface totale de la maison dépasse 150 m² après travaux. Dans ce cas, le permis de construire redevient obligatoire et l'architecte avec lui. Nous calculons la surface de plancher réelle avant de choisir la procédure, ce qui évite de déposer le mauvais dossier et de repartir de zéro.",
      },
    ],
    faq: [
      {
        q: "Quel est le délai d'instruction d'une déclaration préalable ?",
        r: "Un mois à compter du dépôt, porté à deux mois si le projet se situe dans le périmètre d'un monument historique ou dans un secteur soumis à l'avis de l'architecte des Bâtiments de France. L'absence de réponse dans ce délai vaut accord tacite, mais nous recommandons de demander le certificat de non-opposition.",
      },
      {
        q: "Une piscine nécessite-t-elle une déclaration préalable ?",
        r: "Oui pour un bassin compris entre 10 et 100 m² sans abri, ou avec un abri de moins de 1,80 m de hauteur. En dessous de 10 m², aucune formalité sauf en secteur protégé. Au-delà de 100 m², c'est un permis de construire.",
      },
    ],
    lies: ["permis-de-construire-le-havre", "extension-maison", "declaration-prealable-piscine"],
  },

  {
    slug: "etude-de-sol-geotechnique",
    titre: "Étude de sol G1 G2 au Havre et en Seine-Maritime | ID Maîtrise",
    h1: "Étude géotechnique : savoir sur quoi vous construisez",
    meta: "Études de sol G1 PGC et G2 AVP/PRO au Havre, Fécamp, Honfleur. Obligatoire en zone argileuse avant vente de terrain et construction. Organisation et suivi.",
    motCle: "étude de sol Le Havre",
    cible: "les-deux",
    ctaTexte: "Organiser mon étude de sol",
    chapo:
      "La loi ELAN rend l'étude géotechnique obligatoire en zone d'exposition au retrait-gonflement des argiles. Une grande partie du Pays de Caux est concernée, et une fondation mal dimensionnée coûte bien plus cher que l'étude.",
    blocs: [
      {
        titre: "G1, G2 : lequel vous concerne",
        texte: "Les missions géotechniques sont normalisées par la NF P 94-500. Deux vous concernent directement.",
        liste: [
          "G1 PGC — étude préalable, à la charge du vendeur du terrain. Identifie les risques, ne dimensionne rien.",
          "G2 AVP — avant-projet. Donne les principes de fondation et les hypothèses de calcul.",
          "G2 PRO — projet. Dimensionne les fondations et conditionne la garantie décennale du constructeur.",
        ],
      },
      {
        titre: "Notre rôle",
        texte:
          "Nous ne réalisons pas les sondages : c'est le métier d'un bureau géotechnique agréé. Nous cadrons la mission, consultons plusieurs laboratoires, vérifions que le rapport répond réellement à votre projet, puis nous intégrons ses conclusions aux plans d'exécution. Un rapport G2 qui reste dans un tiroir ne protège personne.",
      },
    ],
    faq: [
      {
        q: "L'étude de sol est-elle obligatoire au Havre ?",
        r: "Elle est obligatoire pour la vente d'un terrain constructible et pour la construction d'une maison individuelle situés en zone d'aléa moyen ou fort de retrait-gonflement des argiles. La cartographie est consultable sur Géorisques. Une partie du territoire de la métropole havraise est classée en aléa moyen.",
      },
      {
        q: "Combien coûte une étude G2 ?",
        r: "Le coût dépend du nombre de sondages, de l'accessibilité du terrain et de la profondeur recherchée. Nous mettons systématiquement plusieurs laboratoires en concurrence et vous transmettons les offres comparées.",
      },
    ],
    lies: ["construction-maison-le-havre", "plans-structure-execution"],
  },

  {
    slug: "ouverture-mur-porteur-le-havre",
    titre: "Ouverture de mur porteur au Havre — étude et suivi | ID Maîtrise",
    h1: "Ouvrir un mur porteur sans fragiliser la maison",
    meta: "Note de calcul, plan d'exécution et suivi de l'ouverture de mur porteur au Havre. Poutre IPN dimensionnée, étaiement vérifié, accord de copropriété.",
    motCle: "ouverture mur porteur Le Havre",
    cible: "particulier",
    ctaTexte: "Faire dimensionner mon ouverture",
    chapo:
      "Abattre un mur porteur sans note de calcul, c'est engager votre responsabilité et rendre votre assurance inopérante en cas de désordre. L'étude coûte une fraction du prix des travaux.",
    blocs: [
      {
        titre: "Ce que nous produisons",
        texte: "Un dossier technique complet, exploitable directement par le maçon.",
        liste: [
          "Relevé sur place et identification des descentes de charges",
          "Note de calcul de la poutre (IPN, HEA, HEB) signée",
          "Plan d'exécution coté avec détail des appuis et des scellements",
          "Phasage de l'étaiement — la phase la plus risquée du chantier",
          "Déclaration préalable si l'ouverture touche une façade",
        ],
      },
      {
        titre: "Cas de la copropriété",
        texte:
          "Un mur porteur d'appartement relève souvent des parties communes. L'ouverture exige alors une autorisation de l'assemblée générale, appuyée sur une étude technique. Nous produisons le dossier destiné au syndic, ce qui accélère nettement le vote.",
      },
    ],
    faq: [
      {
        q: "Comment savoir si un mur est porteur ?",
        r: "L'épaisseur est un indice mais pas une preuve. Un mur porteur fait généralement plus de 15 cm, sonne plein, et se retrouve superposé d'un étage à l'autre. Seul un relevé sur place, croisé avec les plans d'origine quand ils existent, permet de trancher avec certitude.",
      },
      {
        q: "Quel délai pour une note de calcul ?",
        r: "Comptez une à deux semaines entre le relevé et la remise du dossier, selon la complexité de la structure et la disponibilité des plans existants.",
      },
    ],
    lies: ["plans-structure-execution", "renovation", "declaration-prealable"],
  },

  {
    slug: "opc-ordonnancement-pilotage-coordination",
    titre: "OPC chantier au Havre et en Normandie | ID Maîtrise",
    h1: "Mission OPC : tenir le planning quand dix entreprises travaillent ensemble",
    meta: "Ordonnancement, pilotage et coordination de chantier au Havre, Rouen, Fécamp. Planning, réunions hebdomadaires, comptes rendus, gestion des interfaces.",
    motCle: "OPC chantier Le Havre",
    cible: "professionnel",
    ctaTexte: "Demander une proposition OPC",
    chapo:
      "Sur une opération à lots séparés, le retard ne vient presque jamais d'une entreprise lente. Il vient des interfaces : un lot qui attend l'autre, une réservation oubliée, une validation qui traîne.",
    blocs: [
      {
        titre: "Les trois volets de la mission",
        texte: "L'OPC est défini par la norme NF P 03-001 et par le décret MOP pour la commande publique.",
        liste: [
          "Ordonnancement — analyse des tâches, définition des enclenchements, planning directeur puis détaillé",
          "Pilotage — mise en application, relances, arbitrage des conflits de zone et de calendrier",
          "Coordination — harmonisation des interventions, gestion des interfaces techniques entre lots",
        ],
      },
      {
        titre: "Ce que vous recevez, chaque semaine",
        texte:
          "Un compte rendu de réunion diffusé sous 48 h, avec les décisions, les actions attribuées nominativement et les échéances. Un planning mis à jour avec le réalisé. Et un point d'alerte sur ce qui menace la date de livraison. Tout est écrit : en cas de litige, c'est la seule chose qui compte.",
      },
      {
        titre: "Références en cours",
        texte:
          "Quai Bérigny à Fécamp — mission OPC et ARL sur une opération de 84 logements pour un bailleur social. Centre socioculturel et mosquée Maryam au Havre — pilotage TCE, coordination de six entreprises en phase cloisons et lots techniques.",
      },
    ],
    faq: [
      {
        q: "Quelle différence entre OPC et maîtrise d'œuvre d'exécution ?",
        r: "La MOE d'exécution porte la responsabilité technique de la conformité des ouvrages : elle vise les plans, contrôle la qualité, valide les situations. L'OPC porte la responsabilité du temps : il organise et fait tenir le calendrier. Les deux missions sont souvent confiées au même prestataire, mais elles sont contractuellement distinctes.",
      },
      {
        q: "À partir de quelle taille d'opération l'OPC est-il utile ?",
        r: "Dès que le chantier compte plus de quatre ou cinq lots simultanés, ou que la date de livraison est contractuellement engagée. En dessous, la coordination reste absorbable par la maîtrise d'œuvre d'exécution.",
      },
    ],
    lies: ["moe-execution", "amo-assistance-maitrise-ouvrage", "dce-consultation-entreprises"],
  },

  {
    slug: "etude-thermique-re2020",
    titre: "Étude thermique RE2020 au Havre (76) | ID Maîtrise",
    h1: "Étude thermique RE2020 : l'attestation qui conditionne votre permis",
    meta: "Étude thermique RE2020 pour construction neuve au Havre et en Normandie. Attestation de dépôt de permis et attestation de fin de chantier avec infiltrométrie.",
    motCle: "étude thermique RE2020 Le Havre",
    cible: "les-deux",
    ctaTexte: "Chiffrer mon étude thermique",
    chapo:
      "Sans attestation RE2020, votre permis de construire est incomplet. Mais une étude faite trop tard oblige souvent à revoir les menuiseries ou le mode de chauffage après coup, à vos frais.",
    blocs: [
      {
        titre: "Les trois indicateurs de la RE2020",
        texte: "La réglementation ne se limite plus à la consommation d'énergie.",
        liste: [
          "Bbio — besoin bioclimatique. Dépend de la compacité, de l'orientation et de l'isolation. Se joue à la conception.",
          "Cep — consommation d'énergie primaire. Oriente fortement vers pompe à chaleur ou réseau de chaleur.",
          "Ic construction — impact carbone des matériaux. Se durcit par paliers jusqu'en 2031.",
          "DH — degrés-heures d'inconfort d'été. Nouveau, et contraignant sur les maisons très vitrées au sud.",
        ],
      },
      {
        titre: "Faire l'étude au bon moment",
        texte:
          "L'étude doit intervenir pendant la conception, pas après. Déplacer une baie, changer une orientation ou ajuster une isolation coûte quelques heures de dessin en phase esquisse, et plusieurs milliers d'euros une fois le permis déposé. Nous simulons sous Pléiades en parallèle des plans.",
      },
    ],
    faq: [
      {
        q: "L'étude thermique est-elle obligatoire pour une extension ?",
        r: "La RE2020 s'applique aux constructions neuves. Pour une extension, c'est la réglementation thermique par élément ou la RE2020 selon la surface créée et le rapport à l'existant. Une extension de plus de 150 m² ou représentant plus de 30 % de la surface existante bascule en RE2020.",
      },
      {
        q: "Qu'est-ce que le test d'infiltrométrie ?",
        r: "C'est la mesure de l'étanchéité à l'air du bâtiment, réalisée en fin de chantier par un opérateur agréé. Le résultat conditionne l'attestation de fin de travaux. Un mauvais résultat impose des reprises coûteuses, d'où l'intérêt d'un point d'étanchéité en cours de chantier plutôt qu'un test découvert à la fin.",
      },
    ],
    lies: ["permis-de-construire-le-havre", "construction-maison-le-havre", "renovation-energetique"],
  },

  // ——— Pages à contenu plus court : trame en place, à enrichir au fil des semaines ———
  {
    slug: "construction-maison-le-havre",
    titre: "Construire sa maison au Havre avec un maître d'œuvre | ID Maîtrise",
    h1: "Faire construire au Havre sans passer par un constructeur",
    meta: "Maître d'œuvre indépendant au Havre : conception, permis, consultation d'artisans et suivi de chantier. Vous signez directement avec chaque entreprise.",
    motCle: "construction maison Le Havre",
    cible: "particulier",
    ctaTexte: "Étudier la faisabilité de mon projet",
    chapo:
      "Avec un contrat de maîtrise d'œuvre, vous voyez le prix de chaque lot et vous signez directement avec chaque artisan. La marge du constructeur, elle, n'est jamais détaillée.",
    blocs: [
      {
        titre: "Ce qui change par rapport à un CCMI",
        texte:
          "Le CCMI vous donne un prix ferme et une garantie de livraison, contre une marge intégrée et invisible, et un choix d'entreprises imposé. La maîtrise d'œuvre vous donne la transparence des prix et le choix des artisans, contre une implication plus forte de votre part et une garantie de livraison qui n'existe pas. Aucune des deux formules n'est meilleure en soi : elles ne s'adressent pas au même profil.",
      },
      {
        titre: "Le déroulé",
        texte:
          "Faisabilité et budget, conception et permis, consultation des entreprises lot par lot, puis suivi de chantier jusqu'à la levée des réserves. Chaque étape est facturée séparément : vous pouvez vous arrêter après le permis si vous le souhaitez.",
      },
    ],
    faq: [
      {
        q: "Quel budget prévoir pour une construction neuve au Havre ?",
        r: "Le coût dépend trop du terrain, de la forme du projet et du niveau de finition pour qu'un prix au mètre carré ait un sens. Ce que nous pouvons faire dès le premier échange, c'est vous dire si votre budget et votre programme sont compatibles, et où se situent les postes qui feront basculer l'enveloppe.",
      },
    ],
    lies: ["permis-de-construire-le-havre", "etude-de-sol-geotechnique", "ccmi-ou-maitre-oeuvre"],
  },
  {
    slug: "extension-maison",
    titre: "Extension de maison au Havre et en Seine-Maritime | ID Maîtrise",
    h1: "Agrandir sa maison : surface, règles et budget",
    meta: "Extension, surélévation, véranda au Havre et en Normandie. Étude de faisabilité PLUi, déclaration ou permis, consultation d'artisans et suivi de travaux.",
    motCle: "extension maison Seine-Maritime",
    cible: "particulier",
    ctaTexte: "Vérifier si mon extension est possible",
    chapo:
      "Avant de dessiner une extension, une seule question compte : que permet le règlement de votre zone ? Emprise au sol, hauteur, recul par rapport aux limites, stationnement.",
    blocs: [
      {
        titre: "Les trois formes d'agrandissement",
        texte: "Chacune a ses contraintes techniques et réglementaires propres.",
        liste: [
          "Extension au sol — la plus simple, limitée par l'emprise au sol autorisée et le recul aux limites séparatives",
          "Surélévation — libère du terrain mais impose de vérifier la structure et les fondations existantes",
          "Aménagement de combles — pas d'emprise supplémentaire, mais création de surface de plancher qui peut déclencher le seuil des 150 m²",
        ],
      },
    ],
    lies: ["declaration-prealable", "permis-de-construire-le-havre", "plans-structure-execution"],
  },
  {
    slug: "moe-execution",
    titre: "Maîtrise d'œuvre d'exécution (MOE EXE) au Havre | ID Maîtrise",
    h1: "Maîtrise d'œuvre d'exécution : faire construire ce qui a été dessiné",
    meta: "MOE d'exécution et direction des travaux au Havre et en Normandie : visas, DET, contrôle qualité, situations de travaux, réception et levée des réserves.",
    motCle: "maîtrise d'œuvre exécution Le Havre",
    cible: "professionnel",
    ctaTexte: "Demander une proposition MOE",
    chapo:
      "Entre le permis et le bâtiment livré, il y a les plans d'exécution, les visas, les arbitrages quotidiens et les situations à vérifier. C'est le cœur de la mission.",
    blocs: [
      {
        titre: "Le périmètre",
        texte: "Mission conforme à la décomposition EXE / DET / AOR.",
        liste: [
          "Examen et visa des plans et notes de calcul des entreprises",
          "Direction de l'exécution : réunions, contrôles, constats, ordres de service",
          "Vérification des situations de travaux et des décomptes",
          "Assistance aux opérations de réception et levée des réserves",
          "Constitution du DOE et du dossier de garanties",
        ],
      },
    ],
    lies: ["opc-ordonnancement-pilotage-coordination", "dce-consultation-entreprises"],
  },
  {
    slug: "amo-assistance-maitrise-ouvrage",
    titre: "Assistance à maîtrise d'ouvrage (AMO) en Normandie | ID Maîtrise",
    h1: "AMO : défendre vos intérêts face aux entreprises",
    meta: "Mission d'assistance à maîtrise d'ouvrage au Havre et en Normandie : cadrage du programme, budget, choix des intervenants, contrôle du déroulement.",
    motCle: "AMO Normandie",
    cible: "professionnel",
    ctaTexte: "Cadrer mon projet avec un AMO",
    chapo:
      "L'AMO travaille pour vous, pas pour le projet. Sa mission est de traduire votre besoin en programme, puis de vérifier que ce qui se construit correspond à ce que vous aviez demandé.",
    blocs: [
      {
        titre: "Les moments où l'AMO change tout",
        texte: "",
        liste: [
          "Au cadrage — définir le programme et l'enveloppe avant d'engager une conception",
          "Au choix des prestataires — rédiger la consultation et analyser les offres sans biais",
          "En cours de travaux — arbitrer les travaux modificatifs et leur impact réel sur le budget",
          "À la réception — vérifier la conformité au programme, pas seulement aux plans",
        ],
      },
    ],
    lies: ["opc-ordonnancement-pilotage-coordination", "dce-consultation-entreprises"],
  },
  {
    slug: "renovation",
    titre: "Rénovation complète de maison au Havre (76) | ID Maîtrise",
    h1: "Rénovation lourde : reprendre une maison de fond en comble",
    meta: "Maître d'œuvre pour rénovation complète au Havre et en Seine-Maritime : diagnostic, chiffrage par lot, coordination des artisans et suivi jusqu'à la réception.",
    motCle: "rénovation maison Le Havre",
    cible: "particulier",
    ctaTexte: "Faire chiffrer ma rénovation",
    chapo:
      "En rénovation, l'inconnu coûte plus cher que le travail lui-même. Le diagnostic initial détermine la fiabilité de tout le budget qui suit.",
    blocs: [
      {
        titre: "L'ordre des opérations",
        texte:
          "Diagnostic structure et humidité, puis arbitrage de ce qui est repris ou remplacé, puis chiffrage lot par lot, puis seulement les choix esthétiques. Beaucoup de projets commencent par la fin et se heurtent au budget six semaines plus tard.",
      },
    ],
    lies: ["ouverture-mur-porteur-le-havre", "renovation-energetique", "remplacement-plancher-humide"],
  },
  {
    slug: "renovation-energetique",
    titre: "Rénovation énergétique au Havre — ITE, VMC, MaPrimeRénov' | ID Maîtrise",
    h1: "Rénovation énergétique : gagner des classes sans se tromper d'ordre",
    meta: "Isolation, ventilation, menuiseries et chauffage au Havre. Maître d'œuvre indépendant, artisans RGE, montage des dossiers d'aides MaPrimeRénov'.",
    motCle: "rénovation énergétique Le Havre",
    cible: "particulier",
    ctaTexte: "Faire étudier ma rénovation énergétique",
    chapo:
      "Isoler sans ventiler crée des désordres d'humidité. Changer le chauffage avant d'isoler surdimensionne l'installation. L'ordre des travaux compte autant que les travaux.",
    blocs: [
      {
        titre: "La séquence qui fonctionne",
        texte: "",
        liste: [
          "Étanchéité à l'air et isolation de l'enveloppe (toiture d'abord, c'est le meilleur rapport)",
          "Ventilation adaptée au nouveau niveau d'étanchéité",
          "Menuiseries",
          "Système de chauffage, dimensionné sur les besoins après travaux",
        ],
      },
    ],
    lies: ["etude-thermique-re2020", "renovation"],
  },
  {
    slug: "plans-structure-execution",
    titre: "Plans de structure et d'exécution au Havre | ID Maîtrise",
    h1: "Plans d'exécution et notes de calcul béton",
    meta: "Plans de structure, plans d'armatures, dimensionnement de trémies et de poutres au Havre et en Normandie. Documents exploitables directement sur chantier.",
    motCle: "plan de structure Le Havre",
    cible: "les-deux",
    ctaTexte: "Demander un plan d'exécution",
    chapo:
      "Un plan d'exécution mal coté génère des reprises que personne ne veut payer. Nous produisons des documents que le maçon peut suivre sans interpréter.",
    blocs: [
      {
        titre: "Ce que nous produisons",
        texte: "",
        liste: [
          "Plans de coffrage et de fondations",
          "Plans d'armatures et nomenclature des aciers",
          "Notes de calcul poutres, linteaux, trémies, reprises en sous-œuvre",
          "Détails d'appuis, de scellements et de phasage d'étaiement",
        ],
      },
    ],
    lies: ["ouverture-mur-porteur-le-havre", "etude-de-sol-geotechnique"],
  },
  {
    slug: "erp-accessibilite-pmr",
    titre: "Mise en accessibilité ERP et PMR au Havre | ID Maîtrise",
    h1: "ERP : mise en conformité accessibilité et sécurité",
    meta: "Maître d'œuvre pour la mise en accessibilité PMR et la conformité incendie de vos ERP au Havre et en Normandie. Diagnostic, dossier Ad'AP, travaux.",
    motCle: "accessibilité ERP Le Havre",
    cible: "professionnel",
    ctaTexte: "Faire diagnostiquer mon ERP",
    chapo:
      "Un ERP non conforme expose l'exploitant à une fermeture administrative. Le diagnostic permet de hiérarchiser les travaux plutôt que de tout engager d'un coup.",
    blocs: [
      { titre: "Périmètre", texte: "", liste: [
        "Diagnostic accessibilité et sécurité incendie par catégorie d'ERP",
        "Dossier d'autorisation de travaux et notice de sécurité",
        "Conception des aménagements : cheminements, sanitaires, signalétique",
        "Suivi des travaux et passage en commission",
      ]},
    ],
    lies: ["local-commercial", "moe-execution"],
  },
  {
    slug: "dce-consultation-entreprises",
    titre: "DCE et consultation des entreprises | ID Maîtrise, Le Havre",
    h1: "Mettre les entreprises en concurrence sur une base comparable",
    meta: "Rédaction du DCE, DPGF, lancement de la consultation et analyse comparative des offres au Havre et en Normandie. Des devis enfin comparables entre eux.",
    motCle: "DCE consultation entreprises",
    cible: "professionnel",
    ctaTexte: "Lancer une consultation",
    chapo:
      "Trois devis ne sont comparables que s'ils répondent au même document. Sans DPGF, vous comparez des prix qui ne couvrent pas les mêmes prestations.",
    blocs: [
      { titre: "Contenu de la mission", texte: "", liste: [
        "Rédaction du CCTP par lot",
        "DPGF détaillée, poste par poste",
        "Lancement et suivi de la consultation",
        "Analyse comparative, vérification des assurances et des références",
        "Mise au point des marchés avant signature",
      ]},
    ],
    lies: ["opc-ordonnancement-pilotage-coordination", "amo-assistance-maitrise-ouvrage"],
  },
  {
    slug: "batiment-industriel-agricole",
    titre: "Construction de bâtiment industriel et agricole (76, 14) | ID Maîtrise",
    h1: "Bâtiments industriels, logistiques et agricoles",
    meta: "Maître d'œuvre pour hangar, entrepôt, bâtiment agricole ou local d'activité en Seine-Maritime et Calvados. Conception, permis, consultation et pilotage.",
    motCle: "construction hangar Seine-Maritime",
    cible: "professionnel",
    ctaTexte: "Étudier mon projet de bâtiment",
    chapo:
      "Sur un bâtiment d'activité, le coût se joue sur la structure et la dalle. Les choix faits en conception pèsent bien plus que les négociations de fin de chantier.",
    blocs: [{ titre: "Typologies traitées", texte: "", liste: [
      "Hangars et bâtiments de stockage, charpente métallique ou béton",
      "Locaux d'activité et ateliers",
      "Bâtiments agricoles et de production",
      "Extensions et réhabilitations de sites existants",
    ]}],
    lies: ["professionnels", "erp-accessibilite-pmr"],
  },
  {
    slug: "local-commercial",
    titre: "Aménagement de local commercial au Havre | ID Maîtrise",
    h1: "Local commercial : aménagement, vitrine, conformité",
    meta: "Maître d'œuvre pour l'aménagement ou la rénovation de votre commerce au Havre : vitrine, agencement, accessibilité, autorisation de travaux.",
    motCle: "aménagement local commercial Le Havre",
    cible: "professionnel",
    ctaTexte: "Étudier l'aménagement de mon local",
    chapo:
      "Un commerce fermé ne rapporte rien. Le phasage des travaux pèse souvent plus lourd que leur prix.",
    blocs: [{ titre: "Points traités", texte: "", liste: [
      "Autorisation de travaux ERP et déclaration préalable de façade",
      "Remplacement de vitrine et reprise de linteau",
      "Accessibilité et sécurité incendie",
      "Planification pour limiter la durée de fermeture",
    ]}],
    lies: ["erp-accessibilite-pmr", "renovation"],
  },
  {
    slug: "construction-immeuble",
    titre: "Construction et rénovation d'immeuble en Seine-Maritime | ID Maîtrise",
    h1: "Immeubles de logements : conception et pilotage",
    meta: "Maître d'œuvre pour construction ou réhabilitation d'immeuble collectif au Havre, Rouen et en Normandie. Montage, conception, OPC et suivi des lots.",
    motCle: "construction immeuble Seine-Maritime",
    cible: "professionnel",
    ctaTexte: "Parler de mon opération",
    chapo: "Sur une opération de logements, la contrainte forte n'est pas technique mais calendaire et réglementaire.",
    blocs: [{ titre: "Interventions", texte: "", liste: [
      "Études de faisabilité et de capacité d'un foncier",
      "Conception et dépôt du permis",
      "Consultation et marchés de travaux",
      "OPC et suivi jusqu'à la livraison",
    ]}],
    lies: ["opc-ordonnancement-pilotage-coordination", "professionnels"],
  },
  {
    slug: "maconnerie",
    titre: "Maçonnerie et gros œuvre au Havre — suivi technique | ID Maîtrise",
    h1: "Maçonnerie et gros œuvre : contrôler ce qui ne se rattrape pas",
    meta: "Maître d'œuvre pour vos travaux de maçonnerie et de gros œuvre au Havre. Chiffrage, consultation d'artisans qualifiés et contrôle d'exécution.",
    motCle: "maçonnerie Le Havre",
    cible: "les-deux",
    ctaTexte: "Faire suivre mes travaux de maçonnerie",
    chapo: "Une erreur de gros œuvre se paie pendant toute la vie du bâtiment. C'est le poste où le contrôle a le meilleur rendement.",
    blocs: [{ titre: "Interventions", texte: "", liste: [
      "Fondations, dallage, élévations",
      "Reprise en sous-œuvre et renforcement",
      "Clôtures, murs de soutènement",
      "Consultation d'artisans et vérification des assurances",
    ]}],
    lies: ["plans-structure-execution", "ravalement-facade"],
  },
  {
    slug: "ravalement-facade",
    titre: "Ravalement de façade au Havre (76) | ID Maîtrise",
    h1: "Ravalement : traiter la cause, pas seulement l'aspect",
    meta: "Maître d'œuvre pour ravalement et rejointoiement de façade au Havre et en Seine-Maritime. Diagnostic, choix du traitement, consultation et suivi.",
    motCle: "ravalement façade Le Havre",
    cible: "les-deux",
    ctaTexte: "Faire diagnostiquer ma façade",
    chapo: "Un ravalement posé sur un support humide se dégrade en trois ans. Le diagnostic précède le devis.",
    blocs: [{ titre: "Points traités", texte: "", liste: [
      "Diagnostic des désordres et de leur origine",
      "Choix du système : enduit, rejointoiement, ITE",
      "Déclaration préalable si secteur protégé",
      "Consultation et suivi d'exécution",
    ]}],
    lies: ["maconnerie", "renovation-energetique"],
  },
  {
    slug: "couverture-charpente",
    titre: "Couverture et charpente au Havre — maître d'œuvre | ID Maîtrise",
    h1: "Couverture et charpente : diagnostic avant devis",
    meta: "Maître d'œuvre pour réfection de toiture, ardoise ou tuile, au Havre et en Seine-Maritime. Diagnostic charpente, consultation et contrôle d'exécution.",
    motCle: "couverture charpente Le Havre",
    cible: "particulier",
    ctaTexte: "Faire diagnostiquer ma toiture",
    chapo: "Refaire une couverture sur une charpente fatiguée revient à repousser le problème de dix ans.",
    blocs: [{ titre: "Interventions", texte: "", liste: [
      "Diagnostic de charpente et d'écran sous-toiture",
      "Réfection en ardoise ou tuile terre cuite",
      "Zinguerie, gouttières, raccords",
      "Consultation d'artisans et réception des travaux",
    ]}],
    lies: ["renovation", "renovation-energetique"],
  },
  {
    slug: "division-parcellaire",
    titre: "Division parcellaire au Havre — faisabilité | ID Maîtrise",
    h1: "Diviser un terrain : ce que le PLUi autorise vraiment",
    meta: "Étude de faisabilité de division parcellaire au Havre et en Seine-Maritime. Vérification PLUi, accès, réseaux, coordination du géomètre et du bornage.",
    motCle: "division parcellaire Le Havre",
    cible: "les-deux",
    ctaTexte: "Vérifier si mon terrain est divisible",
    chapo: "Un terrain divisible sur le papier ne l'est pas toujours : l'accès, les réseaux et le recul aux limites bloquent plus souvent que la surface.",
    blocs: [{ titre: "Notre rôle", texte: "", liste: [
      "Analyse du règlement de zone et de la constructibilité résiduelle",
      "Vérification des accès et de la desserte par les réseaux",
      "Coordination du géomètre pour le bornage et le document d'arpentage",
      "Déclaration préalable de division le cas échéant",
    ]}],
    lies: ["permis-de-construire-le-havre", "plui-le-havre"],
  },
  {
    slug: "remplacement-plancher-humide",
    titre: "Remplacement de plancher humide au Havre | ID Maîtrise",
    h1: "Planchers dégradés par l'humidité : diagnostic et reprise",
    meta: "Maître d'œuvre pour le remplacement de planchers bois dégradés au Havre. Recherche de la cause, dimensionnement de la reprise, suivi des travaux.",
    motCle: "plancher humide Le Havre",
    cible: "particulier",
    ctaTexte: "Faire expertiser mon plancher",
    chapo: "Remplacer un plancher sans traiter la source de l'humidité garantit la récidive.",
    blocs: [{ titre: "Méthode", texte: "", liste: [
      "Recherche de l'origine : remontée capillaire, infiltration, condensation",
      "Sondage des about de solives et des appuis",
      "Dimensionnement de la reprise et choix du système",
      "Suivi d'exécution et contrôle de la ventilation",
    ]}],
    lies: ["renovation", "plans-structure-execution"],
  },
  {
    slug: "viabilisation-terrain",
    titre: "Viabilisation de terrain au Havre et en Normandie | ID Maîtrise",
    h1: "Viabiliser un terrain : démarches et coûts réels",
    meta: "Accompagnement pour la viabilisation de votre terrain au Havre : raccordements eau, électricité, assainissement, télécom. Demandes et coordination.",
    motCle: "viabilisation terrain Le Havre",
    cible: "particulier",
    ctaTexte: "Chiffrer ma viabilisation",
    chapo: "La viabilisation est le poste le plus souvent sous-estimé dans un budget de construction, et le plus long en délais administratifs.",
    blocs: [{ titre: "Raccordements à traiter", texte: "", liste: [
      "Eau potable et assainissement collectif ou individuel",
      "Électricité : demande Enedis et dimensionnement du branchement",
      "Télécom et gaz le cas échéant",
      "Accès et voirie : permission de voirie",
    ]}],
    lies: ["construction-maison-le-havre", "etude-de-sol-geotechnique"],
  },
  {
    slug: "construction-garage",
    titre: "Construire un garage au Havre — règles et démarches | ID Maîtrise",
    h1: "Construire un garage : déclaration ou permis ?",
    meta: "Construction de garage au Havre et en Normandie : surface, emprise au sol, formalité d'urbanisme, plans et suivi. Réponse claire dès le premier échange.",
    motCle: "construction garage Le Havre",
    cible: "particulier",
    ctaTexte: "Vérifier la formalité pour mon garage",
    chapo: "Un garage de 19 m² et un garage de 21 m² ne relèvent pas de la même procédure. La différence se compte en mois.",
    blocs: [{ titre: "Les seuils", texte: "", liste: [
      "Moins de 5 m² : aucune formalité hors secteur protégé",
      "De 5 à 20 m² : déclaration préalable",
      "Jusqu'à 40 m² en zone urbaine du PLUi : déclaration préalable possible",
      "Au-delà, ou si la surface totale dépasse 150 m² : permis de construire",
    ]}],
    lies: ["declaration-prealable", "permis-de-construire-le-havre"],
  },
  {
    slug: "terrasse-beton",
    titre: "Terrasse en béton au Havre — conception et suivi | ID Maîtrise",
    h1: "Terrasse béton : dalle, drainage et finition",
    meta: "Maître d'œuvre pour la réalisation de terrasse béton au Havre. Dimensionnement de dalle, gestion des eaux, choix de finition et suivi des travaux.",
    motCle: "terrasse béton Le Havre",
    cible: "particulier",
    ctaTexte: "Faire étudier ma terrasse",
    chapo: "Une dalle mal drainée fissure au premier hiver. La pente et le drainage comptent plus que l'épaisseur.",
    blocs: [{ titre: "Points de vigilance", texte: "", liste: [
      "Portance du sol et préparation de la forme",
      "Pente d'écoulement et gestion des eaux pluviales",
      "Joints de dilatation et ferraillage",
      "Déclaration préalable si la terrasse est surélevée",
    ]}],
    lies: ["maconnerie", "declaration-prealable"],
  },
  {
    slug: "demolition-reconstruction",
    titre: "Démolition et reconstruction de maison (76) | ID Maîtrise",
    h1: "Démolir pour reconstruire : arbitrer avant d'engager",
    meta: "Maître d'œuvre pour opération de démolition-reconstruction au Havre et en Normandie. Étude comparative rénovation / reconstruction, permis, pilotage.",
    motCle: "démolition reconstruction maison",
    cible: "les-deux",
    ctaTexte: "Comparer rénovation et reconstruction",
    chapo: "Au-delà d'un certain niveau de dégradation, rénover coûte plus cher que reconstruire. Le point de bascule se calcule.",
    blocs: [{ titre: "Étapes", texte: "", liste: [
      "Diagnostic amiante et plomb avant travaux",
      "Comparatif chiffré rénovation lourde / démolition-reconstruction",
      "Permis de démolir et permis de construire",
      "Pilotage des deux phases",
    ]}],
    lies: ["renovation", "construction-maison-le-havre"],
  },
  {
    slug: "etude-de-faisabilite",
    titre: "Étude de faisabilité de projet de construction | ID Maîtrise",
    h1: "Étude de faisabilité : savoir avant d'engager",
    meta: "Étude de faisabilité technique, réglementaire et budgétaire au Havre et en Normandie. Savoir si votre projet tient avant d'engager la conception.",
    motCle: "étude de faisabilité construction",
    cible: "les-deux",
    ctaTexte: "Lancer une étude de faisabilité",
    chapo: "Quelques jours d'étude évitent parfois plusieurs mois de conception sur un projet qui ne passera pas.",
    blocs: [{ titre: "Ce qu'elle couvre", texte: "", liste: [
      "Constructibilité au regard du PLUi",
      "Contraintes techniques : sol, structure, réseaux, servitudes",
      "Estimation budgétaire par grands postes",
      "Planning prévisionnel réaliste",
    ]}],
    lies: ["plui-le-havre", "division-parcellaire"],
  },
  {
    slug: "amenagement-bureaux",
    titre: "Aménagement et rénovation de bureaux au Havre | ID Maîtrise",
    h1: "Aménager des bureaux en site occupé",
    meta: "Maître d'œuvre pour l'aménagement ou la rénovation de vos bureaux au Havre et en Normandie. Phasage en site occupé, lots techniques, respect du planning.",
    motCle: "aménagement bureaux Le Havre",
    cible: "professionnel",
    ctaTexte: "Étudier l'aménagement de mes bureaux",
    chapo: "Rénover des bureaux sans arrêter l'activité est d'abord un problème de phasage, pas de décoration.",
    blocs: [{ titre: "Points traités", texte: "", liste: [
      "Programme et implantation des postes",
      "Cloisonnement, acoustique, éclairage",
      "Lots techniques : CVC, électricité, courants faibles",
      "Phasage en site occupé et travaux hors horaires",
    ]}],
    lies: ["erp-accessibilite-pmr", "moe-execution"],
  },
  {
    slug: "diagnostics",
    titre: "Diagnostics avant travaux au Havre — amiante, plomb, DPE | ID Maîtrise",
    h1: "Diagnostics avant travaux : les obligations réelles",
    meta: "Organisation des diagnostics avant travaux au Havre : amiante, plomb, DPE. Coordination des diagnostiqueurs certifiés et intégration au dossier travaux.",
    motCle: "diagnostic amiante avant travaux Le Havre",
    cible: "les-deux",
    ctaTexte: "Organiser mes diagnostics",
    chapo: "Le diagnostic amiante avant travaux est obligatoire pour tout immeuble dont le permis est antérieur à juillet 1997. L'absence engage votre responsabilité pénale.",
    blocs: [{ titre: "Diagnostics concernés", texte: "", liste: [
      "Amiante avant travaux (DAAT) — obligatoire avant 1997",
      "Plomb avant travaux — logements avant 1949",
      "DPE — vente, location, et suivi de rénovation énergétique",
    ]}],
    lies: ["renovation", "demolition-reconstruction"],
  },
];

/* ─────────────────────────── GUIDES (SEO longue traîne) ─────────────────────────── */

export const GUIDES: Page[] = [
  {
    slug: "plui-le-havre",
    titre: "PLUi du Havre Seine Métropole : ce qu'il faut vérifier | ID Maîtrise",
    h1: "Comprendre le PLUi du Havre avant de dessiner quoi que ce soit",
    meta: "Zones, emprise au sol, hauteur, recul, stationnement : les règles du PLUi du Havre Seine Métropole qui décident de la faisabilité de votre projet.",
    motCle: "PLUi Le Havre",
    cible: "les-deux",
    ctaTexte: "Faire vérifier mon terrain",
    chapo:
      "Le PLUi remplace les anciens PLU communaux sur les 54 communes de la métropole. C'est lui, et non le bon sens, qui décide de ce que vous pouvez construire.",
    blocs: [
      {
        titre: "Les six règles qui bloquent le plus souvent",
        texte: "Avant tout dessin, ces points doivent être vérifiés dans le règlement de votre zone.",
        liste: [
          "Emprise au sol maximale — le pourcentage du terrain que le bâti peut couvrir",
          "Hauteur maximale — souvent exprimée à l'égout du toit, pas au faîtage",
          "Recul par rapport aux limites séparatives et à la voie",
          "Aspect extérieur — matériaux, teintes, pentes de toiture imposées",
          "Stationnement — nombre de places à créer sur la parcelle",
          "Coefficient de biotope ou surface de pleine terre à conserver",
        ],
      },
      {
        titre: "Les servitudes qui se superposent",
        texte:
          "Le règlement de zone n'est qu'une couche. S'y ajoutent le périmètre des monuments historiques, le plan de prévention des risques, les servitudes de canalisation et, au Havre, le secteur du centre reconstruit inscrit à l'UNESCO. Un projet conforme au règlement de zone peut être refusé sur l'avis de l'architecte des Bâtiments de France.",
      },
    ],
    faq: [
      {
        q: "Où consulter le PLUi du Havre Seine Métropole ?",
        r: "Le règlement et le zonage sont consultables en ligne sur le géoportail de l'urbanisme et sur le site de la métropole. Le service urbanisme de votre commune peut également vous renseigner, mais un rendez-vous en amont du dépôt reste préférable pour les projets sensibles.",
      },
      {
        q: "Que faire si mon projet n'est pas conforme au PLUi ?",
        r: "Une adaptation mineure est parfois possible, mais elle reste à l'appréciation du service instructeur. Dans la majorité des cas, mieux vaut ajuster le projet. Nous cherchons systématiquement la solution conforme qui préserve votre programme plutôt que de tenter un passage en force.",
      },
    ],
    lies: ["permis-de-construire-le-havre", "division-parcellaire", "etude-de-faisabilite"],
  },
  {
    slug: "prix-honoraires-maitre-oeuvre",
    titre: "Prix d'un maître d'œuvre : comment sont calculés les honoraires",
    h1: "Combien coûte un maître d'œuvre, et sur quoi se calcule le prix",
    meta: "Honoraires de maîtrise d'œuvre : pourcentage des travaux, forfait, mission partielle. Ce qui fait varier le prix et ce qu'un devis doit contenir.",
    motCle: "prix maître d'œuvre",
    cible: "les-deux",
    ctaTexte: "Recevoir un devis chiffré",
    chapo:
      "Les honoraires de maîtrise d'œuvre se situent en général entre 6 et 12 % du montant des travaux. Ce qui fait varier le taux, c'est l'étendue de la mission, pas la qualité du prestataire.",
    blocs: [
      {
        titre: "Les deux modes de facturation",
        texte:
          "Le pourcentage du montant des travaux s'applique aux missions complètes, de la conception à la réception. Le forfait s'applique aux missions ponctuelles : montage d'un permis, note de calcul, étude thermique. Le forfait est souvent plus avantageux quand le périmètre est nettement délimité.",
      },
      {
        titre: "Ce qui fait monter le taux",
        texte: "",
        liste: [
          "Le nombre de lots à coordonner",
          "La complexité technique : structure, site contraint, bâtiment occupé",
          "Le montant total : plus l'opération est petite, plus le pourcentage est élevé, parce que le travail fixe reste le même",
          "La durée du chantier, qui détermine le nombre de réunions",
        ],
      },
      {
        titre: "Ce qu'un devis honnête contient",
        texte:
          "Le détail des phases avec leur montant respectif, le nombre de visites de chantier prévu, ce qui est explicitement exclu, et les conditions de facturation des travaux modificatifs. Un devis qui annonce un pourcentage global sans décomposition vous empêche d'arrêter la mission en cours de route.",
      },
    ],
    faq: [
      {
        q: "Le maître d'œuvre touche-t-il une commission des entreprises ?",
        r: "Nous ne percevons aucune rémunération des entreprises consultées, et nous nous y engageons contractuellement. C'est ce qui rend l'analyse des devis crédible : si le prestataire est payé par ceux qu'il recommande, son avis n'a pas de valeur. Posez la question à tous ceux que vous consultez.",
      },
      {
        q: "Peut-on payer un maître d'œuvre uniquement pour le permis ?",
        r: "Oui. C'est une mission partielle, facturée au forfait, sans obligation de poursuivre sur le suivi de chantier. Beaucoup de nos clients commencent ainsi.",
      },
    ],
    lies: ["ccmi-ou-maitre-oeuvre", "garanties-maitre-oeuvre"],
  },
  {
    slug: "ccmi-ou-maitre-oeuvre",
    titre: "CCMI ou maître d'œuvre : quelle formule choisir ?",
    h1: "CCMI ou maître d'œuvre : le vrai comparatif",
    meta: "Contrat de construction de maison individuelle ou contrat de maîtrise d'œuvre : garanties, prix, liberté de choix. Comparatif honnête des deux formules.",
    motCle: "CCMI ou maître d'œuvre",
    cible: "particulier",
    ctaTexte: "En discuter avant de signer",
    chapo:
      "Les deux formules sont légitimes. Elles ne s'adressent simplement pas au même profil, et le choix se fait sur votre tolérance au risque, pas sur le prix affiché.",
    blocs: [
      {
        titre: "Ce que le CCMI apporte",
        texte:
          "Un prix ferme et définitif, une garantie de livraison à prix et délais convenus, et un interlocuteur unique qui porte tout le risque. C'est la formule la plus protectrice juridiquement pour un primo-accédant qui ne veut pas gérer.",
      },
      {
        titre: "Ce qu'il coûte en échange",
        texte:
          "Une marge intégrée au prix global et jamais détaillée, des entreprises imposées, et une capacité de modification très limitée après signature. Vous ne saurez jamais ce que coûte réellement votre charpente.",
      },
      {
        titre: "Ce que la maîtrise d'œuvre apporte",
        texte:
          "Le détail de chaque lot, le choix des artisans, la liberté de faire réaliser certains travaux vous-même, et des honoraires visibles séparés du coût des travaux. En contrepartie : pas de garantie de livraison, une implication réelle de votre part, et vous signez autant de contrats que de lots.",
      },
      {
        titre: "Comment trancher",
        texte:
          "Si vous ne pouvez absolument pas absorber un dépassement ou un retard, prenez un CCMI. Si vous voulez comprendre où va votre argent, arbitrer les postes et garder la main sur les choix, prenez un maître d'œuvre. Nous vous le dirons franchement lors du premier échange, même si la réponse ne nous arrange pas.",
      },
    ],
    lies: ["construction-maison-le-havre", "prix-honoraires-maitre-oeuvre", "garanties-maitre-oeuvre"],
  },
  {
    slug: "garanties-maitre-oeuvre",
    titre: "Garanties et assurances d'un maître d'œuvre | ID Maîtrise",
    h1: "Quelles garanties couvrent réellement votre chantier",
    meta: "Décennale, biennale, parfait achèvement, dommages-ouvrage : qui garantit quoi sur un chantier, et quelles attestations exiger avant de signer.",
    motCle: "garanties maître d'œuvre",
    cible: "les-deux",
    ctaTexte: "Demander nos attestations",
    chapo:
      "La garantie décennale du maître d'œuvre ne remplace pas celle des entreprises. Chacun couvre sa part, et c'est cette superposition qui vous protège.",
    blocs: [
      {
        titre: "Les quatre garanties",
        texte: "",
        liste: [
          "Parfait achèvement — un an, à la charge de l'entreprise, couvre toutes les réserves signalées",
          "Bon fonctionnement — deux ans, sur les équipements dissociables (volets, robinetterie, chaudière)",
          "Décennale — dix ans, sur ce qui compromet la solidité ou rend l'ouvrage impropre à sa destination",
          "Dommages-ouvrage — souscrite par vous, maître d'ouvrage. Elle préfinance les réparations sans attendre la recherche de responsabilité",
        ],
      },
      {
        titre: "Les attestations à exiger",
        texte:
          "Avant signature, demandez l'attestation décennale nominative de chaque entreprise, en vérifiant que l'activité déclarée correspond aux travaux confiés, et que la période de validité couvre la date d'ouverture du chantier. Une attestation périmée ou hors activité ne vaut rien. Nous effectuons cette vérification systématiquement lors de l'analyse des devis.",
      },
    ],
    faq: [
      {
        q: "La dommages-ouvrage est-elle obligatoire ?",
        r: "Elle est légalement obligatoire pour tout maître d'ouvrage faisant réaliser des travaux de construction. En pratique, elle n'est pas sanctionnée pour un particulier construisant pour lui-même, mais son absence devient un vrai problème à la revente dans les dix ans : l'acquéreur la réclamera.",
      },
    ],
    lies: ["prix-honoraires-maitre-oeuvre", "ccmi-ou-maitre-oeuvre"],
  },
  {
    slug: "declaration-prealable-piscine",
    titre: "Déclaration préalable pour une piscine au Havre | ID Maîtrise",
    h1: "Piscine : quelle formalité selon la taille du bassin",
    meta: "Déclaration préalable ou permis pour votre piscine au Havre : seuils de surface, abri, implantation, taxe d'aménagement. Dossier monté et déposé.",
    motCle: "déclaration préalable piscine",
    cible: "particulier",
    ctaTexte: "Monter mon dossier piscine",
    chapo:
      "Le seuil est simple à retenir : moins de 10 m², rien. De 10 à 100 m², déclaration préalable. Au-delà, permis de construire. L'abri change tout.",
    blocs: [
      {
        titre: "Les règles d'implantation",
        texte:
          "Le PLUi fixe généralement un recul minimal par rapport aux limites séparatives, souvent entre 2 et 3 mètres mesurés depuis le bord du bassin. La piscine compte aussi dans l'emprise au sol dans certaines zones, ce qui peut consommer votre droit à construire une future extension.",
      },
      {
        titre: "Ce qu'on oublie souvent",
        texte:
          "La piscine enterrée déclenche la taxe d'aménagement, calculée sur une valeur forfaitaire par mètre carré de bassin. Le dispositif de sécurité normalisé est obligatoire. Et le local technique, s'il est couvert, crée de la surface qui peut à son tour nécessiter une formalité.",
      },
    ],
    lies: ["declaration-prealable", "plui-le-havre"],
  },
  {
    slug: "mission-maitre-oeuvre",
    titre: "Le rôle du maître d'œuvre, étape par étape | ID Maîtrise",
    h1: "Ce que fait concrètement un maître d'œuvre",
    meta: "De l'esquisse à la levée des réserves : les missions d'un maître d'œuvre, ce qu'il signe, ce qu'il contrôle et ce dont il répond juridiquement.",
    motCle: "rôle maître d'œuvre",
    cible: "les-deux",
    ctaTexte: "Parler de ma mission",
    chapo:
      "Le maître d'ouvrage, c'est vous : celui qui commande et qui paie. Le maître d'œuvre, c'est celui qui conçoit et fait exécuter. La confusion des deux termes est la source de beaucoup de malentendus.",
    blocs: [
      {
        titre: "La décomposition normalisée des missions",
        texte: "",
        liste: [
          "ESQ / APS / APD — esquisse et avant-projets, jusqu'au dépôt du permis",
          "PRO — projet : plans et descriptifs qui serviront à consulter",
          "DCE / ACT — consultation des entreprises et assistance à la passation des marchés",
          "EXE / VISA — plans d'exécution ou visa de ceux des entreprises",
          "DET — direction de l'exécution des travaux",
          "AOR — assistance aux opérations de réception",
        ],
      },
      {
        titre: "Une mission ne se prend pas forcément en entier",
        texte:
          "Vous pouvez confier uniquement le permis, uniquement le suivi de chantier, ou l'ensemble. Chaque phase se facture séparément, ce qui vous permet d'arrêter ou de continuer en connaissance de cause.",
      },
    ],
    lies: ["prix-honoraires-maitre-oeuvre", "garanties-maitre-oeuvre", "ccmi-ou-maitre-oeuvre"],
  },
  {
    slug: "prix-construction-maison",
    titre: "Prix de construction d'une maison en Seine-Maritime | ID Maîtrise",
    h1: "Ce qui fait vraiment varier le prix d'une maison neuve",
    meta: "Budget de construction en Seine-Maritime : les postes qui pèsent, les coûts oubliés et pourquoi le prix au mètre carré ne veut pas dire grand-chose.",
    motCle: "prix construction maison Seine-Maritime",
    cible: "particulier",
    ctaTexte: "Faire estimer mon budget",
    chapo:
      "Le prix au mètre carré est le chiffre le plus cité et le moins utile. Deux maisons de même surface peuvent varier de 40 % selon leur forme et leur terrain.",
    blocs: [
      {
        titre: "Les postes qui font basculer un budget",
        texte: "",
        liste: [
          "La forme : une maison compacte coûte nettement moins qu'une maison en L à surface égale",
          "Le terrain : pente, portance du sol, accès pour les engins",
          "Les fondations, déterminées par l'étude géotechnique",
          "Le niveau de finition, qui peut varier du simple au double",
        ],
      },
      {
        titre: "Les coûts oubliés dans les comparatifs",
        texte:
          "Viabilisation, taxe d'aménagement, raccordements, assurance dommages-ouvrage, études techniques, aménagements extérieurs et clôtures. Additionnés, ils représentent régulièrement 10 à 15 % du budget et n'apparaissent dans aucune publicité de constructeur.",
      },
    ],
    lies: ["construction-maison-le-havre", "viabilisation-terrain", "prix-honoraires-maitre-oeuvre"],
  },
  {
    slug: "planning-chantier",
    titre: "Planning de chantier : comment il se construit | ID Maîtrise",
    h1: "Un planning de chantier qui tient, et pourquoi la plupart ne tiennent pas",
    meta: "Construction d'un planning de chantier réaliste : enclenchements, marges, délais d'approvisionnement et points de blocage les plus fréquents.",
    motCle: "planning de chantier",
    cible: "professionnel",
    ctaTexte: "Faire établir mon planning",
    chapo:
      "Un planning n'est pas une liste de dates. C'est un enchaînement de contraintes : ce qui doit être fini pour que la suite démarre.",
    blocs: [
      {
        titre: "Ce qui casse les plannings",
        texte: "",
        liste: [
          "Les délais d'approvisionnement non anticipés, en particulier menuiseries et équipements techniques",
          "Les validations du maître d'ouvrage, rarement intégrées au calendrier",
          "Les séchages incompressibles : chape, enduit, béton",
          "Les interfaces entre lots techniques, source principale de retard",
        ],
      },
    ],
    lies: ["opc-ordonnancement-pilotage-coordination", "moe-execution"],
  },
  {
    slug: "faq-maitrise-oeuvre",
    titre: "Questions fréquentes sur la maîtrise d'œuvre | ID Maîtrise",
    h1: "Vos questions les plus fréquentes",
    meta: "Délais, honoraires, garanties, différences entre architecte, constructeur et maître d'œuvre : les réponses aux questions qu'on nous pose le plus.",
    motCle: "questions maîtrise d'œuvre",
    cible: "les-deux",
    ctaTexte: "Poser votre question",
    chapo: "Si votre question n'y figure pas, posez-la directement. Nous répondons sous 48 h ouvrées.",
    blocs: [],
    faq: [
      { q: "Intervenez-vous en dehors du Havre ?", r: "Oui, sur la Seine-Maritime, l'Eure et le Calvados. Notre limite est pratique : nous intervenons là où nous pouvons être physiquement présents sur le chantier chaque semaine." },
      { q: "Le premier rendez-vous est-il payant ?", r: "Non. Le premier échange, sur place ou à distance, est gratuit et sans engagement. Vous en repartez avec un avis franc sur la faisabilité." },
      { q: "Travaillez-vous avec vos propres artisans ?", r: "Nous avons un réseau d'artisans locaux avec qui nous travaillons régulièrement, mais rien ne vous oblige à les retenir. Vous pouvez proposer vos propres entreprises : nous les consultons au même titre." },
      { q: "Que se passe-t-il si une entreprise fait défaut en cours de chantier ?", r: "Nous constatons la défaillance par écrit, chiffrons les travaux restants, et organisons la consultation d'une entreprise de remplacement. Si l'entreprise était couverte par une garantie de paiement, nous vous assistons dans la mise en jeu." },
      { q: "Puis-je réaliser certains travaux moi-même ?", r: "Oui, et c'est un levier budgétaire réel. Nous l'intégrons au planning et au découpage des lots. En revanche, les travaux que vous réalisez ne sont couverts par aucune décennale, ce qui a des conséquences à la revente." },
    ],
    lies: ["prix-honoraires-maitre-oeuvre", "garanties-maitre-oeuvre", "mission-maitre-oeuvre"],
  },
];

/* ─────────────────────────── ZONES ─────────────────────────── */
/* Attention : les pages de zone sont le principal risque de contenu dupliqué.
   Chacune doit contenir des éléments réellement locaux (PLUi, chantiers, contraintes). */

export type Zone = {
  slug: string; ville: string; cp: string; departement: string;
  titre: string; meta: string; chapo: string; specifique: string[]; communes: string[];
};

export const ZONES: Zone[] = [
  {
    slug: "le-havre", ville: "Le Havre", cp: "76600", departement: "Seine-Maritime",
    titre: "Maître d'œuvre au Havre (76) — ID Maîtrise",
    meta: "Cabinet de maîtrise d'œuvre indépendant au Havre. Permis de construire, extension, rénovation, OPC. Bureau rue Henry Genestal, intervention sous 48 h.",
    chapo: "Notre bureau est au Havre, rue Henry Genestal. C'est notre territoire principal : nous connaissons les services instructeurs, le PLUi et les contraintes du centre reconstruit.",
    specifique: [
      "Centre reconstruit Perret inscrit à l'UNESCO : avis de l'architecte des Bâtiments de France sur une grande partie du centre-ville, y compris pour un simple remplacement de menuiserie",
      "Sols argileux sur plusieurs secteurs du plateau : étude géotechnique souvent déterminante pour les fondations",
      "Bâti ancien en brique et silex sur les quartiers hauts, avec des problématiques récurrentes d'humidité et de planchers bois",
      "PLUi Le Havre Seine Métropole applicable sur les 54 communes de la métropole",
    ],
    communes: ["Le Havre", "Sainte-Adresse", "Harfleur", "Montivilliers", "Gonfreville-l'Orcher", "Octeville-sur-Mer", "Saint-Martin-du-Manoir"],
  },
  {
    slug: "fecamp", ville: "Fécamp", cp: "76400", departement: "Seine-Maritime",
    titre: "Maître d'œuvre à Fécamp (76) — ID Maîtrise",
    meta: "Maîtrise d'œuvre et OPC à Fécamp et sur la côte d'Albâtre. Construction, rénovation, logements collectifs. Mission OPC en cours sur 84 logements.",
    chapo: "Nous intervenons régulièrement à Fécamp, notamment sur l'opération de 84 logements du quai Bérigny en mission OPC et ARL.",
    specifique: [
      "Exposition maritime : choix de menuiseries et de traitements de façade adaptés aux embruns",
      "Secteurs soumis au plan de prévention des risques littoraux",
      "Bâti ancien en centre-ville avec contraintes patrimoniales",
    ],
    communes: ["Fécamp", "Étretat", "Yport", "Saint-Léonard", "Criquetot-l'Esneval", "Goderville"],
  },
  {
    slug: "rouen", ville: "Rouen", cp: "76000", departement: "Seine-Maritime",
    titre: "Maître d'œuvre à Rouen (76) — ID Maîtrise",
    meta: "Maîtrise d'œuvre, AMO et OPC à Rouen et dans l'agglomération. Bâtiments professionnels, logements collectifs et rénovation. Déplacement hebdomadaire.",
    chapo: "Nous intervenons sur l'agglomération rouennaise, principalement sur des opérations professionnelles et des immeubles collectifs.",
    specifique: [
      "Secteur sauvegardé et nombreux périmètres de monuments historiques en centre-ville",
      "Plan de prévention des risques inondation sur les secteurs de vallée",
      "Sites industriels soumis à des servitudes spécifiques",
    ],
    communes: ["Rouen", "Sotteville-lès-Rouen", "Saint-Étienne-du-Rouvray", "Mont-Saint-Aignan", "Barentin", "Elbeuf"],
  },
  {
    slug: "caen", ville: "Caen", cp: "14000", departement: "Calvados",
    titre: "Maître d'œuvre à Caen (14) — ID Maîtrise",
    meta: "Maîtrise d'œuvre et OPC à Caen et dans le Calvados. Bâtiments professionnels, agricoles et logements. Missions de conception et de pilotage de chantier.",
    chapo: "Nous intervenons dans le Calvados sur des missions de conception et de pilotage, principalement pour des maîtres d'ouvrage professionnels et agricoles.",
    specifique: [
      "Pierre de Caen et bâti traditionnel avec contraintes de matériaux imposées dans plusieurs secteurs",
      "Zones agricoles avec règles spécifiques d'implantation des bâtiments d'exploitation",
      "Carrières souterraines sur certains secteurs : vigilance sur la portance",
    ],
    communes: ["Caen", "Hérouville-Saint-Clair", "Lisieux", "Bayeux", "Pont-l'Évêque", "Honfleur"],
  },
  {
    slug: "normandie", ville: "Normandie", cp: "", departement: "Normandie",
    titre: "Maître d'œuvre en Normandie — ID Maîtrise",
    meta: "Cabinet de maîtrise d'œuvre TCE indépendant intervenant en Seine-Maritime, Eure et Calvados. Conception, permis, consultation et pilotage de chantier.",
    chapo: "Basés au Havre, nous intervenons sur un périmètre qui nous permet d'être présents sur chaque chantier chaque semaine.",
    specifique: [
      "Réseau d'artisans et de bureaux d'études constitué localement sur dix ans",
      "Connaissance des PLUi et des services instructeurs des principales intercommunalités",
      "Adaptation aux contraintes climatiques normandes : exposition ouest, pluviométrie, embruns sur le littoral",
    ],
    communes: ["Seine-Maritime", "Eure", "Calvados"],
  },
];

/* ─────────────────────────── RÉALISATIONS ─────────────────────────── */
/* La preuve est le premier levier de conversion. À enrichir de photos réelles. */

export type Realisation = {
  slug: string; titre: string; meta: string; lieu: string; mission: string;
  statut: string; surface?: string; chapo: string; details: string[]; image?: string;
};

export const REALISATIONS: Realisation[] = [
  {
    slug: "centre-socioculturel-maryam-le-havre",
    titre: "Centre socioculturel et mosquée Maryam — Le Havre",
    meta: "Maîtrise d'œuvre et pilotage TCE du centre socioculturel et de la mosquée Maryam au Havre. Coordination de six entreprises en phase 2.",
    lieu: "Le Havre (76)", mission: "MOE TCE + pilotage", statut: "En cours",
    chapo: "Opération d'équipement recevant du public, menée en phases successives avec un maître d'ouvrage associatif.",
    details: [
      "Phase 2 en cours : cloisons et lots techniques",
      "Coordination de six entreprises : gros œuvre, maçonnerie, second œuvre technique",
      "Contraintes ERP : accessibilité, sécurité incendie, désenfumage",
      "Pilotage en phases pour s'adapter au financement progressif du maître d'ouvrage",
    ],
  },
  {
    slug: "quai-berigny-fecamp-84-logements",
    titre: "Quai Bérigny — 84 logements, Fécamp",
    meta: "Mission OPC et ARL sur une opération de 84 logements quai Bérigny à Fécamp pour un bailleur social.",
    lieu: "Fécamp (76)", mission: "OPC + ARL", statut: "En cours", surface: "84 logements",
    chapo: "Opération de logements collectifs pour un bailleur social, en mission d'ordonnancement, pilotage et coordination.",
    details: [
      "Ordonnancement et planning directeur de l'opération",
      "Coordination des lots et gestion des interfaces techniques",
      "Comptes rendus hebdomadaires et suivi d'avancement",
      "Assistance à la réception des logements",
    ],
  },
  {
    slug: "4-maisons-individuelles-le-havre",
    titre: "Quatre maisons individuelles — Le Havre",
    meta: "Conception et suivi de la construction de quatre maisons individuelles au Havre en maîtrise d'œuvre.",
    lieu: "Le Havre (76)", mission: "MOE complète", statut: "Livré", surface: "4 logements",
    chapo: "Opération groupée de quatre maisons individuelles, de la conception au suivi de chantier.",
    details: [
      "Conception et dépôt des permis de construire",
      "Étude thermique réglementaire",
      "Consultation des entreprises lot par lot",
      "Suivi de chantier et réception",
    ],
  },
];

/* ─────────────────── Pages issues de l'analyse SEO ───────────────────
   Écrites par seo/rediger.py à partir des opportunités Search Console.
   Tant que `brouillon` vaut true, la page n'est ni rendue ni mise au sitemap.
   Pour publier : relire, corriger, puis passer `brouillon` à false. */
import generees from "./pages-generees.json";

export const GENEREES: Page[] = (generees as (Page & { brouillon?: boolean })[])
  .filter((p) => p.brouillon === false);

export const BROUILLONS = (generees as (Page & { brouillon?: boolean })[])
  .filter((p) => p.brouillon !== false);

export const TOUTES_PAGES = [...PRESTATIONS, ...GUIDES, ...GENEREES];
export const parSlug = (slug: string) => TOUTES_PAGES.find((p) => p.slug === slug);
