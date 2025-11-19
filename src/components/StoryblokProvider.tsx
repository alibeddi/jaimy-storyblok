"use client";

import {
  ISbStoryData,
  apiPlugin,
  storyblokInit,
  StoryblokComponent,
} from "@storyblok/react";
import { useEffect, useState, Suspense } from "react";
import { loadComponent, componentRegistry } from "@/lib/component-registry";

// Create a dynamic component map that wraps lazy imports
// This allows StoryblokComponent to work with our dynamic registry
const createDynamicComponentMap = () => {
  const map: Record<string, React.ComponentType<{ blok: unknown }>> = {};

  Object.keys(componentRegistry).forEach((key) => {
    // Create a wrapper component that handles the lazy loading
    map[key] = (props: { blok: unknown }) => {
      const Component = loadComponent(key) as React.ComponentType<{ blok: unknown }>;
      if (!Component) return null;
      return (
        <Suspense fallback={<div style={{ minHeight: '50px' }} />}>
          <Component {...props} />
        </Suspense>
      );
    };
  });

  return map;
};

// Initialize Storyblok for client-side with dynamic component map
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: createDynamicComponentMap(),
  bridge: typeof window !== "undefined",
  enableFallbackComponent: true,
  apiOptions: {
    region: "eu",
  },
});

interface BlokData {
  component: string;
  _uid: string;
  [key: string]: unknown;
}

export default function StoryblokProvider({
  children,
  story: initialStory,
}: {
  children: React.ReactNode;
  story?: ISbStoryData;
}) {
  const [story, setStory] = useState<ISbStoryData | null>(initialStory || null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isInEditor, setIsInEditor] = useState(false);

  // Helper to safely update story only if it's different
  const updateStory = (newStory: ISbStoryData) => {
    setStory((prevStory) => {
      // Only update if the story actually changed
      if (!prevStory || prevStory.id !== newStory.id || prevStory.content !== newStory.content) {
        return newStory;
      }
      return prevStory;
    });
  };

  // We rely on manual bridge below to avoid SSR window errors

  useEffect(() => {
    // Check if we're in preview mode - only in development or with explicit preview param
    const isPreview =
      typeof window !== "undefined" &&
      (window.location?.search?.includes("_storyblok") ||
        window.location?.search?.includes("_storyblok_tk"));

    // Only enable preview in development or with explicit preview tokens
    const shouldEnablePreview =
      process.env.NODE_ENV === "development" ||
      (isPreview && window.location?.search?.includes("_storyblok_tk"));

    setIsPreviewMode(!!shouldEnablePreview);

    // Get story data from script tag if not provided as prop
    if (!story && typeof window !== "undefined") {
      const scriptTag = document.getElementById("storyblok-story-data");
      if (scriptTag) {
        try {
          const storyData = JSON.parse(scriptTag.textContent || "{}");
          setStory(storyData);
        } catch (error) {
          console.error("Error parsing story data:", error);
        }
      }
    }

    // Listen for custom storyblok input events
    const handleStoryblokInput = (event: CustomEvent) => {
      if (event.detail) {
        updateStory(event.detail as unknown as ISbStoryData);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener(
        "storyblok:input",
        handleStoryblokInput as EventListener
      );

      // Listen for Storyblok bridge messages with proper origin validation
      const handleMessage = (event: MessageEvent) => {
        // Validate origin to prevent unauthorized messages
        const allowedOrigins = [
          "https://app.storyblok.com",
          "https://service.jaimy.be",
          window.location.origin,
        ];

        if (!allowedOrigins.includes(event.origin)) {
          // Silently ignore unauthorized origins to prevent spam
          return;
        }

        try {
          if (event.data && typeof event.data === "object") {
            // Check if it's a Storyblok bridge message
            if (event.data.type === "input" && event.data.story) {
              updateStory(event.data.story as unknown as ISbStoryData);
            } else if (event.data.type === "change" && event.data.story) {
              updateStory(event.data.story as unknown as ISbStoryData);
            } else if (event.data.story) {
              // Handle any story data regardless of type
              updateStory(event.data.story as unknown as ISbStoryData);
            }
          }
        } catch (error) {
          // Only log errors in development
          if (process.env.NODE_ENV === "development") {
            console.error("Error handling bridge message:", error);
          }
        }
      };

      window.addEventListener("message", handleMessage);

      // Store the handler for cleanup
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__storyblokMessageHandler = handleMessage;
    }

    if (shouldEnablePreview) {
      // Additional production safety check
      if (
        process.env.NODE_ENV === "production" &&
        !window.location.search.includes("_storyblok_tk")
      ) {
        console.log(
          "Storyblok bridge disabled in production without preview token"
        );
        return;
      }

      // Check if we're running on HTTPS
      if (window.location.protocol !== "https:") {
        console.warn(
          "⚠️ Storyblok bridge requires HTTPS. Please use 'npm run dev:https'"
        );
      } // Add a meta tag to help with origin validation
      if (typeof document !== "undefined") {
        const metaTag = document.querySelector(
          'meta[name="storyblok-preview"]'
        );
        if (!metaTag) {
          const meta = document.createElement("meta");
          meta.name = "storyblok-preview";
          meta.content = "true";
          document.head.appendChild(meta);
        }
      }

      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src*="storyblok-v2-latest.js"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          // Add small delay to ensure script is fully loaded
          setTimeout(initBridge, 100);
        };
      } else {
        initBridge();
      }

      function initBridge() {
        try {
          // Wait for StoryblokBridge to be available
          if (!window.StoryblokBridge) {
            setTimeout(initBridge, 100);
            return;
          }

          const { StoryblokBridge } = window;
          if (StoryblokBridge && typeof StoryblokBridge === "function") {
            // Use minimal bridge configuration to avoid origin issues
            const sbBridge = new StoryblokBridge();

            // 👇 input event gives you fresh story data (autosave)
            sbBridge.on("input", (event) => {
              try {
                if (event?.story) {
                  // Ensure the story has the correct structure
                  if (event.story.content && event.story.content.body) {
                    updateStory(event.story as unknown as ISbStoryData); // update local state
                  } else {
                    console.log("⚠️ Story data missing content or body");
                  }
                } else {
                  console.log("⚠️ Input event received but no story data");
                }
              } catch (error) {
                console.error("Error handling input event:", error);
              }
            });

            // Handle published and change events
            sbBridge.on(["published", "change"], (event) => {
              try {
                // Don't reload on change, only on published
                if (event?.action === "published") {
                  location.reload();
                } else if (event?.action === "change" && event?.story) {
                  // Update story immediately on change
                  updateStory(event.story as unknown as ISbStoryData);
                }
              } catch (error) {
                console.error("Error handling publish/change event:", error);
              }
            });

            // Add additional event listeners for better coverage
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sbBridge.on("customEvent", (event: any) => {
              try {
                if (event?.type === "input" && event?.story) {
                  updateStory(event.story as unknown as ISbStoryData);
                }
              } catch (error) {
                console.error("Error handling custom event:", error);
              }
            });

            // Handle enter edit mode
            sbBridge.on("enterEditmode", () => {
              try {
                // Enter edit mode handling
              } catch (error) {
                console.error("Error handling enterEditmode event:", error);
              }
            });

            // Ping editor to check if we're in preview
            sbBridge.pingEditor(() => {
              try {
                if (sbBridge.isInEditor()) {
                  setIsInEditor(true);
                  console.log("✅ Storyblok Visual Editor is active - click-to-edit enabled");
                }
              } catch (error) {
                console.error("Error in pingEditor callback:", error);
              }
            });

            // Handle bridge errors - using customEvent instead
            sbBridge.on("customEvent", (event: unknown) => {
              if (
                event &&
                typeof event === "object" &&
                "type" in event &&
                event.type === "bridge:error"
              ) {
                console.error("Storyblok bridge error:", event);
              }
            });
          }
        } catch (error) {
          console.error("Error initializing Storyblok bridge:", error);
        }
      }
    }

    // Cleanup event listener
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(
          "storyblok:input",
          handleStoryblokInput as EventListener
        );

        // Clean up message handler
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const messageHandler = (window as any).__storyblokMessageHandler;
        if (messageHandler) {
          window.removeEventListener("message", messageHandler);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (window as any).__storyblokMessageHandler;
        }
      }
    };
  }, [story]);

  // In preview mode, use the story if available, otherwise use children
  if (isPreviewMode && story) {
    // Ensure we have the correct story structure
    if (
      story.content &&
      story.content.body &&
      Array.isArray(story.content.body)
    ) {
      // Use StoryblokComponent for proper visual editing support
      return (
        <>
          {/* Visual indicator when in edit mode */}
          {isInEditor && (
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                background: "#00b3b0",
                color: "white",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: "bold",
                zIndex: 999999,
                borderBottomLeftRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              ✏️ Storyblok Edit Mode Active
            </div>
          )}
          <div>
            {story.content.body.map(
              (blok: BlokData, index: number) => (
                <StoryblokComponent key={blok._uid || index} blok={blok} />
              )
            )}
          </div>
        </>
      );
    } else {
      return <>{children}</>;
    }
  }

  // In normal mode or when no live story, use children (server-rendered content)
  return <>{children}</>;
}
