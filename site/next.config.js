/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    }];
  },
  // Les redirections 301 sont dans middleware.ts (les anciennes URL
  // contiennent des « + » que le routeur Next.js refuse ici).
  async redirects() {
    return [
      { source: "/nos-activites", destination: "/prestations", permanent: true },
      { source: "/secteurs", destination: "/zones", permanent: true },
      { source: "/archives-1", destination: "/guides", permanent: true },
    ];
  },
};
module.exports = nextConfig;
