"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExtendedColumnProps } from "@/types/ui";

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
  flexDirection = "default",
  textAlign = "left",
  justifyContent = "default",
  alignContent = "default",
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
  borderColor = "gray-500",
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
    xs: "1",
    sm: "2",
    default: "4",
    md: "6",
    lg: "8",
    xl: "10",
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

  const borderClasses = cn({
    "border-t": border === "top",
    "border-b": border === "bottom",
    "border-l": border === "left",
    "border-r": border === "right",
    border: border === "around",
    "border-t border-b": border === "top-bottom",
    "border-l border-r": border === "left-right",
    [`border-${borderColor}`]: border !== "none",
  });

  const containerClasses = cn(
    "flex h-full",
    {
      "flex-col": flexDirection === "column",
      "flex-row": flexDirection === "row",
      [`text-${textAlign}`]: textAlign !== "left",
      [`justify-${justifyContent}`]: justifyContent !== "default",
      [`items-${alignContent}`]: alignContent !== "default",
      relative: hasQuote,
    },
    px,
    pt,
    pb,
    dynamicBgColor,
    columnMap("", group_columns_mobile),
    columnMap("md", group_columns_tablet),
    columnMap("lg", group_columns_desktop),
    borderClasses,
    !disable_gutters && "p-2",
    className
  );

  const anchorClasses = cn(
    "block h-full w-full",
    effectMap[effect as keyof typeof effectMap]
  );
  const contentClasses = "h-full w-full";

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
          <Link href={linkUrl} target={target} className={anchorClasses}>
            {children}
          </Link>
        )}
      >
        {hasQuote && <QuoteOpen className={quoteOpenClasses} />}
        <div className={contentClasses}>{children}</div>
        {hasQuote && <QuoteClose className={quoteCloseClasses} />}
      </ConditionalWrapper>
    </div>
  );
};

export default Column;
