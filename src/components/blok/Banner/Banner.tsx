 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import BannerUISelector from '../../ui/Banner';
import { IconType, IconColor, ContentWidth } from '../../../types/ui';

interface BannerBlok {
  img_mobile?: {
    filename: string;
    alt?: string;
  };
  img?: {
    filename: string;
    alt?: string;
  };
  background_color?: string;
  icon_variant?: string;
  icon_type?: IconType;
  icon_color?: IconColor;
  icon_mobile_disable?: boolean;
  content_width?: ContentWidth;
  content_width_tablet?: ContentWidth;
  type?: "simple" | "simple-connector" | "constrained" | "constrained-connector" | "full-background";
  content?: any;
  usp_bar?: any;
  // Remove unsupported props
  // content_background, preset, connector_color are not supported by BannerUISelector
  [key: string]: any;
}

interface BannerProps {
  className?: string;
  blok: BannerBlok;
}

const Banner: React.FC<BannerProps> = ({ className, blok }) => {
  const imageMobile = blok.img_mobile?.filename ? blok.img_mobile : blok.img;

  return (
    <BannerUISelector
      className={className}
      backgroundColor={blok.background_color}
      iconVariant={blok.icon_variant}
      iconType={blok.icon_type}
      iconColor={blok.icon_color}
      iconMobileDisable={blok.icon_mobile_disable}
      contentWidth={blok.content_width}
      contentWidthTablet={blok.content_width_tablet}
      image={blok.img}
      imageMobile={imageMobile}
      type={blok.type}
      content={blok.content}
      uspBar={blok.usp_bar}
      {...storyblokEditable(blok)}
    />
  );
};

export default Banner;