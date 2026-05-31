import type { Metadata } from "next"
import Link from "next/link"
import { FaqSection } from "@/components/Faq"
import { JsonLd } from "@/components/JsonLd"
import { faqs } from "@/lib/data"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Questions fréquentes — Maître d'œuvre au Havre",
  description:
    "Maître d'œuvre ou architecte, coût, délais, permis : les réponses aux questions les plus fréquentes sur la maîtrise d'œuvre au Havre et en Normandie.",
  alternates: { canonical: "/faq" },
}

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <>
      <JsonLd data={faqSchema} />

      <section className="relative border-b border-ink/10">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="eyebrow">FAQ</div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.98] tracking-tightest sm:text-7xl">
            Vos questions,
            <br />
            <span className="italic-accent text-ember">nos réponses.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/65">
            Tout ce qu'il faut savoir avant de se lancer. Une autre question ?
            On y répond avec plaisir lors d'un premier échange gratuit.
          </p>
        </div>
      </section>

      <FaqSection title={false} />

      <section className="border-t border-ink/10 bg-paper-warm">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
            Il vous reste une question ?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition hover:bg-ink-soft"
            >
              Nous contacter
              <span className="arrow-out">→</span>
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-3 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium transition hover:border-ink/40"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
