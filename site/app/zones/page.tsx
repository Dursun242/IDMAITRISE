import Link from "next/link";
import { ZONES } from "@/content/site";
import { Cote, BlocCta, FilAriane } from "@/components";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Zones d'intervention — Le Havre, Rouen, Caen | ID Maîtrise",
  description: "Cabinet basé au Havre intervenant en Seine-Maritime, Eure et Calvados. Le Havre, Fécamp, Rouen, Caen et leurs agglomérations.",
  chemin: "/zones",
});

export default function Hub() {
  return (
    <>
      <section className="relative rayons pt-10 pb-12">
        <div className="relative max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={[{ href: "/", label: "Accueil" }, { href: "/zones", label: "Zones" }]} />
          <Cote gauche="ZONE D'INTERVENTION" />
          <h1 className="max-w-[18ch] mb-6 text-[2.1rem] sm:text-[3rem]">Où nous intervenons</h1>
          <p className="text-[1.05rem] max-w-[58ch]">Nous intervenons là où nous pouvons être physiquement présents sur le chantier chaque semaine.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {ZONES.map((z) => (
              <Link key={z.slug} href={`/zones/${z.slug}`} className="border-t-2 border-ink pt-4 group">
                <div className="font-mono text-[0.68rem] text-grist mb-2">{z.cp} · {z.departement}</div>
                <h2 className="text-[1.1rem] font-bold mb-2 group-hover:underline underline-offset-4">{z.ville}</h2>
                <p className="text-grist text-[0.92rem] line-clamp-3">{z.chapo}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BlocCta contexte="hub-zones" />
    </>
  );
}
