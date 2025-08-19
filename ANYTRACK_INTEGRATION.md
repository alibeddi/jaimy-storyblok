# Anytrack Integration with Storyblok

This document describes the comprehensive Anytrack integration implemented in the Jaimy Storyblok project.

## Overview

Anytrack is integrated alongside Google Analytics and Facebook Pixel to provide comprehensive tracking capabilities. The integration includes:

- **Core Anytrack Component**: Main tracking script and initialization
- **Anytrack Utilities**: Helper functions for tracking various events
- **Storyblok Components**: CMS-configurable tracking components
- **Analytics Context Integration**: Unified tracking across all analytics platforms

## Components

### 1. Core Anytrack Component (`src/components/analytics/Anytrack.tsx`)

The main Anytrack component that loads the tracking script and initializes tracking.

**Features:**

- Automatic script loading
- Configurable tracking options
- NoScript fallback
- TypeScript support

**Usage:**

```tsx
<Anytrack
  trackingId="your-tracking-id"
  enableFormTracking={true}
  enableScrollTracking={true}
  enableClickTracking={true}
  enableConversionTracking={true}
/>
```

### 2. Anytrack Utilities (`src/components/analytics/AnytrackUtils.ts`)

Comprehensive utility functions for tracking various events.

**Available Functions:**

#### Basic Tracking

- `anytrackTrack(event, properties)` - Track custom events
- `anytrackIdentify(userId, traits)` - Identify users
- `anytrackPage(pageName, properties)` - Track page views
- `anytrackSetUserProperties(properties)` - Set user properties

#### E-commerce Tracking

- `trackPurchase(value, currency, orderId)` - Track purchases
- `trackAddToCart(productId, productName, price, currency)` - Track cart additions
- `trackViewProduct(productId, productName, category)` - Track product views

#### Form Tracking

- `trackFormSubmission(formName, success, formData)` - Track form submissions
- `trackFormFieldInteraction(formName, fieldName, action)` - Track field interactions

#### Engagement Tracking

- `trackButtonClick(buttonText, buttonLocation, additionalProps)` - Track button clicks
- `trackScrollDepth(depth, pageUrl)` - Track scroll depth
- `trackTimeOnPage(timeSpent, pageUrl)` - Track time on page
- `trackVideoPlay(videoTitle, videoId, duration)` - Track video plays
- `trackDownload(fileName, fileType, fileSize)` - Track downloads

#### Custom Events

- `trackCustomEvent(eventName, properties)` - Track custom events with validation

### 3. Storyblok Components

#### AnytrackTracker (`src/components/blok/AnytrackTracker/`)

A configurable tracking component that can be added through the Storyblok CMS.

**Configuration Options:**

- `event_name`: Name of the event to track
- `trigger_type`: When to trigger tracking (on_load, on_scroll, on_click, on_form_submit, on_video_play, on_video_complete)
- `scroll_threshold`: Scroll percentage to trigger tracking (for scroll-based triggers)
- `event_properties`: Additional properties to include with the event
- `target_selector`: CSS selector for click-based triggers
- `delay_ms`: Delay before tracking (for load-based triggers)

**Usage in Storyblok:**
Add an `anytrack_tracker` component to your story with the desired configuration.

#### AnytrackForm (`src/components/blok/AnytrackForm/`)

A form component with built-in Anytrack tracking.

**Features:**

- Configurable form fields (text, email, tel, textarea, select, checkbox, radio)
- Automatic field interaction tracking
- Form submission tracking
- Conversion and lead tracking
- Custom event tracking

**Configuration Options:**

- `form_title`: Title of the form
- `form_fields`: Array of form field configurations
- `track_conversions`: Enable conversion tracking
- `track_lead_generation`: Enable lead generation tracking
- `custom_event_name`: Custom event name for tracking
- `custom_event_properties`: Additional properties for custom events

## Environment Variables

Add the following environment variable to your `.env.local`:

```bash
NEXT_PUBLIC_ANYTRACK_ID=your-anytrack-tracking-id
```

## Integration with Existing Analytics

The Anytrack integration is seamlessly integrated with the existing analytics system:

### AnalyticsContext Integration

All tracking functions in `AnalyticsContext` now also send data to Anytrack:

- Page views
- E-commerce events
- Form submissions
- Custom events
- User engagement

### Unified Tracking

Use the existing `useAnalytics()` hook for unified tracking across all platforms:

```tsx
import { useAnalytics } from "@/components/analytics";

const analytics = useAnalytics();

// This will track to GA4, Facebook Pixel, and Anytrack
analytics.trackCustomEvent("button_click", { button_name: "cta" });
```

## Usage Examples

### 1. Basic Event Tracking

```tsx
import { trackCustomEvent } from "@/components/analytics";

// Track a custom event
trackCustomEvent("user_action", {
  action_type: "download",
  file_name: "brochure.pdf",
});
```

### 2. Form Tracking

```tsx
import { trackFormSubmission } from "@/components/analytics";

const handleSubmit = (formData) => {
  // Your form submission logic

  // Track successful submission
  trackFormSubmission("contact_form", true, formData);
};
```

### 3. Button Click Tracking

```tsx
import { trackButtonClick } from "@/components/analytics";

const handleClick = () => {
  // Your button logic

  // Track the click
  trackButtonClick("Get Started", "hero_section", {
    page_location: "homepage",
  });
};
```

### 4. E-commerce Tracking

```tsx
import { trackPurchase } from "@/components/analytics";

const handlePurchase = (orderData) => {
  // Your purchase logic

  // Track the purchase
  trackPurchase({
    transactionId: orderData.id,
    value: orderData.total,
    currency: "EUR",
    items: orderData.items,
  });
};
```

## Storyblok CMS Configuration

### Adding AnytrackTracker

1. In Storyblok, add an `anytrack_tracker` component to your story
2. Configure the tracking parameters:
   - Event name
   - Trigger type
   - Additional properties
3. The component will automatically track events based on your configuration

### Adding AnytrackForm

1. In Storyblok, add an `anytrack_form` component to your story
2. Configure the form fields and tracking options
3. The form will automatically track all interactions and submissions

## Best Practices

### 1. Event Naming

Use consistent, descriptive event names:

- ✅ `button_click`, `form_submit`, `video_play`
- ❌ `click`, `submit`, `play`

### 2. Property Consistency

Use consistent property names across similar events:

- ✅ `button_text`, `button_location` for all button clicks
- ❌ Mixing `text`/`button_text` or `location`/`button_location`

### 3. Performance

- Use passive event listeners where possible
- Debounce scroll and resize events
- Clean up event listeners in useEffect cleanup functions

### 4. Privacy

- Don't track personally identifiable information (PII)
- Respect user privacy preferences
- Follow GDPR and other privacy regulations

## Troubleshooting

### Common Issues

1. **Events not tracking**: Check browser console for errors and verify tracking ID
2. **Duplicate events**: Ensure proper cleanup in useEffect hooks
3. **Performance issues**: Use passive event listeners and debounce where appropriate

### Debug Mode

Enable debug mode by adding to your environment:

```bash
NEXT_PUBLIC_ANYTRACK_DEBUG=true
```

### Console Logging

All tracking functions include console logging in development mode for debugging.

## Advanced Features

### 1. Custom Event Properties

```tsx
trackCustomEvent("user_interaction", {
  interaction_type: "scroll",
  page_section: "hero",
  user_segment: "returning_visitor",
});
```

### 2. User Identification

```tsx
import { anytrackIdentify } from "@/components/analytics";

anytrackIdentify("user123", {
  email: "user@example.com",
  plan: "premium",
  signup_date: "2024-01-01",
});
```

### 3. Batch Tracking

For multiple related events, consider batching:

```tsx
const trackUserJourney = (steps) => {
  steps.forEach((step, index) => {
    trackCustomEvent("journey_step", {
      step_number: index + 1,
      step_name: step.name,
      total_steps: steps.length,
    });
  });
};
```

## Support

For Anytrack-specific issues, refer to the [Anytrack documentation](https://docs.anytrack.io/).

For integration issues, check the browser console and verify:

1. Environment variables are set correctly
2. Components are properly imported
3. Storyblok component mapping is correct
4. No JavaScript errors in the console

