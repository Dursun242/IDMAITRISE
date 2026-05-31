import type { Metadata } from "next"
import { ContactForm } from "@/components/ContactForm"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact — Maître d'œuvre au Havre",
  description:
    "Contactez ID Maîtrise, maître d'œuvre indépendant au Havre. Devis gratuit pour vos projets de construction, extension et rénovation en Normandie.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <section className="relative border-b border-ink/10">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.98] tracking-tightest sm:text-7xl">
            Parlons de
            <br />
            <span className="italic-accent text-ember">votre projet.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/65">
            Construction, extension, rénovation, permis de construire :
            décrivez-nous votre projet en quelques lignes, on revient vers vous
            sous 24–48 h ouvrées.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="rounded-3xl border border-ink/10 bg-paper-warm p-8 sm:p-10">
            <h2 className="font-display text-2xl font-medium tracking-tight">
              Décrivez votre projet
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              Plus c'est détaillé, plus nous serons précis dans notre réponse.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                Appeler le cabinet
              </div>
              <a
                href={`tel:${site.phone}`}
                className="mt-2 block font-display text-4xl font-medium tracking-tightest text-ink hover:text-ember"
              >
                {site.phoneDisplay}
              </a>
              <p className="mt-2 text-sm text-ink/55">{site.hoursDisplay}</p>
            </div>

            <div className="dashed-rule" />

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                Email
              </div>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-lg font-medium text-ink hover:text-ember"
              >
                {site.email}
              </a>
            </div>

            <div className="dashed-rule" />

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                Studio
              </div>
              <p className="mt-2 text-lg leading-snug">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </p>
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-block text-sm font-medium text-ember"
              >
                Itinéraire Google Maps →
              </a>
            </div>

            <div className="dashed-rule" />

            <div className="rounded-2xl bg-ink p-6 text-paper">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/50">
                Zones desservies
              </div>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">
                {site.areaServed.join("  ·  ")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
