import Link from "next/link";
import { Cote } from "@/components";

export default function NotFound() {
  return (
    <section className="py-20">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12">
        <Cote gauche="ERREUR 404" />
        <h1 className="text-[2.2rem] sm:text-[3rem] mb-5 max-w-[18ch]">Cette page n&apos;existe plus.</h1>
        <p className="text-grist max-w-[52ch] mb-8">
          Le site a été refondu : la plupart des anciennes adresses redirigent automatiquement.
          Si vous êtes arrivé ici, la page a probablement été fusionnée avec une autre.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/prestations" className="bg-jaune text-ink px-6 py-3.5 font-semibold">Voir les prestations</Link>
          <Link href="/contact" className="border border-ink px-6 py-3.5 font-semibold hover:bg-ink hover:text-white">Nous contacter</Link>
        </div>
      </div>
    </section>
  );
}
