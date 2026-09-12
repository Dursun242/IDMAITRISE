# Montage SEO automatisé

Chaque lundi : lecture de la Search Console, détection des opportunités,
rédaction de brouillons, ouverture d'une pull request. **Rien n'est publié
sans votre validation.**

## Pourquoi pas de publication automatique

Google sanctionne la production de contenu à grande échelle sans valeur
ajoutée (politique « scaled content abuse », mars 2024). Un site qui publie
trois pages par semaine sans relecture s'expose à un déclassement manuel.

Le montage s'arrête donc à la pull request. Compter dix à quinze minutes de
relecture par page : vérifier les faits, ajuster le ton, ajouter ce que vous
seul savez de votre métier. C'est ce passage qui fait la différence entre une
page qui rank et une page qui pénalise le site.

## Mise en place

### 1. Accès à la Search Console

1. Console Google Cloud → nouveau projet → activer **Search Console API**.
2. Créer un **compte de service**, générer une clé JSON.
3. Dans la Search Console → Paramètres → Utilisateurs → ajouter l'adresse
   e-mail du compte de service en lecture seule.

### 2. Secrets du dépôt GitHub

`Settings → Secrets and variables → Actions`

| Secret | Valeur |
|---|---|
| `GSC_SERVICE_ACCOUNT` | le contenu complet du fichier JSON de la clé |
| `GSC_SITE_URL` | `https://www.id-maitrise.com/` (avec le slash final) |
| `ANTHROPIC_API_KEY` | votre clé API Anthropic |

### 3. Vérification

`Actions → Analyse SEO hebdomadaire → Run workflow`, avec `0` brouillon
pour tester l'analyse seule.

## En local

```bash
pip install -r seo/requirements.txt

# Depuis un export manuel de la Search Console
python seo/analyse.py --csv ~/Téléchargements/export-gsc

# Depuis l'API
export GSC_SERVICE_ACCOUNT="$(cat cle.json)"
python seo/analyse.py --api --jours 90

# Rédiger deux brouillons
export ANTHROPIC_API_KEY=sk-...
python seo/rediger.py --nb 2
```

## Ce que l'analyse détecte

| Type | Signification | Action |
|---|---|---|
| `CANNIBALISATION` | plusieurs URL sur la même requête | en désigner une, dé-optimiser les autres |
| `PAGE_MANQUANTE` | du volume, aucune page ne cible | créer une page dédiée |
| `CTR_FAIBLE` | bien placée, peu cliquée | réécrire titre et meta |
| `QUICK_WIN` | position 4 à 25, page existante | enrichir la page |

La cannibalisation n'est détectable que via l'API : elle croise requête et
page, ce que les exports manuels ne font pas.

### Filtres appliqués

Sont écartées les requêtes hors territoire (Paris, Lyon, Île-de-France…) et
les marques de confrères ou partenaires. Elles génèrent des impressions mais
aucun client possible. Les listes sont en haut de `seo/analyse.py`, à
compléter au fil du temps.

## Cycle de validation d'un brouillon

1. La pull request arrive avec le rapport en description.
2. Les brouillons sont dans `content/pages-generees.json`, avec
   `"brouillon": true` — invisibles sur le site et absents du sitemap.
3. Vous relisez, corrigez, vérifiez chaque affirmation technique.
4. Vous passez `"brouillon": false`.
5. Vous fusionnez. La page part en ligne et entre au sitemap.

Un brouillon non validé ne coûte rien : laissez-le, ou supprimez-le.

## Rythme conseillé

Deux pages par semaine au maximum, et seulement si vous avez le temps de les
relire correctement. Mieux vaut une page par mois travaillée que huit pages
approximatives.

Traitez d'abord les `CTR_FAIBLE` : ce sont des titres à réécrire, cinq minutes
de travail pour un gain immédiat, sans risque et sans attendre que Google
réévalue une nouvelle page.
