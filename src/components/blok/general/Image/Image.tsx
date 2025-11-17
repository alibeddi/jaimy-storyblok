import BlokImage from "../../../ui/BlokImage"; // Changed from '../ui/Image' to '../ui/BlokImage'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SpacingVariant } from "@/types/ui";
import cn from "classnames";
import { storyblokEditable } from "@storyblok/react";

interface ImageAsset {
  filename: string;
  alt?: string;
  width?: number;
  height?: number;
  focus?: string;
}

interface ImageBlok {
  component: string;
  _uid: string;
  img?: ImageAsset;
  aspect_ratio_desktop?: string;
  aspect_ratio_tablet?: string;
  aspect_ratio_mobile?: string;
  width?: string | number;
  height?: string | number;
  max_width?: string | number;
  min_width?: string | number;
  margin_bottom?: SpacingVariant;
  preset?: string;
  [key: string]: any;
}

interface ImageProps {
  blok: ImageBlok;
}

const Image: React.FC<ImageProps> = ({ blok }) => {
  const marginBottomClasses: Record<SpacingVariant, string> = {
    none: "mb-0",
    xs: "mb-1",
    sm: "mb-4",
    default: "mb-6",
    md: "mb-8",
    lg: "mb-12",
    xl: "mb-16",
  };

  const className = cn({
    [marginBottomClasses[blok?.margin_bottom || "default"]]: true,
  });

  // Use custom width/height if provided, otherwise fallback to image asset dimensions
  const imageConfig = {
    width: blok?.width || blok?.img?.width,
    height: blok?.height || blok?.img?.height,
    priority: false,
    layout: "responsive",
  };
  console.log("📷 Storyblok Image DEBUG:", {
    img: blok?.img,
    customWidth: blok?.width,
    customHeight: blok?.height,
    assetWidth: blok?.img?.width,
    assetHeight: blok?.img?.height,
    finalWidth: imageConfig.width,
    finalHeight: imageConfig.height,
    max_width: blok?.max_width,
    min_width: blok?.min_width,
  });
  return (
    <div className={className}>
      <BlokImage
        asset={blok?.img}
        aspectDesktop={blok?.aspect_ratio_desktop}
        aspectTablet={blok?.aspect_ratio_tablet}
        aspectMobile={blok?.aspect_ratio_mobile}
        width={imageConfig.width}
        height={imageConfig.height}
        maxWidth={blok?.max_width}
        minWidth={blok?.min_width}
        preset={blok?.preset}
        priority={imageConfig.priority}
        layout={imageConfig.layout}
        {...storyblokEditable(blok)}
      />
    </div>
  );
};

export default Image;
