"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReviewStarsProps } from "@/types/ui";

const ReviewStars: React.FC<ReviewStarsProps> = ({
  className,
  rating,
  maxRating = 5,
  size = "default",
  readonly = true,
  onRatingChange,
  ...rest
}) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    default: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
    "2xl": "w-12 h-12",
  };

  const rootClasses = cn("flex items-center gap-1", className);

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const stars = [...Array(maxRating)].map((_, index) => {
    const starRating = index + 1;
    const isFilled = rating >= starRating;
    const isPartiallyFilled = rating > index && rating < starRating;

    return (
      <button
        key={index}
        type="button"
        className={cn("relative transition-colors", {
          "cursor-pointer hover:scale-110": !readonly,
          "cursor-default": readonly,
        })}
        onClick={() => handleStarClick(starRating)}
        disabled={readonly}
        aria-label={`Rate ${starRating} star${starRating !== 1 ? "s" : ""}`}
      >
        <Star
          className={cn(sizeClasses[size], "transition-colors", {
            "fill-yellow-400 text-yellow-400": isFilled,
            "text-gray-300": !isFilled && !isPartiallyFilled,
          })}
          strokeWidth={2}
        />
        {isPartiallyFilled && (
          <Star
            className={cn(
              sizeClasses[size],
              "absolute top-0 left-0 fill-yellow-400 text-yellow-400 transition-colors"
            )}
            style={{
              clipPath: `inset(0 ${100 - (rating - index) * 100}% 0 0)`,
            }}
            strokeWidth={2}
          />
        )}
      </button>
    );
  });

  return (
    <div className={rootClasses} {...rest}>
      {stars}
      <span className="sr-only">
        {rating} out of {maxRating} stars
      </span>
    </div>
  );
};

export default ReviewStars;
