import "../globals.css";

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsContext";
import { Anytrack } from "@/components/analytics";
import { belfiusMontserrat, belfiusAlternative } from "@/lib/fonts";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import StoryblokProvider from "@/components/StoryblokProvider";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import SWRProvider from "@/components/providers/SWRProvider";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

// Initialize Storyblok for server-side rendering with minimal configuration
// Components are loaded dynamically on the client side
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN!,
  use: [apiPlugin],
  components: {}, // Empty - components loaded dynamically via registry
  apiOptions: {
    region: "eu",
  },
});

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
    <html lang={locale} className={`${belfiusMontserrat.variable} ${belfiusAlternative.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_ANYTRACK_ID ? (
          <Script
            id="anytrack-inline-bootstrap"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(e,t,n,s,a){(a=t.createElement(n)).async=!0,a.src="https://assets.anytrack.io/${process.env.NEXT_PUBLIC_ANYTRACK_ID}.js",(t=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,t),e[s]=e[s]||function(){(e[s].q=e[s].q||[]).push(arguments)}}(window,document,"script","AnyTrack");`,
            }}
          />
        ) : null}
      </head>
      <body className={belfiusMontserrat.className}>
        <PerformanceMonitor />
        <SWRProvider>
          <AnalyticsProvider>
            {process.env.NEXT_PUBLIC_ANYTRACK_ID ? (
              <Anytrack />
            ) : null}
            <NextIntlClientProvider
              messages={messages}
              locale={locale}
              timeZone="Europe/Brussels">
              <StoryblokProvider story={undefined}>{children}</StoryblokProvider>
            </NextIntlClientProvider>
          </AnalyticsProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
