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
    preset, // Keeping for potential future use
    maxWidth,
    minWidth,
    className,
    ...rest
  }) => {
    // Memoize container style to prevent recalculation
    const containerStyle = useMemo((): React.CSSProperties => {
      const style: React.CSSProperties = {};

      if (maxWidth) {
        style.maxWidth =
          typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
      }

      if (minWidth) {
        style.minWidth =
          typeof minWidth === "number" ? `${minWidth}px` : minWidth;
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
      if (!asset?.filename) return null;
      return {
        src: asset.filename,
        alt: asset.alt || "",
        width: asset.width,
        height: asset.height,
        loading: "lazy" as const,
        ...rest,
      };
    }, [asset?.filename, asset?.alt, asset?.width, asset?.height, rest]);

    // Memoize container class to prevent string concatenation
    const containerClass = useMemo(
      () => `mx-auto ${className || ""}`,
      [className]
    );

    // Memoize image container class
    const imageContainerClass = useMemo(
      () => `relative w-full ${aspectRatioClasses || "h-auto"}`,
      [aspectRatioClasses]
    );

    if (!imageProps) {
      return null;
    }

    return (
      <div style={containerStyle} className={containerClass}>
        <div className={imageContainerClass}>
          <Image
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            loading={imageProps.loading}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
);

BlokImage.displayName = "BlokImage";

export default BlokImage;
