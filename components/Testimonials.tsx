import { testimonials } from "@/lib/data"
import { Reveal } from "@/components/Reveal"

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-ember" aria-label={`${n} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden className={i < n ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="eyebrow">Avis clients</div>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            Ils nous ont
            <br />
            <span className="italic-accent text-ember">fait confiance.</span>
          </h2>
        </div>
        <p className="max-w-md text-ink/65">
          La satisfaction de nos clients est notre meilleure publicité. Voici ce
          qu'ils disent de leur projet mené avec ID Maîtrise.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.author + i}
            delay={(i % 2) * 120}
            className="flex flex-col rounded-3xl border border-ink/10 bg-paper-warm p-7 sm:p-9"
          >
            <Stars n={t.rating} />
            <blockquote className="mt-5 font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
              « {t.quote} »
            </blockquote>
            <div className="mt-auto flex items-center gap-3 pt-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-paper">
                {t.author.slice(0, 1)}
              </span>
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  {t.author}
                </div>
                <div className="text-xs text-ink/55">
                  {t.role} · {t.city}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
