import Link from "next/link"
import type { Metadata } from "next"
import { site, services } from "@/lib/site"
import { getAllDocs } from "@/lib/content"

export const metadata: Metadata = {
  title: "Maître d'œuvre au Havre — ID Maîtrise",
  description: site.description,
  alternates: { canonical: "/" },
}

const engagements = [
  {
    t: "Interlocuteur unique",
    d: "Un seul responsable de l'étude à la réception : il pilote artisans, planning et budget.",
  },
  {
    t: "Conformité & garanties",
    d: "Plans conformes RE2020, assurance décennale et responsabilité civile professionnelle.",
  },
  {
    t: "Ancrage local",
    d: "Réseau d'artisans normands et connaissance fine de l'urbanisme du Havre.",
  },
]

export default function Home() {
  const posts = getAllDocs("blog").slice(0, 3)

  return (
    <>
      <section className="blueprint-grid border-b border-ink/10">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-steel">
            Le Havre · Seine-Maritime · Normandie
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Votre maison sur-mesure au Havre, de l'étude à la réception.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            ID Maîtrise, maître d'œuvre indépendant, conçoit et pilote votre
            maison contemporaine — comme vos projets d'extension et de rénovation.
            Un interlocuteur unique, des artisans qualifiés, un budget tenu.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/construction-maison-individuelle"
              className="rounded-full bg-steel px-6 py-3 font-medium text-paper transition hover:bg-steel-dark"
            >
              Faire construire ma maison
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="rounded-full border border-ink/15 px-6 py-3 font-medium transition hover:border-ink/40"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Nos prestations
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group rounded-2xl border border-ink/10 bg-white/60 p-6 transition hover:-translate-y-0.5 hover:border-steel/40 hover:shadow-lg"
            >
              <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-steel">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.short}</p>
              <span className="mt-4 inline-block text-sm font-medium text-steel">
                En savoir plus →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-3">
          {engagements.map((b) => (
            <div key={b.t}>
              <h3 className="font-display text-lg font-semibold">{b.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Conseils & actualités
            </h2>
            <Link href="/blog" className="shrink-0 text-sm font-medium text-steel">
              Tous les articles →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-ink/10 p-6 transition hover:border-steel/40 hover:shadow-lg"
              >
                <div className="text-xs uppercase tracking-wide text-ink/40">
                  {p.date}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/65">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-ink/10 bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-display text-2xl font-semibold">
            Nous intervenons en Normandie
          </h2>
          <p className="mt-3 text-paper/70">{site.areaServed.join("  ·  ")}</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-paper px-6 py-3 font-medium text-ink transition hover:bg-white"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  )
}
