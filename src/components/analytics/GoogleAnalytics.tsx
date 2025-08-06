"use client";

import Script from "next/script";
import { useEffect } from "react";

interface GoogleAnalyticsProps {
  trackingId: string;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
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
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
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

// Utility functions for tracking events
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
    window.gtag("config", process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
      page_location: url,
      page_title: title,
    });
  }
};

// Common e-commerce events
export const trackGA4Purchase = (
  transactionId: string,
  value: number,
  currency: string = "EUR",
  items: any[] = []
) => {
  trackGA4Event("purchase", {
    transaction_id: transactionId,
    value,
    currency,
    items,
  });
};

export const trackGA4AddToCart = (
  currency: string = "EUR",
  value: number,
  items: any[] = []
) => {
  trackGA4Event("add_to_cart", {
    currency,
    value,
    items,
  });
};

export const trackGA4ViewItem = (
  currency: string = "EUR",
  value: number,
  items: any[] = []
) => {
  trackGA4Event("view_item", {
    currency,
    value,
    items,
  });
};
