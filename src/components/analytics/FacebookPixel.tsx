"use client";

import Script from "next/script";
import { useEffect } from "react";

interface FacebookPixelProps {
  pixelId: string;
}

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

export default function FacebookPixel({ pixelId }: FacebookPixelProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Facebook Pixel
      window.fbq =
        window.fbq ||
        function () {
          (window.fbq.q = window.fbq.q || []).push(arguments);
        };
      if (!window._fbq) window._fbq = window.fbq;
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = "2.0";
      window.fbq.queue = [];

      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    }
  }, [pixelId]);

  if (!pixelId || pixelId === "YOUR_FACEBOOK_PIXEL_ID") {
    return null;
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Utility functions for tracking Facebook Pixel events
export const trackFBEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters);
  }
};

export const trackFBCustomEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, parameters);
  }
};

// Common Facebook Pixel standard events
export const trackFBPurchase = (
  value: number,
  currency: string = "EUR",
  contentIds?: string[]
) => {
  trackFBEvent("Purchase", {
    value,
    currency,
    content_ids: contentIds,
    content_type: "product",
  });
};

export const trackFBAddToCart = (
  value: number,
  currency: string = "EUR",
  contentIds?: string[]
) => {
  trackFBEvent("AddToCart", {
    value,
    currency,
    content_ids: contentIds,
    content_type: "product",
  });
};

export const trackFBViewContent = (
  value?: number,
  currency: string = "EUR",
  contentIds?: string[]
) => {
  trackFBEvent("ViewContent", {
    value,
    currency,
    content_ids: contentIds,
    content_type: "product",
  });
};

export const trackFBLead = (value?: number, currency: string = "EUR") => {
  trackFBEvent("Lead", {
    value,
    currency,
  });
};

export const trackFBContact = () => {
  trackFBEvent("Contact");
};

export const trackFBCompleteRegistration = () => {
  trackFBEvent("CompleteRegistration");
};
