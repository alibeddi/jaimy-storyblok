"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FigmaStarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  showTooltip?: boolean;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const FigmaStarRating: React.FC<FigmaStarRatingProps> = ({
  rating,
  maxRating = 5,
  className,
  showTooltip = false,
  size = "md",
  interactive = false,
  onRatingChange,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: { container: "w-[28px] h-[28px]", star: "w-[14px] h-[14px]", position: "left-[7px] top-[7px]" },
    md: { container: "w-[34px] h-[34px]", star: "w-[17px] h-[17px]", position: "left-[9px] top-[8px]" },
    lg: { container: "w-[40px] h-[40px]", star: "w-[20px] h-[20px]", position: "left-[10px] top-[10px]" }
  };

  const currentSize = sizeClasses[size];
  const displayRating = hoveredRating !== null ? hoveredRating : rating;

  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  const handleStarHover = (starIndex: number) => {
    if (interactive) {
      setHoveredRating(starIndex + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(null);
    }
  };

  const stars = [];

  for (let i = 0; i < maxRating; i++) {
    const isFullStar = displayRating >= i + 1;
    const isHalfStar = displayRating > i && displayRating < i + 1;
    const isEmpty = displayRating <= i;

    stars.push(
      <div
        key={i}
        className={cn(
          "relative flex-shrink-0 transition-all duration-200 ease-in-out group",
          currentSize.container,
          interactive && "cursor-pointer hover:scale-110"
        )}
        onClick={() => handleStarClick(i)}
        onMouseEnter={() => handleStarHover(i)}
        onMouseLeave={handleMouseLeave}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Rate ${i + 1} out of ${maxRating} stars` : undefined}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleStarClick(i);
          }
        }}
      >
        {/* Subtle background for better visual separation */}
        <div
          className={cn(
            "absolute inset-0 rounded-sm transition-all duration-200",
            interactive && hoveredRating !== null && "bg-red-50"
          )}
        />

        {isFullStar ? (
          // Full star with gradient and glow effect
          <svg
            className={cn(
              "absolute transition-all duration-200 ease-in-out",
              currentSize.star,
              currentSize.position,
              "drop-shadow-sm group-hover:drop-shadow-md"
            )}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`star-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D62B47" />
                <stop offset="100%" stopColor="#BE213A" />
              </linearGradient>
            </defs>
            <path
              d="M3.97823 17.7892L5.95573 11.2211L0.870728 7.54856H7.22698L9.27511 0.768555L11.3232 7.54856H17.6795L12.5945 11.2211L14.572 17.7892L9.27511 13.7636L3.97823 17.7892Z"
              fill={`url(#star-gradient-${i})`}
              className="transition-all duration-200"
            />
          </svg>
        ) : isHalfStar ? (
          // Half star with gradient
          <svg
            className={cn(
              "absolute transition-all duration-200 ease-in-out",
              currentSize.star,
              currentSize.position,
              "drop-shadow-sm group-hover:drop-shadow-md"
            )}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`half-star-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D62B47" />
                <stop offset="100%" stopColor="#BE213A" />
              </linearGradient>
            </defs>
            <path
              d="M9.05001 3.45231V12.7042L12.8638 15.6351L11.4159 10.7973L14.9472 8.36075H10.6038L9.05001 3.45231ZM3.75313 17.7892L5.73063 11.2211L0.64563 7.54856H7.00188L9.05001 0.768555L11.0981 7.54856H17.4544L12.3694 11.2211L14.3469 17.7892L9.05001 13.7636L3.75313 17.7892Z"
              fill={`url(#half-star-gradient-${i})`}
              className="transition-all duration-200"
            />
          </svg>
        ) : (
          // Empty star with hover effect
          <svg
            className={cn(
              "absolute transition-all duration-200 ease-in-out",
              currentSize.star,
              currentSize.position,
              interactive && hoveredRating !== null && "opacity-60"
            )}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.13628 15.6351L8.95003 12.7042L12.7638 15.6351L11.316 10.7973L14.8472 8.36074H10.5038L8.95003 3.4523L7.39628 8.36074H3.05284L6.58409 10.7973L5.13628 15.6351ZM3.65315 17.7892L5.63065 11.2211L0.545654 7.54855H6.90191L8.95003 0.768555L10.9982 7.54855H17.3544L12.2694 11.2211L14.2469 17.7892L8.95003 13.7636L3.65315 17.7892Z"
              fill={interactive && hoveredRating !== null ? "#BE213A" : "#C1C5D0"}
              stroke="#BE213A"
              strokeWidth="0.5"
              className="transition-all duration-200"
            />
          </svg>
        )}

        {/* Tooltip for interactive stars */}
        {showTooltip && interactive && hoveredRating === i + 1 && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
            {hoveredRating} out of {maxRating}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("flex gap-[2px] items-center", className)}
      role="img"
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
    >
      {stars}
      {showTooltip && !interactive && (
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}/{maxRating}
        </span>
      )}
    </div>
  );
};

export default FigmaStarRating;
