"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ExtendedColumnsProps } from "@/types/ui";

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
  ...rest
}) => {
  // const sliderEnabled = touchSlide && isTouchDevice();

  const mobileCols: Record<string, string> = {
    default: "grid-cols-1",
    "12/12": "grid-cols-1",
    "6/12": "grid-cols-2",
    "4/12": "grid-cols-3",
    "3/12": "grid-cols-4",
    "2/12": "grid-cols-6",
  };

  const tabletCols: Record<string, string> = {
    default: "md:grid-cols-1",
    "12/12": "md:grid-cols-1",
    "6/12": "md:grid-cols-2",
    "4/12": "md:grid-cols-3",
    "3/12": "md:grid-cols-4",
    "2/12": "md:grid-cols-6",
  };

  const desktopCols: Record<string, string> = {
    default: "lg:grid-cols-1",
    "12/12": "lg:grid-cols-1",
    "6/12": "lg:grid-cols-2",
    "4/12": "lg:grid-cols-3",
    "3/12": "lg:grid-cols-4",
    "2/12": "lg:grid-cols-6",
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

  const wrapperClasses = cn("w-full", marginBottomMap[marginBottom], className);

  const gridClasses = cn(
    "grid w-full",
    mobileCols[columnsMobile],
    tabletCols[columnsTablet],
    desktopCols[columnsDesktop],
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
      )}
    >
      <div className={wrapperClasses} {...rest}>
        <div className={gridClasses}>{children}</div>
      </div>
    </ConditionalWrapper>
  );
};

export default Columns;
