"use client";

import Script from "next/script";
import { useEffect } from "react";

interface AnytrackProps {
  trackingId: string;
  enableFormTracking?: boolean;
  enableScrollTracking?: boolean;
  enableClickTracking?: boolean;
  enableConversionTracking?: boolean;
}

export default function Anytrack({
  trackingId,
  enableFormTracking = true,
  enableScrollTracking = true,
  enableClickTracking = true,
  enableConversionTracking = true,
}: AnytrackProps) {
  useEffect(() => {
    // Initialize Anytrack when component mounts
    if (typeof window !== "undefined") {
      const at: any = (window as any).anytrack || (window as any).AnyTrack;
      if (at && typeof at.init === "function") {
        at.init(trackingId);
      }

      // Configure tracking options
      if (enableFormTracking && (at as any)?.enableFormTracking) {
        at.enableFormTracking();
      }

      if (enableScrollTracking && (at as any)?.enableScrollTracking) {
        at.enableScrollTracking();
      }

      if (enableClickTracking && (at as any)?.enableClickTracking) {
        at.enableClickTracking();
      }

      if (enableConversionTracking && (at as any)?.enableConversionTracking) {
        at.enableConversionTracking();
      }
    }
  }, [
    trackingId,
    enableFormTracking,
    enableScrollTracking,
    enableClickTracking,
    enableConversionTracking,
  ]);

  return (
    <>
      {/* Anytrack Script */}
      <Script
        id="anytrack-script"
        strategy="afterInteractive"
        src="https://cdn.anytrack.io/anytrack.js"
        onLoad={() => {
          // Script loaded, initialize Anytrack
          if (typeof window !== "undefined") {
            const at: any =
              (window as any).anytrack || (window as any).AnyTrack;
            if (at && typeof at.init === "function") {
              at.init(trackingId);
            }
          }
        }}
      />

      {/* Anytrack NoScript fallback */}
      <noscript>
        <img
          src={`https://track.anytrack.io/noscript.gif?id=${trackingId}`}
          alt=""
          style={{ display: "none" }}
        />
      </noscript>
    </>
  );
}

// Extend Window interface for Anytrack
declare global {
  interface Window {
    anytrack: {
      init: (trackingId: string) => void;
      track: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string, traits?: Record<string, any>) => void;
      page: (pageName?: string, properties?: Record<string, any>) => void;
      enableFormTracking: () => void;
      enableScrollTracking: () => void;
      enableClickTracking: () => void;
      enableConversionTracking: () => void;
      setUserProperties: (properties: Record<string, any>) => void;
      trackConversion: (value?: number, currency?: string) => void;
      trackLead: (value?: number, currency?: string) => void;
      trackPurchase: (
        value: number,
        currency?: string,
        orderId?: string
      ) => void;
    };
  }
}
