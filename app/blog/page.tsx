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
      <section className="relative border-b border-ink/10">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow">Journal</div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.98] tracking-tightest sm:text-7xl">
            Repères, méthodes
            <br />
            <span className="italic-accent text-ember">et coulisses</span> du
            cabinet.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/65">
            Permis, urbanisme, structure, rénovation, RE2020 : les sujets sur
            lesquels nous travaillons au quotidien, expliqués clairement.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {first && (
          <Link
            href={`/blog/${first.slug}`}
            className="group relative mb-16 flex flex-col gap-8 overflow-hidden rounded-3xl border border-ink/10 bg-ink p-8 text-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-12 lg:flex-row lg:items-end lg:gap-16"
          >
            <div className="absolute inset-0 fine-grid opacity-[0.06]" />
            <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-ember/20 blur-[80px]" />

            <div className="relative flex-1">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-paper/55">
                <span>À la une</span>
                <span>·</span>
                <span>{first.date}</span>
              </div>
              <h2 className="mt-5 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
                {first.title}
              </h2>
              <p className="mt-5 max-w-2xl text-paper/70">
                {first.description}
              </p>
            </div>

            <div className="relative shrink-0">
              <span className="inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink">
                Lire l'article
                <span className="arrow-out">→</span>
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 ? (
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group relative flex flex-col bg-paper p-8 transition hover:bg-paper-warm"
              >
                <div className="font-display text-xs font-medium tabular text-ink/30">
                  / {String(i + 2).padStart(2, "0")}
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.18em] text-ink/45">
                  {p.date}
                </div>
                <h2 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">
                  {p.description}
                </p>
                <div className="mt-auto pt-8 text-sm font-medium text-ember">
                  Lire <span className="arrow-out inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="py-12 text-center text-ink/50">
            Premiers articles à venir.
          </p>
        ) : null}
      </section>
    </>
  )
}
