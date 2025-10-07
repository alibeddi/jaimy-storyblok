"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HrProps } from "@/types/ui";

const Hr: React.FC<HrProps> = ({
  className,
  variant = "default",
  color = "gray-300",
  margin = "default",
  ...rest
}) => {
  const marginStyles = {
    none: "",
    xs: "my-1",
    sm: "my-2",
    default: "my-4",
    md: "my-6",
    lg: "my-8",
    xl: "my-16",
  };

  const variantStyles = {
    default: "border-solid",
    dotted: "border-dotted",
    dashed: "border-dashed",
    thick: "border-2",
  };

  const colorStyles = {
    primary: "border-primary",
    "gray-200": "border-gray-200",
    "gray-300": "border-gray-300",
    "gray-500": "border-gray-500",
    "gray-600": "border-gray-600",
    "gray-800": "border-gray-800",
  };

  const hrClasses = cn(
    "w-full border-t",
    variantStyles[variant],
    marginStyles[margin],
    colorStyles[color as keyof typeof colorStyles] || `border-${color}`,
    className
  );

  return <hr className={hrClasses} {...rest} />;
};

export default Hr;
