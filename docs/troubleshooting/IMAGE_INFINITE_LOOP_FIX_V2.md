# Image Infinite Loop Fix - Version 2

## Problem
Next.js Image component was trying to optimize Storyblok images through its `/_next/image` endpoint, causing:
- 400 errors from Storyblok
- Infinite retry loops
- Console spam with "Image failed to load" messages
- MIME type errors

## Root Cause
When using Next.js `<Image>` component with Storyblok URLs:
1. Next.js tries to proxy and optimize the image through `/_next/image?url=...`
2. This proxy request to Storyblok fails with 400 errors
3. Next.js retries the failed request
4. Creates an infinite loop

## Solution
Use Storyblok's native image service directly and bypass Next.js image optimization:

### Changes Made

1. **Detect Storyblok Images**
   - Check if URL contains Storyblok domains
   - Use `isStoryblokImage()` utility

2. **Use Native HTML `<img>` for Storyblok**
   - Bypass Next.js Image component for Storyblok images
   - Use Storyblok's image service directly via `getOptimizedUrl()`
   - Still get optimization benefits from Storyblok's CDN

3. **Prevent Infinite Retries**
   - Add error state tracking with `useState`
   - Set fallback transparent pixel on error
   - Stop rendering on persistent errors

### Code Changes

```typescript
// For Storyblok images - use native img tag
if (isStoryblokImage(src)) {
  return (
    <img
      src={optimizedSrc}  // Storyblok's optimized URL
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      loading={loading}
      onError={(e) => {
        setHasError(true);  // Prevent retries
        e.target.src = 'data:image/gif;base64,...';
      }}
    />
  );
}

// For other images - use Next.js Image
return <NextImage ... />;
```

## Benefits

1. **No More 400 Errors**
   - Direct Storyblok URLs work correctly
   - No proxy layer to fail

2. **Still Optimized**
   - Storyblok's image service handles optimization
   - WebP format, resizing, quality control
   - CDN delivery

3. **No Infinite Loops**
   - Error state prevents retries
   - Fallback image stops error cascade

4. **Better Performance**
   - One less hop (no Next.js proxy)
   - Direct CDN delivery
   - Faster image loading

## Storyblok Image Service Features Used

- **Format conversion**: WebP for modern browsers
- **Resizing**: Automatic size optimization
- **Quality control**: 80% quality for balance
- **Fit modes**: Proper aspect ratio handling
- **CDN delivery**: Global edge caching

## Testing

1. Check browser console - no more 400 errors
2. Verify images load correctly
3. Check Network tab - direct Storyblok URLs
4. No infinite retry loops

## Alternative Approaches Considered

1. ❌ **Configure Next.js image domains** - Still causes proxy issues
2. ❌ **Use unoptimized prop** - Loses all optimization
3. ✅ **Use Storyblok's service directly** - Best of both worlds

## Next Steps

If you need Next.js Image features (blur placeholder, etc.):
- Consider pre-generating blur data URLs
- Use Storyblok's focal point API
- Implement custom loader for Next.js Image

## Related Files

- `src/components/ui/Image/Image.tsx` - Main component
- `src/lib/image-utils.ts` - Storyblok utilities
- `next.config.ts` - Image configuration
