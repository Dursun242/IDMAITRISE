import { BlocCta, Cote, FilAriane } from "@/components";
import { SITE } from "@/content/site";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Contact — ID Maîtrise, maître d'œuvre au Havre",
  description: "Décrivez votre projet de construction ou de rénovation. Réponse sous 48 h ouvrées avec un premier avis de faisabilité gratuit. 9 rue Henry Genestal, Le Havre.",
  chemin: "/contact",
});

export default function Contact() {
  return (
    <>
      <section className="pt-10 pb-8">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <FilAriane items={[{ href: "/", label: "Accueil" }, { href: "/contact", label: "Contact" }]} />
          <Cote gauche="CONTACT" />
          <h1 className="max-w-[16ch] mb-6 text-[2.1rem] sm:text-[3rem]">Décrivez votre projet.</h1>
          <p className="text-[1.05rem] max-w-[56ch] mb-8">
            Plus votre description est précise, plus notre première réponse sera utile. Surface, état d&apos;avancement,
            budget envisagé et échéance : ces quatre éléments suffisent pour un premier avis sérieux.
          </p>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-bord border border-bord">
            {[["TÉLÉPHONE", SITE.tel], ["E-MAIL", SITE.email],
              ["ADRESSE", `${SITE.adresse}, ${SITE.cp} ${SITE.ville}`], ["HORAIRES", SITE.horaires]].map(([k, v]) => (
              <div key={k} className="bg-gris p-5">
                <dt className="font-mono text-[0.68rem] text-grist mb-1.5">{k}</dt>
                <dd className="text-[0.98rem] font-medium break-words">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <BlocCta texte="Votre demande" contexte="page-contact" />
    </>
  );
}
