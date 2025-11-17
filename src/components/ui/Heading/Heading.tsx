"use client";

import { HeadingProps } from "@/types/ui";
import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

// Move static mapping objects outside component to prevent recreation
const SIZE_STYLES = {
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
} as const;

const TYPE_STYLES = {
  heading: "",
  title: "",
  subtitle: "",
} as const;

const COLOR_STYLES = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  gray: "text-gray-600",
  black: "text-black",
} as const;

const ALIGN_STYLES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
} as const;

const MARGIN_STYLES = {
  none: "",
  xs: "mb-1",
  sm: "mb-2",
  default: "mb-4",
  md: "mb-6",
  lg: "mb-8",
  xl: "mb-10",
} as const;

const FONT_WEIGHT_STYLES = {
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

const FONT_FAMILY_STYLES = {
  "belfius-montserrat": "font-belfius-montserrat",
  "belfius-alternative": "font-belfius-alternative",
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
} as const;

const Heading: React.FC<HeadingProps> = memo(
  ({
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
    // Memoize color calculations
    const colorCalculations = useMemo(() => {
      const colorStr = String(color || "default");
      const knownColorClass =
        colorStr !== "default" &&
        COLOR_STYLES[colorStr as keyof typeof COLOR_STYLES];

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

      const colorClassImportant =
        knownColorClass || tailwindColorClass
          ? `!${knownColorClass || tailwindColorClass}`
          : undefined;

      return {
        knownColorClass,
        tailwindColorClass,
        inlineStyle,
        colorClassImportant,
      };
    }, [color]);

    const resolvedWeight = fontWeight || "semibold";

    // Memoize font family style calculation
    const fontFamilyStyle = useMemo(
      () =>
        fontFamily
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
          : {},
      [fontFamily]
    );

    const headingClassName = cn(
      SIZE_STYLES[size as keyof typeof SIZE_STYLES],
      TYPE_STYLES[type as keyof typeof TYPE_STYLES],
      FONT_WEIGHT_STYLES[resolvedWeight as keyof typeof FONT_WEIGHT_STYLES],
      color && COLOR_STYLES[color as keyof typeof COLOR_STYLES],
      fontFamily &&
        FONT_FAMILY_STYLES[fontFamily as keyof typeof FONT_FAMILY_STYLES],
      colorCalculations.colorClassImportant,
      textAlign && ALIGN_STYLES[textAlign as keyof typeof ALIGN_STYLES],
      marginBottom && MARGIN_STYLES[marginBottom as keyof typeof MARGIN_STYLES],
      className
    );
    return (
      <Component
        id={id}
        data-testid="heading"
        className={headingClassName}
        style={{ ...colorCalculations.inlineStyle, ...fontFamilyStyle }}
        title={title}
        {...rest}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
