import Link from "next/link"
import { site, services } from "@/lib/site"

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-holo/15 bg-void-deep">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-holo/50 to-transparent" />
      <div className="absolute inset-0 hud-grid hud-grid-fade opacity-60" />
      <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-holo/10 blur-[130px]" />
      <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-pulse/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="eyebrow">Maître d'œuvre · Le Havre</div>
            <p className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl">
              Concevons ensemble
              <br />
              <span className="text-gradient-holo">votre prochain projet.</span>
            </p>
            <Link href="/contact" className="btn-holo group mt-7">
              Démarrer un projet
              <span className="arrow-out">→</span>
            </Link>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
              // Modules
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-ghost-dim">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="link-underline transition-colors hover:text-holo-soft"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
              // Base
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-ghost-dim">
              <li>{site.address.street}</li>
              <li>
                {site.address.postalCode} {site.address.city}
              </li>
              <li className="pt-2">
                <a
                  href={`tel:${site.phone}`}
                  className="link-underline font-mono transition-colors hover:text-holo-soft"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline transition-colors hover:text-holo-soft"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-ghost-mute">{site.hoursDisplay}</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-ghost-mute">
              // Signaux
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-ghost-dim">
              <li>
                <a
                  href={site.social.linkedin}
                  className="link-underline transition-colors hover:text-holo-soft"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  className="link-underline transition-colors hover:text-holo-soft"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook}
                  className="link-underline transition-colors hover:text-holo-soft"
                >
                  Facebook ↗
                </a>
              </li>
            </ul>

            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ghost-mute">
              <div>Lat 49.4944° N</div>
              <div>Lon 0.1079° E</div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="text-outline mt-20 select-none font-display text-[17vw] font-bold leading-[0.85] tracking-tightest"
        >
          ID&nbsp;Maîtrise
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-holo/10 pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-ghost-mute sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {site.legalName} — Tous droits réservés
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Décennale</span>
            <span className="text-holo/40">·</span>
            <span>RC Pro</span>
            <span className="text-holo/40">·</span>
            <span>RE2020</span>
            <span className="text-holo/40">·</span>
            <span className="inline-flex items-center gap-2 text-holo">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-holo" />
              Système en ligne
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
