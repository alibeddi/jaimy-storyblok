"use client";

import React from "react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { BlokImageProps } from "@/types/ui";

const BlokImage: React.FC<BlokImageProps> = ({
  asset,
  maxWidth,
  minWidth,
  className,
  priority = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  width: _width,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  height: _height,
  ...rest
}) => {
  if (!asset?.filename) {
    return null;
  }

  // Apply maxWidth and minWidth as inline styles
  const containerStyle: React.CSSProperties = {};

  if (maxWidth) {
    containerStyle.maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  }

  if (minWidth) {
    containerStyle.minWidth = typeof minWidth === "number" ? `${minWidth}px` : minWidth;
  }

  // Parse width and height to ensure they're numbers
  const width: number = asset.width
    ? (typeof asset.width === 'number' ? asset.width : parseInt(String(asset.width), 10))
    : 1200;

  const height: number = asset.height
    ? (typeof asset.height === 'number' ? asset.height : parseInt(String(asset.height), 10))
    : 800;

  return (
    <div style={containerStyle} className="w-full">
      <OptimizedImage
        src={asset.filename}
        alt={asset.alt || ""}
        width={width}
        height={height}
        priority={priority}
        className={`w-full h-auto ${className || ''}`}
        {...rest}
      />
    </div>
  );
};

export default BlokImage;
