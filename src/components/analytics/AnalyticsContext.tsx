/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
// GA4 and Facebook Pixel removed per consolidation into Anytrack
import {
  anytrackTrack,
  anytrackPage,
  anytrackTrackConversion,
  anytrackTrackLead,
  anytrackTrackPurchase,
} from "./AnytrackUtils";

interface AnalyticsContextType {
  // Page tracking
  trackPageView: (url?: string, title?: string) => void;

  // E-commerce events
  trackPurchase: (data: PurchaseData) => void;
  trackAddToCart: (data: AddToCartData) => void;
  trackViewItem: (data: ViewItemData) => void;

  // Lead generation events
  trackLead: (value?: number, currency?: string) => void;
  trackContact: () => void;

  // Custom events
  trackCustomEvent: (name: string, parameters?: Record<string, any>) => void;

  // Form events
  trackFormSubmission: (formName: string, success: boolean) => void;
  trackNewsletterSignup: (source?: string) => void;

  // Engagement events
  trackVideoPlay: (videoTitle: string, duration?: number) => void;
  trackDownload: (fileName: string, fileType?: string) => void;
  trackOutboundClick: (url: string, linkText?: string) => void;
}

interface PurchaseData {
  transactionId: string;
  value: number;
  currency?: string;
  items?: any[];
  contentIds?: string[];
}

interface AddToCartData {
  value: number;
  currency?: string;
  items?: any[];
  contentIds?: string[];
}

interface ViewItemData {
  value?: number;
  currency?: string;
  items?: any[];
  contentIds?: string[];
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  // Track page views on route changes
  useEffect(() => {
    const url = window.location.href;
    trackPageView(url, document.title);
  }, [pathname]);

  const trackPageView = (url?: string, title?: string) => {
    const currentUrl = url || window.location.href;
    const currentTitle = title || document.title;

    // Track in Anytrack
    anytrackPage(currentTitle, { url: currentUrl });
  };

  const trackPurchase = (data: PurchaseData) => {
    const {
      transactionId,
      value,
      currency = "EUR",
      items = [],
      contentIds,
    } = data;

    // Track in Anytrack
    anytrackTrackPurchase(value, currency, transactionId);
  };

  const trackAddToCart = (data: AddToCartData) => {
    const { value, currency = "EUR", items = [], contentIds } = data;

    // Track in Anytrack
    anytrackTrack("add_to_cart", { value, currency, items });
  };

  const trackViewItem = (data: ViewItemData) => {
    const { value, currency = "EUR", items = [], contentIds } = data;

    // Track in Anytrack
    anytrackTrack("view_item", { value, currency, items });
  };

  const trackLead = (value?: number, currency: string = "EUR") => {
    // Track in Anytrack
    anytrackTrackLead(value, currency);
  };

  const trackContact = () => {
    // Track in Anytrack
    anytrackTrack("contact", { engagement_time_msec: 1000 });
  };

  const trackCustomEvent = (name: string, parameters?: Record<string, any>) => {
    // Track in Anytrack
    anytrackTrack(name, parameters);
  };

  const trackFormSubmission = (formName: string, success: boolean) => {
    const eventData = {
      form_name: formName,
      success,
      engagement_time_msec: 1000,
    };

    // Track in Anytrack
    anytrackTrack(success ? "form_submit" : "form_error", eventData);
  };

  const trackNewsletterSignup = (source?: string) => {
    const eventData = {
      method: "newsletter",
      source: source || "website",
    };

    // Track in Anytrack
    anytrackTrack("newsletter_signup", eventData);
  };

  const trackVideoPlay = (videoTitle: string, duration?: number) => {
    const eventData = {
      video_title: videoTitle,
      video_duration: duration,
    };

    // Track in Anytrack
    anytrackTrack("video_play", eventData);
  };

  const trackDownload = (fileName: string, fileType?: string) => {
    const eventData = {
      file_name: fileName,
      file_type: fileType,
      link_url: window.location.href,
    };

    // Track in Anytrack
    anytrackTrack("file_download", eventData);
  };

  const trackOutboundClick = (url: string, linkText?: string) => {
    const eventData = {
      link_url: url,
      link_text: linkText,
      outbound: true,
    };

    // Track in Anytrack
    anytrackTrack("outbound_click", eventData);
  };

  const value: AnalyticsContextType = {
    trackPageView,
    trackPurchase,
    trackAddToCart,
    trackViewItem,
    trackLead,
    trackContact,
    trackCustomEvent,
    trackFormSubmission,
    trackNewsletterSignup,
    trackVideoPlay,
    trackDownload,
    trackOutboundClick,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}

// Hook for tracking component visibility (for scroll tracking)
export function useVisibilityTracking(
  elementRef: React.RefObject<HTMLElement>,
  eventName: string,
  parameters?: Record<string, any>
) {
  const { trackCustomEvent } = useAnalytics();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackCustomEvent(eventName, {
            ...parameters,
            visibility_percentage: Math.round(entry.intersectionRatio * 100),
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, eventName, parameters, trackCustomEvent]);
}
