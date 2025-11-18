"use client";

import React, { useMemo, memo } from "react";
import { RowProps } from "@/types/ui";
import { cn } from "@/lib/utils";
import CurvedBackground from "../CurvedBackground";

// Move static mapping objects outside component to prevent recreation
const SPACING_MAP = {
  none: "",
  xs: "py-2",
  sm: "py-4",
  default: "py-8",
  md: "py-8",
  lg: "py-12",
  xl: "py-16",
} as const;

const APPEARANCE_TEXT_MAP = {
  default: "",
  primary: "text-white",
  secondary: "",
  dark: "text-white",
} as const;

const TEXT_ALIGN_MAP = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  default: "",
} as const;

const PADDING_X_MAP = {
  none: "px-0",
  xs: "px-2",
  sm: "px-4",
  default: "",
  md: "px-8",
  lg: "px-12",
  xl: "px-16",
} as const;

const PADDING_Y_MAP = {
  none: "py-0",
  xs: "py-2",
  sm: "py-4",
  default: "",
  md: "py-8",
  lg: "py-12",
  xl: "py-16",
} as const;

const MAX_WIDTH_MAP = {
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
} as const;

const FLEX_DIRECTION_MAP = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  column: "flex-col",
  "col-reverse": "flex-col-reverse",
  "column-reverse": "flex-col-reverse",
  default: "",
} as const;

const JUSTIFY_MAP = {
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
} as const;

const ALIGN_ITEMS_MAP = {
  center: "items-center",
  start: "items-start",
  end: "items-end",
  "flex-start": "items-start",
  "flex-end": "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
  default: "",
} as const;

const ALIGN_CONTENT_MAP = {
  center: "content-center",
  start: "content-start",
  end: "content-end",
  between: "content-between",
  around: "content-around",
  evenly: "content-evenly",
  "space-between": "content-between",
  "space-around": "content-around",
  default: "",
} as const;

const JUSTIFY_ITEMS_MAP = {
  start: "justify-items-start",
  end: "justify-items-end",
  center: "justify-items-center",
  stretch: "justify-items-stretch",
  default: "",
} as const;

const FLEX_WRAP_MAP = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
  default: "",
} as const;

const GAP_MAP = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-4",
  default: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
} as const;

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
  backgroundShape?: string;
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

const Row: React.FC<ExtendedRowProps> = memo(
  ({
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
    backgroundShape,
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
    // Memoize display class calculation
    const displayClass = useMemo(() => {
      if (display === "flex") return "flex";
      if (display === "grid") return "grid";
      return undefined; // default block
    }, [display]);

    // Memoize background color check
    const isCustomBgColor = useMemo(
      () =>
        backgroundColor &&
        (backgroundColor.startsWith("#") ||
          backgroundColor.startsWith("rgb") ||
          backgroundColor.startsWith("linear-gradient") ||
          backgroundColor.startsWith("radial-gradient")),
      [backgroundColor]
    );

    const rootClasses = cn(
      "w-full relative overflow-hidden",
      SPACING_MAP[spacing as keyof typeof SPACING_MAP],
      APPEARANCE_TEXT_MAP[appearance as keyof typeof APPEARANCE_TEXT_MAP],
      TEXT_ALIGN_MAP[textAlign as keyof typeof TEXT_ALIGN_MAP],
      PADDING_X_MAP[paddingX as keyof typeof PADDING_X_MAP],
      PADDING_Y_MAP[paddingY as keyof typeof PADDING_Y_MAP],
      MAX_WIDTH_MAP[maxWidth as keyof typeof MAX_WIDTH_MAP],
      // Only apply background color to row if not using curved background
      // Footer background allows background color on the section
      backgroundShape !== "curved" &&
        backgroundColor &&
        backgroundColor !== "default" &&
        !isCustomBgColor &&
        `bg-${backgroundColor}`,
      className
    ); // Content width behavior based on appearance
    // - default/contained: centered fixed-width container with horizontal padding
    // - full-width: full width content with padding
    // - full-bleed: full width content without padding
    const isContained = appearance === "contained" || appearance === "default";
    const isFullWidth = appearance === "full-width";
    const isFullBleed = appearance === "full-bleed";

    const contentClasses = cn(
      "relative z-10 pt-20",
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
        FLEX_DIRECTION_MAP[flexDirection as keyof typeof FLEX_DIRECTION_MAP],
      justifyContent && JUSTIFY_MAP[justifyContent as keyof typeof JUSTIFY_MAP],
      alignItems && ALIGN_ITEMS_MAP[alignItems as keyof typeof ALIGN_ITEMS_MAP],
      alignContent &&
        ALIGN_CONTENT_MAP[alignContent as keyof typeof ALIGN_CONTENT_MAP],
      justifyItems &&
        JUSTIFY_ITEMS_MAP[justifyItems as keyof typeof JUSTIFY_ITEMS_MAP],
      flexWrap && FLEX_WRAP_MAP[flexWrap as keyof typeof FLEX_WRAP_MAP],
      gap && GAP_MAP[gap as keyof typeof GAP_MAP],
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
      const parsedOpacity = backgroundOpacity
        ? parseInt(backgroundOpacity, 10)
        : NaN;
      imageStyle.opacity = !isNaN(parsedOpacity) ? parsedOpacity / 100 : 1;
    }

    // Prepare inline styles for custom background color or gradient
    // Only apply custom background styles if not using curved background
    // Footer background allows background color on the section
    const customBgStyle: React.CSSProperties =
      isCustomBgColor && backgroundShape !== "curved"
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

        {/* Curved Background Shape */}
        {backgroundShape === "curved" && (
          <CurvedBackground
            fillColor={
              backgroundColor && backgroundColor !== "default"
                ? backgroundColor
                : "black"
            }
            backgroundImage={backgroundImage?.filename}
            width="80%"
            height="90%"
            className="absolute inset-0 hidden md:block"
            useTailwindColor={!isCustomBgColor}
            shape="curved"
            opacity={(() => {
              if (!backgroundOpacity) return 1;
              const parsedOpacity = parseInt(backgroundOpacity, 10);
              return !isNaN(parsedOpacity) ? parsedOpacity / 100 : 1;
            })()}
          />
        )}

        {/* Footer Background Shape - White curve at top */}
        {backgroundShape === "footer" && (
          <CurvedBackground
            fillColor="white"
            width="100%"
            height="44px"
            className="z-10"
            useTailwindColor={false}
            shape="footer"
            opacity={1}
          />
        )}

        <div className={contentClasses}>{children}</div>
      </section>
    );
  }
);

Row.displayName = "Row";

export default Row;
