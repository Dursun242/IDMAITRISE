const steps = [
  {
    n: "01",
    t: "Premier échange",
    d: "On définit ensemble vos besoins, votre site, votre enveloppe. Gratuit, sans engagement.",
  },
  {
    n: "02",
    t: "Conception & faisabilité",
    d: "Esquisses, plans techniques, étude de sol, étude thermique RE2020. On bâtit un dossier solide.",
  },
  {
    n: "03",
    t: "Permis & urbanisme",
    d: "Montage du dossier, dépôt en mairie, suivi des échanges avec le service ADS du Havre.",
  },
  {
    n: "04",
    t: "Consultation des entreprises",
    d: "Appels d'offres auprès de notre réseau d'artisans normands. Choix sur dossier comparé.",
  },
  {
    n: "05",
    t: "Pilotage du chantier",
    d: "Planning, coordination, réunions hebdo, contrôle qualité. Vous restez serein, on tient le cap.",
  },
  {
    n: "06",
    t: "Livraison & garanties",
    d: "Réception finale, levée des réserves, parfait achèvement. Vous habitez, on reste joignable.",
  },
]

export function ProcessSteps() {
  return (
    <section className="relative overflow-hidden bg-linen-warm">
      <div className="absolute inset-0 plan-grid opacity-50" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="eyebrow">La méthode</div>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Six étapes.
              <br />
              <span className="italic-accent text-bronze-deep">
                Une sérénité totale.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-noir/65">
              Une méthode éprouvée, dessinée comme un plan d'exécution. À
              chaque étape, vous savez exactement où en est votre projet — et
              combien il coûte.
            </p>
          </div>

          <ol>
            {steps.map((step, i) => (
              <li key={step.n} className="group relative pb-10 pl-16 last:pb-0">
                {/* Ligne de connexion */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[19px] top-12 h-[calc(100%-2.5rem)] w-px border-l border-dotted border-noir/25"
                  />
                )}
                {/* Nœud */}
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-bronze/40 bg-white font-display text-sm italic text-bronze-deep shadow-soft transition-all duration-500 group-hover:border-bronze group-hover:shadow-bronze">
                  {step.n}
                </span>

                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-noir-mute">
                  Étape {step.n}
                </div>
                <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-bronze-deep">
                  {step.t}
                </h3>
                <p className="mt-2 max-w-xl text-noir/65">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
