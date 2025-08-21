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
import Page from "@/components/blok/services/Page";
import Header from "@/components/blok/services/Header";
import Hero from "@/components/blok/services/Hero";
import Steps from "@/components/blok/services/Steps";
import Body from "@/components/blok/services/Slider";
import Blogs from "@/components/blok/services/Blogs";
import Reviews from "@/components/blok/services/Reviews";
import SocialProof from "@/components/blok/services/SocialProof";
import FAQ from "@/components/blok/services/FAQ";
import Footer from "@/components/blok/services/Footer";
import Features from "@/components/blok/services/Features";
import AnalyticsButton from "@/components/blok/services/AnalyticsButton";
import AnalyticsForm from "@/components/blok/services/AnalyticsForm";
import AnalyticsVideo from "@/components/blok/services/AnalyticsVideo";
import AnytrackTracker from "@/components/blok/general/AnytrackTracker";
import AnytrackForm from "@/components/blok/general/AnytrackForm";
import Iframe from "@/components/blok/general/Iframe";

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
    feature: Features,
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
