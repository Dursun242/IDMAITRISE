import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { zones } from "@/lib/data"
import { localLandings } from "@/lib/data"
import { services, site } from "@/lib/site"
import { JsonLd } from "@/components/JsonLd"
import { ProcessSteps } from "@/components/ProcessSteps"
import { Testimonials } from "@/components/Testimonials"

export function generateStaticParams() {
  return zones.map((z) => ({ zone: z.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zone: string }>
}): Promise<Metadata> {
  const { zone } = await params
  const z = zones.find((x) => x.slug === zone)
  if (!z) return {}
  return {
    title: `Maître d'œuvre à ${z.city} — ID Maîtrise`,
    description: `Maître d'œuvre à ${z.city} (${z.dept}) : construction, extension, rénovation et permis de construire. ${z.intro.slice(0, 90)}…`,
    alternates: { canonical: `/secteur/${z.slug}` },
  }
}

export default async function ZonePage({
  params,
}: {
  params: Promise<{ zone: string }>
}) {
  const { zone } = await params
  const z = zones.find((x) => x.slug === zone)
  if (!z) notFound()

  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: `${site.legalName} — ${z.city}`,
    description: `Maître d'œuvre à ${z.city}, ${z.dept}.`,
    url: `${site.url}/secteur/${z.slug}`,
    telephone: site.phone,
    areaServed: { "@type": "City", name: z.city },
    provider: { "@type": "Organization", name: site.legalName },
  }

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative border-b border-ink/10">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-ember/15 blur-[90px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-center gap-3 text-sm text-ink/55">
            <Link href="/" className="hover:text-ink">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-ink/40">Secteurs</span>
            <span>/</span>
            <span className="text-ink/40">{z.city}</span>
          </div>

          <div className="mt-6 eyebrow">{z.dept}</div>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[0.98] tracking-tightest sm:text-7xl">
            Maître d'œuvre
            <br />à <span className="italic-accent text-ember">{z.city}</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">{z.intro}</p>
          <p className="mt-4 max-w-2xl text-ink/65">{z.localite}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition hover:bg-ink-soft"
            >
              Devis gratuit à {z.city}
              <span className="arrow-out">→</span>
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-3 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium transition hover:border-ink/40"
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-ember" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Prestations sur la zone */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="eyebrow">Nos prestations à {z.city}</div>
        <h2 className="mt-5 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Tout pour bâtir, agrandir ou rénover.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group rounded-2xl border border-ink/10 bg-paper-warm p-6 transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lift"
            >
              <h3 className="font-display text-lg font-medium leading-tight tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink/60">{s.short}</p>
              <div className="mt-4 text-sm font-medium text-ember">
                Découvrir <span className="arrow-out inline-block">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Ancrage local : quartiers / communes */}
        <div className="mt-12 rounded-3xl border border-ink/10 bg-paper-warm p-7 sm:p-9">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
            Nous intervenons notamment à
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {z.neighborhoods.map((n) => (
              <span
                key={n}
                className="rounded-full border border-ink/12 bg-paper px-3.5 py-1.5 text-sm text-ink/70"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <Testimonials />

      {/* Expertises locales liées à ce secteur (maillage interne) */}
      {(() => {
        const zoneLandings = localLandings.filter((l) => l.zoneSlug === z.slug)
        if (zoneLandings.length === 0) return null
        return (
          <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              Nos expertises à {z.city}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {zoneLandings.map((l) => (
                <Link
                  key={l.slug}
                  href={`/expertise/${l.slug}`}
                  className="group rounded-2xl border border-ink/10 bg-paper-warm p-6 transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lift"
                >
                  <h3 className="font-display text-lg font-medium leading-tight tracking-tight">
                    {l.h1}
                  </h3>
                  <div className="mt-4 text-sm font-medium text-ember">
                    Découvrir <span className="arrow-out inline-block">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })()}

      {/* Autres secteurs (maillage interne) */}
      <section className="border-t border-ink/10 bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
            Autres secteurs d'intervention
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {zones
              .filter((x) => x.slug !== z.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/secteur/${x.slug}`}
                  className="link-underline text-sm font-medium text-ink/75 hover:text-ink"
                >
                  Maître d'œuvre à {x.city}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
