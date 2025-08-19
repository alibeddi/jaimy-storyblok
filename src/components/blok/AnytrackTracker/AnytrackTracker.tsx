"use client";

import React, { useEffect, useRef } from "react";
import { storyblokEditable } from "@storyblok/react";
import {
  trackCustomEvent,
  trackButtonClick,
  trackFormSubmission,
} from "@/components/analytics/AnytrackUtils";

interface AnytrackTrackerBlok {
  component: string;
  _uid: string;
  event_name: string;
  trigger_type:
    | "on_load"
    | "on_scroll"
    | "on_click"
    | "on_form_submit"
    | "on_video_play"
    | "on_video_complete";
  scroll_threshold?: number;
  event_properties?: Record<string, any>;
  target_selector?: string;
  video_selector?: string;
  form_selector?: string;
  button_selector?: string;
  delay_ms?: number;
  [key: string]: any;
}

interface AnytrackTrackerProps {
  blok: AnytrackTrackerBlok;
}

const AnytrackTracker: React.FC<AnytrackTrackerProps> = ({ blok }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const trackEvent = () => {
      if (hasTracked.current) return;

      trackCustomEvent(blok.event_name, blok.event_properties);
      hasTracked.current = true;
    };

    const handleScroll = () => {
      if (blok.trigger_type !== "on_scroll" || !blok.scroll_threshold) return;

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent >= (blok.scroll_threshold || 50)) {
        trackEvent();
      }
    };

    const handleClick = (event: Event) => {
      if (blok.trigger_type !== "on_click") return;

      const target = event.target as HTMLElement;
      if (blok.target_selector && !target.matches(blok.target_selector)) return;

      trackEvent();
    };

    const handleFormSubmit = (event: Event) => {
      if (blok.trigger_type !== "on_form_submit") return;

      const form = event.target as HTMLFormElement;
      if (blok.form_selector && !form.matches(blok.form_selector)) return;

      trackEvent();
    };

    const handleVideoPlay = (event: Event) => {
      if (blok.trigger_type !== "on_video_play") return;

      const video = event.target as HTMLVideoElement;
      if (blok.video_selector && !video.matches(blok.video_selector)) return;

      trackEvent();
    };

    const handleVideoComplete = (event: Event) => {
      if (blok.trigger_type !== "on_video_complete") return;

      const video = event.target as HTMLVideoElement;
      if (blok.video_selector && !video.matches(blok.video_selector)) return;

      trackEvent();
    };

    // Set up event listeners based on trigger type
    switch (blok.trigger_type) {
      case "on_load":
        if (blok.delay_ms) {
          setTimeout(trackEvent, blok.delay_ms);
        } else {
          trackEvent();
        }
        break;

      case "on_scroll":
        window.addEventListener("scroll", handleScroll, { passive: true });
        break;

      case "on_click":
        document.addEventListener("click", handleClick, { passive: true });
        break;

      case "on_form_submit":
        document.addEventListener("submit", handleFormSubmit, {
          passive: true,
        });
        break;

      case "on_video_play":
        document.addEventListener("play", handleVideoPlay, { passive: true });
        break;

      case "on_video_complete":
        document.addEventListener("ended", handleVideoComplete, {
          passive: true,
        });
        break;
    }

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleFormSubmit);
      document.removeEventListener("play", handleVideoPlay);
      document.removeEventListener("ended", handleVideoComplete);
    };
  }, [blok]);

  // This component doesn't render anything visible
  return (
    <div
      ref={elementRef}
      {...storyblokEditable(blok)}
      style={{ display: "none" }}
      data-anytrack-tracker={blok.event_name}
    />
  );
};

export default AnytrackTracker;

