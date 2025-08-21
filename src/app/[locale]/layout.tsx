import Script from "next/script";
import "../globals.css";
// Removed global switcher; header contains the inline switcher matching design
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import "../globals.css";
// Removed global switcher; header contains the inline switcher matching design
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "@/components/StoryblokProvider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsContext";
import "../globals.css";
import Page from "@/components/blocks/Page";
import Header from "@/components/blocks/Header";
import Hero from "@/components/blocks/Hero";
import Steps from "@/components/blocks/Steps";
import Body from "@/components/blocks/Slider";
import Blogs from "@/components/blocks/Blogs";
import Reviews from "@/components/blocks/Reviews";
import SocialProof from "@/components/blocks/SocialProof";
import FAQ from "@/components/blocks/FAQ";
import Footer from "@/components/blocks/Footer";
import Features from "@/components/blocks/Features";
import AnalyticsButton from "@/components/blocks/AnalyticsButton";
import AnalyticsForm from "@/components/blocks/AnalyticsForm";
import AnalyticsVideo from "@/components/blocks/AnalyticsVideo";
import AnytrackTracker from "@/components/blok/AnytrackTracker";
import AnytrackForm from "@/components/blok/AnytrackForm";
import Iframe from "@/components/blok/Iframe";

// Initialize Storyblok for server-side rendering
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN!,
  use: [apiPlugin],
  components: {
    // page: Page,
    header: Header,
    hero: Hero,
    steps: Steps,
    slider: Body,
    body: Body,
    blogs: Blogs,
    reviews: Reviews,
    social_proof: SocialProof,
    faq: FAQ,
    footer: Footer,
    // features: Features,
    analytics_button: AnalyticsButton,
    analytics_form: AnalyticsForm,
    analytics_video: AnalyticsVideo,
    anytrack_tracker: AnytrackTracker,
    anytrack_form: AnytrackForm,
    iframe: Iframe,
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
        <Script
          id="anytrack-inline-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              '!function(e,t,n,s,a){(a=t.createElement(n)).async=!0,a.src="https://assets.anytrack.io/3zytzF8eQ1RA.js",(t=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,t),e[s]=e[s]||function(){(e[s].q=e[s].q||[]).push(arguments)}}(window,document,"script","AnyTrack");',
          }}
        />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <NextIntlClientProvider
            messages={messages}
            locale={locale}
            timeZone="Europe/Brussels"
          >
            <StoryblokProvider>{children}</StoryblokProvider>
          </NextIntlClientProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
