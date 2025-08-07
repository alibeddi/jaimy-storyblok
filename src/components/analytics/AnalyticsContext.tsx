 /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  trackGA4Event,
  trackGA4PageView,
  trackGA4Purchase,
  trackGA4AddToCart,
  trackGA4ViewItem,
} from "./GoogleAnalytics";
import {
  trackFBEvent,
  trackFBCustomEvent,
  trackFBPurchase,
  trackFBAddToCart,
  trackFBViewContent,
  trackFBLead,
  trackFBContact,
} from "./FacebookPixel";

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

    // Track in GA4
    trackGA4PageView(currentUrl, currentTitle);

    // Track in Facebook Pixel
    trackFBEvent("PageView");
  };

  const trackPurchase = (data: PurchaseData) => {
    const {
      transactionId,
      value,
      currency = "EUR",
      items = [],
      contentIds,
    } = data;

    // Track in GA4
    trackGA4Purchase(transactionId, value, currency, items);

    // Track in Facebook Pixel
    trackFBPurchase(value, currency, contentIds);
  };

  const trackAddToCart = (data: AddToCartData) => {
    const { value, currency = "EUR", items = [], contentIds } = data;

    // Track in GA4
    trackGA4AddToCart(currency, value, items);

    // Track in Facebook Pixel
    trackFBAddToCart(value, currency, contentIds);
  };

  const trackViewItem = (data: ViewItemData) => {
    const { value, currency = "EUR", items = [], contentIds } = data;

    // Track in GA4
    trackGA4ViewItem(currency, value || 0, items);

    // Track in Facebook Pixel
    trackFBViewContent(value, currency, contentIds);
  };

  const trackLead = (value?: number, currency: string = "EUR") => {
    // Track in GA4
    trackGA4Event("generate_lead", {
      value,
      currency,
    });

    // Track in Facebook Pixel
    trackFBLead(value, currency);
  };

  const trackContact = () => {
    // Track in GA4
    trackGA4Event("contact", {
      engagement_time_msec: 1000,
    });

    // Track in Facebook Pixel
    trackFBContact();
  };

  const trackCustomEvent = (name: string, parameters?: Record<string, any>) => {
    // Track in GA4
    trackGA4Event(name, parameters);

    // Track in Facebook Pixel as custom event
    trackFBCustomEvent(name, parameters);
  };

  const trackFormSubmission = (formName: string, success: boolean) => {
    const eventData = {
      form_name: formName,
      success,
      engagement_time_msec: 1000,
    };

    // Track in GA4
    trackGA4Event(success ? "form_submit" : "form_error", eventData);

    // Track in Facebook Pixel
    if (success) {
      trackFBCustomEvent("FormSubmit", { form_name: formName });
    }
  };

  const trackNewsletterSignup = (source?: string) => {
    const eventData = {
      method: "newsletter",
      source: source || "website",
    };

    // Track in GA4
    trackGA4Event("sign_up", eventData);

    // Track in Facebook Pixel
    trackFBEvent("CompleteRegistration");
    trackFBCustomEvent("NewsletterSignup", eventData);
  };

  const trackVideoPlay = (videoTitle: string, duration?: number) => {
    const eventData = {
      video_title: videoTitle,
      video_duration: duration,
    };

    // Track in GA4
    trackGA4Event("video_play", eventData);

    // Track in Facebook Pixel
    trackFBCustomEvent("VideoPlay", eventData);
  };

  const trackDownload = (fileName: string, fileType?: string) => {
    const eventData = {
      file_name: fileName,
      file_type: fileType,
      link_url: window.location.href,
    };

    // Track in GA4
    trackGA4Event("file_download", eventData);

    // Track in Facebook Pixel
    trackFBCustomEvent("Download", eventData);
  };

  const trackOutboundClick = (url: string, linkText?: string) => {
    const eventData = {
      link_url: url,
      link_text: linkText,
      outbound: true,
    };

    // Track in GA4
    trackGA4Event("click", eventData);

    // Track in Facebook Pixel
    trackFBCustomEvent("OutboundClick", eventData);
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
