import type { Metadata } from "next"
import { Fraunces, Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { JsonLd } from "@/components/JsonLd"
import { site } from "@/lib/site"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
})
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: site.areaServed,
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: [site.social.linkedin, site.social.instagram, site.social.facebook],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${sans.variable} ${serif.variable}`}
    >
      <body className="font-sans">
        <JsonLd data={localBusiness} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
