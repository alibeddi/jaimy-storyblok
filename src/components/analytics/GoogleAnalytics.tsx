/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";
import { useEffect } from "react";

interface GoogleAnalyticsProps {
  trackingId: string;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", trackingId, {
        send_page_view: false, // We'll handle page views manually in Next.js
      });
    }
  }, [trackingId]);

  if (!trackingId || trackingId === "YOUR_GA4_MEASUREMENT_ID") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}

// Event tracking functions
export const trackGA4Event = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

export const trackGA4PageView = (url: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_location: url,
      page_title: title,
    });
  }
};

// E-commerce tracking functions
export const trackGA4Purchase = (
  transactionId: string,
  value: number,
  currency: string = "EUR",
  items: any[] = []
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value,
      currency,
      items,
    });
  }
};

export const trackGA4AddToCart = (
  currency: string = "EUR",
  value: number,
  items: any[] = []
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency,
      value,
      items,
    });
  }
};

export const trackGA4ViewItem = (
  currency: string = "EUR",
  value: number,
  items: any[] = []
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      currency,
      value,
      items,
    });
  }
};
