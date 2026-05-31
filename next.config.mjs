/** @type {import('next').NextConfig} */
const nextConfig = {
  // === MIGRATION SEO ===
  // Au moment de basculer le domaine id-maitrise.com vers ce nouveau site,
  // ajoute ici les redirections 301 (ancienne URL JALIS -> nouvelle URL)
  // pour ne PAS perdre ton référencement. Exemple ci-dessous.
  async redirects() {
    return [
      // {
      //   source:
      //     '/details-comprendre-le-plui-du-havre-les-regles-d-urbanisme-a-connaitre-avant-de-construire-499',
      //   destination: '/blog/comprendre-le-plui-du-havre',
      //   permanent: true, // 301
      // },
    ]
  },
}
export default nextConfig
