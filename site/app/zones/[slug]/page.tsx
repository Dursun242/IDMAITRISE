import { notFound } from "next/navigation";
import Link from "next/link";
import { ZONES, PRESTATIONS } from "@/content/site";
import { Cote, BlocCta, FilAriane } from "@/components";
import { meta, JsonLd, jsonLdFilAriane } from "@/lib/seo";

export function generateStaticParams() { return ZONES.map((z) => ({ slug: z.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const z = ZONES.find((x) => x.slug === slug);
  return z ? meta({ titre: z.titre, description: z.meta, chemin: `/zones/${z.slug}` }) : {};
}

export default async function PageZone({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const z = ZONES.find((x) => x.slug === slug);
  if (!z) notFound();
  const fil = [{ href: "/", label: "Accueil" }, { href: "/zones", label: "Zones" },
               { href: `/zones/${z.slug}`, label: z.ville }];
  return (
    <>
      <section className="relative rayons pt-10 pb-14">
        <div className="relative max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={fil} />
          <Cote gauche={z.ville.toUpperCase()} droite={z.departement.toUpperCase()} />
          <h1 className="max-w-[16ch] mb-6">Maître d&apos;œuvre à {z.ville}</h1>
          <p className="text-[1.05rem] sm:text-[1.18rem] max-w-[58ch] mb-8">{z.chapo}</p>
          <Link href="/contact" className="bg-jaune text-ink border border-jaune px-6 py-3.5 font-semibold inline-block">
            Décrire mon projet à {z.ville}
          </Link>
        </div>
      </section>

      <section className="py-14 border-t border-bord">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 prose-id">
          <Cote gauche="CONTRAINTES LOCALES" />
          <h2 className="text-[1.5rem] sm:text-[1.9rem] mb-5 max-w-[26ch]">
            Ce qu&apos;il faut savoir avant de construire à {z.ville}
          </h2>
          <ul>{z.specifique.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </section>

      <section className="py-14 bg-gris border-y border-bord">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <Cote gauche="COMMUNES COUVERTES" />
          <ul className="flex flex-wrap gap-2 mt-4">
            {z.communes.map((c) => (
              <li key={c} className="border border-bord bg-white px-3.5 py-1.5 text-[0.9rem]">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <Cote gauche="NOS PRESTATIONS" droite={z.ville.toUpperCase()} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {PRESTATIONS.slice(0, 6).map((p) => (
              <Link key={p.slug} href={`/prestations/${p.slug}`} className="border-t-2 border-ink pt-4 group">
                <h3 className="mb-2 group-hover:underline underline-offset-4">{p.h1}</h3>
                <p className="text-grist text-[0.92rem] line-clamp-3">{p.chapo}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BlocCta texte={`Votre projet à ${z.ville}`} contexte={`zone-${z.slug}`} />
      <JsonLd data={jsonLdFilAriane(fil)} />
    </>
  );
}
