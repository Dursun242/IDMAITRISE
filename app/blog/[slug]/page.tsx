import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getDoc, getSlugs, getAllDocs } from "@/lib/content"
import { JsonLd } from "@/components/JsonLd"
import { site } from "@/lib/site"

export function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getDoc("blog", slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
    },
  }
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getDoc("blog", slug)
  if (!post) notFound()

  const others = getAllDocs("blog")
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "fr-FR",
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  }

  return (
    <>
      <JsonLd data={articleSchema} />

      <section className="relative overflow-hidden border-b border-noir/10">
        <div className="absolute inset-0 plan-grid grid-fade opacity-70" />

        <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-noir/65 transition-colors hover:text-bronze-deep"
          >
            <span className="rotate-180 transition-transform group-hover:-translate-x-1">
              →
            </span>
            Retour au journal
          </Link>

          <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-noir-mute">
            <span>{post.date}</span>
            <span className="text-bronze">·</span>
            <span>{post.author}</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-medium leading-[1.06] tracking-tightest sm:text-6xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-6 text-lg leading-relaxed text-noir/65 sm:text-xl">
              {post.description}
            </p>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="prose-editorial">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </article>

      <section className="border-t border-noir/10 bg-linen-warm">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="relative overflow-hidden rounded-2xl bg-noir p-8 text-linen shadow-lift sm:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-bronze/20 blur-[90px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <div className="eyebrow text-bronze-light">Un projet ?</div>
                <p className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  Premier échange et devis
                  <br />
                  <span className="italic-accent text-bronze-light">
                    gratuits, au Havre.
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
                <Link href="/contact" className="btn-ivory group justify-center">
                  Me contacter
                  <span className="arrow-out">→</span>
                </Link>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-linen/30 px-7 py-4 font-mono text-sm font-medium transition hover:border-bronze-light hover:text-bronze-light"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Aussi à lire
            </h2>
            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-bronze-deep"
            >
              Tout le journal
              <span className="arrow-out">→</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="panel group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-bronze/50 hover:shadow-lift"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-noir-mute">
                  {p.date}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-noir/60">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
