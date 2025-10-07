"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { IconProps } from "@/types/ui";

const Icon: React.FC<IconProps> = ({
  className,
  color = "default",
  variant,
  type = "default",
  size = "default",
  shape = "none",
  onClick,
  ...rest
}) => {
  if (!variant) {
    console.warn("Icon variant is empty or undefined");
    return null;
  }

  const formatIconName = (name: string): string => {
    if (/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      return name;
    }

    return name
      .split(/[-_]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  };

  const formattedName = formatIconName(variant);
  const IconComponent = LucideIcons[
    formattedName as keyof typeof LucideIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  if (!IconComponent) {
    console.warn(`Lucide icon "${variant}" not found.`);
    return null;
  }

  // const hasShape = shape !== "none" && shape !== "default";

  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    default: "w-[18px] h-[18px]",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
    "2xl": "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    white: "text-white",
    gray: "text-gray-600",
    black: "text-black",
  };

  const classNames = cn(
    sizeClasses[size],
    color !== "default" && colorClasses[color as keyof typeof colorClasses],
    {
      "fill-current": type === "solid",
      "stroke-2": type === "outline",
      "rounded-full": shape === "circle",
      rounded: shape === "square",
    },
    className
  );

  return <IconComponent className={classNames} onClick={onClick} {...rest} />;
};

export default Icon;
