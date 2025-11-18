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
      return null;
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
          console.error("Image failed to load:", src);
          // Prevent infinite loop - don't retry on error
          const target = e.target as HTMLImageElement;
          // Set a transparent 1x1 pixel as fallback to stop retries
          target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }}
        onLoad={() => {
          // Image loaded successfully
        }}
        {...rest}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
