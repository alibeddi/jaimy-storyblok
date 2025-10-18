"use client";

import FigmaStarRating from "../../../ui/FigmaStarRating/FigmaStarRating";
import { SbBlokData } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

interface StarsBlok extends SbBlokData {
  component: "stars";
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

interface Props {
  blok: StarsBlok;
  className?: string;
}

export default function Stars({ blok, className }: Props) {
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div
      {...storyblokEditable(blok)}
      className={`flex items-center gap-2 ${className || ""}`}>
      <div className="flex-shrink-0">
        <FigmaStarRating rating={blok.rating} size={blok.size || "md"} />
      </div>
      {blok.showNumber && (
        <span
          className={`font-medium text-gray-700 ${textSizeClasses[blok.size || "md"]}`}
          style={{
            fontFamily: "Rubik, -apple-system, Roboto, Helvetica, sans-serif",
          }}>
          {blok.rating}/5
        </span>
      )}
    </div>
  );
}
