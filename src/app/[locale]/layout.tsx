import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "../../components/StoryblokProvider";
import GoogleAnalytics from "../../components/analytics/GoogleAnalytics";
import FacebookPixel from "../../components/analytics/FacebookPixel";
import { AnalyticsProvider } from "../../components/analytics/AnalyticsContext";
import { locales, type Locale } from "@/i18n/config";
import Page from "../../components/blocks/Page";
import Header from "../../components/blocks/Header";
import Hero from "../../components/blocks/Hero";
import Steps from "../../components/blocks/Steps";
import Body from "../../components/blocks/Slider";
import Blogs from "../../components/blocks/Blogs";
import Reviews from "../../components/blocks/Reviews";
import SocialProof from "../../components/blocks/SocialProof";
import FAQ from "../../components/blocks/FAQ";
import Footer from "../../components/blocks/Footer";
import Features from "../../components/blocks/Features";
import AnalyticsButton from "../../components/blocks/AnalyticsButton";
import AnalyticsForm from "../../components/blocks/AnalyticsForm";
import AnalyticsVideo from "../../components/blocks/AnalyticsVideo";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
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
        <NextIntlClientProvider messages={messages}>
          <AnalyticsProvider>
            <StoryblokProvider>{children}</StoryblokProvider>
          </AnalyticsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
