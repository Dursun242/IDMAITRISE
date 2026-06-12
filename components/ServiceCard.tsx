import Link from "next/link"
import type { ReactElement } from "react"
import type { ServiceLink } from "@/lib/site"

type Props = {
  service: ServiceLink
  index: number
  featured?: boolean
}

const icons: Record<string, ReactElement> = {
  "construction-maison-individuelle": (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <path d="M6 22L24 8l18 14v18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V22z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 42V28h12v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "permis-de-construire": (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <rect x="10" y="6" width="28" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16h16M16 22h16M16 28h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="34" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "maitre-oeuvre-habitat": (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <path d="M8 38V18l16-10 16 10v20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 38h32M20 38V26h8v12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "maitre-oeuvre-professionnels": (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <rect x="6" y="14" width="36" height="28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 22h6v6h-6zM28 22h6v6h-6zM14 32h6v6h-6zM28 32h6v6h-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 14L24 6l18 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  "ouverture-mur-porteur": (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <rect x="6" y="10" width="36" height="28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 38V20h12v18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 16h20" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  "etudes-de-sol": (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <path d="M4 22h40M4 30h40M4 38h40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M24 4v18M18 10l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "etude-thermique-re2020": (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
      <path d="M24 6c-6 8-10 14-10 22a10 10 0 0 0 20 0c0-8-4-14-10-22z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 22v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

export function ServiceCard({ service, index, featured }: Props) {
  return (
    <Link
      href={`/${service.slug}`}
      className={`panel group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-bronze/50 hover:shadow-lift sm:p-8 ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div className="absolute right-6 top-6 font-display text-sm italic text-noir/30 transition-colors group-hover:text-bronze">
        n° {String(index + 1).padStart(2, "0")}
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-bronze/30 bg-bronze/[0.07] text-bronze-deep transition-all duration-500 group-hover:scale-110 group-hover:shadow-bronze">
        {icons[service.slug] ?? (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      <h3
        className={`mt-6 font-display font-semibold leading-tight tracking-tight ${
          featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
        }`}
      >
        {service.title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-noir/65">
        {service.short}
      </p>

      {featured && (
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="tag">Conception</span>
          <span className="tag">Permis</span>
          <span className="tag">Chantier</span>
          <span className="tag">Livraison</span>
        </div>
      )}

      <div className="mt-auto pt-8">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-bronze-deep">
          Découvrir
          <span className="arrow-out">→</span>
        </span>
      </div>

      <div
        aria-hidden
        className="absolute -bottom-1/2 -right-1/3 h-full w-2/3 rounded-full bg-bronze/0 blur-3xl transition-all duration-700 group-hover:bg-bronze/10"
      />
    </Link>
  )
}
