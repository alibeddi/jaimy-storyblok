// Anytrack utility functions for tracking events

export interface AnytrackGlobal {
  init: (trackingId: string) => void;
  track: (event: string, properties?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
  page: (pageName?: string, properties?: Record<string, unknown>) => void;
  enableFormTracking?: () => void;
  enableScrollTracking?: () => void;
  enableClickTracking?: () => void;
  enableConversionTracking?: () => void;
  setUserProperties?: (properties: Record<string, unknown>) => void;
  trackConversion?: (value?: number, currency?: string) => void;
  trackLead?: (value?: number, currency?: string) => void;
  trackPurchase?: (value: number, currency?: string, orderId?: string) => void;
}

export type AnytrackAPI = AnytrackGlobal | ((...args: unknown[]) => void);

export const getAnytrack = (): AnytrackAPI | undefined => {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    anytrack?: AnytrackAPI;
    AnyTrack?: AnytrackAPI;
  };
  return w.anytrack ?? w.AnyTrack;
};

export const callAnytrack = (method: string, ...args: unknown[]) => {
  const api = getAnytrack();
  if (!api) return;
  if (typeof api === "function") {
    // Queue-style API: AnyTrack('method', ...args)
    if (method === "page") {
      const pageName = args[0] as string | undefined;
      const properties = (args[1] as Record<string, unknown> | undefined) || {};
      const merged = { title: pageName, ...properties };
      // Use event name directly instead of 'track' command
      api("pageview", merged);
      return;
    }
    if (method === "track") {
      const eventName = args[0] as string;
      const properties = args[1] as Record<string, unknown> | undefined;
      // Use event name directly instead of 'track' command
      api(eventName, properties);
      return;
    }
    api(method, ...args);
    return;
  }
  // Object-style API
  switch (method) {
    case "track":
      api.track?.(
        args[0] as string,
        args[1] as Record<string, unknown> | undefined
      );
      break;
    case "identify":
      api.identify?.(
        args[0] as string,
        args[1] as Record<string, unknown> | undefined
      );
      break;
    case "page": {
      const pageName = args[0] as string | undefined;
      const properties = args[1] as Record<string, unknown> | undefined;
      if (api.page) {
        api.page(pageName, properties);
      } else {
        const merged = { title: pageName, ...(properties || {}) };
        api.track?.("pageview", merged);
      }
      break;
    }
    case "setUserProperties":
      api.setUserProperties?.(args[0] as Record<string, unknown>);
      break;
    case "trackConversion":
      api.trackConversion?.(
        args[0] as number | undefined,
        args[1] as string | undefined
      );
      break;
    case "trackLead":
      api.trackLead?.(
        args[0] as number | undefined,
        args[1] as string | undefined
      );
      break;
    case "trackPurchase":
      api.trackPurchase?.(
        args[0] as number,
        (args[1] as string | undefined) ?? "EUR",
        args[2] as string | undefined
      );
      break;
    case "init":
      api.init?.(args[0] as string);
      break;
    case "enableFormTracking":
      api.enableFormTracking?.();
      break;
    case "enableScrollTracking":
      api.enableScrollTracking?.();
      break;
    case "enableClickTracking":
      api.enableClickTracking?.();
      break;
    case "enableConversionTracking":
      api.enableConversionTracking?.();
      break;
  }
};

export const anytrackTrack = (
  event: string,
  properties?: Record<string, unknown>
) => {
  callAnytrack("track", event, properties);
};

export const anytrackIdentify = (
  userId: string,
  traits?: Record<string, unknown>
) => {
  callAnytrack("identify", userId, traits);
};

export const anytrackPage = (
  pageName?: string,
  properties?: Record<string, unknown>
) => {
  callAnytrack("page", pageName, properties);
};

export const anytrackSetUserProperties = (
  properties: Record<string, unknown>
) => {
  callAnytrack("setUserProperties", properties);
};

export const anytrackTrackConversion = (
  value?: number,
  currency: string = "EUR"
) => {
  callAnytrack("trackConversion", value, currency);
};

export const anytrackTrackLead = (value?: number, currency: string = "EUR") => {
  callAnytrack("trackLead", value, currency);
};

export const anytrackTrackPurchase = (
  value: number,
  currency: string = "EUR",
  orderId?: string
) => {
  callAnytrack("trackPurchase", value, currency, orderId);
};

// Form tracking utilities
export const trackFormSubmission = (
  formName: string,
  success: boolean,
  formData?: Record<string, unknown>
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
  additionalProps?: Record<string, unknown>
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
  properties?: Record<string, unknown>
) => {
  // Validate event name format
  if (!eventName || typeof eventName !== "string") {
    console.warn("Anytrack: Invalid event name provided");
    return;
  }

  // Sanitize properties (remove undefined values)
  const sanitizedProperties = properties
    ? Object.fromEntries(
        Object.entries(properties).filter((entry) => entry[1] !== undefined)
      )
    : undefined;

  anytrackTrack(eventName, sanitizedProperties);
};
