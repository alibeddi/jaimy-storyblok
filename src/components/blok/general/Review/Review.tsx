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
      className={`bg-white p-8 transition-all duration-300 ease-in-out hover:scale-[1.03] group transform-gpu mx-auto relative ${className || ""}`}
      style={{
        borderRadius: "12px",
        boxShadow: "9px 8px 20px rgba(0, 0, 0, 0.25)",
        willChange: "transform",
        minHeight: "250px", // increased height
        // maxWidth: "700px", // increased width
      }}>
      {/* Top row: Image + Heading + Stars */}
      <div className="flex items-center gap-4">
        {imageBlok && (
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <StoryblokComponent blok={imageBlok} />
          </div>
        )}

        <div className="flex flex-col gap-0 ">
          {headingBlok && (
            <div className="text-lg font-semibold">
              <StoryblokComponent blok={headingBlok} />
            </div>
          )}
          {starsBlok && (
            <div className="mt-1">
              <StoryblokComponent blok={starsBlok} />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {richtextBlok && (
        <div className="mt-6 text-base">
          <StoryblokComponent blok={richtextBlok} />
        </div>
      )}
    </div>
  );
}
