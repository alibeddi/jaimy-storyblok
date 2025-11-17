"use client";

import type { ReviewBlok } from "@/types/storyblok";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

interface Props {
  blok: ReviewBlok;
  className?: string;
}

export default function Review({ blok, className }: Props) {
  const imageBlok = blok.children?.find((c) => c.component === "image");
  const headingBlok = blok.children?.find((c) => c.component === "heading");
  const starsBlok = blok.children?.find((c) => c.component === "stars");
  const richtextBlok = blok.children?.find((c) => c.component === "rich_text");

  return (
    <div
      {...storyblokEditable(blok)}
      className={`bg-white min-w-[200px] p-6 sm:p-6 md:p-8 transition-all duration-300 ease-in-out relative 
        rounded-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.10)] 
        w-full sm:w-[calc(90%-1rem)] md:w-[calc(100%-1rem)] lg:w-[calc(90.333%-1rem)] mx-auto
        ${className || ""}`}>
      {/* Top row: Avatar + Name at left, Stars at right */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-1 min-w-0">
          {/* Avatar */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
            {imageBlok ? (
              <StoryblokComponent blok={imageBlok} />
            ) : (
              <div
                className="w-full h-full rounded-full"
                style={{ background: "#BE213A" }}
              />
            )}
          </div>

          {/* Name */}
          <div className="leading-tight truncate">
            {headingBlok && (
              <div className="text-base sm:text-lg md:text-xl font-semibold text-black truncate">
                <StoryblokComponent blok={headingBlok} />
              </div>
            )}
          </div>
        </div>

        {/* Stars */}
        {starsBlok && (
          <div className="flex-shrink-0 ml-2 sm:ml-3 md:ml-4 self-start scale-75 sm:scale-90 md:scale-100">
            <StoryblokComponent blok={starsBlok} />
          </div>
        )}
      </div>

      {/* Review text - Limited to 3 lines with tooltip on hover */}
      {richtextBlok && (
        <div className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-black group cursor-pointer relative">
          <div className="italic">
            &ldquo;
            <span className="line-clamp-3">
              <StoryblokComponent blok={richtextBlok} />
            </span>
            &rdquo;
          </div>

          {/* Wide Clear Tooltip - shows full text on hover with fewer lines */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-8 py-4 bg-white border border-gray-200 text-gray-800 text-base rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-96 whitespace-normal">
            <div className="italic leading-relaxed text-center">
              &ldquo;
              <StoryblokComponent blok={richtextBlok} />
              &rdquo;
            </div>
            {/* Larger Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-white"></div>
            {/* Larger Tooltip arrow shadow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-1px] w-0 h-0 border-l-[11px] border-r-[11px] border-t-[11px] border-transparent border-t-gray-200"></div>
          </div>
        </div>
      )}
    </div>
  );
}
