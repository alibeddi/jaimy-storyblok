"use client";

import React from "react";
import Image from "../Image/Image";
import { BlokImageProps } from "@/types/ui";

const BlokImage: React.FC<BlokImageProps> = ({
  asset,
  aspectDesktop,
  aspectTablet,
  aspectMobile,
  preset,
  maxWidth,
  minWidth,
  className,
  ...rest
}) => {
  if (!asset?.filename) {
    return null;
  }

  // Convert asset to standard image props
  const imageProps = {
    src: asset.filename,
    alt: asset.alt || "",
    width: asset.width,
    height: asset.height,
    className,
    ...rest
  };

  // Apply maxWidth and minWidth as inline styles
  const containerStyle: React.CSSProperties = {};
  
  if (maxWidth) {
    containerStyle.maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  }
  
  if (minWidth) {
    containerStyle.minWidth = typeof minWidth === "number" ? `${minWidth}px` : minWidth;
  }

  return (
    <div style={containerStyle} className="w-full">
      <Image {...imageProps} className="w-full h-auto" />
    </div>
  );
};

export default BlokImage;