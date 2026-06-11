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

const consoleLines = [
  { k: "interlocuteur", v: "UNIQUE", dots: "........." },
  { k: "assurance", v: "DÉCENNALE + RC PRO", dots: "............" },
  { k: "réseau_artisans", v: "NORMANDIE", dots: "......" },
  { k: "conformité", v: "RE2020 · PLUi · ABF", dots: "..........." },
  { k: "budget", v: "VERROUILLÉ", dots: "................" },
]

export default function Home() {
  const posts = getAllDocs("blog").slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hud-grid hud-grid-fade animate-grid-pan" />
        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-holo/10 blur-[120px] animate-aurora" />
        <div
          className="absolute right-0 top-1/2 h-[380px] w-[380px] rounded-full bg-pulse/10 blur-[120px] animate-aurora"
          style={{ animationDelay: "6s" }}
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
            {/* Colonne texte */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">Maître d'œuvre indépendant</span>
                <span className="chip">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-holo" />
                  Le Havre · Normandie
                </span>
              </div>

              <h1 className="mt-8 font-display text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[1.0] tracking-tightest">
                Bâtir la maison
                <br />
                de demain,
                <br />
                <span className="text-gradient-holo">
                  pilotée au millimètre.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ghost-dim">
                ID Maîtrise conçoit et pilote votre projet — maison
                contemporaine, extension, rénovation. Un seul interlocuteur,
                des artisans qualifiés, un budget tenu, de la première esquisse
                aux clés en main.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-holo group">
                  Initialiser mon projet
                  <span className="arrow-out">→</span>
                </Link>
                <a href={`tel:${site.phone}`} className="btn-line font-mono">
                  <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-holo" />
                  {site.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Colonne visualisation */}
            <div className="corners glass scanlines relative rounded-2xl p-6 shadow-panel sm:p-8">
              <div className="scan-beam" />
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ghost-mute">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-holo animate-pulse-soft" />
                  Visualisation // projet
                </span>
                <span>LH-76</span>
              </div>
              <div className="mt-4">
                <WireframeHouse />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-holo/10 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ghost-mute">
                <span>Échelle 1:100</span>
                <span>ISO 30°</span>
                <span className="text-holo">RE2020 ✓</span>
              </div>
            </div>
          </div>

          {/* Engagements */}
          <div className="mt-16 grid gap-5 border-t border-holo/10 pt-10 sm:grid-cols-3">
            {engagements.map((e) => (
              <div key={e.t} className="glass rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    {e.t}
                  </h3>
                  <span className="font-mono text-[10px] text-ghost-mute">
                    /{e.n}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ghost-dim">
                  {e.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={site.areaServed} />

      {/* À PROPOS / CONSOLE */}
      <section className="relative overflow-hidden bg-void-deep">
        <div className="absolute inset-0 hud-grid-sm opacity-50" />
        <div className="absolute -right-40 top-0 h-[460px] w-[460px] rounded-full bg-holo/[0.07] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <div className="eyebrow">Le cabinet</div>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Une maîtrise d'œuvre
                <br />
                <span className="text-gradient-holo">à taille humaine</span>,
                <br />
                exigeante sur le détail.
              </h2>
              <div className="mt-7 space-y-5 text-ghost-dim">
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
                <Link href="/contact" className="btn-holo group">
                  Prendre rendez-vous
                  <span className="arrow-out">→</span>
                </Link>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-ghost-dim transition-colors hover:text-holo-soft"
                >
                  Lire le journal
                  <span className="arrow-out">→</span>
                </Link>
              </div>
            </div>

            {/* Terminal système */}
            <div className="corners glass relative rounded-2xl shadow-panel">
              <div className="flex items-center gap-2 border-b border-holo/10 px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-ghost-mute/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-holo/70" />
                <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ghost-mute">
                  idm — statut système
                </span>
              </div>
              <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
                <div className="appear-up text-ghost-mute" style={{ animationDelay: "0.1s" }}>
                  <span className="text-holo">$</span> idm --status
                </div>
                {consoleLines.map((l, i) => (
                  <div
                    key={l.k}
                    className="appear-up flex flex-wrap gap-x-2"
                    style={{ animationDelay: `${0.3 + i * 0.18}s` }}
                  >
                    <span className="text-ghost-dim">&gt; {l.k}</span>
                    <span className="text-ghost-mute/50">{l.dots}</span>
                    <span className="text-ghost">{l.v}</span>
                  </div>
                ))}
                <div
                  className="appear-up flex items-center gap-2 pt-1"
                  style={{ animationDelay: "1.4s" }}
                >
                  <span className="text-ghost-dim">&gt; statut</span>
                  <span className="text-ghost-mute/50">................</span>
                  <span className="inline-flex items-center gap-2 text-holo">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-holo" />
                    OPÉRATIONNEL
                  </span>
                  <span className="caret text-holo">▮</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — Modules */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow">Modules</div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Sept savoir-faire,
              <br />
              <span className="text-gradient-holo">un seul cabinet.</span>
            </h2>
          </div>
          <p className="max-w-md text-ghost-dim">
            Du dessin à la coordination, en passant par les études techniques
            réglementaires. Tout sous un même toit.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} featured={i === 0} />
          ))}
        </div>
      </section>

      <Stats />

      <ProcessSteps />

      {/* JOURNAL */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">Transmissions</div>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Conseils, repères
                <br />
                <span className="text-gradient-holo">et coulisses.</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-holo"
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
                className="glass group relative flex flex-col rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-holo/40 hover:shadow-glow sm:p-8"
              >
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ghost-mute">
                  Log /{String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ghost-mute">
                  {p.date}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ghost-dim">
                  {p.description}
                </p>
                <div className="mt-auto pt-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-holo">
                  Lire l'article <span className="arrow-out inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-void-deep">
        <div className="absolute inset-0 hud-grid hud-grid-fade opacity-70" />

        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          {/* Radar */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 sm:h-[520px] sm:w-[520px]"
          >
            <span className="radar-ring" />
            <span className="radar-ring" style={{ animationDelay: "1.1s" }} />
            <span className="radar-ring" style={{ animationDelay: "2.2s" }} />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="eyebrow justify-center">
              Premier échange offert
            </div>
            <p className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tightest sm:text-7xl">
              On regarde votre
              <br />
              <span className="text-gradient-holo">projet ensemble</span> ?
            </p>
            <p className="mx-auto mt-6 max-w-xl text-ghost-dim">
              Devis, faisabilité, premier rendez-vous : c'est gratuit et sans
              engagement. On revient vers vous sous 24–48 h ouvrées.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-holo group px-8">
                Démarrer maintenant
                <span className="arrow-out">→</span>
              </Link>
              <a href={`tel:${site.phone}`} className="btn-line px-8 font-mono">
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
