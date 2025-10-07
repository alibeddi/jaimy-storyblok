import "../globals.css";
import "../globals.css";
import "../globals.css";

// Removed global switcher; header contains the inline switcher matching design
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

import AnalyticsButton from "@/components/blok/services/AnalyticsButton";
import AnalyticsForm from "@/components/blok/services/AnalyticsForm";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsContext";
import AnalyticsVideo from "@/components/blok/services/AnalyticsVideo";
import { Anytrack } from "@/components/analytics";
import AnytrackForm from "@/components/blok/general/AnytrackForm";
import AnytrackTracker from "@/components/blok/general/AnytrackTracker";
import Blog from "@/components/blok/general/Blog/Blog";
import Blogs from "@/components/blok/services/Blogs";
import Body from "@/components/blok/services/Slider";
import CategorySection from "@/components/blok/general/CategorySection";
import FAQ from "@/components/blok/services/FAQ";
import Features from "@/components/blok/services/Features";
import Footer from "@/components/blok/services/Footer";
import Header from "@/components/blok/services/Header";
import Hero from "@/components/blok/services/Hero";
import Iframe from "@/components/blok/general/Iframe";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
// Removed global switcher; header contains the inline switcher matching design
import { NextIntlClientProvider } from "next-intl";
import Page from "@/components/blok/services/Page";
import Review from "@/components/blok/general/Review/Review";
import Reviews from "@/components/blok/services/Reviews";
import Script from "next/script";
import SocialProof from "@/components/blok/services/SocialProof";
import Step from "@/components/blok/general/Step/Step";
import Steps from "@/components/blok/services/Steps";
import StoryblokProvider from "@/components/StoryblokProvider";
import TrustBadge from "@/components/blok/general/TrustBadge/TrustBadge";
import { WhoWeAreSection } from "@/components/blok/general/WhoWeAreSection";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

// Initialize Storyblok for server-side rendering
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN!,
  use: [apiPlugin],
  components: {
    page: Page,
    header: Header,
    hero: Hero,
    steps: Steps,
    step: Step,
    slider: Body,
    body: Body,
    blogs: Blogs,
    blog: Blog,
    reviews: Reviews,
    review: Review,
    social_proof: SocialProof,
    faq: FAQ,
    footer: Footer,
    feature: Features,
    analytics_button: AnalyticsButton,
    analytics_form: AnalyticsForm,
    analytics_video: AnalyticsVideo,
    anytrack_tracker: AnytrackTracker,
    anytrack_form: AnytrackForm,
    iframe: Iframe,
    trust_badge: TrustBadge,
    features: Features,

    iframe_component: Iframe,
    "category-section": CategorySection,
    who_we_are_section: WhoWeAreSection,
  },
  apiOptions: {
    region: "eu",
  },
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jaimy - Storyblok Project",
  description: "A modern website built with Next.js and Storyblok",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const locales = ["en", "nl", "fr"] as const;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {process.env.NEXT_PUBLIC_ANYTRACK_ID ? (
          <Script
            id="anytrack-inline-bootstrap"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(e,t,n,s,a){(a=t.createElement(n)).async=!0,a.src="https://assets.anytrack.io/${process.env.NEXT_PUBLIC_ANYTRACK_ID}.js",(t=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,t),e[s]=e[s]||function(){(e[s].q=e[s].q||[]).push(arguments)}}(window,document,"script","AnyTrack");`,
            }}
          />
        ) : null}
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          {process.env.NEXT_PUBLIC_ANYTRACK_ID ? (
            <Anytrack trackingId={process.env.NEXT_PUBLIC_ANYTRACK_ID} />
          ) : null}
          <NextIntlClientProvider
            messages={messages}
            locale={locale}
            timeZone="Europe/Brussels">
            <StoryblokProvider story={undefined}>{children}</StoryblokProvider>
          </NextIntlClientProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
