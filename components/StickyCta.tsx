"use client"

import Link from "next/link"
import { site } from "@/lib/site"

/**
 * Barre d'action collante en bas d'écran, mobile uniquement.
 * Deux gestes à portée de pouce : appeler ou demander un devis.
 */
export function StickyCta() {
  return (
    <div className="sticky-cta md:hidden">
      <div className="flex gap-2 rounded-2xl border border-ink/10 bg-paper/90 p-2 shadow-lift backdrop-blur-xl">
        <a
          href={`tel:${site.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-ink/15 px-4 py-3 text-sm font-medium"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-ember" />
          Appeler
        </a>
        <Link
          href="/contact"
          className="flex flex-[1.2] items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-paper"
        >
          Devis gratuit
          <span className="arrow-out">→</span>
        </Link>
      </div>
    </div>
  )
}
