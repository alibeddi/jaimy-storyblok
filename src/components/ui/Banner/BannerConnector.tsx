"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  BannerProps,
  ContentWidth,
  StoryblokContentItem,
  IconColor,
  IconType,
} from "@/types/ui";
import Icon from "../Icon/Icon";
import Image from "../Image/Image";

const contentWidths: Record<ContentWidth, string> = {
  "1/4": "w-full md:w-1/4",
  "1/3": "w-full md:w-1/3",
  "1/2": "w-full md:w-1/2",
  "2/3": "w-full md:w-2/3",
  "3/4": "w-full md:w-3/4",
  full: "w-full",
};

const contentWidthsTablet: Record<ContentWidth, string> = {
  "1/4": "sm:w-1/4",
  "1/3": "sm:w-1/3",
  "1/2": "sm:w-1/2",
  "2/3": "sm:w-2/3",
  "3/4": "sm:w-3/4",
  full: "sm:w-full",
};

const BannerConnector: React.FC<BannerProps> = ({
  backgroundColor,
  iconVariant,
  iconType = "default",
  iconColor = "default",
  iconMobileDisable = false,
  content = [],
  contentWidth = "full",
  contentWidthTablet = "full",
  image,
  imageMobile,
  uspBar = [],
  className,
  children,
}) => {
  const hasBackgroundColor = backgroundColor && backgroundColor !== "default";

  const sectionClassName = cn(
    "relative",
    hasBackgroundColor && `bg-${backgroundColor}`,
    className
  );

  const contentClassName = cn(
    "w-full p-4",
    contentWidthsTablet[contentWidthTablet],
    contentWidths[contentWidth]
  );

  return (
    <section className={sectionClassName}>
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 py-8">
        <div className={contentClassName}>
          {children}
          {content?.map((child: StoryblokContentItem, index: number) => (
            <div key={child._uid || index}>
              {/* Content would be rendered here with Storyblok components */}
              {JSON.stringify(child)}
            </div>
          ))}
        </div>

        <div className="flex-grow relative p-4">
          {iconVariant && iconVariant !== "default" && !iconMobileDisable && (
            <Icon
              className="absolute z-10 md:top-16 md:right-0 right-8 top-8 w-16 h-16 md:w-32 md:h-32"
              variant={iconVariant}
              type={iconType as IconType}
              color={iconColor as IconColor}
              size="default"
            />
          )}

          {image && (
            <Image
              src={image.filename}
              alt={image.alt || "Banner image"}
              className="hidden md:block mx-auto max-w-[35rem]"
              objectFit="cover"
            />
          )}

          {imageMobile && (
            <Image
              src={imageMobile.filename}
              alt={imageMobile.alt || "Banner mobile image"}
              className="block md:hidden mx-auto max-w-[12rem]"
              objectFit="cover"
            />
          )}
        </div>
      </div>

      {uspBar?.map((bar: StoryblokContentItem, index: number) => (
        <div key={bar._uid || index} data-banner-usp>
          {/* USP bar content */}
        </div>
      ))}
    </section>
  );
};

export default BannerConnector;
