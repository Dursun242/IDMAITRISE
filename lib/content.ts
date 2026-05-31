import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type Doc = {
  slug: string
  title: string
  description: string
  date: string
  short: string
  keywords: string[]
  author: string
  content: string
}

function dirFor(kind: string) {
  return path.join(process.cwd(), "content", kind)
}

export function getSlugs(kind: string): string[] {
  const dir = dirFor(kind)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""))
}

export function getDoc(kind: string, slug: string): Doc | null {
  const dir = dirFor(kind)
  const md = path.join(dir, slug + ".md")
  const mdx = path.join(dir, slug + ".mdx")
  const file = fs.existsSync(md) ? md : fs.existsSync(mdx) ? mdx : null
  if (!file) return null
  const { data, content } = matter(fs.readFileSync(file, "utf8"))
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    short: data.short ?? "",
    keywords: data.keywords ?? [],
    author: data.author ?? "ID Maîtrise",
    content,
  }
}

export function getAllDocs(kind: string): Doc[] {
  return getSlugs(kind)
    .map((s) => getDoc(kind, s))
    .filter((d): d is Doc => d !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
