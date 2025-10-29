"use client";

import React from "react";
import { RowProps } from "@/types/ui";
import { cn } from "@/lib/utils";

interface ExtendedRowProps extends Omit<RowProps, "gap"> {
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
  paddingX?: string;
  paddingY?: string;
  maxWidth?: string;
  // Flex and layout controls
  display?: string; // e.g., "block" | "flex" | "grid"
  flexDirection?: string; // e.g., "row" | "row-reverse" | "col" | "col-reverse"
  justifyContent?: string; // e.g., "start" | "center" | "end" | "between" | "around" | "evenly"
  alignItems?: string; // e.g., "start" | "center" | "end" | "stretch" | "baseline"
  alignContent?: string; // e.g., "start" | "center" | "end" | "between" | "around" | "evenly"
  justifyItems?: string; // grid only, harmless for flex
  flexWrap?: string; // e.g., "wrap" | "nowrap" | "wrap-reverse"
  gap?: string; // overrides RowProps.gap to support more values
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
  paddingX = "default",
  paddingY = "default",
  maxWidth = "default",
  // Layout & flex controls
  display,
  flexDirection,
  justifyContent,
  alignItems,
  alignContent,
  justifyItems,
  flexWrap,
  gap,
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

  const paddingXMap = {
    none: "px-0",
    xs: "px-2",
    sm: "px-4",
    default: "",
    md: "px-8",
    lg: "px-12",
    xl: "px-16",
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

  const maxWidthMap = {
    none: "",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    default: "",
  };

  const displayClass = (() => {
    if (display === "flex") return "flex";
    if (display === "grid") return "grid";
    return undefined; // default block
  })();

  const flexDirectionMap: Record<string, string> = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    col: "flex-col",
    column: "flex-col",
    "col-reverse": "flex-col-reverse",
    "column-reverse": "flex-col-reverse",
    default: "",
  };

  const justifyMap: Record<string, string> = {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end",
    "flex-start": "justify-start",
    "flex-end": "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
    "space-between": "justify-between",
    "space-around": "justify-around",
    default: "",
  };

  const alignItemsMap: Record<string, string> = {
    center: "items-center",
    start: "items-start",
    end: "items-end",
    "flex-start": "items-start",
    "flex-end": "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
    default: "",
  };

  const alignContentMap: Record<string, string> = {
    center: "content-center",
    start: "content-start",
    end: "content-end",
    between: "content-between",
    around: "content-around",
    evenly: "content-evenly",
    "space-between": "content-between",
    "space-around": "content-around",
    default: "",
  };

  const justifyItemsMap: Record<string, string> = {
    start: "justify-items-start",
    end: "justify-items-end",
    center: "justify-items-center",
    stretch: "justify-items-stretch",
    default: "",
  };

  const flexWrapMap: Record<string, string> = {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap",
    "wrap-reverse": "flex-wrap-reverse",
    default: "",
  };

  const gapMap: Record<string, string> = {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-4",
    default: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  };

  // Check if backgroundColor is a hex/rgb/gradient value
  const isCustomBgColor =
    backgroundColor &&
    (backgroundColor.startsWith("#") ||
      backgroundColor.startsWith("rgb") ||
      backgroundColor.startsWith("linear-gradient") ||
      backgroundColor.startsWith("radial-gradient"));

  const rootClasses = cn(
    "w-full relative overflow-hidden",
    spacingMap[spacing as keyof typeof spacingMap],
    appearanceTextMap[appearance as keyof typeof appearanceTextMap],
    textAlignMap[textAlign as keyof typeof textAlignMap],
    paddingXMap[paddingX as keyof typeof paddingXMap],
    paddingYMap[paddingY as keyof typeof paddingYMap],
    maxWidthMap[maxWidth as keyof typeof maxWidthMap],
    backgroundColor &&
    backgroundColor !== "default" &&
    !isCustomBgColor &&
    `bg-${backgroundColor}`,
    className
  );

  // Content width behavior based on appearance
  // - default/contained: centered fixed-width container with horizontal padding
  // - full-width: full width content with padding
  // - full-bleed: full width content without padding
  const isContained = appearance === "contained" || appearance === "default";
  const isFullWidth = appearance === "full-width";
  const isFullBleed = appearance === "full-bleed";

  const contentClasses = cn(
    "relative z-10",
    displayClass,
    // If any flex options are provided, ensure flex is enabled
    (justifyContent ||
      alignItems ||
      alignContent ||
      flexWrap ||
      flexDirection ||
      gap) &&
    "flex",
    flexDirection &&
    flexDirectionMap[flexDirection as keyof typeof flexDirectionMap],
    justifyContent && justifyMap[justifyContent as keyof typeof justifyMap],
    alignItems && alignItemsMap[alignItems as keyof typeof alignItemsMap],
    alignContent &&
    alignContentMap[alignContent as keyof typeof alignContentMap],
    justifyItems &&
    justifyItemsMap[justifyItems as keyof typeof justifyItemsMap],
    flexWrap && flexWrapMap[flexWrap as keyof typeof flexWrapMap],
    gap && gapMap[gap as keyof typeof gapMap],
    {
      // Containered layouts
      "container mx-auto px-4": isContained,
      // Full width with padding
      "w-full px-4": isFullWidth,
      // Full bleed (edge to edge)
      "w-full": isFullBleed,
      // Optional narrower max width within any mode
      "max-w-4xl": narrow,
    }
  );

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
    const parsedOpacity = backgroundOpacity ? parseInt(backgroundOpacity, 10) : NaN;
    imageStyle.opacity = !isNaN(parsedOpacity) ? parsedOpacity / 100 : 1;
  }

  // Prepare inline styles for custom background color or gradient
  const customBgStyle: React.CSSProperties = isCustomBgColor
    ? backgroundColor?.startsWith("linear-gradient") ||
      backgroundColor?.startsWith("radial-gradient")
      ? { backgroundImage: backgroundColor }
      : { backgroundColor }
    : {};

  return (
    <section className={rootClasses} style={customBgStyle} {...rest}>
      {backgroundImage?.filename && (
        <div className="absolute inset-0 z-0" style={imageStyle}></div>
      )}

      <div className={contentClasses}>{children}</div>
    </section>
  );
};

export default Row;
