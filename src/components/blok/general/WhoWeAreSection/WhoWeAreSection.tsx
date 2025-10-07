import {
  WhoWeAreItem,
  WhoWeAreItemProps,
} from "../../../ui/WhoWeAreSection/WhoWeAreSection";

import { BlokImage } from "../../../ui/BlokImage";
import { Column } from "../../../ui/Column";
import { Columns } from "../../../ui/Columns";
import { Container } from "../../../ui/Container";
import { Heading } from "../../../ui/Heading";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { storyblokEditable } from "@storyblok/react";

// Define BlokProps interface if it doesn't exist in storyblok types
interface BlokProps {
  _uid: string;
  component: string;
  [key: string]: any;
}

export interface WhoWeAreSectionBlokProps extends BlokProps {
  title?: string;
  subtitle?: string;
  media?: {
    filename: string;
    alt?: string;
  };
  whoWeAreItems?: {
    _uid: string;
    component: string;
    icon: string;
    title: string;
    description: string;
  }[];
  icon_color?: string;
  icon_bg_color?: string;
  layout?: "media_left" | "media_right";
}

export const WhoWeAreSection: React.FC<{ blok: WhoWeAreSectionBlokProps }> = ({
  blok,
}) => {
  const whoWeAreItems =
    blok.who_we_are_items?.map((feature: any) => ({
      icon: feature.icon || "",
      title: feature.title || "",
      description: feature.description || "",
    })) || [];

  // Custom icon styling based on Storyblok settings
  const iconColor = blok.icon_color || "text-red-600";
  const iconBgColor = blok.icon_bg_color || "bg-red-100";
  const featureIconClassName = `w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${iconBgColor} ${iconColor} mb-2 sm:mb-3`;

  // Handle layout direction
  const isMediaRight = blok.layout === "media_right";
  const mediaColumn = (
    <div className="order-2 lg:order-1">
      {blok.media?.filename ? (
        <div className="media-container">
          <img
            src={blok.media.filename}
            alt={blok.media.alt || ""}
            className="w-full h-auto rounded-lg shadow-soft"
          />
        </div>
      ) : (
        <div
          className="
      bg-media-placeholder rounded-lg flex items-center justify-center h-64 lg:h-80 shadow-soft
    
    ">
          <span className="text-text-muted font-medium text-lg">
            {"Video or Image"}
          </span>
        </div>
      )}
    </div>
  );

  const contentColumn = (
    <div className="order-1 lg:order-2">
      {blok.title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          {blok.title}
        </h2>
      )}
      {blok.subtitle && (
        <p className="text-base md:text-lg text-text-muted mb-8">
          {blok.subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {whoWeAreItems.map((feature: any, index: number) => {
          const iconKey = feature.icon;
          return (
            <WhoWeAreItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div {...storyblokEditable(blok)}>
      <section className="py-section bg-background">
        <Container className="w-full mx-2 max-w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {!isMediaRight ? (
              <>
                {mediaColumn}
                {contentColumn}
              </>
            ) : (
              <>
                {contentColumn}
                {mediaColumn}
              </>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};
