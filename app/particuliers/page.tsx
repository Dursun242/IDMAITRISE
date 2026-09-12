import Link from "next/link";
import { PRESTATIONS } from "@/content/site";
import { Cote, BlocCta, FilAriane } from "@/components";
import { meta } from "@/lib/seo";

export const metadata = meta({ titre: "Maître d'œuvre pour particuliers au Havre | ID Maîtrise", description: "Construction, extension, rénovation, mur porteur : un maître d'œuvre indépendant au Havre qui défend vos intérêts face aux entreprises. Premier avis gratuit.", chemin: "/particuliers" });

export default function Page() {
  const pages = PRESTATIONS.filter((p) => p.cible === "particulier" || p.cible === "les-deux");
  return (
    <>
      <section className="relative rayons pt-10 pb-12">
        <div className="relative max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={[{ href: "/", label: "Accueil" }, { href: "/particuliers", label: "Particuliers" }]} />
          <Cote gauche="PARTICULIERS" />
          <h1 className="max-w-[18ch] mb-6">Votre projet, vos entreprises, vos prix.</h1>
          <p className="text-[1.05rem] sm:text-[1.18rem] max-w-[58ch] mb-8">Nous ne vendons ni maison ni travaux. Nous concevons votre projet, mettons les artisans en concurrence et suivons le chantier. Vous signez directement avec chaque entreprise et vous voyez chaque prix.</p>
          <Link href="/contact" className="bg-jaune text-ink border border-jaune px-6 py-3.5 font-semibold inline-block">
            Décrire mon projet
          </Link>
        </div>
      </section>
      <section className="py-14 border-t border-bord">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 prose-id">
          <h2 className="text-[1.5rem] sm:text-[1.9rem] mb-5 max-w-[26ch]">Ce que change un maître d'œuvre indépendant</h2>
          <ul><li>Vous voyez le prix de chaque lot, pas un prix global qui masque une marge</li><li>Vous choisissez vos artisans, et vous pouvez proposer les vôtres</li><li>Nous ne percevons aucune commission des entreprises consultées</li><li>Vous pouvez réaliser certains travaux vous-même : nous l'intégrons au planning</li><li>Vous pouvez vous arrêter après le permis si vous le souhaitez</li></ul>
        </div>
      </section>
      <section className="py-14 bg-gris border-y border-bord">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <Cote gauche="PRESTATIONS CONCERNÉES" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-6">
            {pages.map((p) => (
              <Link key={p.slug} href={`/prestations/${p.slug}`} className="border-t-2 border-ink pt-4 group">
                <h3 className="mb-2 group-hover:underline underline-offset-4">{p.h1}</h3>
                <p className="text-grist text-[0.92rem] line-clamp-3">{p.chapo}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BlocCta texte="Décrire mon projet" contexte="particuliers" />
    </>
  );
}
