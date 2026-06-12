import Link from "next/link"
import type { Metadata } from "next"
import { site, services } from "@/lib/site"
import { getAllDocs } from "@/lib/content"
import { Marquee } from "@/components/Marquee"
import { Stats } from "@/components/Stats"
import { ProcessSteps } from "@/components/ProcessSteps"
import { ServiceCard } from "@/components/ServiceCard"
import { WireframeHouse } from "@/components/WireframeHouse"

export const metadata: Metadata = {
  title: "Maître d'œuvre au Havre — ID Maîtrise",
  description: site.description,
  alternates: { canonical: "/" },
}

const engagements = [
  {
    n: "01",
    t: "Interlocuteur unique",
    d: "Un seul responsable de l'étude à la réception. Artisans, planning, budget — tout passe par nous.",
  },
  {
    n: "02",
    t: "Conformité totale",
    d: "Plans conformes RE2020, assurance décennale, responsabilité civile professionnelle.",
  },
  {
    n: "03",
    t: "Ancrage normand",
    d: "Réseau d'artisans locaux, connaissance fine du PLUi du Havre et des règles ABF.",
  },
]

const charte = [
  { k: "Interlocuteur", v: "Unique, de A à Z" },
  { k: "Assurances", v: "Décennale + RC Pro" },
  { k: "Artisans", v: "Normands, sélectionnés" },
  { k: "Conformité", v: "RE2020 · PLUi · ABF" },
  { k: "Budget", v: "Engagé, puis tenu" },
  { k: "Suivi", v: "Réunions hebdomadaires" },
]

export default function Home() {
  const posts = getAllDocs("blog").slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 plan-grid grid-fade opacity-70" />
        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-bronze/10 blur-[110px] animate-aurora" />
        <div
          className="absolute right-0 top-1/2 h-[360px] w-[360px] rounded-full bg-bronze/10 blur-[110px] animate-aurora"
          style={{ animationDelay: "7s" }}
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            {/* Colonne texte */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">Maître d'œuvre indépendant</span>
                <span className="tag">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-bronze" />
                  Le Havre · Normandie
                </span>
              </div>

              <h1 className="mt-8 font-display text-[clamp(2.7rem,6vw,5rem)] font-medium leading-[1.04] tracking-tightest">
                La maison de
                <br />
                votre vie,
                <br />
                <span className="italic-accent text-bronze-deep">
                  dessinée au millimètre.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-noir/70">
                ID Maîtrise conçoit et pilote votre projet — maison
                contemporaine, extension, rénovation. Un seul interlocuteur,
                des artisans qualifiés, un budget tenu, de la première esquisse
                aux clés en main.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-dark group">
                  Démarrer mon projet
                  <span className="arrow-out">→</span>
                </Link>
                <a href={`tel:${site.phone}`} className="btn-line font-mono">
                  <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-bronze" />
                  {site.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Colonne esquisse */}
            <div className="corners panel relative rounded-2xl p-6 shadow-lift sm:p-8">
              <div className="absolute inset-0 sheet-grid rounded-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-noir-mute">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-bronze" />
                    Esquisse · Maison familiale
                  </span>
                  <span>Le Havre</span>
                </div>
                <div className="mt-4">
                  <WireframeHouse />
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-noir/10 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-noir-mute">
                  <span>Échelle 1:100</span>
                  <span>ISO 30°</span>
                  <span className="text-bronze-deep">RE2020 ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Engagements */}
          <div className="mt-16 grid gap-5 border-t border-noir/10 pt-10 sm:grid-cols-3">
            {engagements.map((e) => (
              <div key={e.t} className="panel rounded-xl p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {e.t}
                  </h3>
                  <span className="font-display text-sm italic text-bronze">
                    {e.n}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-noir/65">
                  {e.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={site.areaServed} />

      {/* À PROPOS / CHARTE */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-bronze/[0.08] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <div className="eyebrow">Le cabinet</div>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                Une maîtrise d'œuvre
                <br />
                <span className="italic-accent text-bronze-deep">
                  à taille humaine
                </span>
                ,
                <br />
                exigeante sur le détail.
              </h2>
              <div className="mt-7 space-y-5 text-noir/70">
                <p className="text-lg leading-relaxed">
                  Installé au cœur du Havre, le cabinet ID Maîtrise accompagne
                  particuliers et professionnels sur l'ensemble de la
                  Seine-Maritime et du Calvados. Construction neuve, extension,
                  rénovation lourde, bâtiment professionnel : nous intervenons
                  à toutes les échelles.
                </p>
                <p className="leading-relaxed">
                  Notre force : un interlocuteur unique qui porte votre projet
                  d'un bout à l'autre — de la lecture du PLUi au procès-verbal
                  de réception. Nos artisans partenaires sont normands, choisis
                  sur la qualité de leur travail et la tenue de leurs
                  engagements.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-dark group">
                  Prendre rendez-vous
                  <span className="arrow-out">→</span>
                </Link>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-noir/70 transition-colors hover:text-bronze-deep"
                >
                  Lire le journal
                  <span className="arrow-out">→</span>
                </Link>
              </div>
            </div>

            {/* La charte du cabinet */}
            <div className="corners panel relative rounded-2xl shadow-lift">
              <div className="border-b border-noir/10 px-7 py-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-noir-mute">
                  Nos engagements
                </div>
                <div className="mt-1 font-display text-2xl font-semibold tracking-tight">
                  La charte du cabinet
                </div>
              </div>
              <div className="space-y-4 px-7 py-6">
                {charte.map((l, i) => (
                  <div
                    key={l.k}
                    className="appear-up flex items-baseline text-[15px]"
                    style={{ animationDelay: `${0.15 + i * 0.12}s` }}
                  >
                    <span className="font-medium text-noir">{l.k}</span>
                    <span className="leader" aria-hidden />
                    <span className="text-right font-display italic text-bronze-deep">
                      {l.v}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-noir/10 px-7 py-4">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-noir-mute">
                  <span>Signé — ID Maîtrise</span>
                  <span className="inline-flex items-center gap-2 text-bronze-deep">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-bronze" />
                    Depuis 15 ans
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section className="relative overflow-hidden bg-linen-warm">
        <div className="absolute inset-0 plan-grid opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">Prestations</div>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                Sept savoir-faire,
                <br />
                <span className="italic-accent text-bronze-deep">
                  un seul cabinet.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-noir/65">
              Du dessin à la coordination, en passant par les études techniques
              réglementaires. Tout sous un même toit.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <ProcessSteps />

      {/* JOURNAL */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">Le journal</div>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                Conseils, repères
                <br />
                <span className="italic-accent text-bronze-deep">
                  et coulisses.
                </span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-bronze-deep"
            >
              Tous les articles
              <span className="arrow-out">→</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="panel group relative flex flex-col rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-bronze/50 hover:shadow-lift sm:p-8"
              >
                <div className="font-display text-sm italic text-noir/30">
                  n° {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-noir-mute">
                  {p.date}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-noir/65">
                  {p.description}
                </p>
                <div className="mt-auto pt-8 text-sm font-medium text-bronze-deep">
                  Lire l'article <span className="arrow-out inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-linen-warm">
        <div className="absolute inset-0 plan-grid opacity-50" />

        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          {/* Rosace de compas */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 sm:h-[540px] sm:w-[540px]"
          >
            <span className="absolute inset-0 rounded-full border border-bronze/15" />
            <span className="absolute inset-[14%] rounded-full border border-bronze/12" />
            <span className="absolute inset-[28%] animate-spin-slow rounded-full border border-dashed border-bronze/25" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="eyebrow justify-center">Premier échange offert</div>
            <p className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tightest sm:text-7xl">
              On regarde votre
              <br />
              <span className="italic-accent text-bronze-deep">
                projet ensemble
              </span>{" "}
              ?
            </p>
            <p className="mx-auto mt-6 max-w-xl text-noir/65">
              Devis, faisabilité, premier rendez-vous : c'est gratuit et sans
              engagement. On revient vers vous sous 24–48 h ouvrées.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-dark group px-8">
                Démarrer maintenant
                <span className="arrow-out">→</span>
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="btn-line bg-white/60 px-8 font-mono"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
