// Main analytics components
export { default as GoogleAnalytics } from "./GoogleAnalytics";
export { default as FacebookPixel } from "./FacebookPixel";
export {
  AnalyticsProvider,
  useAnalytics,
  useVisibilityTracking,
} from "./AnalyticsContext";

// Analytics utility functions
export {
  trackGA4Event,
  trackGA4PageView,
  trackGA4Purchase,
  trackGA4AddToCart,
  trackGA4ViewItem,
} from "./GoogleAnalytics";

export {
  trackFBEvent,
  trackFBCustomEvent,
  trackFBPurchase,
  trackFBAddToCart,
  trackFBViewContent,
  trackFBLead,
  trackFBContact,
  trackFBCompleteRegistration,
} from "./FacebookPixel";
