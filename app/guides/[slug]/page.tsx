import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES, PRESTATIONS, TOUTES_PAGES, GENEREES } from "@/content/site";
import { Cote, BlocCta, BlocFaq, FilAriane, PagesLiees } from "@/components";
import { meta, JsonLd, jsonLdFaq, jsonLdFilAriane } from "@/lib/seo";

export function generateStaticParams() {
  return [...GUIDES, ...GENEREES].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = [...GUIDES, ...GENEREES].find((x) => x.slug === slug);
  return p ? meta({ titre: p.titre, description: p.meta, chemin: `/guides/${p.slug}` }) : {};
}

export default async function PageGuide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = [...GUIDES, ...GENEREES].find((x) => x.slug === slug);
  if (!p) notFound();
  const fil = [{ href: "/", label: "Accueil" }, { href: "/guides", label: "Guides" },
               { href: `/guides/${p.slug}`, label: p.h1 }];
  const liees = (p.lies || []).map((s) => TOUTES_PAGES.find((x) => x.slug === s)).filter(Boolean)
    .map((x) => ({ href: PRESTATIONS.some((pp) => pp.slug === x!.slug) ? `/prestations/${x!.slug}` : `/guides/${x!.slug}`,
                   titre: x!.h1, chapo: x!.chapo }));
  return (
    <>
      <article className="pt-10 pb-10 border-b border-bord">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={fil} />
          <Cote gauche="GUIDE" />
          <h1 className="max-w-[20ch] mb-6 text-[2.1rem] sm:text-[2.9rem]">{p.h1}</h1>
          <p className="text-[1.05rem] sm:text-[1.15rem] max-w-[62ch]">{p.chapo}</p>
        </div>
      </article>
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 py-10 prose-id">
        {p.blocs.map((b, i) => (
          <section key={i} className="py-7 border-t border-bord first:border-t-0">
            <h2 className="text-[1.45rem] sm:text-[1.85rem] mb-4 max-w-[28ch]">{b.titre}</h2>
            {b.texte && <p>{b.texte}</p>}
            {b.liste && <ul>{b.liste.map((x) => <li key={x}>{x}</li>)}</ul>}
          </section>
        ))}
        {p.faq?.length ? (
          <section className="py-8"><Cote gauche="QUESTIONS FRÉQUENTES" /><BlocFaq items={p.faq} /></section>
        ) : null}
      </div>
      <PagesLiees liens={liees} />
      <BlocCta texte={p.ctaTexte || "Une question sur votre projet ?"} contexte={p.slug} />
      <JsonLd data={[jsonLdFilAriane(fil), ...(p.faq?.length ? [jsonLdFaq(p.faq)] : [])]} />
    </>
  );
}
