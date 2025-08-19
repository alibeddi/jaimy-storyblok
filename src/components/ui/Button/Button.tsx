"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonProps, IconColor, IconType, IconSize } from "@/types/ui";
import Icon from "../Icon/Icon";

const Button: React.FC<ButtonProps> = ({
  className,
  icon,
  iconColor = "default",
  iconType = "default",
  iconPosition = "left",
  iconSize = "default",
  iconSpacing = "default",
  type = "button",
  variant = "primary",
  to,
  target = "_self",
  tabIndex,
  onClick,
  submit = false,
  children,
  relation = [],
  disabled = false,
  disableNofollow, // Add this line to destructure the prop
  ...rest
}) => {
  const hasIcon = icon && icon !== "none" && icon !== "default";
  const hasSpacing = iconSpacing !== "none";

  // Base button styles
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  // Variant styles
  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary",
    tertiary:
      "bg-transparent border border-input text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
  };

  // Size styles
  const sizeStyles = {
    xs: "h-7 px-2 text-xs",
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    md: "h-11 px-6 text-base",
    lg: "h-12 px-8 text-lg",
    xl: "h-14 px-10 text-xl",
    "2xl": "h-16 px-12 text-2xl",
  };

  // Icon spacing styles
  const spacingStyles = {
    none: "",
    xs: hasIcon && iconPosition === "left" ? "gap-1" : "",
    sm: hasIcon && iconPosition === "left" ? "gap-1.5" : "",
    default: hasIcon && iconPosition === "left" ? "gap-2" : "",
    md: hasIcon && iconPosition === "left" ? "gap-2.5" : "",
    lg: hasIcon && iconPosition === "left" ? "gap-3" : "",
    xl: hasIcon && iconPosition === "left" ? "gap-4" : "",
  };

  const buttonClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles["default"], // Default size, can be made configurable
    hasSpacing && spacingStyles[iconSpacing],
    iconPosition === "right" && "flex-row-reverse",
    className
  );

  const iconElement = hasIcon ? (
    <Icon
      variant={icon}
      color={iconColor as IconColor}
      type={iconType as IconType}
      size={iconSize as IconSize}
    />
  ) : null;

  // Link variant
  if (type === "link" && to) {
    // Calculate rel attribute based on disableNofollow
    const relValue = disableNofollow 
      ? relation?.filter(r => r !== 'nofollow').join(" ") || undefined
      : relation?.join(" ") || undefined;
    
    return (
      <Link
        href={to}
        target={target}
        rel={relValue}
        className={cn(
          "inline-flex items-center gap-2 text-sm text-foreground hover:text-foreground/80 transition-colors",
          iconPosition === "right" && "flex-row-reverse",
          className
        )}
        onClick={onClick}
        tabIndex={tabIndex}
        {...rest}
      >
        {iconElement}
        {children}
      </Link>
    );
  }

  // Button variant
  return (
    <button
      className={buttonClassName}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
      {...rest}
    >
      {iconPosition === "left" && iconElement}
      {children}
      {iconPosition === "right" && iconElement}
    </button>
  );
};

export default Button;
