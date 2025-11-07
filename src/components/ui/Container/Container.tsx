"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ContainerProps, IconType, IconColor, IconSize } from "@/types/ui";
import Icon from "../Icon/Icon";

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
  // Flex & layout props
  display?: string; // "flex" | "grid" | "block"
  flexDirection?: string; // row | row-reverse | col | col-reverse
  justifyContent?: string;
  alignItems?: string; // start | center | end | stretch | baseline
  alignContent?: string;
  justifyItems?: string; // grid only
  flexWrap?: string; // wrap | nowrap | wrap-reverse
  gap?: string; // none | xs | sm | default | md | lg | xl
  grow?: boolean;
  textAlign?: string;
  paddingX?: string;
  paddingTop?: string;
  paddingBottom?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ExtendedContainerProps> = ({
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
  // Flex & layout props
  display,
  flexDirection,
  justifyContent,
  alignItems,
  alignContent,
  justifyItems,
  flexWrap,
  gap,
  grow = false,
  textAlign,
  paddingX,
  paddingTop,
  paddingBottom,
  ...rest
}) => {
  // Background styles
  const backgroundStyles: React.CSSProperties = {};

  if (backgroundImage?.filename) {
    backgroundStyles.backgroundImage = `url(${backgroundImage.filename})`;

    if (backgroundSize && backgroundSize !== "default") {
      backgroundStyles.backgroundSize = backgroundSize;
    }

    if (backgroundPosition && backgroundPosition !== "default") {
      backgroundStyles.backgroundPosition = backgroundPosition;
    }

    if (backgroundAttachment && backgroundAttachment !== "default") {
      backgroundStyles.backgroundAttachment = backgroundAttachment;
    }

    if (backgroundRepeat && backgroundRepeat !== "default") {
      backgroundStyles.backgroundRepeat = backgroundRepeat;
    }

  }

  // Max width styles
  const maxWidthStyles: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  // Check if maxWidth is a custom value (percentage or px)
  const isCustomWidth = maxWidth?.includes("%") || maxWidth?.includes("px");
  const maxWidthClass = isCustomWidth ? "" : maxWidthStyles[maxWidth];
  const maxWidthStyle = isCustomWidth ? { maxWidth } : {};

  // Padding styles
  const paddingMap = {
    none: "",
    xs: "p-1",
    sm: "p-2",
    default: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const paddingXMap = {
    none: "",
    xs: "px-1",
    sm: "px-2",
    default: "px-4",
    md: "px-6",
    lg: "px-8",
    xl: "px-10",
  };

  const paddingYMap = {
    none: "",
    xs: "py-1",
    sm: "py-2",
    default: "py-4",
    md: "py-6",
    lg: "py-8",
    xl: "py-10",
  };

  // Display class
  const displayClass = (() => {
    if (display === "flex") return "flex";
    if (display === "grid") return "grid";
    return undefined; // default block
  })();

  // Flex direction mapping
  const flexDirectionMap: Record<string, string> = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    col: "flex-col",
    column: "flex-col",
    "col-reverse": "flex-col-reverse",
    "column-reverse": "flex-col-reverse",
    default: "",
  };

  // Justify content mapping
  const justifyStyles: Record<string, string> = {
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
  };

  // Align items mapping
  const alignItemsMap: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    "flex-start": "items-start",
    "flex-end": "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
    default: "",
  };

  // Align content mapping
  const alignStyles: Record<string, string> = {
    start: "content-start",
    center: "content-center",
    end: "content-end",
    between: "content-between",
    around: "content-around",
    evenly: "content-evenly",
    "space-between": "content-between",
    "space-around": "content-around",
    default: "",
  };

  // Justify items mapping (for grid)
  const justifyItemsMap: Record<string, string> = {
    start: "justify-items-start",
    end: "justify-items-end",
    center: "justify-items-center",
    stretch: "justify-items-stretch",
    default: "",
  };

  // Flex wrap mapping
  const flexWrapMap: Record<string, string> = {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap",
    "wrap-reverse": "flex-wrap-reverse",
    default: "",
  };

  // Gap mapping
  const gapMap: Record<string, string> = {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-4",
    default: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  };

  const textAlignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  // Icon spacing styles
  const spacingMap = {
    none: "",
    xs: "mr-1",
    sm: "mr-2",
    default: "mr-4",
    md: "mr-6",
    lg: "mr-8",
    xl: "mr-10",
  };

  const hasOpacity =
    backgroundColor &&
    backgroundColor !== "default" &&
    backgroundOpacity &&
    backgroundOpacity !== "default";

  // Check if backgroundColor is a custom value (hex/rgb/gradient)
  const isCustomBgColor =
    backgroundColor &&
    (backgroundColor.startsWith("#") ||
      backgroundColor.startsWith("rgb") ||
      backgroundColor.startsWith("linear-gradient") ||
      backgroundColor.startsWith("radial-gradient"));

  const containerClasses = cn(
    "mx-auto",
    maxWidthClass,
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
    justifyContent &&
    justifyStyles[justifyContent as keyof typeof justifyStyles],
    alignItems && alignItemsMap[alignItems as keyof typeof alignItemsMap],
    alignContent && alignStyles[alignContent as keyof typeof alignStyles],
    justifyItems &&
    justifyItemsMap[justifyItems as keyof typeof justifyItemsMap],
    flexWrap && flexWrapMap[flexWrap as keyof typeof flexWrapMap],
    gap && gapMap[gap as keyof typeof gapMap],
    grow && "flex-grow",
    textAlign && textAlignStyles[textAlign as keyof typeof textAlignStyles],
    paddingX
      ? paddingXMap[paddingX as keyof typeof paddingXMap]
      : paddingMap[padding],
    paddingTop && paddingYMap[paddingTop as keyof typeof paddingYMap],
    paddingBottom && paddingYMap[paddingBottom as keyof typeof paddingYMap],
    backgroundColor &&
    backgroundColor !== "default" &&
    !hasOpacity &&
    !isCustomBgColor &&
    `bg-${backgroundColor}`,
    className
  );

  const backgroundLayerClasses = cn(
    "absolute inset-0 -z-10",
    backgroundColor &&
    backgroundColor !== "default" &&
    !isCustomBgColor &&
    `bg-${backgroundColor}`
  );

  const opacityStyle = hasOpacity
    ? { opacity: parseInt(String(backgroundOpacity), 10) / 100 }
    : {};

  // Prepare inline styles for custom background color or gradient
  const customBgStyle: React.CSSProperties =
    isCustomBgColor && !hasOpacity
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
        className={spacingMap[iconSpacing as keyof typeof spacingMap]}
      />
    ) : null;

  // When hasIcon and no custom display is set, use default icon layout
  // Otherwise, render children directly to respect flex/grid settings
  const hasCustomLayout = display || flexDirection || justifyContent || alignItems || gap;

  const content = hasIcon && !hasCustomLayout ? (
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

  if (hasOpacity) {
    return (
      <div
        className={cn("relative", containerClasses)}
        style={{ ...style, ...backgroundStyles, ...maxWidthStyle }}
        {...rest}
      >
        <div className={backgroundLayerClasses} style={opacityStyle} />
        <div className="relative">{content}</div>
      </div>
    );
  }

  return (
    <div
      className={containerClasses}
      style={{ ...style, ...backgroundStyles, ...customBgStyle, ...maxWidthStyle }}
      {...rest}
    >
      {content}
    </div>
  );
};

export default Container;
