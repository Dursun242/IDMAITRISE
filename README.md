# ID Maîtrise — site Next.js

Site de **ID Maîtrise**, maître d'œuvre indépendant au Havre.
Pensé pour le SEO local et pour **s'auto-alimenter en articles** chaque semaine.

Stack : **Next.js 15** (App Router, TypeScript) · **Tailwind CSS** · articles en **Markdown** · déploiement **Vercel** · moteur d'articles via **GitHub Actions**.

---

## 1. Lancer en local

Prérequis : Node 18+ (idéalement 20).

```bash
npm install
cp .env.example .env.local   # puis remplis les variables (voir plus bas)
npm run dev                  # http://localhost:3000
```

Build de production :

```bash
npm run build && npm start
```

---

## 2. Structure

```
app/                  Pages (App Router)
  page.tsx            Accueil
  blog/               Liste + article [slug]
  [service]/          Pages prestations (1 page = 1 fichier dans content/services)
  contact/            Page contact + formulaire
  api/contact/        Réception du formulaire (Resend)
  sitemap.ts          Sitemap auto (pages + services + articles)
  robots.ts           Robots auto
components/           Header, Footer, ContactForm, JsonLd
lib/
  site.ts             ⚙️ Coordonnées, réseaux, liste des prestations (À ÉDITER)
  content.ts          Lecture des fichiers Markdown
content/
  blog/               Les articles (.md) — alimentés à la main OU automatiquement
  services/           Les pages prestations (.md)
  keywords-backlog.json  File d'attente des mots-clés à traiter
scripts/
  generate-article.mjs   Génère 1 article depuis le backlog
.github/workflows/
  weekly-article.yml     Lance la génération chaque semaine -> Pull Request
```

> **Pour modifier tes infos** (téléphone, adresse, prestations, réseaux) : tout est dans `lib/site.ts`.

---

## 3. Déployer sur Vercel

1. Crée un dépôt GitHub et pousse ce dossier.
2. Sur [vercel.com](https://vercel.com) → **New Project** → importe le dépôt.
3. Dans **Settings → Environment Variables**, ajoute :
   - `NEXT_PUBLIC_SITE_URL` = `https://www.id-maitrise.com` (l'URL finale du site)
   - `RESEND_API_KEY` = ta clé Resend (optionnel — sans elle, le formulaire journalise au lieu d'envoyer)
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `id-maitrise.com` (optionnel — active l'analytics Plausible, sans cookies ni bannière ; laisse vide pour le désactiver)
4. Deploy. À chaque `git push`, Vercel redéploie tout seul.

---

## 4. Le moteur d'articles (le cœur du projet)

Chaque semaine, une **GitHub Action** prend le prochain mot-clé `todo` de
`content/keywords-backlog.json`, génère un article Markdown et **ouvre une Pull
Request**. Tu relis, tu ajustes si besoin, tu **merges** → l'article est publié
au prochain déploiement.

> ⚠️ La Pull Request (au lieu d'une publication directe) est volontaire :
> une relecture humaine évite la pénalité Google « contenu de masse » et garde
> la qualité. C'est ce qui fait la différence sur la durée.

### Configurer les secrets GitHub

Dans le dépôt → **Settings → Secrets and variables → Actions** :

**Secrets :**
- `ANTHROPIC_API_KEY` — ta clé Claude (fournisseur par défaut)
- `MISTRAL_API_KEY` — (optionnel) si tu passes sur Mistral

**Variables :**
- `AI_PROVIDER` = `anthropic` (défaut) ou `mistral`
- `ANTHROPIC_MODEL` = ex. `claude-3-5-sonnet-latest` (optionnel)
- `MISTRAL_MODEL` = ex. `mistral-small-latest` (optionnel)

### Lancer / tester

- Manuel : onglet **Actions** → « Article SEO hebdomadaire » → **Run workflow**.
- En local : `npm run generate:article` (avec `ANTHROPIC_API_KEY` dans `.env.local`).

### Ajouter des mots-clés

Édite `content/keywords-backlog.json` :

```json
{ "keyword": "ravalement de façade le havre", "intent": "Obligations, autorisation et coût d'un ravalement au Havre.", "status": "todo" }
```

Le script traite le premier `todo`, puis le passe à `done`.

### Changer de fournisseur IA (Claude ↔ Mistral)

Une seule variable : `AI_PROVIDER`. Aucun code à toucher.

---

## 5. Migration depuis l'ancien site (IMPORTANT)

Le site actuel (JALIS) s'arrête l'an prochain. Deux choses à ne PAS rater :

1. **Le nom de domaine.** Vérifie qui possède `id-maitrise.com` (WHOIS). S'il est
   au nom de l'agence, fais-le transférer à ton nom **maintenant**, pas dans 11 mois.
2. **Les redirections 301.** Au moment de basculer le domaine vers ce nouveau
   site, ajoute dans `next.config.mjs` une redirection `permanent: true` de chaque
   ancienne URL vers la nouvelle (un exemple est déjà en commentaire). Sans ça,
   tu perds le référencement durement acquis.

> On construira la table de redirections ensemble à partir d'un crawl de l'ancien site.

---

## 6. Prochaines étapes prévues

- [ ] Étoffer les pages prestations « money pages » une par une (permis & déclaration préalable en priorité)
- [ ] Fusionner les pages qui se cannibalisent sur l'ancien site
- [ ] Générer la table de redirections 301
- [ ] Optimiser la fiche Google Business (priorité en local)
- [ ] Ajouter un visuel `og.jpg` (partage réseaux) à la racine de `public/`
