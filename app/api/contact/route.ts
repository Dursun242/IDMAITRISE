import { NextResponse } from "next/server"
import { site } from "@/lib/site"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body || !body.email || !body.message) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  // Sans clé Resend, on journalise (le site fonctionne quand même).
  if (!key) {
    console.log("[contact] RESEND_API_KEY absente — message reçu:", body)
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
      reply_to: body.email,
      subject: `Nouveau contact — ${body.name ?? "site"}`,
      text:
        `Nom : ${body.name ?? "-"}\n` +
        `Email : ${body.email}\n` +
        `Téléphone : ${body.phone ?? "-"}\n\n` +
        `${body.message}`,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: "Envoi impossible." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
