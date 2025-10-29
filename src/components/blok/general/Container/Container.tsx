import {
  IconColor,
  IconSize,
  IconType,
  SpacingVariant,
  TextAlign,
} from "@/types/ui";
import { storyblokEditable } from "@storyblok/react";

import ContainerUI from "../../../ui/Container";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Blok from "@/components/Blok";

interface ChildBlok {
  component: string;
  _uid: string;
  [key: string]: any;
}

interface BackgroundImageBlok {
  filename: string;
  alt?: string;
}

interface ContainerBlok {
  component: string;
  children?: ChildBlok[];
  max_width?: string;
  padding?: SpacingVariant;
  icon_variant?: string;
  icon_type?: IconType;
  icon_color?: IconColor;
  icon_size?: IconSize;
  icon_spacing?: SpacingVariant;
  background_color?: string;
  background_image?: BackgroundImageBlok;
  background_size?: string;
  background_position?: string;
  background_attachment?: string;
  background_repeat?: string;
  background_opacity?: string | number;
  grow?: boolean;
  // Flex & layout properties
  display?: string; // "flex" | "grid" | "block"
  flex_direction?: string; // row | row-reverse | col | col-reverse
  justify_content?: string;
  align_items?: string; // start | center | end | stretch | baseline
  align_content?: string;
  justify_items?: string; // grid only
  flex_wrap?: string; // wrap | nowrap | wrap-reverse
  gap?: string; // none | xs | sm | default | md | lg | xl
  text_align?: TextAlign;
  padding_x?: SpacingVariant;
  padding_top?: SpacingVariant;
  padding_bottom?: SpacingVariant;
  preset?: string;
  [key: string]: any;
}

interface ContainerProps {
  blok: ContainerBlok;
}

const Container: React.FC<ContainerProps> = ({ blok }) => {
  const hasIcon = blok.icon_type && blok.icon_type !== "default";

  return (
    <ContainerUI
      maxWidth={
        blok?.max_width &&
          ["sm", "md", "lg", "xl", "2xl", "full"].includes(blok.max_width)
          ? (blok.max_width as "sm" | "md" | "lg" | "xl" | "2xl" | "full")
          : undefined
      }
      padding={blok?.padding}
      // Icon props
      hasIcon={hasIcon}
      iconVariant={blok?.icon_variant}
      iconType={blok?.icon_type}
      iconColor={blok?.icon_color}
      iconSize={blok?.icon_size}
      iconSpacing={blok?.icon_spacing}
      // Background props
      backgroundColor={blok?.background_color}
      backgroundImage={blok?.background_image}
      backgroundSize={blok?.background_size}
      backgroundPosition={blok?.background_position}
      backgroundAttachment={blok?.background_attachment}
      backgroundRepeat={blok?.background_repeat}
      backgroundOpacity={blok.background_opacity}
      // Flex & layout props
      display={blok?.display}
      flexDirection={blok?.flex_direction}
      justifyContent={blok?.justify_content}
      alignItems={blok?.align_items}
      alignContent={blok?.align_content}
      justifyItems={blok?.justify_items}
      flexWrap={blok?.flex_wrap}
      gap={blok?.gap}
      grow={blok?.grow}
      textAlign={blok?.text_align}
      paddingX={blok?.padding_x}
      paddingTop={blok?.padding_top}
      paddingBottom={blok?.padding_bottom}
      // preset={blok.preset}
      {...storyblokEditable(blok)}>
      {blok.children?.map((child) => (
        <Blok key={child._uid} blok={child} />
      ))}
    </ContainerUI>
  );
};

export default Container;
