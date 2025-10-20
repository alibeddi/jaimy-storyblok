"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type TrustBadgeUIProps = {
  className?: string;
  // Slot props (Storyblok blocks)
  titleSlot?: React.ReactNode;
  textSlot?: React.ReactNode;
  imageSlot?: React.ReactNode;
  // Optional: forward attributes to nested elements if needed later
  valueProps?: React.HTMLAttributes<HTMLDivElement>;
  descriptionProps?: React.HTMLAttributes<HTMLDivElement>;
  iconWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
};

const TrustBadge: React.FC<TrustBadgeUIProps> = ({
  className,
  titleSlot,
  textSlot,
  imageSlot,
  valueProps,
  descriptionProps,
  iconWrapperProps,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300 hover:scale-[1.02]",
        className
      )}
      style={{ maxWidth: "300px", height: "83px" }}
      {...rest}>
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-300"
        style={{
          background: "#F4F4F4",
          boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)",
          opacity: "0.5",
        }}
      />
      <div className="relative flex items-center h-full px-6">
        <div
          className="w-14 h-14 rounded-none mr-4 relative flex-shrink-0"
          {...iconWrapperProps}>
          {imageSlot ? (
            imageSlot
          ) : (
            <div className="w-14 h-14 bg-gray-300 rounded-none flex items-center justify-center">
              <div className="w-8 h-8 bg-[#AF1B3C] rounded-full" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {titleSlot ? (
            <div {...valueProps}>{titleSlot}</div>
          ) : (
            <div
              className="leading-tight transition-colors duration-300"
              style={{
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "600",
                fontSize: "24px",
                color: "#AF1B3C",
              }}>
              {/* Empty fallback to preserve layout */}
            </div>
          )}
          {textSlot ? (
            <div
              className="leading-tight transition-colors duration-300"
              style={{
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "300",
                fontSize: "14px",
                color: "#32546D",
              }}
              {...descriptionProps}>
              {textSlot}
            </div>
          ) : (
            <div
              className="leading-tight transition-colors duration-300"
              style={{
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "300",
                fontSize: "14px",
                color: "#32546D",
              }}>
              {/* Empty fallback to preserve layout */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrustBadge;
