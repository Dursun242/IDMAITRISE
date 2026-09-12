import { Cote, FilAriane } from "@/components";
import { SITE } from "@/content/site";
import { meta } from "@/lib/seo";

export const metadata = { ...meta({ titre: "Politique de confidentialité | ID Maîtrise", description: "Traitement des données personnelles collectées via le formulaire de contact du site id-maitrise.com.", chemin: "/politique-confidentialite" }),
  robots: { index: false, follow: true } };

export default function Page() {
  return (
    <section className="py-12">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 prose-id">
        <FilAriane items={[{ href: "/", label: "Accueil" }, { href: "/politique-confidentialite", label: "Politique de confidentialité" }]} />
        <Cote gauche="DONNÉES PERSONNELLES" />
        <h1 className="text-[2rem] sm:text-[2.6rem] mb-8">Politique de confidentialité</h1>
        <h2 className="text-[1.4rem] mt-8 mb-3">Données collectées</h2>
        <p>Le formulaire de contact collecte vos nom, téléphone, adresse e-mail, commune et description de projet.
        Ces données sont nécessaires au traitement de votre demande.</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Finalité et base légale</h2>
        <p>Les données servent uniquement à répondre à votre demande et à établir un devis. La base légale
        est l&apos;exécution de mesures précontractuelles prises à votre demande.</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Durée de conservation</h2>
        <p>Trois ans à compter du dernier contact, sauf si une relation contractuelle s&apos;établit.</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Destinataires</h2>
        <p>Les données ne sont transmises à aucun tiers à des fins commerciales. Elles transitent par notre
        prestataire d&apos;envoi d&apos;e-mails, hébergé dans l&apos;Union européenne.</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Vos droits</h2>
        <p>Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et
        d&apos;opposition. Pour l&apos;exercer, écrivez à {SITE.email}. Vous pouvez également saisir la CNIL.</p>
        <h2 className="text-[1.4rem] mt-8 mb-3">Cookies</h2>
        <p>Ce site ne dépose aucun cookie de mesure d&apos;audience ni de publicité sans votre consentement préalable.</p>
      </div>
    </section>
  );
}
