"use client";

import {
  ISbStoryData,
  apiPlugin,
  storyblokInit,
} from "@storyblok/react";
import { useEffect, useState, Suspense } from "react";
import { loadComponent, componentRegistry } from "@/lib/component-registry";

// Create a dynamic component map that wraps lazy imports
// This allows StoryblokComponent to work with our dynamic registry
const createDynamicComponentMap = () => {
  const map: Record<string, any> = {};

  Object.keys(componentRegistry).forEach((key) => {
    // Create a wrapper component that handles the lazy loading
    map[key] = (props: any) => {
      const Component = loadComponent(key);
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
  bridge: true,
  apiOptions: {
    region: "eu",
  },
});

interface BlokData {
  component: string;
  _uid: string;
  [key: string]: unknown;
}

// Dynamic component wrapper that loads components on demand
function DynamicBlokComponent({ blok }: { blok: BlokData }) {
  const [Component, setComponent] = useState<React.ComponentType<{ blok: BlokData }> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadBlokComponent = async () => {
      try {
        const LoadedComponent = loadComponent(blok.component);
        if (LoadedComponent) {
          setComponent(() => LoadedComponent as React.ComponentType<{ blok: BlokData }>);
        } else {
          console.warn(`Component "${blok.component}" not found in registry`);
        }
      } catch (err) {
        console.error(`Error loading component "${blok.component}":`, err);
        setError(err as Error);
      }
    };

    loadBlokComponent();
  }, [blok.component]);

  if (error) {
    return null;
  }

  if (!Component) {
    return <div style={{ minHeight: '50px' }} />; // Placeholder to prevent CLS
  }

  return (
    <Suspense fallback={<div style={{ minHeight: '50px' }} />}>
      <Component blok={blok} />
    </Suspense>
  );
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
        setStory(event.detail as unknown as ISbStoryData);
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
              setStory(event.data.story as unknown as ISbStoryData);
            } else if (event.data.type === "change" && event.data.story) {
              setStory(event.data.story as unknown as ISbStoryData);
            } else if (event.data.story) {
              // Handle any story data regardless of type
              setStory(event.data.story as unknown as ISbStoryData);
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
                    setStory(event.story as unknown as ISbStoryData); // update local state

                    // Force a re-render to show changes immediately
                    window.dispatchEvent(
                      new CustomEvent("storyblok:input", {
                        detail: event.story,
                      })
                    );
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
                  setStory(event.story as unknown as ISbStoryData);
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
                  setStory(event.story as unknown as ISbStoryData);
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sbBridge.pingEditor(() => {
              try {
                if (sbBridge.isInEditor()) {
                  // Force initial story load by triggering a ping
                  setTimeout(() => {
                    // Set up polling to check for story updates
                    const pollInterval = setInterval(() => {
                      if (sbBridge.isInEditor()) {
                        // Try to get the current story from the bridge
                        try {
                          // Force a ping to get the latest story
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          sbBridge.pingEditor((data: any) => {
                            if (data && data.story) {
                              setStory(
                                data.story as unknown as ISbStoryData
                              );
                            }
                          });
                        } catch (error) {
                          console.log("Polling error:", error);
                        }
                      } else {
                        clearInterval(pollInterval);
                      }
                    }, 2000); // Poll every 2 seconds

                    // Clean up polling after 30 seconds
                    setTimeout(() => {
                      clearInterval(pollInterval);
                    }, 30000);
                  }, 500);
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
      // Render each block individually with dynamic loading
      return (
        <div>
          {story.content.body.map(
            (blok: BlokData, index: number) => (
              <DynamicBlokComponent key={blok._uid || index} blok={blok} />
            )
          )}
        </div>
      );
    } else {
      return <>{children}</>;
    }
  }

  // In normal mode or when no live story, use children (server-rendered content)
  return <>{children}</>;
}
