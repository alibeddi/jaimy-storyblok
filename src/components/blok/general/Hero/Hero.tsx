import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import BlokImage from "../../../ui/BlokImage";
import Connected from "../../../ui/Hero";
import Icon from "../../../ui/Icon";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo } from "react";
import cn from "classnames";

interface ChildBlok {
  component: string;
  _uid: string;
  [key: string]: any;
}

interface ImageBlok {
  filename: string;
  alt?: string;
}

interface HeroBlok {
  component: string;
  hero_appearance?: string;
  hero_icon?: boolean;
  connector_toggle?: boolean;
  connector_color?: string;
  content?: ChildBlok[];
  img?: ImageBlok;
  img_mobile?: ImageBlok;
  usp_bar?: ChildBlok[];
  preset?: string;
  [key: string]: any;
}

interface HeroProps {
  className?: string;
  blok: HeroBlok;
}

const Hero: React.FC<HeroProps> = memo(({ className, blok }) => {
  // Memoize derived values to prevent recalculation
  const heroState = useMemo(
    () => ({
      hasImage: blok?.img?.filename,
      hasConnector: blok?.connector_toggle,
      hasIcon: blok?.hero_icon,
    }),
    [blok?.img?.filename, blok?.connector_toggle, blok?.hero_icon]
  );

  const imageMobile = useMemo(
    () => (blok.img_mobile?.filename ? blok.img_mobile : blok.img),
    [blok.img_mobile, blok.img]
  );

  const imageConfig = useMemo(
    () =>
      heroState.hasIcon
        ? { aspectDesktop: "1:1", aspectTablet: "1:1", aspectMobile: "1:1" }
        : { aspectDesktop: "8:3", aspectTablet: "8:3", aspectMobile: "16:9" },
    [heroState.hasIcon]
  );

  // Memoize computed class names
  const sectionClass = useMemo(
    () =>
      cn(
        className,
        "relative w-full z-10",
        blok?.hero_appearance === "full-width" &&
          heroState.hasImage &&
          heroState.hasConnector &&
          "lg:bg-gray-800",
        blok?.hero_appearance === "full-width" &&
          heroState.hasImage &&
          !heroState.hasConnector &&
          "bg-gray-800",
        heroState.hasIcon && "pt-4 pb-9"
      ),
    [
      className,
      blok?.hero_appearance,
      heroState.hasImage,
      heroState.hasConnector,
      heroState.hasIcon,
    ]
  );

  const heroContainerClass = useMemo(
    () =>
      cn(
        "w-full",
        "lg:container",
        !heroState.hasImage && !heroState.hasConnector && "px-4 mt-4 lg:mt-8",
        blok?.hero_appearance === "constraint" &&
          heroState.hasImage &&
          "px-4 lg:mt-0",
        heroState.hasConnector && "lg:translate-y-4"
      ),
    [blok?.hero_appearance, heroState.hasImage, heroState.hasConnector]
  );

  const contentClass = useMemo(
    () =>
      cn(
        "w-full",
        "p-4",
        !heroState.hasConnector && "bg-gray-800",
        heroState.hasImage &&
          blok?.hero_appearance === "full-width" &&
          "lg:pl-0",
        blok.hero_appearance === "constraint" && "lg:px-8"
      ),
    [heroState.hasConnector, heroState.hasImage, blok?.hero_appearance]
  );

  const imageClass = useMemo(
    () =>
      cn(
        heroState.hasIcon
          ? "w-16 h-16 lg:w-32 lg:h-32 absolute top-8 right-8 lg:top-16 lg:right-0 z-10"
          : "",
        heroState.hasConnector && "shadow-xl"
      ),
    [heroState.hasIcon, heroState.hasConnector]
  );

  return (
    <section className={sectionClass} {...storyblokEditable(blok)}>
      <div className={heroContainerClass}>
        <Connected
          imagePosition="right"
          largeColumnDesktop="right"
          largeColumnMobile="left"
          color={blok?.connector_color}
          disabled={!heroState.hasConnector}>
          <div className={contentClass}>
            <div className="space-y-4">
              {blok.content?.map((child) => (
                <StoryblokComponent key={child._uid} blok={child} />
              ))}
            </div>
          </div>

          {heroState.hasImage && (
            <div className="relative flex-grow p-4">
              {heroState.hasIcon && (
                <Icon
                  className={imageClass}
                  variant="primary"
                  type="solid"
                  size="default"
                />
              )}
              <BlokImage
                asset={blok?.img}
                className="hidden md:block mx-auto max-w-[35rem]"
                aspectDesktop={imageConfig?.aspectDesktop}
                aspectTablet={imageConfig?.aspectTablet}
                aspectMobile={imageConfig?.aspectMobile}
                preset={blok?.preset}
              />
              <BlokImage
                asset={imageMobile}
                className="block md:hidden mx-auto max-w-[12rem]"
                aspectDesktop={imageConfig?.aspectDesktop}
                aspectTablet={imageConfig?.aspectTablet}
                aspectMobile={imageConfig?.aspectMobile}
                preset={blok?.preset}
              />
            </div>
          )}
        </Connected>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
