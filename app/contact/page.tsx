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
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">
        Parlons de votre projet
      </h1>
      <p className="mt-3 max-w-2xl text-ink/65">
        Construction, extension, rénovation, permis de construire : décrivez-nous
        votre projet, on revient vers vous sous 24–48 h ouvrées.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm />

        <div className="space-y-6 text-sm">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
              Téléphone
            </div>
            <a
              href={`tel:${site.phone}`}
              className="mt-1 block font-display text-2xl font-semibold text-steel"
            >
              {site.phoneDisplay}
            </a>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
              Email
            </div>
            <a href={`mailto:${site.email}`} className="mt-1 block hover:text-steel">
              {site.email}
            </a>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
              Adresse
            </div>
            <p className="mt-1 leading-relaxed">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
            <a
              href={site.mapUrl}
              className="mt-1 inline-block text-steel hover:underline"
            >
              Itinéraire →
            </a>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
              Horaires
            </div>
            <p className="mt-1">{site.hoursDisplay}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
