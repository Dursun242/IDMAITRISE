import Link from "next/link"
import { projects } from "@/lib/data"
import { Reveal } from "@/components/Reveal"

export function ProjectGrid({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {list.map((p, i) => (
        <Reveal
          key={p.slug}
          delay={(i % 2) * 120}
          as="article"
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper-warm transition-all duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-lift"
        >
          {/* Zone visuelle (placeholder graphique tant qu'il n'y a pas de photo) */}
          <div className="relative aspect-[16/10] overflow-hidden bg-ink">
            <div className="absolute inset-0 fine-grid opacity-[0.12]" />
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ember/25 blur-[70px] transition-all duration-700 group-hover:bg-ember/40" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <span className="font-display text-5xl font-semibold tracking-tightest text-paper/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full bg-paper/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-paper/80 backdrop-blur">
                {p.category}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-7 sm:p-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-ink/45">
              <span>{p.city}</span>
              <span>·</span>
              <span>{p.year}</span>
              <span>·</span>
              <span>{p.surface}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              {p.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-ink/12 px-3 py-1 text-xs text-ink/60"
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-7">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-ember"
              >
                Un projet similaire ?{" "}
                <span className="arrow-out inline-block">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
