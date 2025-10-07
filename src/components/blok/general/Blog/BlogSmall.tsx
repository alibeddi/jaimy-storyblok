"use client";

import type { BlogBlok } from "@/types/storyblok";
import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";

interface Props {
  blok: BlogBlok;
  className?: string;
}

export default function BlogSmall({ blok, className }: Props) {
  return (
    <article
      {...storyblokEditable(blok)}
      className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-white/80 hover:bg-white/90 group cursor-pointer ${className || ""}`}>
      <div className="flex gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          {blok.image?.filename && (
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden relative"
              data-blok-field="image">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || blok.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4
            data-blok-field="title"
            className="font-light text-base sm:text-lg text-gray-900 leading-tight mb-2 transition-colors duration-300 group-hover:text-[#AF1B3C] truncate">
            {blok.title}
          </h4>
          <p
            data-blok-field="excerpt"
            className="text-gray-700 font-light text-xs sm:text-sm leading-relaxed line-clamp-2 transition-opacity duration-300 group-hover:opacity-80">
            {blok.excerpt}
          </p>

          <div
            className="mt-2 text-xs text-gray-500 flex gap-3"
            aria-label="meta">
            <span data-blok-field="author">{blok.author}</span>
            <span data-blok-field="date">{blok.date}</span>
          </div>

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
