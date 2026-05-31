import Link from "next/link"
import type { Metadata } from "next"
import { getAllDocs } from "@/lib/content"

export const metadata: Metadata = {
  title: "Conseils maîtrise d'œuvre, permis & urbanisme au Havre",
  description:
    "Guides pratiques : permis de construire, déclaration préalable, PLUi, extension de maison et rénovation au Havre et en Normandie.",
  alternates: { canonical: "/blog" },
}

export default function Blog() {
  const posts = getAllDocs("blog")
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">
        Conseils & actualités
      </h1>
      <p className="mt-3 max-w-2xl text-ink/65">
        Permis, urbanisme, structure, rénovation : nos repères pour bâtir
        sereinement au Havre et en Normandie.
      </p>

      <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block py-6 transition hover:bg-ink/[0.02]"
          >
            <div className="text-xs uppercase tracking-wide text-ink/40">
              {p.date}
            </div>
            <h2 className="mt-1 font-display text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              {p.description}
            </p>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="py-8 text-ink/50">Premiers articles à venir.</p>
        )}
      </div>
    </div>
  )
}
