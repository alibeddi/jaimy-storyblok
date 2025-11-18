import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "nl", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Add performance and security headers
  const headers = new Headers(response.headers);

  // Cache static assets aggressively
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Cache images
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Security headers
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Performance hints
  headers.set('X-DNS-Prefetch-Control', 'on');

  return NextResponse.next({
    request,
    headers,
  });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
