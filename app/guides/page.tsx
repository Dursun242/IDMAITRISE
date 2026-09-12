import Link from "next/link";
import { GUIDES } from "@/content/site";
import { Cote, BlocCta, FilAriane } from "@/components";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Guides pratiques construction et urbanisme | ID Maîtrise",
  description: "PLUi du Havre, prix d'un maître d'œuvre, CCMI ou MOE, garanties, planning de chantier : nos guides pour décider en connaissance de cause.",
  chemin: "/guides",
});

export default function Hub() {
  return (
    <>
      <section className="relative rayons pt-10 pb-12">
        <div className="relative max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={[{ href: "/", label: "Accueil" }, { href: "/guides", label: "Guides" }]} />
          <Cote gauche="GUIDES" />
          <h1 className="max-w-[18ch] mb-6 text-[2.1rem] sm:text-[3rem]">Comprendre avant de décider</h1>
          <p className="text-[1.05rem] max-w-[58ch]">Des réponses concrètes aux questions qui décident de la réussite d'un projet de construction.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {GUIDES.map((p) => (
              <Link key={p.slug} href={`/guides/${p.slug}`} className="border-t-2 border-ink pt-4 group">
                <h2 className="text-[1.1rem] font-bold mb-2 group-hover:underline underline-offset-4">{p.h1}</h2>
                <p className="text-grist text-[0.92rem] line-clamp-3">{p.chapo}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BlocCta contexte="hub-guides" />
    </>
  );
}
