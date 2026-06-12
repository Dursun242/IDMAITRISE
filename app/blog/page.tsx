import Link from "next/link"
import type { Metadata } from "next"
import { getAllDocs } from "@/lib/content"

export const metadata: Metadata = {
  title: "Conseils maîtrise d'œuvre, permis & urbanisme au Havre",
  description:
    "Guides pratiques : permis de construire, déclaration préalable, PLUi, extension de maison et rénovation au Havre et en Normandie.",
  alternates: { canonical: "/blog" },
}

export default function Blog() {
  const posts = getAllDocs("blog")
  const [first, ...rest] = posts

  return (
    <>
      <section className="relative overflow-hidden border-b border-noir/10">
        <div className="absolute inset-0 plan-grid grid-fade opacity-70" />
        <div className="absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-bronze/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow">Le journal</div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tightest sm:text-7xl">
            Repères, méthodes
            <br />
            <span className="italic-accent text-bronze-deep">
              et coulisses
            </span>{" "}
            du cabinet.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-noir/65">
            Permis, urbanisme, structure, rénovation, RE2020 : les sujets sur
            lesquels nous travaillons au quotidien, expliqués clairement.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {first && (
          <Link
            href={`/blog/${first.slug}`}
            className="group relative mb-16 flex flex-col gap-8 overflow-hidden rounded-2xl bg-noir p-8 text-linen shadow-lift transition-all duration-500 hover:-translate-y-1 sm:p-12 lg:flex-row lg:items-end lg:gap-16"
          >
            <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-bronze/20 blur-[90px]" />

            <div className="relative flex-1">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-linen/55">
                <span className="inline-flex items-center gap-2 text-bronze-light">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-bronze-light" />
                  À la une
                </span>
                <span>·</span>
                <span>{first.date}</span>
              </div>
              <h2 className="mt-5 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
                {first.title}
              </h2>
              <p className="mt-5 max-w-2xl text-linen/70">
                {first.description}
              </p>
            </div>

            <div className="relative shrink-0">
              <span className="btn-ivory">
                Lire l'article
                <span className="arrow-out">→</span>
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="panel group relative flex flex-col rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-bronze/50 hover:shadow-lift"
              >
                <div className="font-display text-sm italic text-noir/30">
                  n° {String(i + 2).padStart(2, "0")}
                </div>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-noir-mute">
                  {p.date}
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-noir/65">
                  {p.description}
                </p>
                <div className="mt-auto pt-8 text-sm font-medium text-bronze-deep">
                  Lire <span className="arrow-out inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="py-12 text-center text-noir/50">
            Premiers articles à venir.
          </p>
        ) : null}
      </section>
    </>
  )
}
