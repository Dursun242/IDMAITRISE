import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getDoc, getSlugs } from "@/lib/content"
import { JsonLd } from "@/components/JsonLd"
import { site, services } from "@/lib/site"

export function generateStaticParams() {
  return getSlugs("services").map((service) => ({ service }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service } = await params
  const doc = getDoc("services", service)
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${service}` },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  const doc = getDoc("services", service)
  if (!doc) notFound()

  const idx = services.findIndex((s) => s.slug === service)
  const otherServices = services.filter((s) => s.slug !== service).slice(0, 3)

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: doc.title,
    description: doc.description,
    serviceType: doc.title,
    areaServed: site.areaServed,
    provider: {
      "@type": "GeneralContractor",
      name: site.legalName,
      telephone: site.phone,
    },
  }

  return (
    <>
      <JsonLd data={serviceSchema} />

      <section className="relative overflow-hidden border-b border-noir/10">
        <div className="absolute inset-0 plan-grid grid-fade opacity-70" />
        <div className="absolute -right-32 top-0 h-[380px] w-[380px] rounded-full bg-bronze/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-noir-mute">
            <Link
              href="/"
              className="transition-colors hover:text-bronze-deep"
            >
              Accueil
            </Link>
            <span className="text-bronze/60">/</span>
            <span>Prestations</span>
            <span className="text-bronze/60">/</span>
            <span className="text-bronze-deep">
              n° {String(idx + 1).padStart(2, "0")}
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tightest sm:text-7xl">
            {doc.title}
          </h1>
          {doc.short && (
            <p className="mt-6 max-w-2xl text-lg text-noir/65 sm:text-xl">
              {doc.short}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-dark group">
              Demander un devis
              <span className="arrow-out">→</span>
            </Link>
            <a href={`tel:${site.phone}`} className="btn-line font-mono">
              <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-bronze" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_3fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="panel rounded-2xl p-6 shadow-soft">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-noir-mute">
              Toutes les prestations
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className={`flex items-start gap-2 transition ${
                      s.slug === service
                        ? "font-medium text-bronze-deep"
                        : "text-noir/70 hover:text-noir"
                    }`}
                  >
                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-current" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="corners mt-6 rounded-2xl bg-noir p-6 text-linen shadow-lift">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-linen/50">
              Une question ?
            </div>
            <p className="mt-3 text-sm leading-relaxed text-linen/75">
              On répond en direct, sans intermédiaire. Premier échange gratuit.
            </p>
            <a
              href={`tel:${site.phone}`}
              className="mt-4 block font-display text-2xl font-medium tabular text-bronze-light"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </aside>

        <article className="prose-editorial">
          <MDXRemote
            source={doc.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>
      </section>

      <section className="border-t border-noir/10 bg-linen-warm">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Aussi proposé
            </h2>
            <Link
              href="/"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-bronze-deep"
            >
              Toutes les prestations
              <span className="arrow-out">→</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="panel group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-bronze/50 hover:shadow-lift"
              >
                <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-noir/60">
                  {s.short}
                </p>
                <div className="mt-4 text-sm font-medium text-bronze-deep">
                  Découvrir <span className="arrow-out inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-noir text-linen">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent" />
        <div className="absolute -right-32 -top-20 h-[400px] w-[400px] rounded-full bg-bronze/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
            <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Prêt à lancer
              <br />
              <span className="italic-accent text-bronze-light">
                votre projet
              </span>{" "}
              ?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-ivory group">
                Devis gratuit
                <span className="arrow-out">→</span>
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-linen/30 px-7 py-4 font-mono text-sm font-medium transition hover:border-bronze-light hover:text-bronze-light"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
