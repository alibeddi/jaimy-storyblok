/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";
import { useEffect } from "react";

interface FacebookPixelProps {
  pixelId: string;
}

// Proper typing for Facebook Pixel function
interface FacebookPixelFunction {
  (...args: any[]): void;
  q?: any[];
  push?: FacebookPixelFunction;
  loaded?: boolean;
  version?: string;
  queue?: any[];
}

declare global {
  interface Window {
    fbq: FacebookPixelFunction;
    _fbq: any;
  }
}

export default function FacebookPixel({ pixelId }: FacebookPixelProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Facebook Pixel
      window.fbq =
        window.fbq ||
        function (...args: any[]) {
          (window.fbq.q = window.fbq.q || []).push(args);
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
        />
      </noscript>
    </>
  );
}

// Event tracking functions
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

// E-commerce tracking functions
export const trackFBPurchase = (
  value: number,
  currency: string = "EUR",
  contentIds?: string[]
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", {
      value,
      currency,
      content_ids: contentIds,
    });
  }
};

export const trackFBAddToCart = (
  value: number,
  currency: string = "EUR",
  contentIds?: string[]
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", {
      value,
      currency,
      content_ids: contentIds,
    });
  }
};

export const trackFBViewContent = (
  value?: number,
  currency: string = "EUR",
  contentIds?: string[]
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      value,
      currency,
      content_ids: contentIds,
    });
  }
};

export const trackFBLead = (value?: number, currency: string = "EUR") => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", { value, currency });
  }
};

export const trackFBContact = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }
};

export const trackFBCompleteRegistration = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration");
  }
};
