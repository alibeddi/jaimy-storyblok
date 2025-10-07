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
  // Advanced props
  grow?: boolean;
  justifyContent?: string;
  alignContent?: string;
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
  // Advanced props
  grow = false,
  justifyContent,
  alignContent,
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
  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

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

  // Justify and alignment styles
  const justifyStyles = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const alignStyles = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
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

  const containerClasses = cn(
    "mx-auto",
    maxWidthStyles[maxWidth],
    grow && "flex-grow",
    justifyContent &&
      justifyStyles[justifyContent as keyof typeof justifyStyles],
    alignContent && alignStyles[alignContent as keyof typeof alignStyles],
    textAlign && textAlignStyles[textAlign as keyof typeof textAlignStyles],
    paddingX
      ? paddingXMap[paddingX as keyof typeof paddingXMap]
      : paddingMap[padding],
    paddingTop && paddingYMap[paddingTop as keyof typeof paddingYMap],
    paddingBottom && paddingYMap[paddingBottom as keyof typeof paddingYMap],
    backgroundColor &&
      backgroundColor !== "default" &&
      !hasOpacity &&
      `bg-${backgroundColor}`,
    className
  );

  const backgroundLayerClasses = cn(
    "absolute inset-0 -z-10",
    backgroundColor && backgroundColor !== "default" && `bg-${backgroundColor}`
  );

  const opacityStyle = hasOpacity
    ? { opacity: parseInt(String(backgroundOpacity), 10) / 100 }
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

  const content = hasIcon ? (
    <div className="flex items-start">
      {iconElement}
      <div className="flex-1">{children}</div>
    </div>
  ) : (
    children
  );

  if (hasOpacity) {
    return (
      <div
        className={cn("relative", containerClasses)}
        style={{ ...style, ...backgroundStyles }}
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
      style={{ ...style, ...backgroundStyles }}
      {...rest}
    >
      {content}
    </div>
  );
};

export default Container;
