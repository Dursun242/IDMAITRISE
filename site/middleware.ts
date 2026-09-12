// middleware.ts — redirections 301 de l'ancien site JALIS.
// Passé en middleware plutôt qu'en next.config car les anciennes URL contiennent
// des « + », caractère réservé par le moteur de routes de Next.js.
import { NextResponse, type NextRequest } from "next/server";
import redirections from "@/lib/redirections.json";

const MAP = redirections as Record<string, string>;

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Correspondance exacte, puis décodée (les anciennes URL circulent
  // sous forme encodée %2B ou avec des espaces selon les backlinks).
  const essais = [
    pathname,
    decodeURIComponent(pathname),
    decodeURIComponent(pathname).replace(/ /g, "+"),
    pathname.replace(/\/+$/, ""),
  ];

  for (const p of essais) {
    const cible = MAP[p];
    if (cible) {
      const url = req.nextUrl.clone();
      url.pathname = cible;
      url.search = search;
      return NextResponse.redirect(url, 301);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)"],
};
