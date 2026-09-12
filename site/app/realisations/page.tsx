import Link from "next/link";
import { REALISATIONS } from "@/content/site";
import { Cote, BlocCta, FilAriane } from "@/components";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Nos chantiers en cours et livrés | ID Maîtrise, Le Havre",
  description: "Équipements publics, logements collectifs et maisons individuelles : les opérations menées par ID Maîtrise au Havre et en Normandie.",
  chemin: "/realisations",
});

export default function Hub() {
  return (
    <>
      <section className="relative rayons pt-10 pb-12">
        <div className="relative max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={[{ href: "/", label: "Accueil" }, { href: "/realisations", label: "Chantiers" }]} />
          <Cote gauche="CHANTIERS" />
          <h1 className="max-w-[18ch] mb-6 text-[2.1rem] sm:text-[3rem]">Nos chantiers</h1>
          <p className="text-[1.05rem] max-w-[58ch]">Des opérations réelles, avec leur mission, leur état d'avancement et ce que nous y faisons.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {REALISATIONS.map((r) => (
              <Link key={r.slug} href={`/realisations/${r.slug}`} className="border-t-2 border-ink pt-4 group">
                <div className="font-mono text-[0.68rem] text-grist flex justify-between gap-3 mb-3">
                  <span>{r.lieu}</span><span className="bg-jaune text-ink px-1.5">{r.statut.toUpperCase()}</span>
                </div>
                <h2 className="text-[1.1rem] font-bold mb-2 group-hover:underline underline-offset-4">{r.titre}</h2>
                <p className="text-grist text-[0.92rem] line-clamp-3">{r.chapo}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BlocCta contexte="hub-realisations" />
    </>
  );
}
