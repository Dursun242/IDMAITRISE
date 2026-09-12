import { notFound } from "next/navigation";
import { REALISATIONS } from "@/content/site";
import { Cote, BlocCta, FilAriane } from "@/components";
import { meta, JsonLd, jsonLdFilAriane } from "@/lib/seo";

export function generateStaticParams() { return REALISATIONS.map((r) => ({ slug: r.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = REALISATIONS.find((x) => x.slug === slug);
  return r ? meta({ titre: `${r.titre} | ID Maîtrise`, description: r.meta, chemin: `/realisations/${r.slug}` }) : {};
}

export default async function PageRealisation({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = REALISATIONS.find((x) => x.slug === slug);
  if (!r) notFound();
  const fil = [{ href: "/", label: "Accueil" }, { href: "/realisations", label: "Chantiers" },
               { href: `/realisations/${r.slug}`, label: r.titre }];
  return (
    <>
      <article className="pt-10 pb-14">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={fil} />
          <Cote gauche={r.lieu.toUpperCase()} droite={r.statut.toUpperCase()} />
          <h1 className="max-w-[20ch] mb-6 text-[2.1rem] sm:text-[2.9rem]">{r.titre}</h1>
          <p className="text-[1.08rem] max-w-[58ch] mb-10">{r.chapo}</p>
          <dl className="grid sm:grid-cols-3 gap-px bg-bord border border-bord">
            {[["MISSION", r.mission], ["LIEU", r.lieu], ["ÉTAT", r.statut]].map(([k, v]) => (
              <div key={k} className="bg-gris p-5">
                <dt className="font-mono text-[0.68rem] text-grist mb-1.5">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="prose-id mt-12">
            <h2 className="text-[1.5rem] sm:text-[1.9rem] mb-4">Déroulé de la mission</h2>
            <ul>{r.details.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        </div>
      </article>
      <BlocCta texte="Un projet comparable ?" contexte={`realisation-${r.slug}`} />
      <JsonLd data={jsonLdFilAriane(fil)} />
    </>
  );
}
