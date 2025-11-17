"use client";

import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ContainerProps, IconType, IconColor, IconSize } from "@/types/ui";
import Icon from "../Icon/Icon";

// Move static mapping objects outside component to prevent recreation
const MAX_WIDTH_STYLES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
} as const;

const PADDING_MAP = {
  none: "",
  xs: "p-1",
  sm: "p-2",
  default: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
} as const;

const PADDING_X_MAP = {
  none: "",
  xs: "px-1",
  sm: "px-2",
  default: "px-4",
  md: "px-6",
  lg: "px-8",
  xl: "px-10",
} as const;

const PADDING_Y_MAP = {
  none: "",
  xs: "py-1",
  sm: "py-2",
  default: "py-4",
  md: "py-6",
  lg: "py-8",
  xl: "py-10",
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

const JUSTIFY_STYLES = {
  start: "justify-start",
  center: "justify-center",
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
  start: "items-start",
  center: "items-center",
  end: "items-end",
  "flex-start": "items-start",
  "flex-end": "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
  default: "",
} as const;

const ALIGN_CONTENT_MAP = {
  start: "content-start",
  center: "content-center",
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
  xs: "gap-1",
  sm: "gap-2",
  default: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
  "2xl": "gap-12",
} as const;

const GAP_X_MAP = {
  none: "gap-x-0",
  xs: "gap-x-1",
  sm: "gap-x-2",
  default: "gap-x-4",
  md: "gap-x-6",
  lg: "gap-x-8",
  xl: "gap-x-10",
  "2xl": "gap-x-12",
} as const;

const GAP_Y_MAP = {
  none: "gap-y-0",
  xs: "gap-y-1",
  sm: "gap-y-2",
  default: "gap-y-4",
  md: "gap-y-6",
  lg: "gap-y-8",
  xl: "gap-y-10",
  "2xl": "gap-y-12",
} as const;

const TEXT_ALIGN_STYLES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
} as const;

const SPACING_MAP = {
  none: "",
  xs: "mr-1",
  sm: "mr-2",
  default: "mr-4",
  md: "mr-6",
  lg: "mr-8",
  xl: "mr-10",
} as const;

interface ExtendedContainerProps extends ContainerProps {
  // Icon props
  hasIcon?: boolean;
  iconVariant?: string;
  iconType?: string;
  iconColor?: string;
  iconSize?: string;
  iconSpacing?: string;
  // Background props
  backgroundColor?: string;
  backgroundImage?: { filename: string };
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundAttachment?: string;
  backgroundRepeat?: string;
  backgroundOpacity?: string | number;
  // Layout appearance - similar to Row component
  appearance?: "default" | "contained" | "full-width" | "full-bleed";
  // Flex & layout props
  display?: string; // "flex" | "grid" | "block"
  flexDirection?: string; // row | row-reverse | col | col-reverse
  justifyContent?: string;
  alignItems?: string; // start | center | end | stretch | baseline
  alignContent?: string;
  justifyItems?: string; // grid only
  flexWrap?: string; // wrap | nowrap | wrap-reverse
  gap?: string; // none | xs | sm | default | md | lg | xl | 2xl
  gapX?: string; // none | xs | sm | default | md | lg | xl | 2xl
  gapY?: string; // none | xs | sm | default | md | lg | xl | 2xl
  grow?: boolean;
  textAlign?: string;
  paddingX?: string;
  paddingTop?: string;
  paddingBottom?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ExtendedContainerProps> = memo(
  ({
    className,
    style = {},
    children,
    maxWidth = "xl",
    padding = "default",
    // Icon props
    hasIcon = false,
    iconVariant,
    iconType,
    iconColor,
    iconSize,
    iconSpacing = "default",
    // Background props
    backgroundColor,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundAttachment,
    backgroundRepeat,
    backgroundOpacity,
    // Layout appearance
    appearance = "default",
    // Flex & layout props
    display,
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    justifyItems,
    flexWrap,
    gap,
    gapX,
    gapY,
    grow = false,
    textAlign,
    paddingX,
    paddingTop,
    paddingBottom,
    ...rest
  }) => {
    // Memoize background styles calculation
    const backgroundStyles = useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = {};

      if (backgroundImage?.filename) {
        styles.backgroundImage = `url(${backgroundImage.filename})`;

        if (backgroundSize && backgroundSize !== "default") {
          styles.backgroundSize = backgroundSize;
        }

        if (backgroundPosition && backgroundPosition !== "default") {
          styles.backgroundPosition = backgroundPosition;
        }

        if (backgroundAttachment && backgroundAttachment !== "default") {
          styles.backgroundAttachment = backgroundAttachment;
        }

        if (backgroundRepeat && backgroundRepeat !== "default") {
          styles.backgroundRepeat = backgroundRepeat;
        }
      }

      return styles;
    }, [
      backgroundImage,
      backgroundSize,
      backgroundPosition,
      backgroundAttachment,
      backgroundRepeat,
    ]);

    // Memoize display class calculation
    const displayClass = useMemo(() => {
      if (display === "flex") return "flex";
      if (display === "grid") return "grid";
      return undefined; // default block
    }, [display]);

    // Memoize custom background checks
    const backgroundChecks = useMemo(() => {
      const hasOpacity =
        backgroundColor &&
        backgroundColor !== "default" &&
        backgroundOpacity &&
        backgroundOpacity !== "default";

      const isCustomBgColor =
        backgroundColor &&
        (backgroundColor.startsWith("#") ||
          backgroundColor.startsWith("rgb") ||
          backgroundColor.startsWith("linear-gradient") ||
          backgroundColor.startsWith("radial-gradient"));

      return { hasOpacity, isCustomBgColor };
    }, [backgroundColor, backgroundOpacity]);

    // Container width behavior based on appearance
    // - default/contained: centered fixed-width container with horizontal padding
    // - full-width: full width content with padding
    // - full-bleed: full width content without padding
    const isContained = appearance === "contained" || appearance === "default";
    const isFullWidth = appearance === "full-width";
    const isFullBleed = appearance === "full-bleed";

    const containerClasses = cn(
      displayClass,
      // If any flex options are provided, ensure flex is enabled
      (justifyContent ||
        alignItems ||
        alignContent ||
        flexWrap ||
        flexDirection ||
        gap ||
        gapX ||
        gapY) &&
        display !== "grid" &&
        "flex",
      flexDirection &&
        FLEX_DIRECTION_MAP[flexDirection as keyof typeof FLEX_DIRECTION_MAP],
      justifyContent &&
        JUSTIFY_STYLES[justifyContent as keyof typeof JUSTIFY_STYLES],
      alignItems && ALIGN_ITEMS_MAP[alignItems as keyof typeof ALIGN_ITEMS_MAP],
      alignContent &&
        ALIGN_CONTENT_MAP[alignContent as keyof typeof ALIGN_CONTENT_MAP],
      justifyItems &&
        JUSTIFY_ITEMS_MAP[justifyItems as keyof typeof JUSTIFY_ITEMS_MAP],
      flexWrap && FLEX_WRAP_MAP[flexWrap as keyof typeof FLEX_WRAP_MAP],
      // Gap works for both flex and grid
      gap && GAP_MAP[gap as keyof typeof GAP_MAP],
      gapX && GAP_X_MAP[gapX as keyof typeof GAP_X_MAP],
      gapY && GAP_Y_MAP[gapY as keyof typeof GAP_Y_MAP],
      grow && "flex-grow",
      textAlign &&
        TEXT_ALIGN_STYLES[textAlign as keyof typeof TEXT_ALIGN_STYLES],
      // Appearance-based width and padding
      {
        // Containered layouts
        "mx-auto": isContained,
        // Full width layouts
        "w-full": isFullWidth || isFullBleed,
      },
      // Apply maxWidth only for contained appearance
      isContained &&
        MAX_WIDTH_STYLES[maxWidth as keyof typeof MAX_WIDTH_STYLES],
      // Add responsive overflow control
      "overflow-hidden",
      // Apply padding based on appearance and overrides
      isContained &&
        !paddingX &&
        PADDING_MAP[padding as keyof typeof PADDING_MAP],
      isFullWidth &&
        !paddingX &&
        PADDING_MAP[padding as keyof typeof PADDING_MAP],
      // isFullBleed gets no default padding unless explicitly set
      paddingX && PADDING_X_MAP[paddingX as keyof typeof PADDING_X_MAP],
      paddingTop && PADDING_Y_MAP[paddingTop as keyof typeof PADDING_Y_MAP],
      paddingBottom &&
        PADDING_Y_MAP[paddingBottom as keyof typeof PADDING_Y_MAP],
      backgroundColor &&
        backgroundColor !== "default" &&
        !backgroundChecks.hasOpacity &&
        !backgroundChecks.isCustomBgColor &&
        `bg-${backgroundColor}`,
      className
    );

    const backgroundLayerClasses = cn(
      "absolute inset-0 -z-10",
      backgroundColor &&
        backgroundColor !== "default" &&
        !backgroundChecks.isCustomBgColor &&
        `bg-${backgroundColor}`
    );

    const opacityStyle = backgroundChecks.hasOpacity
      ? { opacity: parseInt(String(backgroundOpacity), 10) / 100 }
      : {};

    // Prepare inline styles for custom background color or gradient
    const customBgStyle: React.CSSProperties =
      backgroundChecks.isCustomBgColor && !backgroundChecks.hasOpacity
        ? backgroundColor?.startsWith("linear-gradient") ||
          backgroundColor?.startsWith("radial-gradient")
          ? { backgroundImage: backgroundColor }
          : { backgroundColor }
        : {};

    const iconElement =
      hasIcon && iconVariant ? (
        <Icon
          variant={iconVariant}
          type={iconType as IconType}
          color={iconColor as IconColor}
          size={iconSize as IconSize}
          className={SPACING_MAP[iconSpacing as keyof typeof SPACING_MAP]}
        />
      ) : null;

    // When hasIcon and no custom display is set, use default icon layout
    // Otherwise, render children directly to respect flex/grid settings
    const hasCustomLayout =
      display ||
      flexDirection ||
      justifyContent ||
      alignItems ||
      gap ||
      gapX ||
      gapY;

    const content =
      hasIcon && !hasCustomLayout ? (
        <div className="flex items-start">
          {iconElement}
          <div className="flex-1">{children}</div>
        </div>
      ) : hasIcon ? (
        <>
          {iconElement}
          {children}
        </>
      ) : (
        children
      );

    if (backgroundChecks.hasOpacity) {
      return (
        <div
          className={cn("relative", containerClasses)}
          style={{ ...style, ...backgroundStyles }}
          {...rest}>
          <div className={backgroundLayerClasses} style={opacityStyle} />
          <div className="relative">{content}</div>
        </div>
      );
    }

    return (
      <div
        className={containerClasses}
        style={{ ...style, ...backgroundStyles, ...customBgStyle }}
        {...rest}>
        {content}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
