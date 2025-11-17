"use client";

import type { BlogBlok } from "@/types/storyblok";
import Link from "next/link";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

interface Props {
  blok: BlogBlok;
  className?: string;
}

export default function Blog({ blok, className }: Props) {
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
  const readTimeBlok = blok.children?.find(
    (c) => c.component === "rich_text" && c.type === "read_time"
  );

  return (
    <article
      {...storyblokEditable(blok)}
      className={`rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg group bg-white ${className || ""}`}>
      {/* Image Block */}
      <div className="">
        {imageBlok && (
          <div className="relative max-h-76">
            <div className="w-full h-full">
              <StoryblokComponent blok={imageBlok} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 ">
        {/* Title Block */}
        {titleBlok && (
          <div className="font-light text-lg sm:text-xl md:text-2xl text-gray-900 leading-tight mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-[#AF1B3C]">
            <StoryblokComponent blok={titleBlok} />
          </div>
        )}

        {/* Excerpt Block */}
        {excerptBlok && (
          <div className="text-gray-700 font-light text-sm sm:text-base leading-relaxed">
            <StoryblokComponent blok={excerptBlok} />
          </div>
        )}

        {/* Meta Information */}
        {(authorBlok || dateBlok || readTimeBlok) && (
          <div
            className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 flex gap-3"
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
            {readTimeBlok && (
              <span>
                <StoryblokComponent blok={readTimeBlok} />
              </span>
            )}
          </div>
        )}

        {/* Link - kept as direct attribute for functionality */}
        {blok.link?.cached_url && (
          <div className="mt-4" data-blok-field="link">
            <Link
              href={blok.link.cached_url}
              className="text-[#AF1B3C] hover:underline">
              Read more
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
