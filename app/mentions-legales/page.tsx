import type { Metadata } from "next"
import type { ReactNode } from "react"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Mentions légales — ID Maîtrise",
  description:
    "Mentions légales du site ID Maîtrise, maître d'œuvre au Havre (Seine-Maritime).",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-ink/10 py-8">
      <h2 className="font-display text-xl font-medium tracking-tight">{title}</h2>
      <div className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
        {children}
      </div>
    </section>
  )
}

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="eyebrow">Informations légales</div>
      <h1 className="mt-5 font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl">
        Mentions <span className="italic-accent text-ember">légales</span>
      </h1>
      <p className="mt-6 text-ink/65">
        Conformément aux dispositions des articles 6-III et 19 de la loi
        n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique
        (LCEN), voici les informations relatives à l'éditeur et à l'hébergeur du
        présent site.
      </p>

      <div className="mt-10">
        <Block title="Éditeur du site">
          <p>{site.legalName} — {site.legal.form}</p>
          <p>
            {site.address.street}, {site.address.zip} {site.address.city}, France
          </p>
          <p>SIREN : {site.legal.siren}</p>
          <p>SIRET (siège) : {site.legal.siret}</p>
          <p>Code APE : {site.legal.ape}</p>
          <p>Immatriculée au RCS de {site.legal.rcs} le {site.legal.registered}.</p>
          <p>
            E-mail :{" "}
            <a href={`mailto:${site.email}`} className="text-ember hover:underline">
              {site.email}
            </a>
          </p>
          <p>
            Téléphone :{" "}
            <a href={`tel:${site.phone}`} className="text-ember hover:underline">
              {site.phoneDisplay}
            </a>
          </p>
        </Block>

        <Block title="Directeur de la publication">
          <p>Le représentant légal de {site.legalName}.</p>
        </Block>

        <Block title="Hébergement">
          <p>Vercel Inc.</p>
          <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
          <p>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember hover:underline"
            >
              vercel.com
            </a>
          </p>
        </Block>

        <Block title="Propriété intellectuelle">
          <p>
            L'ensemble des contenus présents sur ce site (textes, images,
            graphismes, logo) est la propriété de {site.legalName}, sauf mention
            contraire. Toute reproduction, représentation ou diffusion, totale ou
            partielle, sans autorisation écrite préalable est interdite et
            constituerait une contrefaçon au sens des articles L.335-2 et suivants
            du Code de la propriété intellectuelle.
          </p>
        </Block>

        <Block title="Données personnelles">
          <p>
            Les informations transmises via le formulaire de contact sont
            utilisées uniquement pour traiter votre demande et ne sont jamais
            cédées à des tiers. Conformément au RGPD et à la loi
            « Informatique et Libertés », vous disposez d'un droit d'accès, de
            rectification et de suppression de vos données : il suffit d'en faire
            la demande par e-mail à{" "}
            <a href={`mailto:${site.email}`} className="text-ember hover:underline">
              {site.email}
            </a>
            .
          </p>
        </Block>

        <Block title="Cookies">
          <p>
            Ce site n'utilise pas de cookies publicitaires. Seuls des cookies
            techniques strictement nécessaires à son fonctionnement peuvent être
            déposés.
          </p>
        </Block>
      </div>
    </div>
  )
}
