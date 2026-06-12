import Link from "next/link"
import { site, services } from "@/lib/site"

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-noir text-linen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/60 to-transparent" />
      <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-bronze/15 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="eyebrow text-bronze-light">
              Maître d'œuvre · Le Havre
            </div>
            <p className="mt-5 font-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl">
              Concevons ensemble
              <br />
              <span className="italic-accent text-bronze-light">
                votre prochain projet.
              </span>
            </p>
            <Link href="/contact" className="btn-ivory group mt-7">
              Démarrer un projet
              <span className="arrow-out">→</span>
            </Link>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-linen/40">
              Prestations
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-linen/75">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="link-underline transition-colors hover:text-bronze-light"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-linen/40">
              Le cabinet
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-linen/75">
              <li>{site.address.street}</li>
              <li>
                {site.address.postalCode} {site.address.city}
              </li>
              <li className="pt-2">
                <a
                  href={`tel:${site.phone}`}
                  className="link-underline font-mono transition-colors hover:text-bronze-light"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline transition-colors hover:text-bronze-light"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-linen/50">{site.hoursDisplay}</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-linen/40">
              Suivre
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-linen/75">
              <li>
                <a
                  href={site.social.linkedin}
                  className="link-underline transition-colors hover:text-bronze-light"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  className="link-underline transition-colors hover:text-bronze-light"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook}
                  className="link-underline transition-colors hover:text-bronze-light"
                >
                  Facebook ↗
                </a>
              </li>
            </ul>

            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-bronze-light/60">
              <div>Lat 49.4944° N</div>
              <div>Lon 0.1079° E</div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="text-outline mt-20 select-none font-display text-[17vw] font-bold leading-[0.9] tracking-tightest"
        >
          ID&nbsp;Maîtrise
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-linen/10 pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-linen/45 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {site.legalName} — Tous droits réservés
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Assurance décennale</span>
            <span className="text-bronze/60">·</span>
            <span>RC Professionnelle</span>
            <span className="text-bronze/60">·</span>
            <span>RE2020</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
