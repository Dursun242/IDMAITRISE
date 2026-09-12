// app/api/contact/route.ts — réception des demandes de devis.
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Instanciation paresseuse : sinon le build échoue quand la variable
// d'environnement n'est pas encore définie (premier déploiement Vercel).
let _resend: Resend | null = null;
function client() {
  if (!_resend) {
    const k = process.env.RESEND_API_KEY;
    if (!k) throw new Error("RESEND_API_KEY manquante");
    _resend = new Resend(k);
  }
  return _resend;
}

// Limitation simple en mémoire (suffisante pour ce volume ; passer à Upstash si besoin).
const vus = new Map<string, number[]>();
function trop(ip: string) {
  const now = Date.now();
  const l = (vus.get(ip) || []).filter((t) => now - t < 3600_000);
  l.push(now); vus.set(ip, l);
  return l.length > 5;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "inconnue";
    if (trop(ip)) return NextResponse.json({ error: "Trop de demandes" }, { status: 429 });

    const d = await req.json();
    if (d._hp) return NextResponse.json({ ok: true });           // honeypot
    if (!d.nom || !d.email || !d.tel)
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });

    const esc = (s: unknown) => String(s ?? "").replace(/[<>]/g, "");
    const lignes = [
      ["Nom", d.nom], ["Téléphone", d.tel], ["E-mail", d.email],
      ["Type de projet", d.type], ["Commune", d.ville],
      ["Page d'origine", d.contexte],
    ].filter(([, v]) => v);

    await client().emails.send({
      from: process.env.CONTACT_FROM!,
      to: process.env.CONTACT_TO!,
      replyTo: esc(d.email),
      subject: `Devis — ${esc(d.nom)} — ${esc(d.type || d.contexte || "site")}`,
      html: `
        <h2 style="font-family:sans-serif">Nouvelle demande de devis</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          ${lignes.map(([k, v]) =>
            `<tr><td style="padding:6px 14px 6px 0;color:#5A6B70">${k}</td>
                 <td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join("")}
        </table>
        <h3 style="font-family:sans-serif">Projet</h3>
        <p style="font-family:sans-serif;white-space:pre-wrap">${esc(d.message) || "(non renseigné)"}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
