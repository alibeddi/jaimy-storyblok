"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from "./blocks/Page";
import Header from "./blocks/Header";
import Hero from "./blocks/Hero";
import Steps from "./blocks/Steps";
import Body from "./blocks/Slider";
import Blogs from "./blocks/Blogs";
import Reviews from "./blocks/Reviews";
import SocialProof from "./blocks/SocialProof";
import FAQ from "./blocks/FAQ";
import Footer from "./blocks/Footer";
// import Features from "./blocks/Features"; // Add this import


// Initialize Storyblok for client-side
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
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
  },
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
