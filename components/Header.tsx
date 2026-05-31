import Link from "next/link"
import { site } from "@/lib/site"

const nav = [
  { href: "/", label: "L'agence" },
  { href: "/construction-maison-individuelle", label: "Construire ma maison" },
  { href: "/maitre-oeuvre-habitat", label: "Extension & rénovation" },
  { href: "/maitre-oeuvre-professionnels", label: "Professionnels" },
  { href: "/blog", label: "Conseils" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          ID&nbsp;Maîtrise
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-ink/70 transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={`tel:${site.phone}`}
            className="rounded-full bg-steel px-4 py-2 font-medium text-paper transition-colors hover:bg-steel-dark"
          >
            {site.phoneDisplay}
          </a>
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-ink/15 px-3 py-2 text-sm">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-60 rounded-xl border border-ink/10 bg-paper p-2 shadow-xl">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-ink/5"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phone}`}
              className="mt-1 block rounded-lg bg-steel px-3 py-2 text-center text-sm font-medium text-paper"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </details>
      </div>
    </header>
  )
}
