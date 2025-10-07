import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always redirect to defaultLocale if no locale is specified
  localePrefix: "always",

  // Where to redirect to if no locale is detected
  localeDetection: true,

  // Configure custom paths
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      fr: "/a-propos",
      nl: "/over-ons",
      de: "/ueber-uns",
    },
    "/contact": {
      en: "/contact",
      fr: "/contact",
      nl: "/contact",
      de: "/kontakt",
    },
    "/services": {
      en: "/services",
      fr: "/services",
      nl: "/diensten",
      de: "/dienstleistungen",
    },
    "/blog": "/blog",
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(fr|en|nl|de)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
