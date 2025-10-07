"use client";

import FigmaStarRating from "../../../ui/FigmaStarRating/FigmaStarRating";
import Image from "next/image";
import type { ReviewBlok } from "@/types/storyblok";
import { storyblokEditable } from "@storyblok/react";

interface Props {
  blok: ReviewBlok;
  className?: string;
}

export default function Review({ blok, className }: Props) {
  return (
    <div
      {...storyblokEditable(blok)}
      className={`bg-white p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] group transform-gpu mx-auto relative ${className || ""}`}
      style={{
        borderRadius: "10px",
        boxShadow: "9px 8px 16.9px rgba(0, 0, 0, 0.25)",
        willChange: "transform",
        minHeight: "230px",
        maxWidth: "400px",
      }}>
      <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            {blok.avatar?.filename ? (
              <div
                data-blok-field="avatar"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-gray-100 transition-all duration-300 group-hover:ring-red-100">
                <Image
                  src={blok.avatar.filename}
                  alt={blok.avatar.alt || blok.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ) : (
              <div
                className="w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: "#C02139" }}>
                <span className="text-white font-medium text-lg">
                  {blok.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4
              data-blok-field="name"
              className="font-medium text-black mb-1 transition-colors duration-300 group-hover:text-gray-700 truncate"
              style={{
                fontFamily:
                  "Rubik, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "18px",
                fontWeight: "400",
                lineHeight: "30px",
              }}>
              {blok.name}
            </h4>
            <p
              data-blok-field="company"
              className="text-black transition-colors duration-300 truncate"
              style={{
                fontFamily:
                  "Rubik, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}>
              {blok.company || blok.role || "Bruxelles"}
            </p>
            {blok.date && (
              <p
                data-blok-field="date"
                className="text-gray-400 transition-colors duration-300 mt-0.5 text-xs sm:text-sm"
                style={{
                  fontFamily:
                    "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: "300",
                }}>
                {new Date(blok.date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex-shrink-0" data-blok-field="rating">
          <FigmaStarRating rating={blok.rating} />
        </div>
      </div>

      <div
        data-blok-field="review_text"
        className="text-black leading-relaxed transition-colors duration-300 group-hover:text-gray-600 flex-1 mt-6"
        style={{
          fontFamily: "Rubik, -apple-system, Roboto, Helvetica, sans-serif",
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "30px",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
        &quot;{blok.review_text}&quot;
      </div>
    </div>
  );
}
