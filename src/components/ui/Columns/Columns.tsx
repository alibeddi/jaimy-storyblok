"use client";

import { ExtendedColumnsProps } from "@/types/ui";
import React from "react";
import { cn } from "@/lib/utils";

// const isTouchDevice = () => {
//   if (typeof window === "undefined") return false;
//   return "ontouchstart" in window || navigator.maxTouchPoints > 0;
// };

const ConditionalWrapper: React.FC<{
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : <>{children}</>;

const Connected: React.FC<{
  children: React.ReactNode;
  connectorColor?: string;
}> = ({ children, connectorColor = "default" }) => {
  const connectorClasses = cn("relative", {
    "before:bg-primary": connectorColor === "primary",
    "before:bg-gray-500":
      connectorColor === "gray" || connectorColor === "default",
    "before:bg-white": connectorColor === "white",
    "before:bg-black": connectorColor === "black",
    "before:absolute before:w-px before:h-full before:left-1/2 before:-translate-x-1/2 before:top-0": true,
  });
  return <div className={connectorClasses}>{children}</div>;
};

const Columns: React.FC<ExtendedColumnsProps> = ({
  children,
  className,
  columnsMobile = "default",
  columnsTablet = "default",
  columnsDesktop = "default",
  reverseMobile = false,
  squeezeMobile = "default",
  squeezeTablet = "default",
  squeezeDesktop = "default",
  justifyContent = "default",
  alignContent = "default",
  connectorToggle = false,
  connectorColor = "default",
  marginBottom = "default",
  border = "none",
  borderColor = "default",
  borderRadius = "none",
  shadow = "none",
  paddingX = "default",
  paddingY = "default",
  touchSlide,
  touchSlideColumnSize,
  ...rest
}) => {
  // const sliderEnabled = touchSlide && isTouchDevice();

  const parseColumns = (value?: string): number => {
    if (!value || value === "default") return 1;
    // Accept formats like "6/12", "3/12", "1/3", "1/2", "1/1", "12/12"
    const match = value.match(/^(\d+)\/(\d+)$/);
    if (match) {
      const numerator = parseInt(match[1], 10);
      const denominator = parseInt(match[2], 10);
      if (!numerator || !denominator) return 1;
      // Convert fraction width to number of columns in a 12-grid
      // e.g., 6/12 => 2 cols, 4/12 => 3 cols, 1/3 => 3 cols
      const widthRatio = numerator / denominator;
      const columns = widthRatio > 0 ? Math.round(1 / widthRatio) : 1;
      return Math.max(1, Math.min(12, columns));
    }
    // Fallback for explicit numeric values like "1", "2", ...
    const asNum = parseInt(value, 10);
    if (!Number.isNaN(asNum) && asNum >= 1 && asNum <= 12) return asNum;
    return 1;
  };

  const gridColsClass = (cols: number, prefix: string = ""): string => {
    return `${prefix}grid-cols-${cols}`;
  };

  const gapSizeMap: Record<string, string> = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
    default: "gap-4",
  };

  const justifyMap: Record<string, string> = {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end",
    "flex-start": "justify-start",
    "flex-end": "justify-end",
    "space-between": "justify-between",
    "space-around": "justify-around",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
    default: "",
  };

  const alignMap: Record<string, string> = {
    center: "items-center",
    "flex-start": "items-start",
    "flex-end": "items-end",
    stretch: "items-stretch",
    default: "",
  };

  const marginBottomMap: Record<string, string> = {
    none: "mb-0",
    xs: "mb-1",
    sm: "mb-4",
    default: "mb-8",
    md: "mb-8",
    lg: "mb-12",
    xl: "mb-16",
  };

  const paddingXMap: Record<string, string> = {
    none: "px-0",
    xs: "px-2",
    sm: "px-4",
    default: "",
    md: "px-8",
    lg: "px-12",
    xl: "px-16",
  };

  const paddingYMap: Record<string, string> = {
    none: "py-0",
    xs: "py-2",
    sm: "py-4",
    default: "",
    md: "py-8",
    lg: "py-12",
    xl: "py-16",
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

  const wrapperClasses = cn(
    "w-full",
    marginBottomMap[marginBottom],
    paddingXMap[paddingX as keyof typeof paddingXMap],
    paddingYMap[paddingY as keyof typeof paddingYMap],
    borderClasses,
    borderRadiusClasses,
    shadowClasses,
    className
  );

  const gridClasses = cn(
    "grid w-full",
    gridColsClass(parseColumns(columnsMobile)),
    gridColsClass(parseColumns(columnsTablet), "md:"),
    gridColsClass(parseColumns(columnsDesktop), "lg:"),
    gapSizeMap[squeezeMobile],
    justifyMap[justifyContent],
    alignMap[alignContent],
    {
      "md:gap-2": squeezeTablet === "small",
      "md:gap-4": squeezeTablet === "medium",
      "md:gap-6": squeezeTablet === "large",
      "lg:gap-2": squeezeDesktop === "small",
      "lg:gap-4": squeezeDesktop === "medium",
      "lg:gap-6": squeezeDesktop === "large",
      "flex-col-reverse md:flex-row": reverseMobile,
    }
  );

  return (
    <ConditionalWrapper
      condition={connectorToggle}
      wrapper={(children) => (
        <Connected connectorColor={connectorColor}>{children}</Connected>
      )}>
      <div className={wrapperClasses} {...rest}>
        <div className={gridClasses}>{children}</div>
      </div>
    </ConditionalWrapper>
  );
};

export default Columns;
