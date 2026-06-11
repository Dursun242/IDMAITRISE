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
      <section className="relative overflow-hidden border-b border-holo/10">
        <div className="absolute inset-0 hud-grid hud-grid-fade animate-grid-pan" />
        <div className="absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-holo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow">Transmissions</div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tightest sm:text-7xl">
            Repères, méthodes
            <br />
            <span className="text-gradient-holo">et coulisses</span> du
            cabinet.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ghost-dim">
            Permis, urbanisme, structure, rénovation, RE2020 : les sujets sur
            lesquels nous travaillons au quotidien, expliqués clairement.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {first && (
          <Link
            href={`/blog/${first.slug}`}
            className="corners glass scanlines group relative mb-16 flex flex-col gap-8 overflow-hidden rounded-2xl p-8 shadow-panel transition-all duration-500 hover:-translate-y-1 hover:border-holo/40 hover:shadow-glow sm:p-12 lg:flex-row lg:items-end lg:gap-16"
          >
            <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-holo/10 blur-[90px]" />

            <div className="relative flex-1">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ghost-mute">
                <span className="inline-flex items-center gap-2 text-holo">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-holo" />
                  À la une
                </span>
                <span>·</span>
                <span>{first.date}</span>
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {first.title}
              </h2>
              <p className="mt-5 max-w-2xl text-ghost-dim">
                {first.description}
              </p>
            </div>

            <div className="relative shrink-0">
              <span className="btn-holo">
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
                className="glass group relative flex flex-col rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-holo/40 hover:shadow-glow"
              >
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ghost-mute">
                  Log /{String(i + 2).padStart(2, "0")}
                </div>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ghost-mute">
                  {p.date}
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ghost-dim">
                  {p.description}
                </p>
                <div className="mt-auto pt-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-holo">
                  Lire <span className="arrow-out inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="py-12 text-center font-mono text-sm text-ghost-mute">
            // Premières transmissions à venir.
          </p>
        ) : null}
      </section>
    </>
  )
}
