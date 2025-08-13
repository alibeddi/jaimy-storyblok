"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BlogProps } from "@/types/ui";
import Image from "../Image/Image";

const Blog: React.FC<BlogProps> = ({ blok, children, className, ...rest }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getObjectFitClass = (focus?: string) => {
    switch (focus) {
      case "center":
        return "object-center";
      case "top":
        return "object-top";
      case "bottom":
        return "object-bottom";
      case "left":
        return "object-left";
      case "right":
        return "object-right";
      default:
        return "object-center";
    }
  };

  return (
    <article className={cn("w-full", className)} {...rest}>
      {blok.image && (
        <div className="relative w-full">
          {/* Mobile Image */}
          {blok.image_mobile ? (
            <div className="md:hidden">
              <Image
                src={blok.image_mobile.filename}
                alt={blok.image_mobile.alt || blok.title}
                className={cn(
                  "w-full h-[300px] object-cover z-0",
                  getObjectFitClass(blok.image_focus)
                )}
              />
            </div>
          ) : (
            <div className="md:hidden">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || blok.title}
                className={cn(
                  "w-full h-[300px] object-cover z-0",
                  getObjectFitClass(blok.image_focus)
                )}
              />
            </div>
          )}

          {/* Desktop Image */}
          <div className="hidden md:block">
            <Image
              src={blok.image.filename}
              alt={blok.image.alt || blok.title}
              className={cn(
                "w-full h-[500px] object-cover z-0",
                getObjectFitClass(blok.image_focus)
              )}
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 text-white z-10">
            {blok.updated && (
              <p className="text-sm mb-2">{formatDate(blok.updated)}</p>
            )}

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-4xl">
              {blok.title}
            </h1>

            {blok.short_text && (
              <p className="text-lg md:text-xl max-w-3xl">{blok.short_text}</p>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
    </article>
  );
};

export default Blog;
