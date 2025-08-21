 /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { storyblokEditable } from "@storyblok/react/rsc";
import { useAnalytics } from "../../analytics/AnalyticsContext";

interface AnalyticsButtonStoryblok {
  text: string;
  link?: {
    url?: string;
    target?: string;
  };
  style?: "primary" | "secondary" | "outline";
  event_name?: string;
  event_parameters?: {
    [key: string]: any;
  };
  track_as_conversion?: boolean;
  _uid: string;
  component: "analytics_button";
}

interface AnalyticsButtonProps {
  blok: AnalyticsButtonStoryblok;
}

export default function AnalyticsButton({ blok }: AnalyticsButtonProps) {
  const analytics = useAnalytics();

  const handleClick = () => {
    // Track the button click
    if (blok.event_name) {
      analytics.trackCustomEvent(blok.event_name, {
        button_text: blok.text,
        button_url: blok.link?.url,
        ...blok.event_parameters,
      });
    }

    // Track as conversion if specified
    if (blok.track_as_conversion) {
      analytics.trackLead();
    }

    // Handle navigation
    if (blok.link?.url) {
      if (blok.link.target === "_blank") {
        window.open(blok.link.url, "_blank");
      } else {
        window.location.href = blok.link.url;
      }
    }
  };

  const getButtonStyles = () => {
    const baseStyles =
      "px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer";

    switch (blok.style) {
      case "primary":
        return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700`;
      case "secondary":
        return `${baseStyles} bg-gray-600 text-white hover:bg-gray-700`;
      case "outline":
        return `${baseStyles} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`;
      default:
        return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700`;
    }
  };

  return (
    <button
      {...storyblokEditable(blok as any)}
      className={getButtonStyles()}
      onClick={handleClick}
    >
      {blok.text}
    </button>
  );
}
