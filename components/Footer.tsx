import Link from "next/link"
import { site, services } from "@/lib/site"
import { zones } from "@/lib/data"

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 fine-grid opacity-[0.08]" />
      <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-ember/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="eyebrow text-paper/50">Maître d'œuvre · Le Havre</div>
            <p className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
              Concevons ensemble
              <br />
              <span className="italic-accent text-ember">votre prochain</span> projet.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white"
            >
              Démarrer un projet
              <span className="arrow-out">→</span>
            </Link>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
              Prestations
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-paper/75">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="link-underline transition-colors hover:text-paper"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
              Studio
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-paper/75">
              <li>{site.address.street}</li>
              <li>
                {site.address.postalCode} {site.address.city}
              </li>
              <li className="pt-2">
                <a
                  href={`tel:${site.phone}`}
                  className="link-underline transition-colors hover:text-paper"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline transition-colors hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-paper/50">{site.hoursDisplay}</li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
              Explorer
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-paper/75">
              <li>
                <Link href="/realisations" className="link-underline transition-colors hover:text-paper">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/faq" className="link-underline transition-colors hover:text-paper">
                  Questions fréquentes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="link-underline transition-colors hover:text-paper">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline transition-colors hover:text-paper">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-6 flex gap-4 text-sm text-paper/75">
              <a href={site.social.linkedin} className="hover:text-paper">LinkedIn ↗</a>
              <a href={site.social.instagram} className="hover:text-paper">Instagram ↗</a>
              <a href={site.social.facebook} className="hover:text-paper">Facebook ↗</a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-paper/10 pt-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
            Maître d'œuvre en Normandie
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-paper/70">
            {zones.map((z) => (
              <Link
                key={z.slug}
                href={`/secteur/${z.slug}`}
                className="link-underline hover:text-paper"
              >
                {z.city}
              </Link>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="mt-16 select-none font-display text-[18vw] font-semibold leading-[0.85] tracking-tightest text-paper/[0.06]"
        >
          ID&nbsp;Maîtrise
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper/10 pt-8 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {site.legalName} — Tous droits réservés.
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/mentions-legales" className="hover:text-paper">
              Mentions légales
            </Link>
            <span>·</span>
            <span>Assurance décennale</span>
            <span>·</span>
            <span>RC Professionnelle</span>
            <span>·</span>
            <span>RE2020</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
