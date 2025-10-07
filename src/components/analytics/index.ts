// Main analytics components (GA/FB removed; using Anytrack only)
export { default as Anytrack } from "./Anytrack";
export {
  AnalyticsProvider,
  useAnalytics,
  useVisibilityTracking,
} from "./AnalyticsContext";

// Analytics utility functions (GA/FB removed)

// Anytrack utility functions
export {
  anytrackTrack,
  anytrackIdentify,
  anytrackPage,
  anytrackSetUserProperties,
  anytrackTrackConversion,
  anytrackTrackLead,
  anytrackTrackPurchase,
  trackFormSubmission,
  trackFormFieldInteraction,
  trackButtonClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewProduct,
  trackVideoPlay,
  trackVideoComplete,
  trackDownload,
  trackOutboundLink,
  trackCustomEvent,
} from "./AnytrackUtils";
