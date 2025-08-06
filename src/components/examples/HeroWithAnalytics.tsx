"use client";

import { useRef } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import {
  useAnalytics,
  useVisibilityTracking,
} from "../analytics/AnalyticsContext";

interface HeroWithAnalyticsStoryblok {
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  background_image?: string;
  track_visibility?: boolean;
  track_cta_clicks?: boolean;
  _uid: string;
  component: "hero_with_analytics";
}

interface HeroWithAnalyticsProps {
  blok: HeroWithAnalyticsStoryblok;
}

export default function HeroWithAnalytics({ blok }: HeroWithAnalyticsProps) {
  const analytics = useAnalytics();
  const heroRef = useRef<HTMLElement>(null);

  // Track when hero section becomes visible
  useVisibilityTracking(heroRef, "hero_section_viewed", {
    section: "hero",
    title: blok.title,
  });

  const handleCtaClick = () => {
    if (blok.track_cta_clicks) {
      analytics.trackCustomEvent("hero_cta_click", {
        cta_text: blok.cta_text,
        cta_url: blok.cta_link,
        section: "hero",
      });

      // Track as a lead if it's a contact/signup CTA
      if (
        blok.cta_text?.toLowerCase().includes("contact") ||
        blok.cta_text?.toLowerCase().includes("signup")
      ) {
        analytics.trackLead();
      }
    }

    // Handle navigation
    if (blok.cta_link) {
      window.location.href = blok.cta_link;
    }
  };

  return (
    <section
      ref={heroRef}
      {...storyblokEditable(blok)}
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: blok.background_image
          ? `url(${blok.background_image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{blok.title}</h1>

        {blok.subtitle && (
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {blok.subtitle}
          </p>
        )}

        {blok.cta_text && (
          <button
            onClick={handleCtaClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            {blok.cta_text}
          </button>
        )}
      </div>
    </section>
  );
}

// Example usage in existing components:

/*
// Adding analytics to your existing Hero component:

import { useAnalytics } from "../analytics/AnalyticsContext";

export default function Hero({ blok }: HeroProps) {
  const analytics = useAnalytics();

  const handleCtaClick = () => {
    // Track the CTA click
    analytics.trackCustomEvent("hero_cta_click", {
      button_text: blok.cta_text,
      section: "hero"
    });
    
    // Your existing click logic here
  };

  // Rest of your component...
}
*/
