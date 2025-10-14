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
  title,
  ...rest
}) => {
  // Size styles
  const sizeStyles = {
    "xx-small": "text-xs",
    "x-small": "text-sm",
    small: "text-base",
    default: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
    "x-large": "text-3xl",
    "xx-large": "text-4xl",
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

  const resolvedWeight = fontWeight || "semibold";
  const headingClassName = cn(
    sizeStyles[size],
    typeStyles[type],
    fontWeightStyles[resolvedWeight as keyof typeof fontWeightStyles],
    color && colorStyles[color],
    textAlign && alignStyles[textAlign],
    marginBottom && marginStyles[marginBottom],
    className
  );
  return (
    <Component
      id={id}
      data-testid="heading"
      className={headingClassName}
      title={title}
      {...rest}>
      {children}
    </Component>
  );
};

export default Heading;
