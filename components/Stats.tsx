import { CountUp } from "@/components/CountUp"

const stats = [
  { to: 15, suffix: "+", label: "années d'expertise sur le terrain" },
  { to: 80, suffix: "+", label: "projets livrés en Normandie" },
  { to: 100, suffix: "%", label: "interlocuteur unique, de A à Z" },
  { to: 24, suffix: "h", label: "première réponse à votre demande" },
]

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-noir text-linen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent" />
      <div className="absolute -left-32 top-0 h-[360px] w-[360px] rounded-full bg-bronze/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="eyebrow mb-10 text-bronze-light">En chiffres</div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative ${
                i < stats.length - 1 ? "lg:border-r lg:border-linen/10 lg:pr-6" : ""
              }`}
            >
              <div className="font-display text-6xl font-medium tracking-tightest text-bronze-light sm:text-7xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-3 max-w-[200px] text-sm leading-relaxed text-linen/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
