import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Header, Footer } from "@/components";
import { SITE } from "@/content/site";
import { JsonLd, jsonLdEntreprise } from "@/lib/seo";
import "./globals.css";

// Lato : la police du logo ID Maîtrise.
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Maître d'œuvre au Havre (76) — ID Maîtrise, MOE TCE indépendant",
    template: "%s",
  },
  description:
    "Maîtrise d'œuvre TCE indépendante au Havre : permis de construire, OPC, AMO, direction de travaux. Construction, extension et rénovation en Seine-Maritime.",
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32" }, { url: "/favicon-512.png", sizes: "512x512" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: { images: ["/og-image.jpg"] },
  verification: { google: "" }, // ← code Search Console
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={lato.variable}>
      <body className="bg-white text-ink font-sans antialiased">
        <a href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-3 focus:z-[99] bg-jaune text-ink px-4 py-2.5 rounded-full">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <JsonLd data={jsonLdEntreprise()} />
      </body>
    </html>
  );
}
