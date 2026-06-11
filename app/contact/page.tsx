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
      <section className="relative overflow-hidden border-b border-holo/10">
        <div className="absolute inset-0 hud-grid hud-grid-fade animate-grid-pan" />
        <div className="absolute -right-32 top-0 h-[380px] w-[380px] rounded-full bg-holo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow">Liaison directe</div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tightest sm:text-7xl">
            Établissons
            <br />
            <span className="text-gradient-holo">la liaison.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ghost-dim">
            Construction, extension, rénovation, permis de construire :
            décrivez-nous votre projet en quelques lignes, on revient vers vous
            sous 24–48 h ouvrées.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="corners glass rounded-2xl p-8 shadow-panel sm:p-10">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ghost-mute">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-holo" />
              Formulaire // nouveau projet
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
              Décrivez votre projet
            </h2>
            <p className="mt-2 text-sm text-ghost-dim">
              Plus c'est détaillé, plus nous serons précis dans notre réponse.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
                // Canal vocal
              </div>
              <a
                href={`tel:${site.phone}`}
                className="mt-3 block font-display text-4xl font-bold tracking-tightest text-ghost transition-colors hover:text-holo-soft"
              >
                {site.phoneDisplay}
              </a>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-ghost-mute">
                {site.hoursDisplay}
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
                // Email
              </div>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block text-lg font-medium text-ghost transition-colors hover:text-holo-soft"
              >
                {site.email}
              </a>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
                // Base — Le Havre
              </div>
              <p className="mt-3 text-lg leading-snug text-ghost">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ghost-mute">
                Lat 49.4944° N — Lon 0.1079° E
              </p>
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-block font-mono text-xs font-medium uppercase tracking-[0.14em] text-holo"
              >
                Itinéraire Google Maps →
              </a>
            </div>

            <div className="corners glass rounded-2xl p-6">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
                // Zones couvertes
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {site.areaServed.map((zone) => (
                  <span key={zone} className="chip">
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
