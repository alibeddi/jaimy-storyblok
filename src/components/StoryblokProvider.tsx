"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useEffect } from "react";
import "@/types/storyblok-bridge";
import Page from "./blok/services/Page";
import Header from "./blok/services/Header";
import Hero from "./blok/services/Hero";
import Steps from "./blok/services/Steps";
import Body from "./blok/services/Slider";
import Blogs from "./blok/services/Blogs";
import Reviews from "./blok/services/Reviews";
import SocialProof from "./blok/services/SocialProof";
import FAQ from "./blok/services/FAQ";
import Footer from "./blok/services/Footer";
import Iframe from "./blok/general/Iframe";
import SEO from "./blok/general/SEO";
import InlineText from "./blok/general/InlineText";

// Initialize Storyblok for client-side with enhanced bridge configuration
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  // Enhanced bridge configuration for better real-time editing
  bridge: true,
  apiOptions: {
    region: "eu",
    // Enable real-time updates
    cache: {
      clear: "auto",
      type: "memory",
    },
  },

  components: {
    page: Page,
    header: Header,
    hero: Hero,
    steps: Steps,
    body: Body,
    blogs: Blogs,
    reviews: Reviews,
    social_proof: SocialProof,
    faq: FAQ,
    footer: Footer,
    iframe: Iframe,
    seo: SEO,
    inline_text: InlineText,
  },
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
