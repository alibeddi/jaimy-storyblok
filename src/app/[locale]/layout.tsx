import {NextIntlClientProvider} from 'next-intl'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {notFound} from 'next/navigation'
import {getMessages} from 'next-intl/server'
import '../globals.css'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "@/components/StoryblokProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import FacebookPixel from "@/components/analytics/FacebookPixel";
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

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Jaimy - Storyblok Project',
  description: 'A modern website built with Next.js and Storyblok'
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params

  const locales = ['en', 'nl', 'fr'] as const
  if (!locales.includes(locale as (typeof locales)[number])) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics trackingId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ''} />
        <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ''} />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <NextIntlClientProvider messages={messages} locale={locale} timeZone="Europe/Brussels">
            <div style={{padding: '8px 12px'}}>
              <LanguageSwitcher />
            </div>
            <StoryblokProvider>{children}</StoryblokProvider>
          </NextIntlClientProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}


