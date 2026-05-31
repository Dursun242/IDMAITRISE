import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { localLandings, zones } from "@/lib/data"
import { services, site } from "@/lib/site"
import { JsonLd } from "@/components/JsonLd"

export function generateStaticParams() {
  return localLandings.map((l) => ({ landing: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ landing: string }>
}): Promise<Metadata> {
  const { landing } = await params
  const l = localLandings.find((x) => x.slug === landing)
  if (!l) return {}
  return {
    title: l.title,
    description: l.metaDescription,
    alternates: { canonical: `/expertise/${l.slug}` },
  }
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ landing: string }>
}) {
  const { landing } = await params
  const l = localLandings.find((x) => x.slug === landing)
  if (!l) notFound()

  const service = services.find((s) => s.slug === l.serviceSlug)
  const zone = zones.find((z) => z.slug === l.zoneSlug)

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: l.h1,
    description: l.metaDescription,
    serviceType: service?.title ?? l.h1,
    areaServed: zone ? { "@type": "City", name: zone.city } : site.areaServed,
    provider: { "@type": "GeneralContractor", name: site.legalName, telephone: site.phone },
  }

  const related = localLandings.filter((x) => x.slug !== l.slug).slice(0, 3)

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative border-b border-ink/10">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-ember/15 blur-[90px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink/55">
            <Link href="/" className="hover:text-ink">
              Accueil
            </Link>
            <span>/</span>
            {service && (
              <>
                <Link href={`/${service.slug}`} className="hover:text-ink">
                  {service.title}
                </Link>
                <span>/</span>
              </>
            )}
            {zone && <span className="text-ink/40">{zone.city}</span>}
          </div>

          <h1 className="mt-8 max-w-4xl font-display text-5xl font-medium leading-[0.98] tracking-tightest sm:text-7xl">
            {l.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">{l.intro}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition hover:bg-ink-soft"
            >
              Demander un devis gratuit
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

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="prose-editorial">
          {l.body.map((b) => (
            <div key={b.heading}>
              <h2>{b.heading}</h2>
              <p>{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          {service && (
            <Link href={`/${service.slug}`} className="link-underline font-medium text-ember">
              En savoir plus sur : {service.title} →
            </Link>
          )}
          {zone && (
            <Link href={`/secteur/${zone.slug}`} className="link-underline font-medium text-ember">
              Maître d'œuvre à {zone.city} →
            </Link>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-paper-warm">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              Nos autres expertises locales
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/expertise/${r.slug}`}
                  className="group rounded-2xl border border-ink/10 bg-paper p-6 transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lift"
                >
                  <h3 className="font-display text-lg font-medium leading-tight tracking-tight">
                    {r.h1}
                  </h3>
                  <div className="mt-4 text-sm font-medium text-ember">
                    Découvrir <span className="arrow-out inline-block">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
