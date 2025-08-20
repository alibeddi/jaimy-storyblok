"use client";

import Script from "next/script";
import { useEffect } from "react";
import { AnytrackGlobal, getAnytrack, callAnytrack } from "./AnytrackUtils";

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
      const at: AnytrackGlobal | undefined = (():
        | AnytrackGlobal
        | undefined => {
        const api = getAnytrack();
        return typeof api === "function" ? undefined : api;
      })();
      if (at?.init) {
        at.init(trackingId);
      } else {
        // Fallback to queue-style API
        callAnytrack("init", trackingId);
      }

      // Configure tracking options
      if (enableFormTracking) callAnytrack("enableFormTracking");

      if (enableScrollTracking) callAnytrack("enableScrollTracking");

      if (enableClickTracking) callAnytrack("enableClickTracking");

      if (enableConversionTracking) callAnytrack("enableConversionTracking");
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
            const api = getAnytrack();
            if (typeof api === "function") {
              callAnytrack("init", trackingId);
            } else if (api?.init) {
              api.init(trackingId);
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
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string, traits?: Record<string, unknown>) => void;
      page: (pageName?: string, properties?: Record<string, unknown>) => void;
      enableFormTracking: () => void;
      enableScrollTracking: () => void;
      enableClickTracking: () => void;
      enableConversionTracking: () => void;
      setUserProperties: (properties: Record<string, unknown>) => void;
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
