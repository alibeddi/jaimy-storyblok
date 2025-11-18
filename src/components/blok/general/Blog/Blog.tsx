"use client";

import type { BlogBlok } from "@/types/storyblok";
import Link from "next/link";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

interface Props {
  blok: BlogBlok;
  className?: string;
}

// Helper to extract text from potentially nested blok objects
function getTextContent(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (!value) return "";
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    // If it's a blok with a title field, try to extract that
    if ("title" in obj) return getTextContent(obj.title);
    // If it has text content, use that
    if ("text" in obj) return getTextContent(obj.text);
    // If it has content, use that
    if ("content" in obj) return getTextContent(obj.content);
  }
  return "";
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
      className={`rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group bg-white ${className || ""}`}>
      {imageBlok && (
        <div className="relative h-48 sm:h-56 md:h-64">
          <StoryblokComponent blok={imageBlok} />
        </div>
      )}

      <div className="p-4 sm:p-6">
        {titleBlok && (
          <div className="font-light text-lg sm:text-xl md:text-2xl text-gray-900 leading-tight mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-[#AF1B3C]">
            <StoryblokComponent blok={titleBlok} />
          </div>
        )}
        {excerptBlok && (
          <div className="text-gray-700 font-light text-sm sm:text-base leading-relaxed">
            <StoryblokComponent blok={excerptBlok} />
          </div>
        )}

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
