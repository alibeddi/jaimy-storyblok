# Analytics Setup Guide

This guide will help you set up Google Analytics 4 and Facebook Pixel in your Next.js + Storyblok project.

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Google Analytics 4 Configuration
# Get this from your GA4 property settings (Format: G-XXXXXXXXXX)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel Configuration
# Get this from your Facebook Ads Manager (Format: numeric ID)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1234567890123456

# Optional: Analytics Environment
# Set to 'production' to enable analytics, anything else disables them
NEXT_PUBLIC_ANALYTICS_ENV=production
```

## Getting Your Analytics IDs

### Google Analytics 4 Setup

1. **Create a GA4 Property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click "Admin" → "Create Property"
   - Choose "Google Analytics 4" property type
   - Follow the setup wizard

2. **Get your Measurement ID:**
   - In your GA4 property, go to Admin → Data Streams
   - Click on your web stream
   - Copy the "Measurement ID" (format: G-XXXXXXXXXX)

3. **Enable Enhanced Ecommerce (optional):**
   - Go to Admin → Events
   - Turn on "Enhanced measurement"
   - Configure custom events as needed

### Facebook Pixel Setup

1. **Create a Facebook Pixel:**
   - Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
   - Click "Connect Data Sources" → "Web" → "Facebook Pixel"
   - Choose "Create a Pixel" and give it a name

2. **Get your Pixel ID:**
   - In Events Manager, select your pixel
   - The Pixel ID is displayed at the top (numeric ID like 1234567890123456)

3. **Set up Conversions (optional):**
   - In Events Manager, go to "Aggregated Event Measurement"
   - Configure your conversion events and priorities

## Usage Examples

### Basic Page Tracking

Page views are automatically tracked when routes change.

### Custom Event Tracking

```typescript
import { useAnalytics } from '@/components/analytics/AnalyticsContext';

function MyComponent() {
  const analytics = useAnalytics();

  const handleButtonClick = () => {
    analytics.trackCustomEvent('button_click', {
      button_name: 'hero_cta',
      section: 'hero'
    });
  };

  return <button onClick={handleButtonClick}>Click Me</button>;
}
```

### E-commerce Tracking

```typescript
// Track a purchase
analytics.trackPurchase({
  transactionId: 'txn_123',
  value: 99.99,
  currency: 'EUR',
  items: [
    {
      item_id: 'prod_123',
      item_name: 'Product Name',
      category: 'Category',
      quantity: 1,
      price: 99.99
    }
  ],
  contentIds: ['prod_123'] // For Facebook Pixel
});

// Track add to cart
analytics.trackAddToCart({
  value: 99.99,
  currency: 'EUR',
  items: [...],
  contentIds: ['prod_123']
});
```

### Lead Generation Tracking

```typescript
// Track form submission
analytics.trackFormSubmission("contact_form", true);

// Track newsletter signup
analytics.trackNewsletterSignup("footer");

// Track lead generation
analytics.trackLead(50, "EUR");
```

### Engagement Tracking

```typescript
// Track video play
analytics.trackVideoPlay("Product Demo Video", 120);

// Track file download
analytics.trackDownload("brochure.pdf", "pdf");

// Track outbound link click
analytics.trackOutboundClick("https://external-site.com", "External Link");
```

### Component Visibility Tracking

```typescript
import { useRef } from 'react';
import { useVisibilityTracking } from '@/components/analytics/AnalyticsContext';

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useVisibilityTracking(heroRef, 'hero_viewed', {
    section: 'homepage',
    content_type: 'hero'
  });

  return <section ref={heroRef}>Hero Content</section>;
}
```

## Storyblok Integration

You can also create Storyblok components to manage analytics configuration:

### Analytics Settings Component (in Storyblok)

- Component name: `analytics_settings`
- Fields:
  - `ga4_enabled` (Boolean)
  - `facebook_pixel_enabled` (Boolean)
  - `custom_events` (Blocks - for defining custom events)

### Event Tracking Blocks

Create blocks in Storyblok for different tracking scenarios:

- `track_button` - Buttons with custom event tracking
- `track_form` - Forms with submission tracking
- `track_video` - Videos with play tracking

## Testing Your Setup

### GA4 Testing

1. Install the "Google Analytics Debugger" Chrome extension
2. Visit your site with the extension enabled
3. Check the extension popup for GA4 events
4. Use GA4's Real-time reports to see live data

### Facebook Pixel Testing

1. Install the "Facebook Pixel Helper" Chrome extension
2. Visit your site with the extension enabled
3. Check the extension popup for pixel fires
4. Use Facebook Events Manager "Test Events" feature

### Console Debugging

Add this to your browser console to see tracking calls:

```javascript
// Enable GA4 debug mode
gtag("config", "YOUR_GA4_ID", { debug_mode: true });

// Monitor Facebook Pixel events
fbq.queue.forEach((call) => console.log("FB Pixel:", call));
```

## Privacy Considerations

### GDPR Compliance

- Implement a cookie consent banner
- Allow users to opt-out of tracking
- Anonymize IP addresses in GA4

### Cookie Settings

```typescript
// Example: Conditional tracking based on consent
if (userHasConsented) {
  analytics.trackCustomEvent("user_action", data);
}
```

## Performance Optimization

1. **Lazy Loading:** Analytics scripts are loaded with `strategy="afterInteractive"`
2. **Conditional Loading:** Scripts only load when valid IDs are provided
3. **Error Handling:** Graceful fallbacks when analytics services are blocked

## Troubleshooting

### Common Issues

1. **Events not showing:** Check that IDs are correct and environment variables are set
2. **Adblockers:** Test in incognito mode or with adblockers disabled
3. **CORS issues:** Ensure your domain is properly configured in GA4/Facebook

### Debug Mode

Set `NEXT_PUBLIC_ANALYTICS_ENV=development` to enable console logging for debugging.
