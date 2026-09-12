import Link from "next/link";
import { PRESTATIONS } from "@/content/site";
import { Cote, BlocCta, FilAriane } from "@/components";
import { meta } from "@/lib/seo";

export const metadata = meta({ titre: "Maîtrise d'œuvre pour professionnels et collectivités | ID Maîtrise", description: "OPC, AMO, MOE d'exécution pour bâtiments tertiaires, industriels, agricoles et logements collectifs au Havre, Rouen et Caen. Missions TCE.", chemin: "/professionnels" });

export default function Page() {
  const pages = PRESTATIONS.filter((p) => p.cible === "professionnel" || p.cible === "les-deux");
  return (
    <>
      <section className="relative rayons pt-10 pb-12">
        <div className="relative max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={[{ href: "/", label: "Accueil" }, { href: "/professionnels", label: "Professionnels" }]} />
          <Cote gauche="PROFESSIONNELS & COLLECTIVITÉS" />
          <h1 className="max-w-[18ch] mb-6">Tenir le budget, le planning et la conformité.</h1>
          <p className="text-[1.05rem] sm:text-[1.18rem] max-w-[58ch] mb-8">Missions OPC, AMO et maîtrise d'œuvre d'exécution pour maîtres d'ouvrage privés, bailleurs et collectivités. Comptes rendus écrits, décisions tracées, planning tenu à jour.</p>
          <Link href="/contact" className="bg-jaune text-ink border border-jaune px-6 py-3.5 font-semibold inline-block">
            Demander une proposition
          </Link>
        </div>
      </section>
      <section className="py-14 border-t border-bord">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 prose-id">
          <h2 className="text-[1.5rem] sm:text-[1.9rem] mb-5 max-w-[26ch]">Ce que vous recevez chaque semaine</h2>
          <ul><li>Un compte rendu de réunion diffusé sous 48 h, avec actions nominatives et échéances</li><li>Un planning mis à jour avec l'avancement réel</li><li>Un point d'alerte sur ce qui menace la date de livraison</li><li>La vérification des situations de travaux avant paiement</li><li>Le contrôle des attestations d'assurance de chaque intervenant</li></ul>
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
      <BlocCta texte="Demander une proposition" contexte="professionnels" />
    </>
  );
}
