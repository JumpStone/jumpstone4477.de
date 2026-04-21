import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const shouldRewriteToSubsite =
    hostname === "jumpstone.is-cool.dev" ||
    hostname === "jumpstone-dev.vercel.app";

  if (!shouldRewriteToSubsite) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname =
    request.nextUrl.pathname === "/"
      ? "/subsite"
      : `/subsite${request.nextUrl.pathname}`;

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/robots.txt",
    "/sitemap.xml",
  ],
};
