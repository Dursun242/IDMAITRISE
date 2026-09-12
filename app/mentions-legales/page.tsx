import { Cote, FilAriane } from "@/components";
import { SITE } from "@/content/site";
import { meta } from "@/lib/seo";

export const metadata = { ...meta({ titre: "Mentions légales | ID Maîtrise", description: "Mentions légales du site id-maitrise.com — SARL ID Maîtrise, Le Havre.", chemin: "/mentions-legales" }),
  robots: { index: false, follow: true } };

export default function Page() {
  return (
    <section className="py-12">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 prose-id">
        <FilAriane items={[{ href: "/", label: "Accueil" }, { href: "/mentions-legales", label: "Mentions légales" }]} />
        <Cote gauche="INFORMATIONS LÉGALES" />
        <h1 className="text-[2rem] sm:text-[2.6rem] mb-8">Mentions légales</h1>
        <h2 className="text-[1.4rem] mt-8 mb-3">Éditeur</h2>
        <p>{SITE.raisonSociale} — SIRET {SITE.siret}<br />{SITE.adresse}, {SITE.cp} {SITE.ville}<br />
        Téléphone : {SITE.tel} — {SITE.email}</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Assurance professionnelle</h2>
        <p>Responsabilité civile professionnelle et garantie décennale souscrites auprès de MIC Insurance,
        activité maîtrise d&apos;œuvre TCE, mission OPC incluse. Attestation communiquée sur demande et jointe à chaque devis.</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Hébergement</h2>
        <p>À compléter avec le nom et l&apos;adresse de l&apos;hébergeur.</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Propriété intellectuelle</h2>
        <p>L&apos;ensemble des contenus de ce site est la propriété de {SITE.raisonSociale}. Toute reproduction
        sans autorisation écrite est interdite.</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Médiation de la consommation</h2>
        <p>Conformément à l&apos;article L.612-1 du code de la consommation, le client particulier peut recourir
        gratuitement à un médiateur de la consommation. Coordonnées à compléter.</p>
      </div>
    </section>
  );
}
