"use client";

import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { BlogCardProps } from "@/types/ui";
import Image from "../Image/Image";

const BlogCard: React.FC<BlogCardProps> = ({ blok, ...rest }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Link
      href={`/${blok.full_slug}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg overflow-hidden relative transition-shadow"
      {...rest}
    >
      <div className="relative">
        {blok.image && (
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || blok.title}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded shadow">
          {formatDate(blok.updated_at).toUpperCase()}
        </div>

        <div className="absolute bottom-2 left-2 flex items-center text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
          <Clock className="w-4 h-4 mr-1" />
          2m
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2">
          {blok.title}
        </h2>

        {blok.short_text && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {blok.short_text}
          </p>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
