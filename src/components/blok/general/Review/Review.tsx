"use client";

import type { ReviewBlok } from "@/types/storyblok";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

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
      className={`bg-white p-4 sm:p-6 md:p-8 transition-all duration-300 ease-in-out mx-auto relative ${className || ""}`}
      style={{
        borderRadius: "14px",
        boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
        willChange: "transform",
      }}>
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

        {/* Stars on the right (never overlaps due to shrink-0) */}
        {starsBlok && (
          <div className="flex-shrink-0 ml-2 sm:ml-3 md:ml-4 self-start">
            <StoryblokComponent blok={starsBlok} />
          </div>
        )}
      </div>

      {/* Review text */}
      {richtextBlok && (
        <div className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-black">
          <div className="italic">
            <span className="mr-1">“</span>
            <StoryblokComponent blok={richtextBlok} />
            <span className="ml-1">”</span>
          </div>
        </div>
      )}
    </div>
  );
}
