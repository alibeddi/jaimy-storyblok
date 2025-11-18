"use client";

import type { BlogBlok } from "@/types/storyblok";
import Link from "next/link";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

interface Props {
  blok: BlogBlok;
  className?: string;
}

export default function BlogSmall({ blok, className }: Props) {
  // Extract different types of bloks from children
  const imageBlok = blok.children?.find((c) => c.component === "image");
  const titleBlok = blok.children?.find((c) => c.component === "heading");
  const excerptBlok = blok.children?.find(
    (c) => c.component === "rich_text" && c.type === "excerpt"
  );
  const authorBlok = blok.children?.find(
    (c) => c.component === "rich_text" && c.type === "author"
  );
  const dateBlok = blok.children?.find(
    (c) => c.component === "rich_text" && c.type === "date"
  );

  return (
    <article
      {...storyblokEditable(blok)}
      className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-white/80 hover:bg-white/90 group cursor-pointer ${className || ""}`}>
      <div className="flex gap-3 sm:gap-4">
        <div className="shrink-0">
          {imageBlok && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden relative">
              <StoryblokComponent blok={imageBlok} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title Block */}
          {titleBlok && (
            <div className="font-light text-base sm:text-lg text-gray-900 leading-tight mb-2 transition-colors duration-300 group-hover:text-[#AF1B3C] truncate">
              <StoryblokComponent blok={titleBlok} />
            </div>
          )}

          {/* Excerpt Block */}
          {excerptBlok && (
            <div className="text-gray-700 font-light text-xs sm:text-sm leading-relaxed line-clamp-2 transition-opacity duration-300 group-hover:opacity-80">
              <StoryblokComponent blok={excerptBlok} />
            </div>
          )}

          {/* Meta Information */}
          {(authorBlok || dateBlok) && (
            <div
              className="mt-2 text-xs text-gray-500 flex gap-3"
              aria-label="meta">
              {authorBlok && (
                <span>
                  <StoryblokComponent blok={authorBlok} />
                </span>
              )}
              {dateBlok && (
                <span>
                  <StoryblokComponent blok={dateBlok} />
                </span>
              )}
            </div>
          )}

          {/* Link - kept as direct attribute for functionality */}
          {blok.link?.cached_url && (
            <div className="mt-2" data-blok-field="link">
              <Link
                href={blok.link.cached_url}
                className="text-[#AF1B3C] hover:underline">
                Read more
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
