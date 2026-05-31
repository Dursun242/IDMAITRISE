import Link from "next/link"
import { site, services } from "@/lib/site"

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-lg font-semibold">ID Maîtrise</div>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">{site.tagline}.</p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-paper/50">
            Prestations
          </div>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-paper/50">
            Contact
          </div>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>{site.address.street}</li>
            <li>
              {site.address.postalCode} {site.address.city}
            </li>
            <li>
              <a href={`tel:${site.phone}`} className="transition-colors hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.hoursDisplay}</li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-paper/50">
            Suivez-nous
          </div>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>
              <a href={site.social.linkedin} className="transition-colors hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.social.instagram} className="transition-colors hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.social.facebook} className="transition-colors hover:text-white">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-paper/50">
          © {new Date().getFullYear()} ID Maîtrise — Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
