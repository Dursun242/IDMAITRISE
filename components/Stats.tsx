import { CountUp } from "@/components/CountUp"

const stats = [
  { to: 15, suffix: "+", label: "années d'expertise sur le terrain" },
  { to: 80, suffix: "+", label: "projets livrés en Normandie" },
  { to: 100, suffix: "%", label: "interlocuteur unique, de A à Z" },
  { to: 24, suffix: "h", label: "première réponse à votre demande" },
]

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-holo/10 bg-void-deep">
      <div className="absolute inset-0 hud-grid-sm opacity-60" />
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-holo/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-ghost-mute">
          // Données — cabinet
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative ${
                i < stats.length - 1 ? "lg:border-r lg:border-holo/10 lg:pr-6" : ""
              }`}
            >
              <div className="text-gradient-holo font-display text-6xl font-bold tracking-tightest sm:text-7xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-3 max-w-[200px] text-sm leading-relaxed text-ghost-dim">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
