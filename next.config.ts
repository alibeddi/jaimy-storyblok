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
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable optimization for very small images to prevent upscaling issues
    unoptimized: false,
  },
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@storyblok/react', 'lucide-react'],
  },
  // Optimize webpack bundle splitting
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Optimize client-side bundle splitting
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js)
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Storyblok SDK chunk
            storyblok: {
              name: 'storyblok',
              test: /[\\/]node_modules[\\/]@storyblok[\\/]/,
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // UI libraries chunk
            lib: {
              name: 'lib',
              test: /[\\/]node_modules[\\/](lucide-react|classnames|clsx)[\\/]/,
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // Vendor chunk for remaining node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
            // Blok components chunk (loaded dynamically)
            blok: {
              name: 'blok',
              test: /[\\/]components[\\/]blok[\\/]/,
              chunks: 'async',
              priority: 15,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Ignore source maps in production for smaller bundles
      if (config.mode === 'production') {
        config.devtool = false;
      }
    }

    // Add webpack plugins for optimization
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(config.mode),
      })
    );

    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
