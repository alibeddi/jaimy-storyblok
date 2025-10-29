"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: "solid" | "dashed" | "dotted" | "double" | "gradient";
  thickness?: "thin" | "medium" | "thick";
  color?: string;
  width?: "full" | "75" | "50" | "25";
  alignment?: "left" | "center" | "right";
  marginTop?: "none" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
  marginBottom?: "none" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
}

const Divider: React.FC<DividerProps> = ({
  className,
  variant = "solid",
  thickness = "thin",
  color = "gray-300",
  width = "full",
  alignment = "center",
  marginTop = "default",
  marginBottom = "default",
  ...rest
}) => {
  const marginTopClasses = {
    none: "mt-0",
    xs: "mt-2",
    sm: "mt-4",
    default: "mt-6",
    md: "mt-8",
    lg: "mt-12",
    xl: "mt-16",
  };

  const marginBottomClasses = {
    none: "mb-0",
    xs: "mb-2",
    sm: "mb-4",
    default: "mb-6",
    md: "mb-8",
    lg: "mb-12",
    xl: "mb-16",
  };

  const thicknessClasses = {
    thin: "border-t",
    medium: "border-t-2",
    thick: "border-t-4",
  };

  const variantClasses = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
    double: "border-double border-t-[3px]",
    gradient: "",
  };

  const widthClasses = {
    full: "w-full",
    "75": "w-3/4",
    "50": "w-1/2",
    "25": "w-1/4",
  };

  const alignmentClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  const colorClasses: Record<string, string> = {
    primary: "border-primary",
    secondary: "border-secondary",
    "gray-200": "border-gray-200",
    "gray-300": "border-gray-300",
    "gray-400": "border-gray-400",
    "gray-500": "border-gray-500",
    "gray-600": "border-gray-600",
    "gray-800": "border-gray-800",
    black: "border-black",
    white: "border-white",
    red: "border-red-500",
    blue: "border-blue-500",
    green: "border-green-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500",
    pink: "border-pink-500",
    indigo: "border-indigo-500",
    orange: "border-orange-500",
  };

  // Check if color is a hex/rgb value
  const isCustomColor = color && (color.startsWith("#") || color.startsWith("rgb"));
  
  const dividerClasses = cn(
    marginTopClasses[marginTop],
    marginBottomClasses[marginBottom],
    widthClasses[width],
    alignmentClasses[alignment],
    {
      [thicknessClasses[thickness]]: variant !== "gradient",
      [variantClasses[variant]]: true,
      [colorClasses[color] || `border-${color}`]: variant !== "gradient" && !isCustomColor,
    },
    className
  );

  if (variant === "gradient") {
    return (
      <div
        className={cn(
          "h-px",
          marginTopClasses[marginTop],
          marginBottomClasses[marginBottom],
          widthClasses[width],
          alignmentClasses[alignment],
          "bg-gradient-to-r from-transparent via-gray-400 to-transparent",
          className
        )}
      />
    );
  }

  // If custom color (hex/rgb), use inline style
  const customStyle = isCustomColor ? { borderColor: color } : {};

  return <hr className={dividerClasses} style={customStyle} {...rest} />;
};

export default Divider;
