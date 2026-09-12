#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Analyse des données Search Console et détection des opportunités.

Deux modes :

  # 1. Depuis les exports CSV téléchargés à la main
  python seo/analyse.py --csv chemin/vers/dossier-export

  # 2. Depuis l'API (utilisé par le workflow hebdomadaire)
  python seo/analyse.py --api

Produit :
  seo/data/opportunites.csv   toutes les opportunités, triées par gain estimé
  seo/rapport.md              le résumé lisible, commenté dans la pull request

Quatre familles d'opportunités :
  QUICK_WIN     position 4 à 20, volume réel — la page existe, il manque un cran
  CTR_FAIBLE    bien positionnée mais peu cliquée — titre et meta à réécrire
  PAGE_MANQUANTE requête avec du volume, aucune page ne la cible
  CANNIBALISATION plusieurs URL se disputent la même requête (API uniquement)
"""

import argparse, csv, json, os, re, sys, unicodedata
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from ctr_attendu import ctr_attendu, clics_potentiels

RACINE = Path(__file__).resolve().parent.parent
SORTIE = Path(__file__).parent / "data"
SORTIE.mkdir(parents=True, exist_ok=True)

# Seuils. Ajustez-les si le site grossit : ils sont calibrés pour un site
# qui fait environ 120 000 impressions sur 16 mois.
MIN_IMPRESSIONS = 60        # en dessous, le bruit domine
POSITION_MAX = 25           # au-delà, remonter demande plus qu'une retouche
GAIN_MIN = 1.0              # on ignore les opportunités à moins d'un clic/an

# Requêtes hors territoire ou hors métier : elles génèrent des impressions
# mais aucun client possible. Les cibler ferait perdre du temps et diluerait
# la pertinence locale du site.
HORS_SUJET = re.compile(
    r"\b(paris|ile[- ]de[- ]france|hauts?[- ]de[- ]seine|lyon|marseille|bordeaux|lille|"
    r"toulouse|nantes|nice|strasbourg|rennes|montpellier|guadeloupe|martinique|reunion|"
    r"belgique|suisse|maroc|tunisie|algerie|canada|quebec)\b", re.I)

# Marques de confrères et de partenaires : on rankait dessus via les anciennes
# pages de netlinking. Ce trafic ne se transforme pas en devis.
MARQUES_TIERS = re.compile(
    r"\b(amoyal|laurent martin|arp|ffb|muresol|lucca|polat|ahmes|marceau|scpi|jalis)\b", re.I)


# ───────────────────────── Lecture du modèle de contenu ─────────────────────────
def normaliser(t: str) -> str:
    t = unicodedata.normalize("NFKD", str(t or "")).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9 ]", " ", t.lower())


def pages_existantes() -> list[dict]:
    """Extrait slug, motCle et titre depuis content/site.ts.

    On lit le TypeScript au lieu de l'exécuter : le fichier est la source de
    vérité du site, et le dupliquer en JSON créerait deux vérités.
    """
    src = (RACINE / "content" / "site.ts").read_text(encoding="utf-8")
    pages = []
    for bloc in re.findall(r"\{\s*slug:\s*\"([^\"]+)\".*?motCle:\s*\"([^\"]+)\"", src, re.S):
        pages.append({"slug": bloc[0], "motCle": bloc[1], "mots": set(normaliser(bloc[1]).split())})
    # Les pages de zone n'ont pas de motCle mais ciblent « ville + métier »
    for slug, ville in re.findall(r"slug:\s*\"([^\"]+)\",\s*ville:\s*\"([^\"]+)\"", src):
        pages.append({"slug": f"zones/{slug}", "motCle": f"maitre d oeuvre {ville}",
                      "mots": set(normaliser(f"maitre oeuvre {ville}").split())})
    return pages


def page_cible(requete: str, pages: list[dict]) -> tuple[str, float]:
    """Meilleure page existante pour cette requête, et son score de recouvrement."""
    mots = set(normaliser(requete).split()) - {"de", "du", "des", "la", "le", "les", "un",
                                               "une", "pour", "au", "aux", "en", "d", "l", "a"}
    if not mots:
        return "", 0.0
    best, score = "", 0.0
    for p in pages:
        commun = mots & p["mots"]
        s = len(commun) / len(mots)
        if s > score:
            best, score = p["slug"], s
    return best, score


# ───────────────────────── Chargement des données ─────────────────────────
def depuis_csv(dossier: Path) -> pd.DataFrame:
    """Lit l'export manuel de la Search Console (Requêtes.csv)."""
    candidats = list(dossier.glob("Reque*.csv")) + list(dossier.glob("Requ*.csv")) \
        + list(dossier.glob("Queries.csv"))
    if not candidats:
        sys.exit(f"Aucun fichier de requêtes trouvé dans {dossier}")
    df = pd.read_csv(candidats[0])
    df.columns = ["requete", "clics", "impressions", "ctr", "position"][:len(df.columns)]
    df["requete"] = df["requete"].astype(str).str.replace(r"[\r\n]+", " ", regex=True).str.strip()
    df["ctr"] = df["ctr"].astype(str).str.rstrip("%").astype(float) / 100
    df["page"] = ""            # l'export manuel ne croise pas requête et page
    return df


def depuis_api(jours: int = 90) -> pd.DataFrame:
    """Requête l'API Search Console avec la dimension croisée requête × page.

    C'est ce croisement qui permet de détecter la cannibalisation, impossible
    à voir dans les exports manuels.
    """
    from datetime import date, timedelta
    from google.oauth2 import service_account
    from googleapiclient.discovery import build

    creds_json = os.environ.get("GSC_SERVICE_ACCOUNT")
    site = os.environ.get("GSC_SITE_URL", "https://www.id-maitrise.com/")
    if not creds_json:
        sys.exit("Variable GSC_SERVICE_ACCOUNT absente.")

    creds = service_account.Credentials.from_service_account_info(
        json.loads(creds_json),
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
    api = build("searchconsole", "v1", credentials=creds)

    fin = date.today() - timedelta(days=3)      # les 3 derniers jours sont incomplets
    debut = fin - timedelta(days=jours)

    lignes, depart = [], 0
    while True:
        rep = api.searchanalytics().query(siteUrl=site, body={
            "startDate": debut.isoformat(), "endDate": fin.isoformat(),
            "dimensions": ["query", "page"], "rowLimit": 25000, "startRow": depart,
            "type": "web",
        }).execute()
        rows = rep.get("rows", [])
        if not rows:
            break
        for r in rows:
            lignes.append({"requete": r["keys"][0], "page": r["keys"][1],
                           "clics": r["clicks"], "impressions": r["impressions"],
                           "ctr": r["ctr"], "position": r["position"]})
        if len(rows) < 25000:
            break
        depart += 25000

    return pd.DataFrame(lignes)


# ───────────────────────── Détection des opportunités ─────────────────────────
def analyser(df: pd.DataFrame) -> pd.DataFrame:
    pages = pages_existantes()
    opportunites = []

    # Agrégation par requête (l'API renvoie une ligne par couple requête × page)
    agg = df.groupby("requete").agg(
        clics=("clics", "sum"), impressions=("impressions", "sum"),
        position=("position", "mean"), urls=("page", lambda s: sorted({x for x in s if x})),
    ).reset_index()

    for _, r in agg.iterrows():
        if r.impressions < MIN_IMPRESSIONS:
            continue
        if HORS_SUJET.search(r.requete) or MARQUES_TIERS.search(r.requete):
            continue

        slug, recouvrement = page_cible(r.requete, pages)
        gain = clics_potentiels(r.impressions, r.position, position_visee=5)
        ctr_reel = r.clics / r.impressions if r.impressions else 0
        attendu = ctr_attendu(r.position)

        # 1. Cannibalisation — plusieurs URL sur la même requête (API uniquement)
        if len(r.urls) > 1:
            opportunites.append(dict(
                type="CANNIBALISATION", requete=r.requete, page_cible=slug,
                position=round(r.position, 1), impressions=int(r.impressions),
                clics=int(r.clics), gain_estime=round(gain, 1),
                action=f"{len(r.urls)} URL se disputent cette requête. En désigner une "
                       f"et rediriger ou dé-optimiser les autres.",
                detail=" | ".join(r.urls[:4])))
            continue

        # 2. Page manquante — du volume, aucune page ne cible vraiment la requête
        if recouvrement < 0.45 and r.impressions >= MIN_IMPRESSIONS * 2:
            opportunites.append(dict(
                type="PAGE_MANQUANTE", requete=r.requete, page_cible="",
                position=round(r.position, 1), impressions=int(r.impressions),
                clics=int(r.clics), gain_estime=round(gain, 1),
                action="Aucune page ne cible cette requête. Créer une page dédiée.",
                detail=f"page la plus proche : {slug or 'aucune'} ({recouvrement:.0%})"))
            continue

        # 3. CTR faible — bien placée, peu cliquée : c'est le titre qui pèche
        if r.position <= 12 and ctr_reel < attendu * 0.55 and r.impressions >= 150:
            manque = (attendu - ctr_reel) * r.impressions
            opportunites.append(dict(
                type="CTR_FAIBLE", requete=r.requete, page_cible=slug,
                position=round(r.position, 1), impressions=int(r.impressions),
                clics=int(r.clics), gain_estime=round(manque, 1),
                action=f"Position {r.position:.0f} mais CTR de {ctr_reel:.1%} au lieu de "
                       f"{attendu:.1%} attendu. Réécrire le titre et la meta description.",
                detail=""))
            continue

        # 4. Quick win — la page existe, il manque quelques positions
        if 4 <= r.position <= POSITION_MAX and gain >= GAIN_MIN:
            opportunites.append(dict(
                type="QUICK_WIN", requete=r.requete, page_cible=slug,
                position=round(r.position, 1), impressions=int(r.impressions),
                clics=int(r.clics), gain_estime=round(gain, 1),
                action="Enrichir la page existante : traiter la requête explicitement, "
                       "ajouter une section ou une question de FAQ, renforcer le maillage.",
                detail=f"recouvrement avec {slug} : {recouvrement:.0%}"))

    out = pd.DataFrame(opportunites)
    return out.sort_values("gain_estime", ascending=False) if len(out) else out


# ───────────────────────── Rapport ─────────────────────────
def rapport(opp: pd.DataFrame, source: str) -> str:
    from datetime import date
    if not len(opp):
        return "# Analyse SEO\n\nAucune opportunité au-dessus des seuils.\n"

    total = opp.gain_estime.sum()
    l = [f"# Analyse Search Console — {date.today().isoformat()}",
         "",
         f"Source : {source}. {len(opp)} opportunités détectées, "
         f"**{total:.0f} clics par période** de gain estimé si toutes étaient traitées.",
         "",
         "Le gain est calculé à impressions constantes, avec une courbe de CTR moyenne. "
         "C'est un ordre de grandeur pour prioriser, pas une prévision.",
         ""]

    libelles = {
        "PAGE_MANQUANTE": "Pages à créer",
        "CANNIBALISATION": "Cannibalisation à résoudre",
        "CTR_FAIBLE": "Titres et metas à réécrire",
        "QUICK_WIN": "Pages à enrichir",
    }
    for t in ["CANNIBALISATION", "PAGE_MANQUANTE", "CTR_FAIBLE", "QUICK_WIN"]:
        sous = opp[opp.type == t]
        if not len(sous):
            continue
        l += [f"## {libelles[t]} — {len(sous)} · gain estimé {sous.gain_estime.sum():.0f} clics", ""]
        l += ["| Requête | Pos. | Impr. | Clics | Gain | Action |", "|---|--:|--:|--:|--:|---|"]
        for _, r in sous.head(12).iterrows():
            l.append(f"| {r.requete} | {r.position} | {r.impressions} | {r.clics} | "
                     f"+{r.gain_estime:.0f} | {r.action} |")
        if len(sous) > 12:
            l.append(f"| … | | | | | *{len(sous)-12} autres dans opportunites.csv* |")
        l.append("")

    l += ["---", "",
          "**Rappel.** Rien n'est publié automatiquement. Les brouillons générés "
          "arrivent en pull request et doivent être relus avant fusion : une page "
          "publiée sans relecture vaut moins que pas de page du tout."]
    return "\n".join(l)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", type=str, help="dossier contenant l'export manuel de la Search Console")
    ap.add_argument("--api", action="store_true", help="interroger l'API Search Console")
    ap.add_argument("--jours", type=int, default=90)
    a = ap.parse_args()

    if a.api:
        df, source = depuis_api(a.jours), f"API Search Console, {a.jours} derniers jours"
    elif a.csv:
        df, source = depuis_csv(Path(a.csv)), f"export manuel ({a.csv})"
    else:
        sys.exit("Précisez --csv <dossier> ou --api")

    print(f"{len(df)} lignes chargées")
    opp = analyser(df)

    if len(opp):
        opp.to_csv(SORTIE / "opportunites.csv", index=False, sep=";", encoding="utf-8-sig")
    (Path(__file__).parent / "rapport.md").write_text(rapport(opp, source), encoding="utf-8")

    print(f"\n{len(opp)} opportunités · gain estimé {opp.gain_estime.sum() if len(opp) else 0:.0f} clics")
    if len(opp):
        print(opp.type.value_counts().to_string())
    print(f"\nRapport : seo/rapport.md")
