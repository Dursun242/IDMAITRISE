const stats = [
  { value: "15+", label: "années d'expertise sur le terrain" },
  { value: "80+", label: "projets livrés en Normandie" },
  { value: "100%", label: "interlocuteur unique, de A à Z" },
  { value: "24h", label: "première réponse à votre demande" },
]

export function Stats() {
  return (
    <section className="border-y border-ink/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((s, i) => (
            <div
              key={s.value}
              className={`relative ${
                i < stats.length - 1 ? "lg:border-r lg:border-paper/10 lg:pr-6" : ""
              }`}
            >
              <div className="font-display text-6xl font-medium tracking-tightest tabular sm:text-7xl">
                {s.value}
              </div>
              <div className="mt-3 max-w-[200px] text-sm leading-relaxed text-paper/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
