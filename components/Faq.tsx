import { faqs as defaultFaqs, type Faq } from "@/lib/data"

export function FaqSection({
  items = defaultFaqs,
  title = true,
}: {
  items?: Faq[]
  title?: boolean
}) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
      {title && (
        <div className="mb-12 text-center">
          <div className="eyebrow justify-center">Questions fréquentes</div>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            Ce que vous nous
            <br />
            <span className="italic-accent text-ember">demandez souvent.</span>
          </h2>
        </div>
      )}

      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {items.map((f, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium tracking-tight">
              {f.q}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/60 transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
