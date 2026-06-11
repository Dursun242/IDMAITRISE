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

      <section className="relative overflow-hidden border-b border-holo/10">
        <div className="absolute inset-0 hud-grid hud-grid-fade" />
        <div className="absolute -right-32 top-0 h-[320px] w-[320px] rounded-full bg-holo/10 blur-[110px]" />

        <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ghost-dim transition-colors hover:text-holo-soft"
          >
            <span className="rotate-180 transition-transform group-hover:-translate-x-1">
              →
            </span>
            Retour au journal
          </Link>

          <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ghost-mute">
            <span className="text-holo">log</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tightest sm:text-6xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-6 text-lg leading-relaxed text-ghost-dim sm:text-xl">
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

      <section className="border-t border-holo/10">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="corners glass relative overflow-hidden rounded-2xl p-8 shadow-panel sm:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-holo/10 blur-[90px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <div className="eyebrow">Un projet ?</div>
                <p className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Premier échange et devis
                  <br />
                  <span className="text-gradient-holo">
                    gratuits, au Havre.
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
                <Link href="/contact" className="btn-holo group justify-center">
                  Me contacter
                  <span className="arrow-out">→</span>
                </Link>
                <a
                  href={`tel:${site.phone}`}
                  className="btn-line justify-center font-mono"
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
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Aussi à lire
            </h2>
            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-holo"
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
                className="glass group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-holo/40 hover:shadow-glow"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ghost-mute">
                  {p.date}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ghost-dim">
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
