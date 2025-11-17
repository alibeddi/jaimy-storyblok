import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      // Storyblok CDN domains
      { protocol: "https", hostname: "a.storyblok.com", pathname: "/**" },
      { protocol: "https", hostname: "img2.storyblok.com", pathname: "/**" },
      { protocol: "https", hostname: "img.storyblok.com", pathname: "/**" },
      // Your custom domain
      { protocol: "https", hostname: "service.jaimy.be", pathname: "/**" },
      // Local development
      { protocol: "http", hostname: "localhost", pathname: "/**" },
      { protocol: "https", hostname: "localhost", pathname: "/**" },
    ],
    // Disable optimization in production if there are issues
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === "true",
    // Image formats
    formats: ["image/webp", "image/avif"],
    // Image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domains (legacy fallback)
    domains: [
      "a.storyblok.com",
      "img2.storyblok.com", 
      "img.storyblok.com",
      "service.jaimy.be",
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              process.env.NODE_ENV === "production"
                ? "frame-ancestors 'self'; img-src 'self' data: https: blob:; media-src 'self' https: blob:; object-src 'none';" // Allow images in production
                : "frame-ancestors 'self' https://app.storyblok.com; img-src 'self' data: https: blob:; media-src 'self' https: blob:; object-src 'none';", // Allow Storyblok + images in development
          },
          {
            key: "X-Frame-Options",
            value:
              process.env.NODE_ENV === "production"
                ? "SAMEORIGIN"
                : "ALLOW-FROM https://app.storyblok.com",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
