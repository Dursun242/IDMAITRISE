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

      <section className="relative overflow-hidden border-b border-holo/10">
        <div className="absolute inset-0 hud-grid hud-grid-fade animate-grid-pan" />
        <div className="absolute -right-32 top-0 h-[380px] w-[380px] rounded-full bg-holo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ghost-mute">
            <Link href="/" className="transition-colors hover:text-holo-soft">
              Accueil
            </Link>
            <span className="text-holo/40">/</span>
            <span>Modules</span>
            <span className="text-holo/40">/</span>
            <span className="text-holo">
              Mod.{String(idx + 1).padStart(2, "0")}
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tightest sm:text-7xl">
            {doc.title}
          </h1>
          {doc.short && (
            <p className="mt-6 max-w-2xl text-lg text-ghost-dim sm:text-xl">
              {doc.short}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-holo group">
              Demander un devis
              <span className="arrow-out">→</span>
            </Link>
            <a href={`tel:${site.phone}`} className="btn-line font-mono">
              <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-holo" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_3fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-2xl p-6">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
              // Tous les modules
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className={`flex items-start gap-2 transition ${
                      s.slug === service
                        ? "font-medium text-holo"
                        : "text-ghost-dim hover:text-ghost"
                    }`}
                  >
                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-current" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="corners glass mt-6 rounded-2xl p-6">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
              // Une question ?
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ghost-dim">
              On répond en direct, sans intermédiaire. Premier échange gratuit.
            </p>
            <a
              href={`tel:${site.phone}`}
              className="mt-4 block font-mono text-xl font-semibold tabular text-holo [text-shadow:0_0_18px_rgba(56,225,255,0.5)]"
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

      <section className="border-t border-holo/10 bg-void-deep">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Modules associés
            </h2>
            <Link
              href="/"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-holo"
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
                className="glass group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-holo/40 hover:shadow-glow"
              >
                <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ghost-dim">
                  {s.short}
                </p>
                <div className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-holo">
                  Explorer <span className="arrow-out inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hud-grid-sm opacity-50" />
        <div className="absolute -right-32 -top-20 h-[400px] w-[400px] rounded-full bg-holo/10 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Prêt à lancer
              <br />
              <span className="text-gradient-holo">votre projet</span> ?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-holo group">
                Devis gratuit
                <span className="arrow-out">→</span>
              </Link>
              <a href={`tel:${site.phone}`} className="btn-line font-mono">
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
