"use client";

import React, { memo, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { IconProps } from "@/types/ui";

// Move static mapping objects outside component to prevent recreation
const SIZE_CLASSES = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  default: "w-[18px] h-[18px]",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
  "2xl": "w-12 h-12",
} as const;

const COLOR_CLASSES = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  gray: "text-gray-600",
  black: "text-black",
} as const;

// Move formatIconName outside component to prevent recreation
const formatIconName = (name: string): string => {
  if (/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
    return name;
  }

  return name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};

const Icon: React.FC<IconProps> = memo(
  ({
    className,
    color = "default",
    variant,
    type = "default",
    size = "default",
    shape = "none",
    onClick,
    ...rest
  }) => {
    // Memoize formatted name and icon component
    const formattedName = useMemo(
      () => (variant ? formatIconName(variant) : ""),
      [variant]
    );

    const IconComponent = useMemo(
      () =>
        formattedName
          ? (LucideIcons[
              formattedName as keyof typeof LucideIcons
            ] as React.ComponentType<React.SVGProps<SVGSVGElement>>)
          : null,
      [formattedName]
    );

    // Memoize color calculations
    const colorCalculations = useMemo(() => {
      const colorStr = String(color || "default");
      const knownColorClass =
        colorStr !== "default" &&
        COLOR_CLASSES[colorStr as keyof typeof COLOR_CLASSES];

      // Allow tailwind palette names like "red-500", "zinc-400", "primary-600"
      const tailwindColorClass =
        !knownColorClass &&
        /^[a-z-]+\d{0,3}$/i.test(colorStr) &&
        `text-${colorStr}`;

      // Allow hex or rgb(a) colors via inline style fallback
      const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(colorStr);
      const isRgb = /^rgba?\(/i.test(colorStr);
      const inlineStyle =
        isHex || isRgb
          ? ({ color: colorStr } as React.CSSProperties)
          : undefined;

      return { knownColorClass, tailwindColorClass, inlineStyle };
    }, [color]);

    // Early returns after hooks
    if (!variant) {
      console.warn("Icon variant is empty or undefined");
      return null;
    }

    if (!IconComponent) {
      console.warn(`Lucide icon "${variant}" not found.`);
      return null;
    }

    const classNames = cn(
      SIZE_CLASSES[size as keyof typeof SIZE_CLASSES],
      colorCalculations.knownColorClass || colorCalculations.tailwindColorClass,
      {
        "fill-current": type === "solid",
        "stroke-2": type === "outline",
        "rounded-full": shape === "circle",
        rounded: shape === "square",
      },
      className
    );

    return (
      <IconComponent
        className={classNames}
        style={colorCalculations.inlineStyle}
        onClick={onClick}
        {...rest}
      />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
