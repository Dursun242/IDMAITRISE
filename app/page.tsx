// app/page.tsx — accueil. Objectif : orienter vers la bonne page, puis vers le devis.
import Link from "next/link";
import { BlocCta, BlocFaq, PhotoSlot } from "@/components";
import { PRESTATIONS, REALISATIONS, SITE } from "@/content/site";
import { meta, JsonLd, jsonLdFaq } from "@/lib/seo";

export const metadata = meta({
  titre: "Maître d'œuvre au Havre (76) — ID Maîtrise, MOE TCE indépendant",
  description:
    "Cabinet de maîtrise d'œuvre indépendant au Havre. Permis de construire, extension, rénovation, OPC. Un seul interlocuteur, du permis à la réception.",
  chemin: "/",
});

const FAQ = [
  { q: "Quelle différence entre un maître d'œuvre et un constructeur ?",
    r: "Un constructeur vend une maison avec ses propres équipes et sa marge intégrée au prix global. Un maître d'œuvre travaille pour vous : il conçoit le projet, met les entreprises en concurrence et défend vos intérêts pendant le chantier. Vous signez directement avec chaque entreprise et vous voyez le détail de chaque prix." },
  { q: "Faut-il un architecte ou un maître d'œuvre pour mon projet ?",
    r: "Le recours à un architecte est obligatoire au-delà de 150 m² de surface de plancher pour une maison individuelle. En dessous de ce seuil, un maître d'œuvre peut déposer et suivre votre permis de construire. Nous vous le disons dès le premier échange, en fonction de votre surface réelle." },
  { q: "Combien coûte une mission de maîtrise d'œuvre ?",
    r: "Les honoraires se calculent en pourcentage du montant des travaux, généralement entre 6 et 12 % selon l'étendue de la mission. Une mission limitée au permis de construire est facturée au forfait. Le devis détaille chaque phase, sans coût variable en cours de route." },
  { q: "Intervenez-vous en dehors du Havre ?",
    r: "Oui, sur la Seine-Maritime, l'Eure et le Calvados. Notre limite est pratique : nous intervenons là où nous pouvons être physiquement présents sur le chantier chaque semaine." },
];

// Couleur par famille : bleu urbanisme, jaune études et chantier, corail structure.
const FAMILLE: Record<string, string> = {
  "permis-de-construire-le-havre": "bg-bleuc text-bleu",
  "declaration-prealable": "bg-bleuc text-bleu",
  "etude-thermique-re2020": "bg-jaunec text-[#8A6200]",
  "etude-de-sol-geotechnique": "bg-jaunec text-[#8A6200]",
  "ouverture-mur-porteur-le-havre": "bg-corailc text-[#D23F1E]",
  "opc-ordonnancement-pilotage-coordination": "bg-jaunec text-[#8A6200]",
};

const ETAPES: [string, string, string][] = [
  ["Premier échange", "Gratuit · 45 min", "Terrain, budget, contraintes d'urbanisme. Avis franc sur la faisabilité."],
  ["Étude et permis", "4 à 8 semaines", "Plans, descriptif, estimation. Dépôt et suivi de l'instruction."],
  ["Consultation", "3 à 5 semaines", "Mise en concurrence des artisans et analyse des devis lot par lot."],
  ["Travaux", "Durée du chantier", "Planning, réunions, comptes rendus écrits, gestion des aléas."],
  ["Réception", "Clôture", "Levée des réserves, remise du DOE et point sur les garanties."],
];

const BORDS = ["border-bleu", "border-[#4A72E8]", "border-vert", "border-jaune", "border-corail"];
const CHIFFRES = ["text-bleu", "text-[#4A72E8]", "text-vert", "text-[#C89400]", "text-corail"];

export default function Accueil() {
  return (
    <>
      {/* HERO */}
      <section className="rayons pt-7 sm:pt-12 pb-14 sm:pb-20">
        <div className="relative z-10 max-w-content mx-auto px-5 sm:px-8 lg:px-12
          grid lg:grid-cols-[1.08fr_.92fr] gap-8 lg:gap-14 items-center">
          <div>
            <span className="pill pill-jaune mb-5">Ingénierie de la construction · Le Havre</span>
            <h1 className="mb-5">Votre projet.<br />Vos artisans.<br />Vos prix.</h1>
            <p className="text-[1.06rem] sm:text-[1.2rem] text-grist max-w-[52ch] mb-7">
              Nous concevons, chiffrons et pilotons votre chantier sans être liés à aucun constructeur.
              Vous signez directement avec chaque entreprise et vous voyez le détail de chaque prix.
            </p>
            <div className="flex flex-wrap gap-3 mb-7">
              <Link href="/contact" className="btn btn-c">Demander un devis gratuit</Link>
              <a href={`tel:${SITE.telE164}`} className="btn btn-o">{SITE.tel}</a>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="pill pill-bleu">Réponse sous 48 h</span>
              <span className="pill pill-jaune">Décennale &amp; RC Pro</span>
              <span className="pill pill-corail">Aucune commission</span>
            </div>
          </div>
          <PhotoSlot ratio="4/5"
            note="PHOTO PRINCIPALE — vous sur un chantier, casque, tablette à la main. Portrait 4:5." />
        </div>
      </section>

      {/* BANDE CHIFFRES */}
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 mb-16 sm:mb-24">
        <div className="bg-bleu text-white rounded-xl3 p-7 sm:p-11 grid grid-cols-2 lg:grid-cols-4 gap-7">
          {[["TCE", "Tous corps d'état, de la conception à la réception"],
            ["84", "Logements en mission OPC à Fécamp"],
            ["RE2020", "Études thermiques et réglementaires"],
            ["48 h", "Délai de réponse à votre demande"]].map(([n, l]) => (
            <div key={n}>
              <b className="block text-[1.9rem] sm:text-[2.6rem] font-black tracking-[-0.04em] leading-none">{n}</b>
              <span className="block text-[0.87rem] text-[#C3D3FF] mt-2 max-w-[22ch]">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DEUX PORTES */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <span className="block text-[0.8rem] font-bold text-bleu mb-3">Par où commencer</span>
          <h2 className="mb-4 max-w-[22ch]">Deux façons de travailler avec nous.</h2>
          <p className="text-grist max-w-[56ch] text-[1.04rem]">
            Votre projet n&apos;appelle pas la même mission selon qui vous êtes.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <Link href="/particuliers" className="rounded-xl3 p-7 sm:p-10 bg-bleuc flex flex-col">
              <span className="pill pill-bleu self-start mb-4 bg-white">Particuliers</span>
              <h3 className="text-[1.45rem] sm:text-[1.9rem] font-black tracking-[-0.03em] mb-3">
                Construire, agrandir ou rénover chez vous
              </h3>
              <p className="text-grist">Maison neuve, extension, surélévation, rénovation lourde, ouverture de mur porteur.</p>
              <ul className="list-none p-0 my-5 text-[0.95rem]">
                {["Permis de construire et déclaration préalable",
                  "Plans, descriptif et estimation de budget",
                  "Consultation d'artisans locaux et analyse des devis",
                  "Suivi de chantier jusqu'à la réception"].map((x) => (
                  <li key={x} className="flex gap-3 py-2 items-start">
                    <span className="flex-none w-5 h-5 rounded-full bg-bleu mt-0.5" /> {x}
                  </li>
                ))}
              </ul>
              <span className="mt-auto font-bold text-bleu">Voir les prestations</span>
            </Link>
            <Link href="/professionnels" className="rounded-xl3 p-7 sm:p-10 bg-ink text-white flex flex-col">
              <span className="pill pill-jaune self-start mb-4">Professionnels</span>
              <h3 className="text-[1.45rem] sm:text-[1.9rem] font-black tracking-[-0.03em] mb-3">
                Piloter une opération sans dérive
              </h3>
              <p className="text-[#9FA4AC]">Tertiaire, industriel, agricole, logements collectifs, équipements publics.</p>
              <ul className="list-none p-0 my-5 text-[0.95rem]">
                {["OPC — ordonnancement, pilotage, coordination",
                  "AMO — assistance à maîtrise d'ouvrage",
                  "MOE d'exécution et direction des travaux",
                  "DPGF, appels d'offres, analyse des offres"].map((x) => (
                  <li key={x} className="flex gap-3 py-2 items-start">
                    <span className="flex-none w-5 h-5 rounded-full bg-jaune mt-0.5" /> {x}
                  </li>
                ))}
              </ul>
              <span className="mt-auto font-bold text-jaune">Demander une proposition</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <div className="bg-gris rounded-xl3 p-7 sm:p-12">
            <span className="block text-[0.8rem] font-bold text-bleu mb-3">Prestations</span>
            <h2 className="mb-4 max-w-[22ch]">Ce que nous prenons en charge.</h2>
            <p className="text-grist max-w-[56ch] text-[1.04rem]">
              Missions complètes ou ponctuelles, selon ce dont votre projet a besoin.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-9">
              {PRESTATIONS.slice(0, 6).map((p) => (
                <Link key={p.slug} href={`/prestations/${p.slug}`}
                  className={`rounded-xl2 p-6 flex flex-col min-h-[200px] ${FAMILLE[p.slug] || "bg-white text-bleu"}`}>
                  <span className="text-[0.74rem] font-bold mb-auto">{p.motCle.toUpperCase()}</span>
                  <h3 className="text-ink mt-4 mb-2">{p.h1}</h3>
                  <p className="text-grist text-[0.92rem] m-0 line-clamp-3">{p.chapo}</p>
                </Link>
              ))}
            </div>
            <Link href="/prestations" className="btn btn-o mt-8 bg-white">Toutes les prestations</Link>
          </div>
        </div>
      </section>

      {/* CHANTIERS */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <span className="block text-[0.8rem] font-bold text-bleu mb-3">Chantiers</span>
          <h2 className="mb-9 max-w-[24ch]">Des chantiers réels, pas des photos d&apos;agence.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {REALISATIONS.map((r) => (
              <Link key={r.slug} href={`/realisations/${r.slug}`}>
                <PhotoSlot note={`PHOTO — ${r.titre}. Paysage 16:10.`} />
                <h3 className="mt-4 mb-1.5">{r.titre}</h3>
                <p className="text-grist text-[0.93rem] m-0">{r.chapo}</p>
                <div className="flex gap-2 mt-3.5 flex-wrap">
                  <span className={`pill ${r.statut === "Livré" ? "pill-vert" : "pill-jaune"}`}>{r.statut}</span>
                  <span className="pill pill-bleu">{r.lieu}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <span className="block text-[0.8rem] font-bold text-bleu mb-3">Méthode</span>
          <h2 className="mb-4 max-w-[22ch]">Cinq étapes, dans cet ordre.</h2>
          <p className="text-grist max-w-[56ch] text-[1.04rem]">
            Vous savez à chaque instant où en est le projet et ce qui arrive ensuite.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">
            {ETAPES.map(([t, q, d], i) => (
              <div key={t} className={`border-t-[3px] pt-4 ${BORDS[i]}`}>
                <b className={`text-[2rem] font-black tracking-[-0.05em] leading-none ${CHIFFRES[i]}`}>
                  {String(i + 1).padStart(2, "0")}
                </b>
                <h3 className="text-[1.05rem] mt-3 mb-1.5">{t}</h3>
                <p className="text-grist text-[0.9rem] m-0">{d}</p>
                <span className="block text-[0.78rem] font-bold text-bleu mt-2">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS — à remplir avec de vrais avis Google */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <div className="bg-ink text-white rounded-xl3 p-7 sm:p-12">
            <span className="block text-[0.8rem] font-bold text-jaune mb-3">Avis clients</span>
            <h2 className="text-white mb-4">Ce qu&apos;en disent nos clients.</h2>
            <p className="text-[#9FA4AC] max-w-[56ch]">
              À remplacer par vos avis Google réels — c&apos;est le levier de conversion le plus fort du site.
            </p>
            <div className="grid md:grid-cols-3 gap-5 mt-8">
              {["Demandez un avis à chaque client à la réception des travaux.",
                "Trois avis suffisent pour démarrer.",
                "Privilégiez ceux qui citent un type de projet précis."].map((t, i) => (
                <div key={i} className="bg-ink2 rounded-xl2 p-6">
                  <div className="text-jaune tracking-[2px] text-[0.95rem] mb-3">★★★★★</div>
                  <p className="text-[#CBD0D8] text-[0.95rem]">{t}</p>
                  <div className="text-[0.83rem] text-[#8B9099]">Emplacement d&apos;avis</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CADRE */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <span className="block text-[0.8rem] font-bold text-bleu mb-3">Cadre</span>
          <h2 className="mb-4 max-w-[24ch]">Un cabinet déclaré, assuré et indépendant.</h2>
          <p className="text-grist max-w-[56ch] text-[1.04rem]">
            Ce que tout maître d&apos;ouvrage devrait vérifier avant de signer.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
            {[["🏢", "SARL ID Maîtrise", `SIRET ${SITE.siret} — ${SITE.adresse}, ${SITE.ville}.`],
              ["🛡️", "Décennale & RC Pro", "Assurance MIC, activité MOE TCE, mission OPC incluse."],
              ["⚖️", "Aucune commission", "Nous ne percevons rien des entreprises consultées."],
              ["📋", "Tout par écrit", "Comptes rendus et décisions tracés après chaque réunion."]].map(([ic, t, d]) => (
              <div key={t} className="border-[1.5px] border-bord rounded-xl2 p-6">
                <div className="w-10 h-10 rounded-xl bg-vertc flex items-center justify-center mb-3.5">{ic}</div>
                <h3 className="text-[1rem] mb-1.5">{t}</h3>
                <p className="text-grist text-[0.89rem] m-0">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
          <span className="block text-[0.8rem] font-bold text-bleu mb-3">Questions fréquentes</span>
          <h2 className="max-w-[22ch]">Ce qu&apos;on nous demande le plus.</h2>
          <BlocFaq items={FAQ} />
          <Link href="/guides/faq-maitrise-oeuvre" className="inline-block mt-7 font-bold text-bleu">
            Toutes les questions
          </Link>
        </div>
      </section>

      <BlocCta contexte="accueil" />
      <JsonLd data={jsonLdFaq(FAQ)} />
    </>
  );
}
