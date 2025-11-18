"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonProps, IconColor, IconType, IconSize } from "@/types/ui";
import Icon from "../Icon/Icon";

// Move static mapping objects outside component to prevent recreation
const SIZE_STYLES: Record<string, string> = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  default: "h-10 px-4 py-2",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-8 text-lg",
  xl: "h-14 px-10 text-xl",
  "2xl": "h-16 px-12 text-2xl",
  "3xl": "h-18 px-14 text-[22px]",
  "4xl": "h-20 px-16 text-[24px]",
  "5xl": "h-24 px-18 text-[26px]",
  "6xl": "h-28 px-20 text-[28px]",
  "7xl": "h-32 px-24 text-[30px]",
  "8xl": "h-36 px-28 text-[32px]",
  "9xl": "h-40 px-32 text-[34px]",
} as const;

const VARIANT_STYLES = {
  primary:
    "bg-gradient-to-r from-[#961E34] to-[#C30B30] text-white p-4 rounded-lg transition-all duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#C30B30]",
  secondary:
    "bg-[#F4F4F4] text-[#BE213A] p-4 rounded-lg transition-all duration-200 hover:bg-[#e5e5e5] focus-visible:ring-2 focus-visible:ring-[#BE213A]",
  tertiary:
    "bg-[rgba(244,244,244,0.3)] text-white p-4 rounded-lg transition-all duration-200 hover:bg-[rgba(244,244,244,0.5)] focus-visible:ring-2 focus-visible:ring-white",
} as const;

const SPACING_STYLES = {
  none: "",
  xs: "gap-1",
  sm: "gap-1.5",
  default: "gap-2",
  md: "gap-2.5",
  lg: "gap-3",
  xl: "gap-4",
} as const;

const BORDER_RADIUS_MAP = {
  none: "rounded-none",
  small: "rounded-sm",
  default: "rounded",
  medium: "rounded-md",
  large: "rounded-lg",
  "x-large": "rounded-xl",
  "xx-large": "rounded-2xl",
  full: "rounded-full",
} as const;

const SHADOW_MAP = {
  none: "shadow-none",
  small: "shadow-sm",
  default: "shadow",
  medium: "shadow-md",
  large: "shadow-lg",
  "x-large": "shadow-xl",
  "xx-large": "shadow-2xl",
} as const;

const CURSOR_MAP = {
  pointer: "cursor-pointer",
  default: "cursor-default",
  "not-allowed": "cursor-not-allowed",
  wait: "cursor-wait",
  text: "cursor-text",
  move: "cursor-move",
  help: "cursor-help",
  auto: "cursor-auto",
} as const;

const Button: React.FC<ButtonProps> = memo(
  ({
    className,
    size = "default",
    sizeTablet,
    sizeDesktop,
    border = "none",
    borderColor = "default",
    borderRadius = "default",
    borderRadiusTablet,
    borderRadiusDesktop,
    shadow = "none",
    shadowTablet,
    shadowDesktop,
    cursor = "pointer",
    cursorTablet,
    cursorDesktop,
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
    disableNofollow = false,
    noWrap = true, // Default to true - buttons should not wrap by default
    ...rest
  }) => {
    // Memoize derived values
    const hasIcon = useMemo(
      () => icon && icon !== "none" && icon !== "default",
      [icon]
    );
    const hasSpacing = useMemo(() => iconSpacing !== "none", [iconSpacing]);

    // Base button styles
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // Memoize icon spacing calculation
    const spacingClass = useMemo(() => {
      if (!hasIcon || !hasSpacing) return "";
      return SPACING_STYLES[iconSpacing as keyof typeof SPACING_STYLES] || "";
    }, [hasIcon, hasSpacing, iconSpacing]);

    const borderClasses = cn(
      {
        border: border && border !== "none",
        "border-2": border === "2",
        "border-4": border === "4",
      },
      border &&
        border !== "none" &&
        (borderColor === "default"
          ? "border-gray-300"
          : `border-${borderColor}`)
    );

    const borderRadiusClasses = cn({
      "rounded-none": borderRadius === "none",
      "rounded-sm": borderRadius === "small",
      rounded: borderRadius === "default",
      "rounded-md": borderRadius === "medium",
      "rounded-lg": borderRadius === "large",
      "rounded-xl": borderRadius === "x-large",
      "rounded-2xl": borderRadius === "xx-large",
      "rounded-full": borderRadius === "full",
    });

    const borderRadiusFor = (val?: typeof borderRadius): string | undefined => {
      if (!val) return undefined;
      return (
        BORDER_RADIUS_MAP[val as keyof typeof BORDER_RADIUS_MAP] || undefined
      );
    };

    const shadowClasses = cn({
      "shadow-none": shadow === "none",
      "shadow-sm": shadow === "small",
      shadow: shadow === "default",
      "shadow-md": shadow === "medium",
      "shadow-lg": shadow === "large",
      "shadow-xl": shadow === "x-large",
      "shadow-2xl": shadow === "xx-large",
    });

    const shadowFor = (val?: typeof shadow): string | undefined => {
      if (!val) return undefined;
      return SHADOW_MAP[val as keyof typeof SHADOW_MAP] || undefined;
    };

    const cursorClasses = cn({
      "cursor-pointer": cursor === "pointer",
      "cursor-default": cursor === "default",
      "cursor-not-allowed": cursor === "not-allowed",
      "cursor-wait": cursor === "wait",
      "cursor-text": cursor === "text",
      "cursor-move": cursor === "move",
      "cursor-help": cursor === "help",
      "cursor-auto": cursor === "auto",
    });

    const cursorFor = (val?: typeof cursor): string | undefined => {
      if (!val) return undefined;
      return CURSOR_MAP[val as keyof typeof CURSOR_MAP] || undefined;
    };

    const buttonClassName = cn(
      baseStyles,
      VARIANT_STYLES[variant as keyof typeof VARIANT_STYLES],
      SIZE_STYLES[size],
      sizeTablet && SIZE_STYLES[sizeTablet] && `md:${SIZE_STYLES[sizeTablet]}`,
      sizeDesktop &&
        SIZE_STYLES[sizeDesktop] &&
        `lg:${SIZE_STYLES[sizeDesktop]}`,
      borderClasses,
      borderRadiusClasses,
      borderRadiusFor(borderRadiusTablet) &&
        `md:${borderRadiusFor(borderRadiusTablet)}`,
      borderRadiusFor(borderRadiusDesktop) &&
        `lg:${borderRadiusFor(borderRadiusDesktop)}`,
      shadowClasses,
      shadowFor(shadowTablet) && `md:${shadowFor(shadowTablet)}`,
      shadowFor(shadowDesktop) && `lg:${shadowFor(shadowDesktop)}`,
      cursorClasses,
      cursorFor(cursorTablet) && `md:${cursorFor(cursorTablet)}`,
      cursorFor(cursorDesktop) && `lg:${cursorFor(cursorDesktop)}`,
      spacingClass,
      iconPosition === "right" && "flex-row-reverse",
      noWrap && "whitespace-nowrap",
      className
    );

    const iconElement = hasIcon ? (
      <Icon
        variant={icon!}
        color={iconColor as IconColor}
        type={iconType as IconType}
        size={iconSize as IconSize}
      />
    ) : null;

    // Link variant
    if (type === "link" && to) {
      return (
        <Link
          href={to}
          target={target}
          rel={relation?.join(" ") || undefined}
          prefetch={true}
          className={cn(
            "inline-flex items-center gap-2 text-sm text-foreground hover:text-foreground/80 transition-colors",
            iconPosition === "right" && "flex-row-reverse",
            className
          )}
          onClick={onClick}
          tabIndex={tabIndex}
          {...rest}>
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
        data-disablenofollow={disableNofollow}
        {...rest}>
        {iconPosition === "left" && iconElement}
        {children}
        {iconPosition === "right" && iconElement}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
