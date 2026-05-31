import Script from "next/script"

/**
 * Analytics respectueux de la vie privée (Plausible), sans cookies ni bannière.
 * Ne s'active que si NEXT_PUBLIC_PLAUSIBLE_DOMAIN est défini dans l'environnement.
 * Laisse la variable vide en local : rien n'est chargé.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  if (!domain) return null
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}
