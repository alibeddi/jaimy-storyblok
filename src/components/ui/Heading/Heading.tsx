"use client";

import { HeadingProps } from "@/types/ui";
import React from "react";
import { cn } from "@/lib/utils";

const Heading: React.FC<HeadingProps> = ({
  id,
  className,
  size = "default",
  tag: Component = "span",
  type = "heading",
  color,
  textAlign,
  children,
  marginBottom,
  fontWeight,
  fontFamily,
  title,
  ...rest
}) => {
  // Size styles - expanded with larger options
  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    default: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
    "2xl": "text-3xl",
    "3xl": "text-4xl",
    "4xl": "text-5xl",
    "5xl": "text-6xl",
    "6xl": "text-7xl",
    "7xl": "text-8xl",
    "8xl": "text-9xl",
    "9xl": "text-[10rem]",
  };

  // Type styles (do NOT include font-* here; weight is controlled by fontWeight)
  const typeStyles = {
    heading: "",
    title: "",
    subtitle: "",
  };

  // Color styles
  const colorStyles = {
    primary: "text-primary",
    secondary: "text-secondary",
    white: "text-white",
    gray: "text-gray-600",
    black: "text-black",
  };

  // Text alignment styles
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  // Margin bottom styles
  const marginStyles = {
    none: "",
    xs: "mb-1",
    sm: "mb-2",
    default: "mb-4",
    md: "mb-6",
    lg: "mb-8",
    xl: "mb-10",
  };

  // Font weight styles (use ! to increase specificity over inherited styles)
  const fontWeightStyles = {
    normal: "!font-normal",
    bold: "!font-bold",
    light: "!font-light",
    medium: "!font-medium",
    semibold: "!font-semibold",
    "300": "!font-light",
    "400": "!font-normal",
    "500": "!font-medium",
    "600": "!font-semibold",
    "700": "!font-bold",
  } as const;

  // Font family styles
  const fontFamilyStyles = {
    "belfius-montserrat": "font-belfius-montserrat",
    "belfius-alternative": "font-belfius-alternative",
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  } as const;

  const colorStr = String(color || "default");
  const knownColorClass =
    colorStr !== "default" && (colorStyles as Record<string, string>)[colorStr];
  const tailwindColorClass =
    !knownColorClass && /^[a-z-]+\d{0,3}$/i.test(colorStr)
      ? `text-${colorStr}`
      : undefined;
  const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(colorStr);
  const isRgb = /^rgba?\(/i.test(colorStr);
  const tokenMatch = colorStr.match(
    /^(primary|secondary|gray)-(100|200|300|400|500|600|700|800|900)$/i
  );
  const inlineStyle = (() => {
    if (isHex || isRgb) return { color: colorStr } as React.CSSProperties;
    if (tokenMatch) {
      const family = tokenMatch[1].toLowerCase();
      const shade = tokenMatch[2];
      return {
        color: `rgb(var(--color-${family}-${shade}))`,
      } as React.CSSProperties;
    }
    return undefined;
  })();

  const resolvedWeight = fontWeight || "semibold";
  const colorClassImportant =
    knownColorClass || tailwindColorClass
      ? `!${knownColorClass || tailwindColorClass}`
      : undefined;

  const headingClassName = cn(
    sizeStyles[size as keyof typeof sizeStyles],
    typeStyles[type],
    fontWeightStyles[resolvedWeight as keyof typeof fontWeightStyles],

    color && colorStyles[color],

    fontFamily && fontFamilyStyles[fontFamily as keyof typeof fontFamilyStyles],
    colorClassImportant,

    colorClassImportant,

    textAlign && alignStyles[textAlign],
    marginBottom && marginStyles[marginBottom],
    className
  );
  // Fallback inline styles for font family
  const fontFamilyStyle = fontFamily
    ? {
        fontFamily:
          fontFamily === "belfius-montserrat"
            ? '"BelfiusMontserrat", sans-serif'
            : fontFamily === "belfius-alternative"
              ? '"BelfiusAlternative", sans-serif'
              : fontFamily === "sans"
                ? "sans-serif"
                : fontFamily === "serif"
                  ? "serif"
                  : fontFamily === "mono"
                    ? "monospace"
                    : undefined,
      }
    : {};
  return (
    <Component
      id={id}
      data-testid="heading"
      className={headingClassName}
      style={{ ...inlineStyle, ...fontFamilyStyle }}
      title={title}
      {...rest}>
      {children}
    </Component>
  );
};

export default Heading;
