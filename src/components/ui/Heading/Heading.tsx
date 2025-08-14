"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HeadingProps } from "@/types/ui";

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
  title,
  ...rest
}) => {
  // Size styles
  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    default: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
    "2xl": "text-3xl",
  };

  // Type styles
  const typeStyles = {
    heading: "font-semibold",
    title: "font-bold",
    subtitle: "font-medium",
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

  const headingClassName = cn(
    sizeStyles[size],
    typeStyles[type],
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
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Heading;
