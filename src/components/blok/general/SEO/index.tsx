"use client";

import { SbBlokData } from "@storyblok/react/rsc";
import { storyblokEditable } from "@storyblok/react";

interface SEOBlok extends SbBlokData {
  component: "seo";
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: {
    filename?: string;
    alt?: string;
  };
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: {
    filename?: string;
    alt?: string;
  };
}

export default function SEO({ blok }: { blok: SEOBlok }) {
  // Handle robots meta tag with enhanced options
  const getRobotsContent = () => {
    switch (blok.robots) {
      case "noindex,nofollow":
        return "noindex, nofollow";
      case "index,nofollow":
        return "index, nofollow";
      case "noindex,follow":
        return "noindex, follow";
      case "noindex":
        return "noindex";
      case "nofollow":
        return "nofollow";
      default:
        return "index, follow";
    }
  };

  return (
    <div {...storyblokEditable(blok)} className="seo-component">
      {/* This component renders meta tags via Next.js metadata API */}
      {/* The actual meta tags are handled in the page.tsx file */}
      <div className="hidden">
        SEO Component - Meta tags are handled at the page level
        <div className="seo-data" style={{ display: "none" }}>
          <div data-seo-title={blok.title}></div>
          <div data-seo-description={blok.description}></div>
          <div data-seo-keywords={blok.keywords}></div>
          <div data-seo-robots={getRobotsContent()}></div>
          <div data-seo-canonical={blok.canonical_url}></div>
          <div data-seo-og-title={blok.og_title}></div>
          <div data-seo-og-description={blok.og_description}></div>
          <div data-seo-og-image={blok.og_image?.filename}></div>
          <div data-seo-twitter-title={blok.twitter_title}></div>
          <div data-seo-twitter-description={blok.twitter_description}></div>
          <div data-seo-twitter-image={blok.twitter_image?.filename}></div>
        </div>
      </div>
    </div>
  );
}
