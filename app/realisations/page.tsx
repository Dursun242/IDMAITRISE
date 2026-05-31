import type { Metadata } from "next"
import Link from "next/link"
import { ProjectGrid } from "@/components/ProjectGrid"
import { Testimonials } from "@/components/Testimonials"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Réalisations — Maître d'œuvre au Havre",
  description:
    "Découvrez les réalisations d'ID Maîtrise : constructions neuves, extensions, rénovations et bâtiments professionnels au Havre et en Normandie.",
  alternates: { canonical: "/realisations" },
}

export default function RealisationsPage() {
  return (
    <>
      <section className="relative border-b border-ink/10">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow">Réalisations</div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.98] tracking-tightest sm:text-7xl">
            Des projets livrés,
            <br />
            <span className="italic-accent text-ember">pas des promesses.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/65">
            Construction neuve, extension, rénovation lourde, bâtiment
            professionnel : un aperçu de projets que nous avons conçus et
            pilotés en Normandie, de la première esquisse à la remise des clés.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <ProjectGrid />
      </section>

      <Testimonials />

      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 fine-grid opacity-[0.08]" />
        <div className="absolute -right-32 -top-20 h-[400px] w-[400px] rounded-full bg-ember/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
              Votre projet sera
              <br />
              <span className="italic-accent text-ember">le prochain</span> ?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white"
              >
                Démarrer mon projet
                <span className="arrow-out">→</span>
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-3 rounded-full border border-paper/30 px-6 py-3.5 text-sm font-medium transition hover:border-paper/60"
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
