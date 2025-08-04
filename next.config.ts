import type { NextConfig } from "next";

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
    ],
  },
};

export default nextConfig;
