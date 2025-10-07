"use client";

import type { BlogBlok } from "@/types/storyblok";
import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";

interface Props {
  blok: BlogBlok;
  className?: string;
}

export default function Blog({ blok, className }: Props) {
  return (
    <article
      {...storyblokEditable(blok)}
      className={`rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group bg-white ${className || ""}`}>
      {blok.image?.filename && (
        <div className="relative h-48 sm:h-56 md:h-64" data-blok-field="image">
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || blok.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-4 sm:p-6">
        <h3
          data-blok-field="title"
          className="font-light text-lg sm:text-xl md:text-2xl text-gray-900 leading-tight mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-[#AF1B3C]">
          {blok.title}
        </h3>
        <p
          data-blok-field="excerpt"
          className="text-gray-700 font-light text-sm sm:text-base leading-relaxed">
          {blok.excerpt}
        </p>

        <div
          className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 flex gap-3"
          aria-label="meta">
          <span data-blok-field="author">{blok.author}</span>
          <span data-blok-field="date">{blok.date}</span>
          <span data-blok-field="read_time">{blok.read_time}</span>
        </div>

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
