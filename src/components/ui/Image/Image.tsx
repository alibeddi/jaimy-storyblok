"use client";

import { ImageProps } from "@/types/ui";
import NextImage from "next/image";
import React, { memo, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { isStoryblokImage, getImageDimensions } from "@/lib/image-utils";

// Move static mapping outside component to prevent recreation
const OBJECT_FIT_STYLES = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
} as const;

const Image: React.FC<ImageProps> = memo(
  ({
    className,
    src,
    alt,
    width,
    height,
    fill = false,
    loading = "lazy",
    priority = false,
    placeholder,
    objectFit = "cover",
    sizes,
    ...rest
  }) => {
    const [hasError, setHasError] = useState(false);
    
    // Memoize image classes calculation
    const imageClasses = useMemo(
      () =>
        cn(
          "transition-opacity duration-300",
          OBJECT_FIT_STYLES[objectFit as keyof typeof OBJECT_FIT_STYLES],
          className
        ),
      [objectFit, className]
    );

    // Memoize dimensions calculation
    const dimensions = useMemo(() => {
      const w = typeof width === "string" ? parseInt(width) : width;
      const h = typeof height === "string" ? parseInt(height) : height;
      
      // If no dimensions provided and it's a Storyblok image, extract from URL
      if ((!w || !h) && src && isStoryblokImage(src)) {
        const extracted = getImageDimensions(src);
        return {
          width: w || extracted.width,
          height: h || extracted.height,
        };
      }
      
      return {
        width: w || 800,
        height: h || 600,
      };
    }, [width, height, src]);

    // Memoize optimized source URL for Storyblok images
    const optimizedSrc = useMemo(() => {
      if (!src) return '';

      // For Storyblok images, use original URL without optimization for now
      // Storyblok's CDN already serves optimized images
      // We can enable optimization later if needed
      return src;
    }, [src]);

    // Always render with width/height for better compatibility
    if (!src || hasError) {
      return null;
    }

    // For Storyblok images, use unoptimized mode to bypass Next.js image optimization
    // This prevents the infinite loop and 400 errors
    if (isStoryblokImage(src)) {
      // Build img attributes, only include width/height if explicitly provided
      const imgAttributes: React.ImgHTMLAttributes<HTMLImageElement> = {
        src: optimizedSrc,
        alt: alt,
        className: cn(
          imageClasses,
          fill ? "absolute inset-0 w-full h-full" : "w-full h-auto max-w-full"
        ),
        style: {
          objectFit: objectFit,
        },
        loading: loading,
        onError: (e) => {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Image] Failed to load Storyblok image:`, {
              src,
              optimizedSrc,
              providedDimensions: { width, height },
              calculatedDimensions: dimensions,
            });
          }
          setHasError(true);
          // Prevent infinite loop
          const target = e.target as HTMLImageElement;
          target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        },
        ...rest,
      };

      // Only add width/height if they were explicitly provided and fill is not used
      if (!fill) {
        if (width) imgAttributes.width = dimensions.width;
        if (height) imgAttributes.height = dimensions.height;
      }

      return <img {...imgAttributes} />;
    }

    // For non-Storyblok images, use Next.js Image component
    return (
      <NextImage
        src={src}
        alt={alt}
        {...(fill
          ? { fill: true }
          : { width: dimensions.width, height: dimensions.height }
        )}
        className={cn(imageClasses, "w-full h-auto max-w-full")}
        style={{
          objectFit: objectFit,
        }}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        loading={loading}
        priority={priority}
        placeholder={placeholder ? "blur" : undefined}
        blurDataURL={placeholder}
        onError={(e) => {
          console.error("Image failed to load:", src);
          setHasError(true);
          const target = e.target as HTMLImageElement;
          target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }}
        {...rest}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
