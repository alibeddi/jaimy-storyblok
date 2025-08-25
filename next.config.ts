import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img2.storyblok.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.builder.io",
        port: "",
        pathname: "/api/v1/image/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
