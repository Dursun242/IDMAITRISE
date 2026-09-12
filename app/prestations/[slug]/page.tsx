// app/prestations/[slug]/page.tsx — gabarit unique pour toutes les prestations.
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRESTATIONS, TOUTES_PAGES } from "@/content/site";
import { Cote, BlocCta, BlocFaq, FilAriane, PagesLiees } from "@/components";
import { meta, JsonLd, jsonLdFaq, jsonLdFilAriane, jsonLdService } from "@/lib/seo";

export function generateStaticParams() {
  return PRESTATIONS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRESTATIONS.find((x) => x.slug === slug);
  if (!p) return {};
  return meta({ titre: p.titre, description: p.meta, chemin: `/prestations/${p.slug}` });
}

export default async function PagePrestation({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRESTATIONS.find((x) => x.slug === slug);
  if (!p) notFound();

  const fil = [
    { href: "/", label: "Accueil" },
    { href: "/prestations", label: "Prestations" },
    { href: `/prestations/${p.slug}`, label: p.h1 },
  ];
  const liees = (p.lies || [])
    .map((s) => TOUTES_PAGES.find((x) => x.slug === s))
    .filter(Boolean)
    .map((x) => ({
      href: PRESTATIONS.some((pp) => pp.slug === x!.slug) ? `/prestations/${x!.slug}` : `/guides/${x!.slug}`,
      titre: x!.h1, chapo: x!.chapo,
    }));

  return (
    <>
      <article className="relative rayons pt-10 pb-16">
        <div className="relative max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={fil} />
          <Cote gauche={p.cible === "professionnel" ? "PROFESSIONNELS" : p.cible === "particulier" ? "PARTICULIERS" : "PARTICULIERS & PROFESSIONNELS"} />
          <h1 className="max-w-[18ch] mb-6">{p.h1}</h1>
          <p className="text-[1.05rem] sm:text-[1.18rem] max-w-[60ch] mb-8">{p.chapo}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link href="/contact" className="bg-jaune text-ink border border-jaune px-6 py-3.5 font-semibold">
              {p.ctaTexte || "Décrire mon projet"}
            </Link>
            <span className="font-mono text-[0.72rem] text-grist">Réponse sous 48 h · sans engagement</span>
          </div>
        </div>
      </article>

      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 pb-16 prose-id">
        {p.blocs.map((b, i) => (
          <section key={i} className="py-8 border-t border-bord">
            <h2 className="text-[1.5rem] sm:text-[1.9rem] mb-4 max-w-[26ch]">{b.titre}</h2>
            {b.texte && <p>{b.texte}</p>}
            {b.liste && <ul>{b.liste.map((x) => <li key={x}>{x}</li>)}</ul>}
          </section>
        ))}

        {p.faq && p.faq.length > 0 && (
          <section className="py-10">
            <Cote gauche="QUESTIONS FRÉQUENTES" />
            <h2 className="text-[1.5rem] sm:text-[1.9rem] mb-6">À propos de {p.motCle}</h2>
            <BlocFaq items={p.faq} />
          </section>
        )}
      </div>

      <PagesLiees liens={liees} />
      <BlocCta texte={p.ctaTexte || "Parlons de votre projet."} contexte={p.slug} />

      <JsonLd data={[
        jsonLdService(p),
        jsonLdFilAriane(fil),
        ...(p.faq?.length ? [jsonLdFaq(p.faq)] : []),
      ]} />
    </>
  );
}
