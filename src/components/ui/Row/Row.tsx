"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { RowProps } from "@/types/ui";

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
  gap = "default",
  align = "stretch",
  justify = "start",
  wrap = true,
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

  const appearanceMap = {
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
    spacingMap[spacing],
    appearanceMap[appearance],
    textAlignMap[textAlign],
    paddingYMap[paddingY],
    backgroundColor && backgroundColor !== "default" && `bg-${backgroundColor}`,
    className
  );

  const contentClasses = cn("relative container mx-auto px-4 z-10", {
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
