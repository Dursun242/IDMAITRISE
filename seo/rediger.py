#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rédige des brouillons de pages à partir des opportunités détectées.

    python seo/rediger.py --nb 2

Le résultat va dans content/pages-generees.json, jamais directement dans
content/site.ts. Le site charge ce fichier, mais chaque entrée porte
`brouillon: true` et n'est publiée qu'une fois ce drapeau retiré à la main.

Trois garde-fous, dans cet ordre :
  1. le mot-clé ne doit exister nulle part ailleurs (anti-cannibalisation) ;
  2. le modèle reçoit les faits réels du cabinet, et interdiction d'en inventer ;
  3. rien n'est publié : la sortie passe par une pull request à relire.
"""

import argparse, json, os, re, sys
from pathlib import Path

import pandas as pd

RACINE = Path(__file__).resolve().parent.parent
FICHIER = RACINE / "content" / "pages-generees.json"
OPPORTUNITES = Path(__file__).parent / "data" / "opportunites.csv"

# Faits vérifiés sur lesquels le modèle peut s'appuyer. Il n'a pas le droit
# d'en inventer d'autres : chiffres, références, délais.
CONTEXTE = """
ID Maîtrise, SARL de maîtrise d'œuvre TCE indépendante, 9 rue Henry Genestal,
76600 Le Havre. SIRET 921 536 181 00024. Gérant : Dursun Ozkan.
Décennale et RC Pro auprès de MIC, activité MOE TCE, mission OPC incluse.
Téléphone 02 44 10 13 82.

Missions : permis de construire et déclarations préalables, conception et plans,
consultation des entreprises (DCE, DPGF), OPC, AMO, MOE d'exécution et DET,
études thermiques RE2020, plans de structure et notes de calcul.

Territoire : Le Havre, Seine-Maritime, Eure, Calvados. Contrainte locale forte :
le centre reconstruit Perret est classé UNESCO, d'où des avis fréquents de
l'architecte des Bâtiments de France. PLUi Le Havre Seine Métropole, 54 communes.
Sols argileux sur plusieurs secteurs, étude géotechnique souvent déterminante.

Chantiers réels citables : centre socioculturel et mosquée Maryam au Havre
(MOE TCE, en cours, six entreprises) ; quai Bérigny à Fécamp (OPC et ARL,
84 logements, bailleur social) ; quatre maisons individuelles au Havre (livré).

Positionnement : indépendance totale, aucune commission perçue des entreprises,
prix détaillé lot par lot, le client signe directement avec chaque entreprise.
"""

REGLES = """
Règles de rédaction, strictes :

- Français, vouvoiement, ton direct et professionnel. Pas de superlatifs
  commerciaux ni de formules creuses du type « votre partenaire de confiance ».
- Commencer par le problème concret du lecteur, pas par une présentation du cabinet.
- Donner des éléments vérifiables : seuils réglementaires, délais, procédures.
  Si un chiffre n'est pas dans le contexte fourni, ne pas l'inventer : rester
  qualitatif ou écrire que cela dépend du projet.
- Ne jamais annoncer de prix précis. Les honoraires se situent entre 6 et 12 %
  du montant des travaux, les missions ponctuelles sont au forfait, point.
- Ne pas répéter le mot-clé mécaniquement. Une fois dans le titre, une fois dans
  le H1 si c'est naturel, et c'est tout.
- Le titre fait moins de 60 caractères, la meta entre 140 et 160.
- Le H1 doit être différent du titre.
- Entre 3 et 5 blocs, et entre 2 et 4 questions de FAQ tirées de vraies
  interrogations de maîtres d'ouvrage.

Répondre UNIQUEMENT par un objet JSON valide, sans texte autour et sans
balises de code, à ce format exact :

{
  "slug": "en-minuscules-avec-tirets",
  "titre": "…",
  "h1": "…",
  "meta": "…",
  "motCle": "…",
  "cible": "particulier | professionnel | les-deux",
  "ctaTexte": "verbe à l'infinitif, contextualisé",
  "chapo": "2 phrases qui posent le problème",
  "blocs": [{"titre": "…", "texte": "…", "liste": ["…"]}],
  "faq": [{"q": "…", "r": "…"}],
  "lies": ["slug-existant-1", "slug-existant-2"]
}
"""


def mots_cles_existants() -> set[str]:
    src = (RACINE / "content" / "site.ts").read_text(encoding="utf-8")
    cles = {m.lower() for m in re.findall(r'motCle:\s*"([^"]+)"', src)}
    if FICHIER.exists():
        for p in json.loads(FICHIER.read_text(encoding="utf-8")):
            cles.add(p.get("motCle", "").lower())
    return cles


def slugs_existants() -> list[str]:
    src = (RACINE / "content" / "site.ts").read_text(encoding="utf-8")
    return re.findall(r'slug:\s*"([^"]+)"', src)


def rediger(requete: str, impressions: int, position: float, slugs: list[str]) -> dict | None:
    from anthropic import Anthropic
    client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    prompt = f"""{CONTEXTE}

Rédigez une page pour le site d'ID Maîtrise ciblant la requête : « {requete} »

Données Search Console : {impressions} impressions, position moyenne {position:.0f},
aucune page du site ne traite aujourd'hui cette requête.

Slugs déjà utilisés sur le site, à réutiliser pour le champ "lies" (2 ou 3 maximum,
les plus pertinents) : {", ".join(slugs[:40])}

{REGLES}"""

    r = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=3000,
        messages=[{"role": "user", "content": prompt}],
    )
    texte = "".join(b.text for b in r.content if b.type == "text").strip()
    texte = re.sub(r"^```(?:json)?|```$", "", texte, flags=re.M).strip()
    try:
        return json.loads(texte)
    except json.JSONDecodeError as e:
        print(f"  ! JSON invalide pour « {requete} » : {e}")
        return None


def valider(page: dict, cles: set[str], slugs: list[str]) -> list[str]:
    """Refuse une page plutôt que de publier quelque chose de bancal."""
    erreurs = []
    for champ in ("slug", "titre", "h1", "meta", "motCle", "chapo", "blocs"):
        if not page.get(champ):
            erreurs.append(f"champ « {champ} » manquant")
    if page.get("motCle", "").lower() in cles:
        erreurs.append(f"mot-clé « {page['motCle']} » déjà utilisé — cannibalisation")
    if page.get("slug") in slugs:
        erreurs.append(f"slug « {page['slug']} » déjà pris")
    if len(page.get("titre", "")) > 65:
        erreurs.append(f"titre trop long ({len(page['titre'])} caractères)")
    if not 120 <= len(page.get("meta", "")) <= 175:
        erreurs.append(f"meta hors format ({len(page.get('meta',''))} caractères)")
    if page.get("titre") == page.get("h1"):
        erreurs.append("le H1 est identique au titre")
    if len(page.get("blocs", [])) < 3:
        erreurs.append("moins de 3 blocs de contenu")
    return erreurs


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--nb", type=int, default=2, help="nombre de brouillons (2 par semaine maximum)")
    a = ap.parse_args()

    if not OPPORTUNITES.exists():
        sys.exit("Lancez d'abord seo/analyse.py")

    opp = pd.read_csv(OPPORTUNITES, sep=";")
    manquantes = opp[opp.type == "PAGE_MANQUANTE"].head(a.nb)
    if not len(manquantes):
        print("Aucune page à créer. Rien à faire.")
        sys.exit(0)

    cles, slugs = mots_cles_existants(), slugs_existants()
    deja = json.loads(FICHIER.read_text(encoding="utf-8")) if FICHIER.exists() else []
    nouvelles = []

    for _, r in manquantes.iterrows():
        print(f"\n→ « {r.requete} » ({r.impressions} impressions, position {r.position:.0f})")
        page = rediger(r.requete, int(r.impressions), float(r.position), slugs)
        if not page:
            continue
        erreurs = valider(page, cles, slugs)
        if erreurs:
            print("  ✗ rejetée :")
            for e in erreurs:
                print(f"    · {e}")
            continue
        page["brouillon"] = True
        page["source"] = {"requete": r.requete, "impressions": int(r.impressions),
                          "position": float(r.position), "gain_estime": float(r.gain_estime)}
        nouvelles.append(page)
        cles.add(page["motCle"].lower())
        slugs.append(page["slug"])
        print(f"  ✓ /{page['slug']} — {page['titre']}")

    if nouvelles:
        FICHIER.parent.mkdir(parents=True, exist_ok=True)
        FICHIER.write_text(json.dumps(deja + nouvelles, ensure_ascii=False, indent=2),
                           encoding="utf-8")
        print(f"\n{len(nouvelles)} brouillon(s) écrits dans {FICHIER.relative_to(RACINE)}")
        print("Ils ne seront visibles sur le site qu'une fois \"brouillon\" passé à false.")
    else:
        print("\nAucun brouillon retenu.")
