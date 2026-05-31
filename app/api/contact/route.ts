import { NextResponse } from "next/server"
import { site } from "@/lib/site"

const MAX_TOTAL_BYTES = 4 * 1024 * 1024 // 4 Mo, aligné avec ContactForm
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
])

export async function POST(req: Request) {
  // On accepte le multipart (avec pièces jointes) et, par sécurité, le JSON.
  const contentType = req.headers.get("content-type") ?? ""

  let name = ""
  let email = ""
  let phone = ""
  let message = ""
  let company = ""
  let elapsed = 0
  const attachments: { filename: string; content: string }[] = []

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData().catch(() => null)
    if (!form) {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
    }
    name = String(form.get("name") ?? "")
    email = String(form.get("email") ?? "")
    phone = String(form.get("phone") ?? "")
    message = String(form.get("message") ?? "")
    company = String(form.get("company") ?? "")
    elapsed = Number(form.get("_elapsed") ?? 0)

    const files = form
      .getAll("attachments")
      .filter((f): f is File => f instanceof File && f.size > 0)

    let total = 0
    for (const file of files) {
      total += file.size
      if (total > MAX_TOTAL_BYTES) {
        return NextResponse.json(
          { error: "Pièces jointes trop volumineuses (4 Mo max au total)." },
          { status: 413 },
        )
      }
      if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json(
          { error: `Type de fichier non autorisé : ${file.name}.` },
          { status: 415 },
        )
      }
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({ filename: file.name, content: buffer.toString("base64") })
    }
  } else {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
    }
    name = String(body.name ?? "")
    email = String(body.email ?? "")
    phone = String(body.phone ?? "")
    message = String(body.message ?? "")
    company = String(body.company ?? "")
    elapsed = Number(body._elapsed ?? 0)
  }

  if (!email || !message) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 })
  }

  // Anti-spam : honeypot rempli OU soumission trop rapide (< 2,5 s) => on
  // renvoie un succès factice pour ne pas informer le bot, sans rien envoyer.
  if (company.trim() !== "" || (elapsed > 0 && elapsed < 2500)) {
    return NextResponse.json({ ok: true, note: "ignored" })
  }

  // Garde-fou simple : longueur de message plausible.
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message trop long." }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  // Sans clé Resend, on journalise (le site fonctionne quand même).
  if (!key) {
    console.log("[contact] RESEND_API_KEY absente — message reçu:", {
      name,
      email,
      phone,
      message,
      attachments: attachments.map((a) => a.filename),
    })
    return NextResponse.json({ ok: true, note: "logged" })
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Remplace l'expéditeur par une adresse de TON domaine vérifié dans Resend.
      from: "Site ID Maîtrise <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `Nouveau contact — ${name || "site"}`,
      text:
        `Nom : ${name || "-"}\n` +
        `Email : ${email}\n` +
        `Téléphone : ${phone || "-"}\n\n` +
        `${message}`,
      // Resend attend les pièces jointes en base64 dans le champ `attachments`.
      ...(attachments.length > 0 ? { attachments } : {}),
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: "Envoi impossible." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
