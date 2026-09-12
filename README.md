# Site ID Maîtrise — Next.js 15

Refonte du site id-maitrise.com : maîtrise d'œuvre TCE, Le Havre.
Objectif : référencement naturel sur les intentions commerciales et maximisation
des demandes de devis.

## Démarrage

```bash
npm install
cp .env.example .env.local     # puis renseigner RESEND_API_KEY
npm run dev
```

## Variables d'environnement (Vercel → Settings → Environment Variables)

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Envoi des demandes de devis |
| `CONTACT_TO` | Adresse de réception |
| `CONTACT_FROM` | Expéditeur vérifié dans Resend (domaine à authentifier SPF/DKIM) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.id-maitrise.com` |

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Ajouter ou modifier une prestation, un guide, une zone, un chantier | `content/site.ts` — **un seul fichier** |
| Coordonnées, SIRET, réseaux sociaux | `content/site.ts` → `SITE` |
| Redirections de l'ancien site | `lib/redirections.json` (270 entrées) |
| Métadonnées et données structurées | `lib/seo.tsx` |
| Formulaire, header, footer | `components/index.tsx` |

Le sitemap (`/sitemap.xml`) se régénère automatiquement à chaque ajout
dans `content/site.ts`. Aucune action manuelle.

## Règle anti-cannibalisation

C'est ce qui a plombé l'ancien site : cinq pages visaient « AMO », six visaient
« extension de maison ». Elles se concurrençaient entre elles.

**Avant de créer une page, vérifier que son champ `motCle` n'existe nulle part
ailleurs dans `content/site.ts`.** Si le mot-clé existe déjà, enrichir la page
existante plutôt que d'en créer une nouvelle.

## Bascule en production — ordre des opérations

1. Déployer sur Vercel, vérifier que `/sitemap.xml` et `/robots.txt` répondent.
2. Tester une dizaine de redirections depuis le CSV (les lignes marquées P1).
3. Basculer le DNS.
4. Search Console : soumettre `https://www.id-maitrise.com/sitemap.xml`.
5. Search Console : coller le code de vérification dans `app/layout.tsx` → `verification.google`.
6. Surveiller le rapport Pages pendant trois semaines. Une baisse de trafic
   de deux à six semaines est normale après une refonte.
7. Ne pas toucher aux URL pendant six mois.

## Contenu à produire ensuite

Les six premières prestations et les guides principaux sont rédigés.
Les autres pages ont une trame en place à enrichir — priorité aux pages
qui captent déjà des impressions sans clic (voir le CSV de redirections).

Ce qui manque et qui pèse le plus sur la conversion :
- **photos de chantier réelles** (les visuels stock décrédibilisent)
- **avis clients** (Google Business Profile, puis affichage sur le site)

## Typographie

**Lato**, en 300 / 400 / 700 / 900. C'est la police du logo : le site et l'identité
ne font qu'un.

Deux réglages à ne pas défaire, ils sont dans `app/globals.css` :

- les grands titres sont en **900** (`font-black`), pas en 700. En 700, Lato
  paraît molle sur un `h1` de 4 rem ;
- l'interlettrage des titres est resserré à `-0.035em`. Lato est dessinée
  pour du texte courant, elle s'espace trop en grande taille.

Chargée via `next/font/google`, donc auto-hébergée au build : aucune requête
vers Google au chargement des pages, et pas de bandeau cookies pour ça.

## Analyse SEO automatisée

Un workflow hebdomadaire lit la Search Console, détecte les opportunités et
ouvre une pull request avec un rapport et, éventuellement, des brouillons de
pages. Rien n'est publié sans validation manuelle.

Voir `seo/README.md` pour la mise en place et le cycle de validation.
