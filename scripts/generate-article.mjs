#!/usr/bin/env node
/**
 * Génère UN article SEO en Markdown à partir du prochain mot-clé "todo"
 * de content/keywords-backlog.json, puis marque ce mot-clé comme "done".
 *
 * Aucune dépendance : utilise fs + fetch (Node 18+).
 * Fournisseur IA : AI_PROVIDER = "anthropic" (défaut) ou "mistral".
 *
 * Le workflow GitHub ouvre ensuite une Pull Request avec le nouveau fichier,
 * pour que tu RELISES l'article avant publication (merge).
 */

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const BACKLOG = path.join(ROOT, "content", "keywords-backlog.json")
const BLOG_DIR = path.join(ROOT, "content", "blog")

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

const SYSTEM = `Tu es la plume éditoriale d'ID Maîtrise, cabinet de maîtrise d'œuvre indépendant basé au Havre (Seine-Maritime, Normandie).
Tu écris des articles de conseil utiles, précis et honnêtes pour des particuliers et professionnels qui ont un projet de construction, d'extension ou de rénovation.
Style : clair, concret, pédagogique, sans jargon inutile et sans superlatifs marketing. Tu n'inventes JAMAIS de chiffres réglementaires précis ; en cas de doute, tu restes général et tu invites à vérifier.`

function buildPrompt(item) {
  return `Rédige un article de blog optimisé SEO sur le mot-clé : "${item.keyword}".
Angle / intention : ${item.intent}

Contraintes :
- Langue : français.
- Longueur : 900 à 1200 mots.
- Ancrage local : Le Havre et la Normandie quand c'est pertinent.
- Structure : titres H2 (##) et sous-titres H3 (###), listes à puces quand utile.
- Ton utile et non promotionnel, SAUF un court paragraphe d'appel à l'action final mentionnant ID Maîtrise.
- Quand le sujet touche à la construction d'une maison, insère UN lien interne contextuel en Markdown vers /construction-maison-individuelle (texte d'ancre naturel).
- Commence le fichier par un bloc de front-matter YAML EXACTEMENT au format suivant :

---
title: "<titre accrocheur, 60 caractères max, contenant le mot-clé>"
description: "<meta description, 155 caractères max, contenant le mot-clé>"
date: "${today()}"
keywords: ["${item.keyword}"]
author: "ID Maîtrise"
---

- Puis le corps de l'article en Markdown.
- Réponds UNIQUEMENT avec le contenu du fichier Markdown (front-matter + corps).
- N'ajoute AUCUN texte avant ou après, et AUCUNE balise de code (pas de \`\`\`).`
}

async function callAnthropic(prompt) {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) throw new Error("ANTHROPIC_API_KEY manquante.")
  const model = process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest"
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4000,
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    }),
  })
  if (!res.ok) {
    throw new Error(`Anthropic ${res.status}: ${await res.text()}`)
  }
  const data = await res.json()
  return (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim()
}

async function callMistral(prompt) {
  const key = process.env.MISTRAL_API_KEY
  if (!key) throw new Error("MISTRAL_API_KEY manquante.")
  const model = process.env.MISTRAL_MODEL || "mistral-small-latest"
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4000,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: prompt },
      ],
    }),
  })
  if (!res.ok) {
    throw new Error(`Mistral ${res.status}: ${await res.text()}`)
  }
  const data = await res.json()
  return (data.choices?.[0]?.message?.content || "").trim()
}

function cleanOutput(text, item) {
  let out = text.trim()
  // Retire d'éventuelles balises de code
  out = out.replace(/^```(?:markdown|md)?\s*/i, "").replace(/```\s*$/i, "").trim()
  // Garantit un front-matter minimal si le modèle l'a oublié
  if (!out.startsWith("---")) {
    const fm =
      `---\n` +
      `title: "${item.keyword}"\n` +
      `description: "${item.intent}"\n` +
      `date: "${today()}"\n` +
      `keywords: ["${item.keyword}"]\n` +
      `author: "ID Maîtrise"\n` +
      `---\n\n`
    out = fm + out
  }
  return out + "\n"
}

async function main() {
  if (!fs.existsSync(BACKLOG)) {
    console.error("Backlog introuvable:", BACKLOG)
    process.exit(1)
  }
  const backlog = JSON.parse(fs.readFileSync(BACKLOG, "utf8"))
  const item = backlog.find((k) => k.status !== "done")
  if (!item) {
    console.log("✅ Backlog vide : aucun mot-clé 'todo'. Rien à générer.")
    process.exit(0)
  }

  const slug = slugify(item.keyword)
  const file = path.join(BLOG_DIR, slug + ".md")
  if (fs.existsSync(file)) {
    console.log(`Article déjà présent (${slug}.md). On marque 'done' et on s'arrête.`)
    item.status = "done"
    fs.writeFileSync(BACKLOG, JSON.stringify(backlog, null, 2) + "\n")
    process.exit(0)
  }

  const provider = (process.env.AI_PROVIDER || "anthropic").toLowerCase()
  console.log(`Mot-clé : "${item.keyword}" — fournisseur : ${provider}`)

  const prompt = buildPrompt(item)
  const raw = provider === "mistral" ? await callMistral(prompt) : await callAnthropic(prompt)
  if (!raw || raw.length < 200) {
    throw new Error("Réponse IA vide ou trop courte.")
  }

  const content = cleanOutput(raw, item)
  fs.mkdirSync(BLOG_DIR, { recursive: true })
  fs.writeFileSync(file, content)
  console.log(`📝 Écrit : content/blog/${slug}.md`)

  item.status = "done"
  fs.writeFileSync(BACKLOG, JSON.stringify(backlog, null, 2) + "\n")
  console.log(`✅ Mot-clé marqué 'done'.`)

  // Pour les logs / étapes suivantes du workflow
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${slug}\n`)
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `keyword=${item.keyword}\n`)
  }
}

main().catch((err) => {
  console.error("❌ Échec génération :", err.message)
  process.exit(1)
})
