"use client";

import { ImageProps } from "@/types/ui";
import NextImage from "next/image";
import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

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
    loading = "lazy",
    priority = false,
    placeholder,
    objectFit = "cover",
    ...rest
  }) => {
    // Memoize derived values - treat images as responsive if no dimensions or dimensions are 0
    const isResponsive = useMemo(() => {
      const numWidth = typeof width === "string" ? parseInt(width) : width;
      const numHeight = typeof height === "string" ? parseInt(height) : height;
      const hasValidWidth = numWidth && numWidth > 0;
      const hasValidHeight = numHeight && numHeight > 0;
      return !hasValidWidth || !hasValidHeight;
    }, [width, height]);

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
    const dimensions = useMemo(
      () => ({
        width: typeof width === "string" ? parseInt(width) : width,
        height: typeof height === "string" ? parseInt(height) : height,
      }),
      [width, height]
    );

    // Always render with width/height for better compatibility
    if (!src) {
      if (process.env.NODE_ENV === "development") {
        console.log("Image: No src provided");
      }
      return null;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Image: Rendering image", {
        src,
        alt,
        dimensions,
        isResponsive,
        finalWidth: dimensions.width || 800,
        finalHeight: dimensions.height || 600,
      });
    }

    return (
      <NextImage
        src={src!}
        alt={alt}
        width={dimensions.width || 800}
        height={dimensions.height || 600}
        className={cn(imageClasses, "w-full h-auto max-w-full")}
        style={{
          objectFit: objectFit,
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading={loading}
        priority={priority}
        placeholder={placeholder ? "blur" : undefined}
        blurDataURL={placeholder}
        onError={(e) => {
          console.warn("Image failed to load:", src);
          // Prevent infinite loops by checking if we already tried fallbacks
          const target = e.target as HTMLImageElement;
          
          if (process.env.NODE_ENV === "production") {
            // For Storyblok images, try fallback to original URL without optimization
            if (src.includes('storyblok.com') && !target.dataset.fallbackAttempted) {
              target.dataset.fallbackAttempted = 'true';
              
              // Extract original URL without /m/ parameters
              let fallbackSrc = src;
              if (src.includes('/m/')) {
                const parts = src.split('/m/');
                fallbackSrc = parts[0];
              }
              
              // Set fallback source
              target.src = fallbackSrc;
            } else if (!target.dataset.unoptimizedAttempted && !target.src.includes("?unoptimized=true")) {
              // Try unoptimized version for other cases
              target.dataset.unoptimizedAttempted = 'true';
              const separator = target.src.includes("?") ? "&" : "?";
              target.src = `${target.src}${separator}unoptimized=true`;
            }
          }
        }}
        onLoad={() => {
          if (process.env.NODE_ENV === "development") {
            console.log("Image loaded successfully:", src);
          }
        }}
        {...rest}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
