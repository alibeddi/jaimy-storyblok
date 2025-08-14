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

  return <Image {...imageProps} />;
};

export default BlokImage;