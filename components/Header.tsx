import Link from "next/link"
import { site } from "@/lib/site"
import { LogoLockup } from "@/components/Logo"

const nav = [
  { href: "/", label: "L'agence" },
  { href: "/construction-maison-individuelle", label: "Construire" },
  { href: "/maitre-oeuvre-habitat", label: "Rénover" },
  { href: "/maitre-oeuvre-professionnels", label: "Professionnels" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-noir/10 bg-linen/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="transition-opacity hover:opacity-75"
          aria-label="id Maîtrise — Accueil"
        >
          <LogoLockup tagline={site.brandTagline} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm text-noir/70 transition-colors hover:bg-noir/5 hover:text-noir"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className="hidden font-mono text-sm text-noir/70 transition-colors hover:text-bronze-deep xl:inline"
          >
            {site.phoneDisplay}
          </a>
          <Link href="/contact" className="btn-dark group px-5 py-2.5 text-xs">
            Démarrer un projet
            <span className="arrow-out">→</span>
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-noir/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-noir">
            <span className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-noir" />
              <span className="block h-px w-4 bg-noir" />
            </span>
            Menu
          </summary>
          <div className="panel absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl shadow-lift">
            <div className="p-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-noir/80 transition-colors hover:bg-noir/5 hover:text-noir"
                >
                  {n.label}
                  <span className="text-bronze/60">→</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-noir/10 bg-noir p-3">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center justify-between rounded-xl px-3 py-3 font-mono text-sm font-medium text-linen"
              >
                {site.phoneDisplay}
                <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-bronze-light" />
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}
