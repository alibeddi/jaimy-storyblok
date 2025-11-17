import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "a.storyblok.com", pathname: "/**" },
      { protocol: "https", hostname: "img2.storyblok.com", pathname: "/**" },
      { protocol: "https", hostname: "img.storyblok.com", pathname: "/**" },
    ],
  },
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  // Optimize webpack bundle splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize client-side bundle splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Storyblok components chunk
            storyblok: {
              name: 'storyblok',
              test: /[\\/]components[\\/]blok[\\/]/,
              chunks: 'all',
              priority: 15,
            },
          },
        },
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
