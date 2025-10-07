"use client";

import { ImageProps } from "@/types/ui";
import NextImage from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

const Image: React.FC<ImageProps> = ({
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
  const imageClasses = cn(
    "transition-opacity duration-300",
    {
      "object-contain": objectFit === "contain",
      "object-cover": objectFit === "cover",
      "object-fill": objectFit === "fill",
      "object-none": objectFit === "none",
      "object-scale-down": objectFit === "scale-down",
    },
    className
  );

  // Handle responsive images
  const isResponsive = !width || !height;

  if (isResponsive) {
    if (!src) return null;
    return (
      <div className={cn("relative w-full h-full", className)}>
        <NextImage
          src={src!}
          alt={alt}
          fill
          className={imageClasses}
          style={{
            objectFit: objectFit,
          }}
          loading={loading}
          priority={priority}
          placeholder={placeholder ? "blur" : undefined}
          blurDataURL={placeholder}
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
      width={typeof width === "string" ? parseInt(width) : width}
      height={typeof height === "string" ? parseInt(height) : height}
      className={imageClasses}
      loading={loading}
      priority={priority}
      placeholder={placeholder ? "blur" : undefined}
      blurDataURL={placeholder}
      style={{
        objectFit: objectFit,
      }}
      {...rest}
    />
  );
};

export default Image;
