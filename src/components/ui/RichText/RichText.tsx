"use client";

import React from "react";
import { RichTextProps } from "@/types/ui";
import { cn } from "@/lib/utils";
import { render } from "storyblok-rich-text-react-renderer";

const RichText: React.FC<RichTextProps> = ({
  className,
  content,
  maxWidth = "100%",
  size,
  color,
  textAlign,
  marginBottom,
  fontWeight,
  ...rest
}) => {
  if (!content) return null;

  // Font weight styles for headings and paragraphs inside prose
  const fontWeightStyles = {
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

  // Size mapping
  const sizeStyles = {
    xs: "prose-sm",
    sm: "prose-sm",
    default: "prose-base",
    md: "prose-base",
    lg: "prose-lg",
    xl: "prose-xl",
  } as const;

  // Text align mapping
  const textAlignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  } as const;

  // Margin bottom mapping
  const marginBottomStyles = {
    none: "mb-0",
    xs: "mb-2",
    sm: "mb-4",
    default: "mb-6",
    md: "mb-8",
    lg: "mb-12",
    xl: "mb-16",
  } as const;

  // Check if color is a custom value (hex/rgb)
  const isCustomColor =
    color && (color.startsWith("#") || color.startsWith("rgb"));

  const baseStyles = cn(
    "prose prose-gray max-w-none",
    size && sizeStyles[size as keyof typeof sizeStyles],
    textAlign && textAlignStyles[textAlign as keyof typeof textAlignStyles],
    marginBottom &&
      marginBottomStyles[marginBottom as keyof typeof marginBottomStyles],
    // Use custom font weight if provided, otherwise default to semibold
    fontWeight
      ? fontWeightStyles[fontWeight]
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
    <div className={baseStyles} style={customStyle} {...rest}>
      {render(content)}
    </div>
  );
};

export default RichText;
