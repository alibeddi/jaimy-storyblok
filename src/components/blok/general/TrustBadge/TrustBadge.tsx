"use client";

import Image from "next/image";
import type { TrustBadgeBlok } from "@/types/storyblok";
import { storyblokEditable } from "@storyblok/react";

export default function TrustBadge({ blok }: { blok: TrustBadgeBlok }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className="relative transition-all duration-300 hover:scale-[1.02]"
      style={{ maxWidth: "300px", height: "83px" }}>
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-300"
        style={{
          background: "#F4F4F4",
          boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)",
          opacity: "0.5",
        }}
      />
      <div className="relative flex items-center h-full px-6">
        <div className="w-14 h-14 rounded-none mr-4 relative flex-shrink-0">
          {blok.icon_svg ? (
            <div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
              data-blok-field="icon_svg"
              dangerouslySetInnerHTML={{ __html: blok.icon_svg }}
            />
          ) : blok.icon?.filename ? (
            <div data-blok-field="icon">
              <Image
                src={blok.icon.filename}
                alt={blok.icon.alt || "Trust badge icon"}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-14 h-14 bg-gray-300 rounded-none flex items-center justify-center">
              <div className="w-8 h-8 bg-[#AF1B3C] rounded-full" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="leading-tight transition-colors duration-300"
            style={{
              fontFamily:
                "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: "600",
              fontSize: "24px",
              color: "#AF1B3C",
            }}
            data-blok-field="value">
            {blok.value}
          </div>
          <div
            className="leading-tight transition-colors duration-300"
            style={{
              fontFamily:
                "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: "300",
              fontSize: "14px",
              color: "#32546D",
            }}
            data-blok-field="description">
            {blok.description}
          </div>
        </div>
      </div>
    </div>
  );
}
