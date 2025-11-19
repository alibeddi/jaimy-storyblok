# Image Infinite Loop Fix

## Problem
In production, there was an infinite loop with the error:
```
GET https://service.jaimy.be/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F337659%2F58x58%2F6b699c3add%2Feditor_choice.png&w=1080&q=75 400 (Bad Request)
Image failed to load: https://a.storyblok.com/f/337659/58x58/6b699c3add/editor_choice.png
```

### Root Cause
1. **Upscaling Issue**: Next.js was trying to optimize a 58x58px image at 1080px width
2. **Storyblok Limitation**: Storyblok Image Service returns 400 Bad Request when requesting sizes larger than the original image dimensions
3. **Infinite Loop**: The error handler in `Image.tsx` was trying to reload the image with `?unoptimized=true`, which failed again, creating an infinite retry loop

## Solution

### 1. Fixed Error Handler (`src/components/ui/Image/Image.tsx`)
**Before:**
```typescript
onError={(e) => {
  console.warn("Image failed to load:", src);
  if (process.env.NODE_ENV === "production") {
    const target = e.target as HTMLImageElement;
    if (!target.src.includes("?unoptimized=true")) {
      const separator = target.src.includes("?") ? "&" : "?";
      target.src = `${target.src}${separator}unoptimized=true`; // ❌ Causes infinite loop
    }
  }
}
```

**After:**
```typescript
onError={(e) => {
  console.error("Image failed to load:", src);
  const target = e.target as HTMLImageElement;
  // Set a transparent 1x1 pixel as fallback to stop retries
  target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
}
```

### 2. Prevent Upscaling (`src/lib/image-utils.ts`)
Added logic to prevent requesting image sizes larger than the original:

```typescript
// Get original dimensions to prevent upscaling
const originalDimensions = getImageDimensions(src);

// Prevent requesting sizes larger than original to avoid 400 errors
let requestWidth = width;
let requestHeight = height;

if (requestWidth && requestWidth > originalDimensions.width) {
  requestWidth = originalDimensions.width;
}

if (requestHeight && requestHeight > originalDimensions.height) {
  requestHeight = originalDimensions.height;
}
```

Also updated `generateSrcSet()` to filter out invalid widths:
```typescript
// Filter widths to only include those smaller than or equal to original
const validWidths = widths.filter(w => w <= originalDimensions.width);
```

### 3. Enhanced Next.js Image Config (`next.config.ts`)
Added explicit device sizes and image sizes to better control optimization:

```typescript
images: {
  dangerouslyAllowSVG: true,
  remotePatterns: [
    { protocol: "https", hostname: "a.storyblok.com", pathname: "/**" },
    { protocol: "https", hostname: "img2.storyblok.com", pathname: "/**" },
    { protocol: "https", hostname: "img.storyblok.com", pathname: "/**" },
  ],
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 31536000,
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  unoptimized: false,
},
```

## Testing
After deploying these changes:
1. The infinite loop should stop immediately
2. Small images (like 58x58px icons) will be served at their original size
3. Failed images will show a transparent placeholder instead of retrying
4. No more 400 Bad Request errors from Storyblok

## Prevention
- Always check original image dimensions before requesting optimized versions
- Never upscale images beyond their original size
- Implement proper error handling that doesn't retry indefinitely
- Use appropriate image sizes in Next.js config for different use cases

## Related Files
- `src/components/ui/Image/Image.tsx` - Main image component with error handling
- `src/lib/image-utils.ts` - Image optimization utilities
- `next.config.ts` - Next.js image configuration
