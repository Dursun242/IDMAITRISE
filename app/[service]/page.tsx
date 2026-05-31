import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getDoc, getSlugs } from "@/lib/content"
import { JsonLd } from "@/components/JsonLd"
import { site } from "@/lib/site"

export function generateStaticParams() {
  return getSlugs("services").map((service) => ({ service }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service } = await params
  const doc = getDoc("services", service)
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${service}` },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  const doc = getDoc("services", service)
  if (!doc) notFound()

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: doc.title,
    description: doc.description,
    serviceType: doc.title,
    areaServed: site.areaServed,
    provider: {
      "@type": "GeneralContractor",
      name: site.legalName,
      telephone: site.phone,
    },
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <JsonLd data={serviceSchema} />
      <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
        {doc.title}
      </h1>
      {doc.short && <p className="mt-3 text-lg text-ink/70">{doc.short}</p>}
      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-steel prose-a:no-underline hover:prose-a:underline">
        <MDXRemote
          source={doc.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <div className="mt-14 rounded-2xl bg-ink p-8 text-paper">
        <h2 className="font-display text-xl font-semibold">Parlons de votre projet</h2>
        <p className="mt-2 text-paper/70">
          Devis et premier rendez-vous gratuits, au Havre et alentours.
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
    </div>
  )
}
