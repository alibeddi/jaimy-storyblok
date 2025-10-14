"use client";

import React from "react";
import { RowProps } from "@/types/ui";
import { cn } from "@/lib/utils";

interface ExtendedRowProps extends RowProps {
  spacing?: string;
  narrow?: boolean;
  appearance?: string;
  backgroundColor?: string;
  backgroundImage?: {
    filename: string;
    alt?: string;
  };
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundAttachment?: string;
  backgroundRepeat?: string;
  backgroundOpacity?: string;
  textAlign?: string;
  paddingY?: string;
}

const Row: React.FC<ExtendedRowProps> = ({
  children,
  className,
  spacing = "default",
  narrow = false,
  appearance = "default",
  backgroundColor,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundAttachment,
  backgroundRepeat,
  backgroundOpacity,
  textAlign = "default",
  paddingY = "default",
  ...rest
}) => {
  const spacingMap = {
    none: "",
    xs: "py-2",
    sm: "py-4",
    default: "py-8",
    md: "py-8",
    lg: "py-12",
    xl: "py-16",
  };

  const appearanceTextMap = {
    default: "",
    primary: "text-white",
    secondary: "",
    dark: "text-white",
  };

  const textAlignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    default: "",
  };

  const paddingYMap = {
    none: "py-0",
    xs: "py-2",
    sm: "py-4",
    default: "",
    md: "py-8",
    lg: "py-12",
    xl: "py-16",
  };

  const rootClasses = cn(
    "w-full relative overflow-hidden",
    spacingMap[spacing as keyof typeof spacingMap],
    appearanceTextMap[appearance as keyof typeof appearanceTextMap],
    textAlignMap[textAlign as keyof typeof textAlignMap],
    paddingYMap[paddingY as keyof typeof paddingYMap],
    backgroundColor && backgroundColor !== "default" && `bg-${backgroundColor}`,
    className
  );

  // Content width behavior based on appearance
  // - default/contained: centered fixed-width container with horizontal padding
  // - full-width: full width content with padding
  // - full-bleed: full width content without padding
  const isContained = appearance === "contained" || appearance === "default";
  const isFullWidth = appearance === "full-width";
  const isFullBleed = appearance === "full-bleed";

  const contentClasses = cn("relative z-10", {
    // Containered layouts
    "container mx-auto px-4": isContained,
    // Full width with padding
    "w-full px-4": isFullWidth,
    // Full bleed (edge to edge)
    "w-full": isFullBleed,
    // Optional narrower max width within any mode
    "max-w-4xl": narrow,
  });

  const imageStyle: React.CSSProperties = {};
  if (backgroundImage?.filename) {
    imageStyle.backgroundImage = `url(${backgroundImage.filename})`;
    imageStyle.backgroundSize =
      backgroundSize !== "default" ? backgroundSize : "cover";
    imageStyle.backgroundPosition =
      backgroundPosition !== "default" ? backgroundPosition : "center";
    imageStyle.backgroundRepeat =
      backgroundRepeat !== "default" ? backgroundRepeat : "no-repeat";
    imageStyle.backgroundAttachment =
      backgroundAttachment !== "default" ? backgroundAttachment : "scroll";
    imageStyle.opacity = backgroundOpacity
      ? parseInt(backgroundOpacity, 10) / 100
      : 1;
  }

  return (
    <section className={rootClasses} {...rest}>
      {backgroundImage?.filename && (
        <div className="absolute inset-0 z-0" style={imageStyle}></div>
      )}

      <div className={contentClasses}>{children}</div>
    </section>
  );
};

export default Row;
