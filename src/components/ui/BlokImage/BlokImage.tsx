"use client";

import React, { useMemo, memo } from "react";
import Image from "../Image/Image";
import { BlokImageProps } from "@/types/ui";

const BlokImage: React.FC<BlokImageProps> = memo(
  ({
    asset,
    aspectDesktop,
    aspectTablet,
    aspectMobile,
    width,
    height,
    maxWidth,
    minWidth,
    className,
    ...rest
  }) => {
    // Memoize container style to prevent recalculation
    const containerStyle = useMemo((): React.CSSProperties => {
      const style: React.CSSProperties = {};

      if (maxWidth) {
        // Handle maxWidth as REM units for responsive design
        let maxWidthValue = "";

        if (typeof maxWidth === "number") {
          // Convert number to rem units (Storyblok field is already in rem)
          maxWidthValue = `${maxWidth}rem`;
        } else if (typeof maxWidth === "string") {
          // Handle string values
          const trimmedValue = maxWidth.trim();
          if (trimmedValue) {
            // If it's just a number as string, treat as rem
            if (/^\d+(\.\d+)?$/.test(trimmedValue)) {
              maxWidthValue = `${trimmedValue}rem`;
            } else {
              // If it already has units, use as-is
              maxWidthValue = trimmedValue;
            }
          }
        }

        if (maxWidthValue) {
          style.maxWidth = maxWidthValue;
          // Also ensure it doesn't exceed viewport width on smaller screens
          style.width = "100%";
        }
      }

      if (minWidth) {
        // Handle different minWidth formats
        if (typeof minWidth === "number") {
          style.minWidth = `${minWidth}px`;
        } else if (typeof minWidth === "string") {
          const trimmedValue = minWidth.trim();
          if (trimmedValue) {
            if (/^\d+$/.test(trimmedValue)) {
              style.minWidth = `${trimmedValue}px`;
            } else {
              style.minWidth = trimmedValue;
            }
          }
        }
      }

      return style;
    }, [maxWidth, minWidth]);

    // Memoize aspect ratio classes to prevent string concatenation on every render
    const aspectRatioClasses = useMemo(() => {
      const classes = [];
      if (aspectMobile) classes.push(`aspect-${aspectMobile}`);
      if (aspectTablet) classes.push(`md:aspect-${aspectTablet}`);
      if (aspectDesktop) classes.push(`lg:aspect-${aspectDesktop}`);
      return classes.join(" ");
    }, [aspectMobile, aspectTablet, aspectDesktop]);

    // Memoize image props to prevent object recreation
    const imageProps = useMemo(() => {
      if (!asset?.filename) {
        return null;
      }

      // Use custom width/height if provided, otherwise use asset dimensions
      const finalWidth = width || asset.width;
      const finalHeight = height || asset.height;

      return {
        src: asset.filename,
        alt: asset.alt || "",
        width: finalWidth,
        height: finalHeight,
        loading: "lazy" as const,
        ...rest,
      };
    }, [asset, width, height, rest]);

    // Memoize container class with responsive sizing
    const containerClass = useMemo(() => {
      const baseClasses = "mx-auto";

      // If custom width/height is provided, use minimal classes
      if (width || height) {
        return `${baseClasses} ${className || ""}`.trim();
      }

      if (maxWidth) {
        // When maxWidth is set in rem, ensure it's responsive across screen sizes
        // The inline style handles the max-width, classes handle responsive behavior
        const responsiveClasses = "w-full px-4 sm:px-0"; // Add padding on mobile, remove on larger screens
        return `${baseClasses} ${responsiveClasses} ${className || ""}`.trim();
      } else {
        // Default responsive max-width when no maxWidth is specified
        const responsiveClasses =
          "w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl px-4 sm:px-0";
        return `${baseClasses} ${responsiveClasses} ${className || ""}`.trim();
      }
    }, [className, maxWidth, width, height]);

    // Memoize image container class with responsive sizing
    const imageContainerClass = useMemo(() => {
      // If custom width or height is provided, don't use w-full
      const widthClass = width ? "" : "w-full";
      const baseClasses = `relative ${widthClass} max-w-full`;
      const aspectClasses = aspectRatioClasses || "";

      // If custom dimensions are provided, don't use aspect ratio classes
      if (width || height) {
        return `${baseClasses}`;
      }

      // If no aspect ratio is defined, use auto height
      if (!aspectClasses) {
        return `${baseClasses} h-auto`;
      }

      return `${baseClasses} ${aspectClasses}`;
    }, [aspectRatioClasses, width, height]);

    if (!imageProps) {
      return null;
    }

    return (
      <div
        style={containerStyle}
        className={containerClass}
        data-max-width={maxWidth}
        data-debug="blok-image-container">
        <div
          className={imageContainerClass}
          style={{
            width: width
              ? typeof width === "number"
                ? `${width}px`
                : width
              : undefined,
            height: height
              ? typeof height === "number"
                ? `${height}px`
                : height
              : undefined,
          }}>
          <Image
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            loading={imageProps.loading}
            className="w-full h-full object-cover"
            objectFit="cover"
          />
        </div>
      </div>
    );
  }
);

BlokImage.displayName = "BlokImage";

export default BlokImage;
