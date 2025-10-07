import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    // optional but recommended for strict CSP:
    // contentSecurityPolicy:
    //   "default-src 'self'; img-src * blob: data:; media-src 'none'; connect-src *; script-src 'self'; style-src 'unsafe-inline'",

    remotePatterns: [
      { protocol: "https", hostname: "a.storyblok.com", pathname: "/**" }, // assets
      { protocol: "https", hostname: "img2.storyblok.com", pathname: "/**" }, // image service
      { protocol: "https", hostname: "img.storyblok.com", pathname: "/**" }, // legacy image host
    ],
    // If you're doing a static export or still seeing blanks, uncomment:
    // unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
