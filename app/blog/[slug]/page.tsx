import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getDoc, getSlugs } from "@/lib/content"
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
    <article className="mx-auto max-w-3xl px-5 py-16">
      <JsonLd data={articleSchema} />
      <Link href="/blog" className="text-sm font-medium text-steel">
        ← Tous les conseils
      </Link>
      <div className="mt-6 text-xs uppercase tracking-wide text-ink/40">
        {post.date}
      </div>
      <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
        {post.title}
      </h1>
      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-steel prose-a:no-underline hover:prose-a:underline">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <div className="mt-14 rounded-2xl bg-ink p-8 text-paper">
        <h2 className="font-display text-xl font-semibold">Un projet au Havre ?</h2>
        <p className="mt-2 text-paper/70">
          Premier échange et devis gratuits. On regarde ensemble la faisabilité.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-paper px-5 py-2.5 font-medium text-ink"
          >
            Me contacter
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="rounded-full border border-paper/30 px-5 py-2.5 font-medium"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </article>
  )
}
