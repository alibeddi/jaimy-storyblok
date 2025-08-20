import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "nl", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
