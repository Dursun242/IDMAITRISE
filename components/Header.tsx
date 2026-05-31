import Link from "next/link"
import { site } from "@/lib/site"

const nav = [
  { href: "/", label: "L'agence" },
  { href: "/maitre-oeuvre-habitat", label: "Habitat" },
  { href: "/maitre-oeuvre-professionnels", label: "Professionnels" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-display text-xl font-semibold tracking-tightest"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-ember transition-transform group-hover:scale-125" />
          ID&nbsp;Maîtrise
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className="hidden text-sm font-medium text-ink/70 hover:text-ink xl:inline"
          >
            {site.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-ink-soft"
          >
            Devis gratuit
            <span className="arrow-out">→</span>
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm">
            <span className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
            </span>
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-lift">
            <div className="p-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors hover:bg-ink/5"
                >
                  {n.label}
                  <span className="text-ink/30">→</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-ink/8 bg-ink p-3">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-paper"
              >
                {site.phoneDisplay}
                <span className="text-ember">●</span>
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}
