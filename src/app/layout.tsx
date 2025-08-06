import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "../components/StoryblokProvider";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import FacebookPixel from "../components/analytics/FacebookPixel";
import { AnalyticsProvider } from "../components/analytics/AnalyticsContext";
import "./globals.css";
import Page from "../components/blocks/Page";
import Header from "../components/blocks/Header";
import Hero from "../components/blocks/Hero";
import Steps from "../components/blocks/Steps";
import Body from "../components/blocks/Slider";
import Blogs from "../components/blocks/Blogs";
import Reviews from "../components/blocks/Reviews";
import SocialProof from "../components/blocks/SocialProof";
import FAQ from "../components/blocks/FAQ";
import Footer from "../components/blocks/Footer";
import Features from "@/components/blocks/Features";
import AnalyticsButton from "../components/blocks/AnalyticsButton";
import AnalyticsForm from "../components/blocks/AnalyticsForm";
import AnalyticsVideo from "../components/blocks/AnalyticsVideo";

const inter = Inter({ subsets: ["latin"] });

// Initialize Storyblok for server-side rendering
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
    features: Features,
    analytics_button: AnalyticsButton,
    analytics_form: AnalyticsForm,
    analytics_video: AnalyticsVideo,
  },
});

export const metadata: Metadata = {
  title: "Jaimy - Storyblok Project",
  description: "A modern website built with Next.js and Storyblok",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Analytics Scripts */}
        <GoogleAnalytics
          trackingId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ""}
        />
        <FacebookPixel
          pixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ""}
        />

        {/* Preload Belfius Fonts */}
        <link
          rel="preload"
          href="/fonts/belfius/BelfiusAlternative_bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/belfius/BelfiusNormal_bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/belfius/BelfiusNormal_regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <StoryblokProvider>{children}</StoryblokProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
