import { IconColor, IconSize, IconType } from "@/types/ui";
import { SbBlokData, storyblokEditable } from "@storyblok/react";

import IconUI from "../../../ui/Icon";
import React from "react";

interface IconBlok extends SbBlokData {
  variant?: string;
  color?: IconColor;
  type?: IconType;
  size?: IconSize;
  shape?: "none" | "circle" | "square";
  className?: string;
}

interface IconProps {
  blok: IconBlok;
}

const Icon: React.FC<IconProps> = ({ blok }) => {
  if (!blok.variant) {
    return null;
  }

  return (
    <IconUI
      variant={blok.variant}
      color={blok.color}
      type={blok.type}
      size={blok.size}
      shape={blok.shape}
      className={blok.className}
      {...storyblokEditable(blok)}
    />
  );
};

export default Icon;
