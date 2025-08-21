"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";
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

// Initialize Storyblok for client-side
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    // page: Page,
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
  },
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
