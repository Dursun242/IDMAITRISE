import Link from "next/link"
import { site } from "@/lib/site"

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
    <header className="sticky top-0 z-50 border-b border-holo/10 bg-void/75 backdrop-blur-xl">
      {/* Liseré lumineux */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-holo/40 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-holo opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-holo shadow-glow" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            ID&nbsp;Maîtrise
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ghost-mute sm:inline">
            /LH·76
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm text-ghost-dim transition-colors hover:bg-holo/10 hover:text-holo-soft"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className="hidden font-mono text-sm text-ghost-dim transition-colors hover:text-holo-soft xl:inline"
          >
            {site.phoneDisplay}
          </a>
          <Link href="/contact" className="btn-holo group px-5 py-2.5 text-xs">
            Lancer un projet
            <span className="arrow-out">→</span>
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-holo/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-ghost">
            <span className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-holo" />
              <span className="block h-px w-4 bg-holo" />
            </span>
            Menu
          </summary>
          <div className="glass absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl shadow-panel">
            <div className="p-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-ghost-dim transition-colors hover:bg-holo/10 hover:text-ghost"
                >
                  {n.label}
                  <span className="text-holo/50">→</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-holo/15 bg-void/60 p-3">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center justify-between rounded-xl px-3 py-3 font-mono text-sm font-medium text-ghost"
              >
                {site.phoneDisplay}
                <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-holo" />
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}
