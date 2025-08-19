// Anytrack utility functions for tracking events

const getAnytrack = () => {
  if (typeof window === "undefined") return undefined;
  // Support both possible globals
  return (window as any).anytrack || (window as any).AnyTrack;
};

export const anytrackTrack = (
  event: string,
  properties?: Record<string, any>
) => {
  const at = getAnytrack();
  if (at) at.track(event, properties);
};

export const anytrackIdentify = (
  userId: string,
  traits?: Record<string, any>
) => {
  const at = getAnytrack();
  if (at) at.identify(userId, traits);
};

export const anytrackPage = (
  pageName?: string,
  properties?: Record<string, any>
) => {
  const at = getAnytrack();
  if (at) at.page(pageName, properties);
};

export const anytrackSetUserProperties = (properties: Record<string, any>) => {
  const at = getAnytrack();
  if (at) at.setUserProperties(properties);
};

export const anytrackTrackConversion = (
  value?: number,
  currency: string = "EUR"
) => {
  const at = getAnytrack();
  if (at) at.trackConversion(value, currency);
};

export const anytrackTrackLead = (value?: number, currency: string = "EUR") => {
  const at = getAnytrack();
  if (at) at.trackLead(value, currency);
};

export const anytrackTrackPurchase = (
  value: number,
  currency: string = "EUR",
  orderId?: string
) => {
  const at = getAnytrack();
  if (at) at.trackPurchase(value, currency, orderId);
};

// Form tracking utilities
export const trackFormSubmission = (
  formName: string,
  success: boolean,
  formData?: Record<string, any>
) => {
  anytrackTrack("form_submitted", {
    form_name: formName,
    success,
    ...formData,
  });
};

export const trackFormFieldInteraction = (
  formName: string,
  fieldName: string,
  action: "focus" | "blur" | "change"
) => {
  anytrackTrack("form_field_interaction", {
    form_name: formName,
    field_name: fieldName,
    action,
  });
};

// Button click tracking
export const trackButtonClick = (
  buttonText: string,
  buttonLocation: string,
  additionalProps?: Record<string, any>
) => {
  anytrackTrack("button_clicked", {
    button_text: buttonText,
    button_location: buttonLocation,
    ...additionalProps,
  });
};

// Page interaction tracking
export const trackScrollDepth = (depth: number, pageUrl: string) => {
  anytrackTrack("scroll_depth", {
    depth,
    page_url: pageUrl,
  });
};

export const trackTimeOnPage = (timeSpent: number, pageUrl: string) => {
  anytrackTrack("time_on_page", {
    time_spent: timeSpent,
    page_url: pageUrl,
  });
};

// E-commerce tracking
export const trackAddToCart = (
  productId: string,
  productName: string,
  price: number,
  currency: string = "EUR"
) => {
  anytrackTrack("add_to_cart", {
    product_id: productId,
    product_name: productName,
    price,
    currency,
  });
};

export const trackRemoveFromCart = (productId: string, productName: string) => {
  anytrackTrack("remove_from_cart", {
    product_id: productId,
    product_name: productName,
  });
};

export const trackViewProduct = (
  productId: string,
  productName: string,
  category?: string
) => {
  anytrackTrack("view_product", {
    product_id: productId,
    product_name: productName,
    category,
  });
};

// User engagement tracking
export const trackVideoPlay = (
  videoTitle: string,
  videoId?: string,
  duration?: number
) => {
  anytrackTrack("video_play", {
    video_title: videoTitle,
    video_id: videoId,
    duration,
  });
};

export const trackVideoComplete = (
  videoTitle: string,
  videoId?: string,
  duration?: number
) => {
  anytrackTrack("video_complete", {
    video_title: videoTitle,
    video_id: videoId,
    duration,
  });
};

export const trackDownload = (
  fileName: string,
  fileType?: string,
  fileSize?: number
) => {
  anytrackTrack("file_download", {
    file_name: fileName,
    file_type: fileType,
    file_size: fileSize,
  });
};

export const trackOutboundLink = (
  url: string,
  linkText?: string,
  linkLocation?: string
) => {
  anytrackTrack("outbound_link_click", {
    url,
    link_text: linkText,
    link_location: linkLocation,
  });
};

// Custom event tracking with validation
export const trackCustomEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  // Validate event name format
  if (!eventName || typeof eventName !== "string") {
    console.warn("Anytrack: Invalid event name provided");
    return;
  }

  // Sanitize properties (remove undefined values)
  const sanitizedProperties = properties
    ? Object.fromEntries(
        Object.entries(properties).filter(([_, value]) => value !== undefined)
      )
    : undefined;

  anytrackTrack(eventName, sanitizedProperties);
};
