"use client";

import React, { memo, useMemo } from "react";
import { RichTextProps } from "@/types/ui";
import { cn } from "@/lib/utils";
import { render } from "storyblok-rich-text-react-renderer";

// Move static mapping objects outside component to prevent recreation
const FONT_WEIGHT_STYLES = {
  normal: "prose-headings:font-normal prose-p:font-normal",
  bold: "prose-headings:font-bold prose-p:font-bold",
  light: "prose-headings:font-light prose-p:font-light",
  medium: "prose-headings:font-medium prose-p:font-medium",
  semibold: "prose-headings:font-semibold prose-p:font-semibold",
  "300": "prose-headings:font-light prose-p:font-light",
  "400": "prose-headings:font-normal prose-p:font-normal",
  "500": "prose-headings:font-medium prose-p:font-medium",
  "600": "prose-headings:font-semibold prose-p:font-semibold",
  "700": "prose-headings:font-bold prose-p:font-bold",
} as const;

const SIZE_STYLES = {
  xs: "prose-sm",
  sm: "prose-sm",
  default: "prose-base",
  md: "prose-base",
  lg: "prose-lg",
  xl: "prose-xl",
} as const;

const TEXT_ALIGN_STYLES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
} as const;

const MARGIN_BOTTOM_STYLES = {
  none: "mb-0",
  xs: "mb-2",
  sm: "mb-4",
  default: "mb-6",
  md: "mb-8",
  lg: "mb-12",
  xl: "mb-16",
} as const;

const RichText: React.FC<RichTextProps> = memo(
  ({
    className,
    content,
    type,
    maxWidth = "100%",
    size,
    color,
    textAlign,
    marginBottom,
    fontWeight,
    ...rest
  }) => {
    // Memoize custom color check
    const isCustomColor = useMemo(
      () => color && (color.startsWith("#") || color.startsWith("rgb")),
      [color]
    );

    if (!content) return null;

    const baseStyles = cn(
      "prose prose-gray max-w-none",
      size && SIZE_STYLES[size as keyof typeof SIZE_STYLES],
      textAlign &&
        TEXT_ALIGN_STYLES[textAlign as keyof typeof TEXT_ALIGN_STYLES],
      marginBottom &&
        MARGIN_BOTTOM_STYLES[marginBottom as keyof typeof MARGIN_BOTTOM_STYLES],
      // Use custom font weight if provided, otherwise default to semibold
      fontWeight
        ? FONT_WEIGHT_STYLES[fontWeight as keyof typeof FONT_WEIGHT_STYLES]
        : "prose-headings:font-semibold prose-p:font-normal",
      "prose-headings:text-foreground",
      "prose-p:text-foreground prose-p:leading-relaxed",
      "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
      "prose-strong:text-foreground prose-strong:font-semibold",
      "prose-ul:text-foreground prose-ol:text-foreground",
      "prose-li:text-foreground",
      "prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary",
      "prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
      "prose-pre:bg-muted prose-pre:border",
      // Apply text color if not custom
      color && !isCustomColor && `text-${color}`,
      className
    );

    // Prepare inline styles for custom color
    const customStyle: React.CSSProperties = isCustomColor
      ? { color, maxWidth }
      : { maxWidth };

    return (
      <div
        className={baseStyles}
        style={customStyle}
        data-type={type}
        {...rest}>
        {render(content)}
      </div>
    );
  }
);

RichText.displayName = "RichText";

export default RichText;
