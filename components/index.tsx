// components/index.tsx — composants partagés. Design « direction B » : fond blanc,
// logo ID Maîtrise, Lato, couleurs par famille de prestation, corail réservé à l'action.
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SITE, type Faq } from "@/content/site";

/* ───────── Header ───────── */
export function Header() {
  const [open, setOpen] = useState(false);
  const liens = [
    { href: "/particuliers", label: "Particuliers" },
    { href: "/professionnels", label: "Professionnels" },
    { href: "/prestations", label: "Prestations" },
    { href: "/realisations", label: "Chantiers" },
    { href: "/guides", label: "Guides" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 flex items-center gap-6 h-[76px]">
        <Link href="/" className="flex-none" aria-label="ID Maîtrise, accueil">
          <Image src="/id-maitrise-noir.png" alt="ID Maîtrise — ingénierie de la construction"
            width={1444} height={417} priority className="h-[40px] sm:h-[46px] w-auto" />
        </Link>
        <nav className="ml-auto hidden lg:flex gap-7">
          {liens.map((l) => (
            <Link key={l.href} href={l.href} className="text-[0.93rem] font-medium text-grist hover:text-bleu">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={`tel:${SITE.telE164}`} className="hidden lg:block font-bold text-[0.95rem] whitespace-nowrap">
          {SITE.tel}
        </a>
        <Link href="/contact" className="btn btn-c hidden sm:inline-flex">Demander un devis</Link>
        <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu"
          className="ml-auto lg:hidden w-11 h-11 rounded-full border border-bord text-lg">☰</button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-bord bg-white px-5 pb-5">
          {liens.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3.5 border-b border-bord font-medium">{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-c w-full mt-4">
            Demander un devis
          </Link>
        </nav>
      )}
    </header>
  );
}

/* ───────── Emplacement photo ─────────
   À remplacer par <Image> dès que les photos de chantier sont disponibles. */
export function PhotoSlot({ ratio = "16/10", note }: { ratio?: string; note: string }) {
  return (
    <div className="photo-slot" style={{ aspectRatio: ratio }}>
      <span className="text-[0.72rem] font-bold text-bleu bg-white/90 rounded-full px-3.5 py-2 leading-snug">
        {note}
      </span>
    </div>
  );
}

/* ───────── Formulaire de devis ─────────
   Le téléphone est requis : un lead sans numéro se transforme deux fois moins. */
export function FormulaireDevis({ contexte, compact = false }: { contexte?: string; compact?: boolean }) {
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "erreur">("idle");
  const [msg, setMsg] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("_hp")) return;                 // honeypot anti-spam
    setEtat("envoi");
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(f), contexte: contexte || "site" }),
      });
      if (!r.ok) throw new Error();
      setEtat("ok");
      // Conversion à tracker ici : window.dataLayer?.push({ event: "devis_envoye", contexte });
    } catch {
      setEtat("erreur");
      setMsg(`L'envoi a échoué. Appelez-nous au ${SITE.tel} ou écrivez à ${SITE.email}.`);
    }
  }

  if (etat === "ok")
    return (
      <div className="bg-white rounded-xl2 p-8 text-center">
        <div className="text-3xl mb-3">✅</div>
        <h3 className="mb-2">C&apos;est envoyé.</h3>
        <p className="text-grist text-[0.95rem] m-0">Nous revenons vers vous sous 48 h ouvrées.</p>
      </div>
    );

  const champ = "w-full border-[1.5px] border-[#DDE3ED] rounded-xl px-3.5 py-3 text-[0.96rem] " +
    "focus:outline-none focus:border-bleu focus:ring-[3px] focus:ring-bleuc";
  const lab = "block text-[0.79rem] font-bold mb-1.5";

  return (
    <form onSubmit={envoyer} noValidate className="bg-white rounded-xl2 p-6 sm:p-7">
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div className="mb-3.5"><label className={lab} htmlFor="nom">Nom et prénom</label>
          <input id="nom" name="nom" required autoComplete="name" className={champ} /></div>
        <div className="mb-3.5"><label className={lab} htmlFor="tel">Téléphone</label>
          <input id="tel" name="tel" type="tel" required autoComplete="tel" className={champ} /></div>
      </div>
      <div className="mb-3.5"><label className={lab} htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={champ} /></div>
      {!compact && (
        <div className="grid sm:grid-cols-2 gap-3.5">
          <div className="mb-3.5"><label className={lab} htmlFor="type">Type de projet</label>
            <select id="type" name="type" className={champ} defaultValue="Construction neuve">
              <option>Construction neuve</option><option>Extension ou surélévation</option>
              <option>Rénovation lourde</option><option>Ouverture de mur porteur</option>
              <option>Permis de construire seul</option><option>Bâtiment professionnel</option>
              <option>Mission OPC ou AMO</option><option>Autre</option>
            </select></div>
          <div className="mb-3.5"><label className={lab} htmlFor="ville">Commune du projet</label>
            <input id="ville" name="ville" placeholder="Le Havre" className={champ} /></div>
        </div>
      )}
      <div className="mb-3.5"><label className={lab} htmlFor="message">Votre projet</label>
        <textarea id="message" name="message" rows={4} className={champ}
          placeholder="Surface envisagée, état d'avancement, budget approximatif, échéance souhaitée…" /></div>
      <button type="submit" disabled={etat === "envoi"} className="btn btn-c w-full disabled:opacity-60">
        {etat === "envoi" ? "Envoi…" : "Envoyer ma demande"}
      </button>
      {etat === "erreur" && <p className="mt-3 text-corail text-[0.9rem] text-center">{msg}</p>}
      <p className="text-[0.78rem] text-grist mt-3 text-center mb-0">
        Vos données servent uniquement à traiter votre demande. Aucun démarchage.
      </p>
    </form>
  );
}

/* ───────── Bloc devis ───────── */
export function BlocCta({ texte = "Parlons de votre projet.", contexte }: { texte?: string; contexte?: string }) {
  const coord: [string, string, string][] = [
    ["📞", "Téléphone", SITE.tel],
    ["✉️", "E-mail", SITE.email],
    ["📍", "Bureau", `${SITE.adresse}, ${SITE.cp} ${SITE.ville}`],
    ["🕘", "Horaires", SITE.horaires],
  ];
  return (
    <section className="pb-16 sm:pb-24">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <div className="rounded-xl3 p-7 sm:p-12 grid lg:grid-cols-2 gap-8 lg:gap-14 text-white"
          style={{ background: "linear-gradient(160deg,#1F4FE0 0%,#1637A8 100%)" }}>
          <div>
            <h2 className="text-white mb-4">{texte}</h2>
            <p className="text-[#C3D3FF] max-w-[46ch]">
              Décrivez-le en quelques lignes. Nous répondons sous 48 h ouvrées avec un premier avis de
              faisabilité, gratuit et sans engagement.
            </p>
            <div className="mt-7 grid gap-4">
              {coord.map(([ic, k, v]) => (
                <div key={k} className="flex gap-3.5 items-center">
                  <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-none">{ic}</span>
                  <div>
                    <small className="block text-[#A9C0FF] text-[0.76rem]">{k}</small>
                    <b className="font-semibold">{v}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <FormulaireDevis contexte={contexte} />
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
export function BlocFaq({ items }: { items: Faq[] }) {
  if (!items?.length) return null;
  return (
    <div className="max-w-3xl mt-8">
      {items.map((f, i) => (
        <details key={i} className="border-b border-bord group">
          <summary className="cursor-pointer py-5 pr-12 font-bold text-[1.04rem] list-none relative
            after:content-['+'] after:absolute after:right-2 after:top-4 after:w-6 after:h-6
            after:rounded-full after:bg-bleuc after:text-bleu after:text-center after:leading-6
            after:text-lg after:font-normal group-open:after:content-['–']">
            {f.q}
          </summary>
          <p className="text-grist max-w-[70ch] text-[0.97rem] pb-5 mb-0">{f.r}</p>
        </details>
      ))}
    </div>
  );
}

/* ───────── Fil d'Ariane ───────── */
export function FilAriane({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-[0.82rem] text-grist mb-5">
      {items.map((it, i) => (
        <span key={it.href}>
          {i > 0 && <span className="mx-2">·</span>}
          {i === items.length - 1
            ? <span className="text-ink font-medium">{it.label}</span>
            : <Link href={it.href} className="hover:text-bleu">{it.label}</Link>}
        </span>
      ))}
    </nav>
  );
}

/* ───────── Maillage interne ───────── */
export function PagesLiees({ liens }: { liens: { href: string; titre: string; chapo: string }[] }) {
  if (!liens.length) return null;
  return (
    <section className="pb-16">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <span className="block text-[0.8rem] font-bold text-bleu mb-3">À lire aussi</span>
        <div className="grid md:grid-cols-3 gap-5">
          {liens.map((l) => (
            <Link key={l.href} href={l.href}
              className="bg-gris rounded-xl2 p-6 hover:bg-bleuc transition-colors">
              <h3 className="mb-2">{l.titre}</h3>
              <p className="text-grist text-[0.9rem] m-0 line-clamp-3">{l.chapo}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Footer ───────── */
export function Footer() {
  const cols: [string, [string, string][], string][] = [
    ["Prestations", [
      ["permis-de-construire-le-havre", "Permis de construire"],
      ["declaration-prealable", "Déclaration préalable"],
      ["ouverture-mur-porteur-le-havre", "Ouverture de mur porteur"],
      ["etude-thermique-re2020", "Étude thermique RE2020"],
      ["opc-ordonnancement-pilotage-coordination", "Mission OPC"],
    ], "/prestations"],
    ["Zones", [
      ["le-havre", "Le Havre"], ["fecamp", "Fécamp"], ["rouen", "Rouen"],
      ["caen", "Caen"], ["normandie", "Normandie"],
    ], "/zones"],
  ];

  return (
    <footer className="bg-ink text-[#9FA4AC] pt-14 pb-8 text-[0.91rem]">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Image src="/id-maitrise-blanc.png" alt="ID Maîtrise" width={1444} height={417}
              className="h-10 w-auto mb-4" />
            <p className="mb-3 max-w-[36ch]">
              Maîtrise d&apos;œuvre TCE indépendante au Havre. Conception, permis, consultation des
              entreprises et pilotage de chantier.
            </p>
            <p className="mb-0">{SITE.adresse}, {SITE.cp} {SITE.ville}<br />
              <a href={`tel:${SITE.telE164}`} className="hover:text-jaune">{SITE.tel}</a></p>
          </div>
          {cols.map(([titre, items, base]) => (
            <div key={titre}>
              <h4 className="text-white text-[0.84rem] font-bold mb-3.5">{titre}</h4>
              <ul className="list-none p-0 m-0">
                {items.map(([s, l]) => (
                  <li key={s} className="mb-2.5">
                    <Link href={`${base}/${s}`} className="hover:text-jaune">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-white text-[0.84rem] font-bold mb-3.5">Informations</h4>
            <ul className="list-none p-0 m-0">
              {([["/guides", "Guides"], ["/realisations", "Chantiers"], ["/contact", "Contact"],
                 ["/mentions-legales", "Mentions légales"],
                 ["/politique-confidentialite", "Confidentialité"]] as [string, string][])
                .map(([h, l]) => (
                  <li key={h} className="mb-2.5"><Link href={h} className="hover:text-jaune">{l}</Link></li>
                ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#333] pt-5 flex flex-wrap gap-3 justify-between text-[0.82rem]">
          <span>© {new Date().getFullYear()} {SITE.raisonSociale} — SIRET {SITE.siret}</span>
          <span>Le Havre · Seine-Maritime · Normandie</span>
        </div>
      </div>
    </footer>
  );
}

/* ───────── Sur-titre ─────────
   Remplace l'ancienne « ligne de cote » de la première maquette.
   La signature est conservée pour ne pas casser les gabarits existants. */
export function Cote({ gauche, droite }: { gauche: string; droite?: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
      <span className="text-[0.8rem] font-bold text-bleu">{gauche}</span>
      {droite && <span className="text-[0.78rem] text-grist">{droite}</span>}
    </div>
  );
}
