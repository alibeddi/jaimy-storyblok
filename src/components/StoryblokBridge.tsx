"use client";
import { useEffect } from "react";
import "@/types/storyblok-bridge";

export default function StoryblokBridge() {
  useEffect(() => {
    // Enhanced bridge configuration for real-time preview
    if (typeof window !== "undefined" && window.storyblok) {
      // Force real-time updates
      window.storyblok.on("input", (payload: unknown) => {
        console.log("Storyblok input event:", payload);

        // Force immediate update without waiting for publish
        if (
          payload &&
          typeof payload === "object" &&
          "action" in payload &&
          payload.action === "input"
        ) {
          // Trigger immediate visual update
          const event = new CustomEvent("storyblok:update", {
            detail: payload,
          });
          window.dispatchEvent(event);
        }
      });

      // Handle draft changes
      window.storyblok.on("change", (payload: unknown) => {
        console.log("Storyblok change event:", payload);

        // Force page refresh for draft changes
        if (
          payload &&
          typeof payload === "object" &&
          "action" in payload &&
          payload.action === "change"
        ) {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      });

      // Handle published changes
      window.storyblok.on("published", (payload: unknown) => {
        console.log("Storyblok published event:", payload);

        // Force refresh to show published content
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });

      // Enhanced bridge connection handling
      window.storyblok.on("bridge:connected", () => {
        console.log("Storyblok bridge connected - Real-time editing enabled");

        // Set up periodic ping to maintain connection
        const pingInterval = setInterval(() => {
          if (window.storyblok) {
            window.storyblok.pingEditor(() => {
              console.log("Bridge connection active");
            });
          }
        }, 30000);

        return () => clearInterval(pingInterval);
      });

      window.storyblok.on("bridge:disconnected", () => {
        console.log("Storyblok bridge disconnected - Attempting reconnection");

        // Attempt to reconnect
        setTimeout(() => {
          if (window.storyblok) {
            window.storyblok.init({
              accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
              bridge: true,
            });
          }
        }, 5000);
      });

      // Handle bridge errors
      window.storyblok.on("bridge:error", (error: unknown) => {
        console.error("Storyblok bridge error:", error);
      });
    }
  }, []);

  return null;
}
