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
    <section className="relative bg-paper-warm">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="eyebrow">Méthode</div>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
              De la première
              <br />
              <span className="italic-accent text-ember">esquisse</span> aux
              <br />
              clés en main.
            </h2>
            <p className="mt-6 max-w-md text-ink/65">
              Une méthode éprouvée, six étapes claires. À chacune, vous savez
              exactement où en est votre projet — et combien il coûte.
            </p>
          </div>

          <ol className="space-y-px">
            {steps.map((step, i) => (
              <li
                key={step.n}
                className="group relative grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-7 transition hover:bg-paper"
              >
                <div className="font-display text-xl font-medium tabular text-ember">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight">
                    {step.t}
                  </h3>
                  <p className="mt-2 max-w-xl text-ink/65">{step.d}</p>
                </div>
                {i === steps.length - 1 && (
                  <div className="col-span-2 border-b border-ink/10" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
