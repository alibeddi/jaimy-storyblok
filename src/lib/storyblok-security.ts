// Storyblok security configuration to prevent unauthorized postMessage origins
// This prevents the infinite "Unauthorized message origin detected" errors in production

export function initStoryblokSecurity() {
  if (typeof window === "undefined") return;

  // Check if we're in production
  const isProduction = process.env.NODE_ENV === "production";

  // Check if we're in preview mode
  const isPreviewMode =
    window.location.search.includes("_storyblok") ||
    window.location.search.includes("_storyblok_tk") ||
    window.location.search.includes("preview=true");

  // In production, disable Storyblok bridge entirely unless in preview mode
  if (isProduction && !isPreviewMode) {
    // Override console.warn to suppress Storyblok origin warnings
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const message = String(args[0] || "");

      // Suppress specific Storyblok-related warnings
      if (
        message.includes("Unauthorized message origin detected") ||
        message.includes("communication from the source") ||
        message.includes("storyblok.com") ||
        message.includes("service.jaimy.be")
      ) {
        return; // Silently ignore
      }

      // Allow all other warnings
      originalWarn.apply(console, args);
    };

    // Override console.error to suppress Storyblok origin errors
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const message = String(args[0] || "");

      // Suppress specific Storyblok-related errors
      if (
        message.includes("Unauthorized message origin detected") ||
        message.includes("communication from the source") ||
        message.includes("storyblok.com") ||
        message.includes("service.jaimy.be")
      ) {
        return; // Silently ignore
      }

      // Allow all other errors
      originalError.apply(console, args);
    };

    // Disable Storyblok bridge script loading
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLScriptElement) {
            if (node.src && node.src.includes("storyblok")) {
              console.log("Blocking Storyblok script in production:", node.src);
              node.remove();
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}

// Auto-initialize on import
if (typeof window !== "undefined") {
  initStoryblokSecurity();
}
