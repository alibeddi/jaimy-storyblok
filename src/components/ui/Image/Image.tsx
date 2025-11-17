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
    // Memoize derived values
    const isResponsive = useMemo(() => !width || !height, [width, height]);

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

    if (isResponsive) {
      if (!src) return null;
      return (
        <div className={cn("relative w-full h-full", className)}>
          <NextImage
            src={src!}
            alt={alt}
            className={imageClasses}
            style={{
              objectFit: objectFit,
            }}
            width={dimensions.width || 100}
            height={dimensions.height || 100}
            loading={loading}
            priority={priority}
            placeholder={placeholder ? "blur" : undefined}
            blurDataURL={placeholder}
            onError={(e) => {
              console.warn('Responsive image failed to load:', src);
              // Fallback: try to reload with unoptimized version
              if (process.env.NODE_ENV === 'production') {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('?unoptimized=true')) {
                  const separator = target.src.includes('?') ? '&' : '?';
                  target.src = `${target.src}${separator}unoptimized=true`;
                }
              }
            }}
            {...rest}
          />
        </div>
      );
    }

    // Handle fixed size images
    if (!src) return null;
    
    return (
      <NextImage
        src={src!}
        alt={alt}
        width={dimensions.width || 100}
        height={dimensions.height || 100}
        className={imageClasses}
        loading={loading}
        priority={priority}
        placeholder={placeholder ? "blur" : undefined}
        blurDataURL={placeholder}
        style={{
          objectFit: objectFit,
        }}
        onError={(e) => {
          console.warn('Image failed to load:', src);
          // Fallback: try to reload with unoptimized version
          if (process.env.NODE_ENV === 'production') {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('?unoptimized=true')) {
              const separator = target.src.includes('?') ? '&' : '?';
              target.src = `${target.src}${separator}unoptimized=true`;
            }
          }
        }}
        {...rest}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
