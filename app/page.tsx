import Link from "next/link"
import type { Metadata } from "next"
import { site, services } from "@/lib/site"
import { getAllDocs } from "@/lib/content"
import { Marquee } from "@/components/Marquee"
import { Stats } from "@/components/Stats"
import { ProcessSteps } from "@/components/ProcessSteps"
import { ServiceCard } from "@/components/ServiceCard"
import { ProjectGrid } from "@/components/ProjectGrid"
import { Testimonials } from "@/components/Testimonials"
import { FaqSection } from "@/components/Faq"
import { zones } from "@/lib/data"

export const metadata: Metadata = {
  title: "Maître d'œuvre au Havre — ID Maîtrise",
  description: site.description,
  alternates: { canonical: "/" },
}

const engagements = [
  {
    t: "Interlocuteur unique",
    d: "Un seul responsable de l'étude à la réception. Artisans, planning, budget — tout passe par nous.",
  },
  {
    t: "Conformité totale",
    d: "Plans conformes RE2020, assurance décennale, responsabilité civile professionnelle.",
  },
  {
    t: "Ancrage normand",
    d: "Réseau d'artisans locaux, connaissance fine du PLUi du Havre et des règles ABF.",
  },
]

export default function Home() {
  const posts = getAllDocs("blog").slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-ember/15 blur-[100px] animate-blob" />
        <div className="absolute right-0 top-1/2 h-[360px] w-[360px] rounded-full bg-sage/15 blur-[100px] animate-blob" style={{ animationDelay: "6s" }} />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Le Havre · Normandie</span>
            <span className="hidden text-xs text-ink/40 sm:inline">·</span>
            <span className="hidden text-xs uppercase tracking-[0.22em] text-ink/55 sm:inline">
              Maîtrise d'œuvre indépendante
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.75rem,7vw,6.25rem)] font-medium leading-[0.95] tracking-tightest">
            Bâtir la maison qui <span className="italic-accent text-ember">vous</span> ressemble,
            <br className="hidden sm:block" />
            au Havre et en Normandie.
          </h1>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <p className="max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl">
              ID Maîtrise conçoit et pilote votre projet — maison contemporaine,
              extension, rénovation. Un seul interlocuteur, des artisans
              qualifiés, un budget tenu, de la première esquisse aux clés en main.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition hover:bg-ink-soft"
              >
                Démarrer mon projet
                <span className="arrow-out">→</span>
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-3 rounded-full border border-ink/15 px-7 py-4 text-sm font-medium transition hover:border-ink/40"
              >
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-ember" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Mini barre de "preuves" */}
          <div className="mt-16 grid gap-6 border-t border-ink/10 pt-10 sm:grid-cols-3 sm:gap-12">
            {engagements.map((e) => (
              <div key={e.t}>
                <div className="flex items-center gap-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" />
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    {e.t}
                  </h3>
                </div>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/60">
                  {e.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={site.areaServed} />

      {/* À PROPOS / SIGNATURE */}
      <section className="relative bg-ink text-paper">
        <div className="absolute inset-0 fine-grid opacity-[0.08]" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <div className="eyebrow text-paper/50">À propos</div>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
                Une maîtrise d'œuvre
                <br />
                <span className="italic-accent text-ember">à taille humaine</span>,
                <br />
                exigeante sur le détail.
              </h2>
            </div>
            <div className="space-y-6 text-paper/75">
              <p className="text-lg leading-relaxed">
                Installé au cœur du Havre, le cabinet ID Maîtrise accompagne
                particuliers et professionnels sur l'ensemble de la
                Seine-Maritime et du Calvados. Construction neuve, extension,
                rénovation lourde, bâtiment professionnel : nous intervenons à
                toutes les échelles.
              </p>
              <p className="leading-relaxed">
                Notre force : un interlocuteur unique qui porte votre projet
                d'un bout à l'autre — de la lecture du PLUi au procès-verbal
                de réception. Nos artisans partenaires sont normands, choisis
                sur la qualité de leur travail et la tenue de leurs engagements.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white"
                >
                  Prendre rendez-vous
                  <span className="arrow-out">→</span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-paper/70 hover:text-paper"
                >
                  Lire le journal
                  <span className="arrow-out">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — Bento */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow">Prestations</div>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
              Sept savoir-faire,
              <br />
              <span className="italic-accent text-ember">un seul cabinet.</span>
            </h2>
          </div>
          <p className="max-w-md text-ink/65">
            Du dessin à la coordination, en passant par les études techniques
            réglementaires. Tout sous un même toit.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
          {services.map((s, i) => (
            <ServiceCard
              key={s.slug}
              service={s}
              index={i}
              featured={i === 0}
            />
          ))}
        </div>
      </section>

      <Stats />

      {/* RÉALISATIONS (aperçu) */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow">Réalisations</div>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
              Des projets livrés,
              <br />
              <span className="italic-accent text-ember">pas des promesses.</span>
            </h2>
          </div>
          <Link
            href="/realisations"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink"
          >
            Toutes les réalisations
            <span className="arrow-out">→</span>
          </Link>
        </div>
        <div className="mt-12">
          <ProjectGrid limit={2} />
        </div>
      </section>

      <ProcessSteps />

      <Testimonials />

      {/* JOURNAL */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">Journal</div>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
                Conseils, repères
                <br />
                <span className="italic-accent text-ember">et coulisses.</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink"
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
                className="group relative flex flex-col rounded-3xl border border-ink/10 bg-paper-warm p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-lift sm:p-8"
              >
                <div className="font-display text-xs font-medium tabular text-ink/30">
                  / {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.18em] text-ink/45">
                  {p.date}
                </div>
                <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">
                  {p.description}
                </p>
                <div className="mt-auto pt-8 text-sm font-medium text-ember">
                  Lire l'article{" "}
                  <span className="arrow-out inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTEURS (SEO local) */}
      <section className="border-y border-ink/10 bg-paper-warm">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">Secteurs</div>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
                Au Havre et
                <br />
                <span className="italic-accent text-ember">partout en Normandie.</span>
              </h2>
            </div>
            <p className="max-w-md text-ink/65">
              Basés au Havre, nous intervenons sur toute la Seine-Maritime et le
              Calvados. Trouvez votre commune.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((z) => (
              <Link
                key={z.slug}
                href={`/secteur/${z.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-ink/10 bg-paper p-6 transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lift"
              >
                <div>
                  <div className="font-display text-xl font-medium tracking-tight">
                    {z.city}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-ink/45">
                    {z.dept}
                  </div>
                </div>
                <span className="text-ink/30 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-paper-warm">
        <div className="absolute inset-0 blueprint-grid opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="eyebrow justify-center">Premier échange offert</div>
            <p className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl">
              On regarde votre
              <br />
              <span className="italic-accent text-ember">projet ensemble</span> ?
            </p>
            <p className="mx-auto mt-6 max-w-xl text-ink/65">
              Devis, faisabilité, premier rendez-vous : c'est gratuit et sans
              engagement. On revient vers vous sous 24–48 h ouvrées.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition hover:bg-ink-soft"
              >
                Démarrer maintenant
                <span className="arrow-out">→</span>
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-3 rounded-full border border-ink/15 bg-paper px-8 py-4 text-sm font-medium transition hover:border-ink/40"
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
