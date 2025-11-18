"use client";

import { ExtendedColumnProps } from "@/types/ui";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

const ConditionalWrapper: React.FC<{
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}> = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : <>{children}</>;

const QuoteOpen: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className}>&ldquo;</span>
);

const QuoteClose: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className}>&rdquo;</span>
);

const Column: React.FC<ExtendedColumnProps> = ({
  children,
  className,
  display,
  flexDirection = "default",
  textAlign = "left",
  justifyContent = "default",
  alignItems = "default",
  alignContent = "default",
  justifyItems = "default",
  flexWrap = "default",
  gap = "default",
  paddingX = "default",
  paddingTop = "default",
  paddingBottom = "default",
  backgroundColor,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  backgroundAttachment,
  link,
  target = "_self",
  effect = "none",
  quote = false,
  quoteColor = "default",
  group_columns_mobile = "default",
  group_columns_tablet = "default",
  group_columns_desktop = "default",
  disable_gutters = false,
  border = "none",
  borderColor = "default",
  borderRadius = "none",
  shadow = "none",
  ...rest
}) => {
  const linkUrl = link?.url || link?.cached_url || "";
  const hasQuote = quote;

  const dynamicBgColor =
    backgroundColor && backgroundColor !== "default"
      ? `bg-${backgroundColor}`
      : "";

  const dynamicQuoteColor =
    quoteColor && quoteColor !== "default"
      ? `text-${quoteColor}`
      : "text-gray-500";

  const paddingMap = {
    none: "0",
    "x-small": "2",
    small: "4",
    default: "8",
    medium: "12",
    large: "16",
    "x-large": "20",
  };

  const px = paddingMap[paddingX as keyof typeof paddingMap]
    ? `px-${paddingMap[paddingX as keyof typeof paddingMap]}`
    : "";
  const pt = paddingMap[paddingTop as keyof typeof paddingMap]
    ? `pt-${paddingMap[paddingTop as keyof typeof paddingMap]}`
    : "";
  const pb = paddingMap[paddingBottom as keyof typeof paddingMap]
    ? `pb-${paddingMap[paddingBottom as keyof typeof paddingMap]}`
    : "";

  const effectMap = {
    shadow: "shadow-md hover:shadow-lg transition-shadow duration-300",
    scale: "transform hover:scale-105 transition-transform duration-300",
    opacity: "hover:opacity-80 transition-opacity duration-300",
    none: "",
  };

  const columnMap = (prefix: string, val: string) => {
    const map: Record<string, string> = {
      "1/1": `${prefix ? `${prefix}:` : ""}w-full`,
      "6/12": `${prefix ? `${prefix}:` : ""}w-1/2`,
      "4/12": `${prefix ? `${prefix}:` : ""}w-1/3`,
      "3/12": `${prefix ? `${prefix}:` : ""}w-1/4`,
      default: `${prefix ? `${prefix}:` : ""}w-full`,
    };
    return map[val || "default"];
  };

  const borderClasses = cn(
    {
      "border-t": border === "top",
      "border-b": border === "bottom",
      "border-l": border === "left",
      "border-r": border === "right",
      border: border === "around",
      "border-t border-b": border === "top-bottom",
      "border-l border-r": border === "left-right",
    },
    // Apply default border color (gray-300) when borderColor is "default" or when border is set but no specific color
    border !== "none" &&
    (borderColor === "default" ? "border-gray-300" : `border-${borderColor}`)
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

  const shadowClasses = cn({
    "shadow-none": shadow === "none",
    "shadow-sm": shadow === "small",
    shadow: shadow === "default",
    "shadow-md": shadow === "medium",
    "shadow-lg": shadow === "large",
    "shadow-xl": shadow === "x-large",
    "shadow-2xl": shadow === "xx-large",
  });

  const displayClass = (() => {
    if (display === "flex") return "flex";
    if (display === "grid") return "grid";
    return undefined;
  })();

  const flexDirectionMap: Record<string, string> = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    col: "flex-col",
    column: "flex-col",
    "col-reverse": "flex-col-reverse",
    "column-reverse": "flex-col-reverse",
    default: "",
  };

  const justifyMap: Record<string, string> = {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end",
    "flex-start": "justify-start",
    "flex-end": "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
    "space-between": "justify-between",
    "space-around": "justify-around",
    default: "",
  };

  const alignItemsMap: Record<string, string> = {
    center: "items-center",
    start: "items-start",
    end: "items-end",
    "flex-start": "items-start",
    "flex-end": "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
    default: "",
  };

  const alignContentMap: Record<string, string> = {
    center: "content-center",
    start: "content-start",
    end: "content-end",
    between: "content-between",
    around: "content-around",
    evenly: "content-evenly",
    "space-between": "content-between",
    "space-around": "content-around",
    default: "",
  };

  const justifyItemsMap: Record<string, string> = {
    start: "justify-items-start",
    end: "justify-items-end",
    center: "justify-items-center",
    stretch: "justify-items-stretch",
    default: "",
  };

  const flexWrapMap: Record<string, string> = {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap",
    "wrap-reverse": "flex-wrap-reverse",
    default: "",
  };

  const gapMap: Record<string, string> = {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-4",
    default: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
    "2xl": "gap-16",
    "3xl": "gap-20",
    "4xl": "gap-24",
    "5xl": "gap-32",
  };

  const containerClasses = cn(
    // Outer wrapper: visuals and spacing only
    "h-full",
    // Typography cascades
    textAlign && textAlign !== "left" && `text-${textAlign}`,
    // Spacing and visuals
    px,
    pt,
    pb,
    dynamicBgColor,
    columnMap("", group_columns_mobile),
    columnMap("md", group_columns_tablet),
    columnMap("lg", group_columns_desktop),
    borderClasses,
    borderRadiusClasses,
    shadowClasses,
    // Only apply p-2 if no individual padding is specified
    !disable_gutters && !px && !pt && !pb && "p-2",
    { relative: hasQuote },
    className
  );

  const anchorClasses = cn(
    "block h-full w-full",
    effectMap[effect as keyof typeof effectMap]
  );
  const contentClasses = cn(
    "h-full w-full",
    displayClass,
    // Ensure flex when any flex control is provided (default to flex for Column)
    (display === "flex" ||
      !display ||
      justifyContent !== "default" ||
      alignItems !== "default" ||
      alignContent !== "default" ||
      flexDirection !== "default" ||
      flexWrap !== "default" ||
      gap !== "default") &&
    "flex",
    flexDirection &&
    flexDirectionMap[flexDirection as keyof typeof flexDirectionMap],
    justifyContent && justifyMap[justifyContent as keyof typeof justifyMap],
    (alignItems && alignItemsMap[alignItems as keyof typeof alignItemsMap]) ||
    (alignContent &&
      alignItemsMap[alignContent as keyof typeof alignItemsMap]),
    alignContent &&
    alignContentMap[alignContent as keyof typeof alignContentMap],
    justifyItems &&
    justifyItemsMap[justifyItems as keyof typeof justifyItemsMap],
    flexWrap && flexWrapMap[flexWrap as keyof typeof flexWrapMap],
    gap && gapMap[gap as keyof typeof gapMap]
  );

  const quoteOpenClasses = cn(
    "absolute top-0 left-0 text-6xl leading-none -translate-y-1/2",
    dynamicQuoteColor
  );
  const quoteCloseClasses = cn(
    "absolute bottom-0 right-0 text-6xl leading-none translate-y-1/2",
    dynamicQuoteColor
  );

  const style: React.CSSProperties = {};
  if (backgroundImage?.filename) {
    style.backgroundImage = `url(${backgroundImage.filename})`;
    style.backgroundSize =
      backgroundSize !== "default" ? backgroundSize : "cover";
    style.backgroundPosition =
      backgroundPosition !== "default" ? backgroundPosition : "center";
    style.backgroundRepeat =
      backgroundRepeat !== "default" ? backgroundRepeat : "no-repeat";
    style.backgroundAttachment =
      backgroundAttachment !== "default" ? backgroundAttachment : "scroll";
  }

  return (
    <div className={containerClasses} style={style} {...rest}>
      <ConditionalWrapper
        condition={!!linkUrl}
        wrapper={(children) => (
          <Link href={linkUrl} target={target} prefetch={true} className={anchorClasses}>
            {children}
          </Link>
        )}>
        {hasQuote && <QuoteOpen className={quoteOpenClasses} />}
        <div className={contentClasses}>{children}</div>
        {hasQuote && <QuoteClose className={quoteCloseClasses} />}
      </ConditionalWrapper>
    </div>
  );
};

export default Column;
