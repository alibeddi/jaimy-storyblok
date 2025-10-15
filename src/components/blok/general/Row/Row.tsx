import { SpacingVariant, TextAlign } from "@/types/ui";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import RowUI from "../../../ui/Row"; // Fixed case sensitivity

interface RowBlok {
  component: string;
  _uid: string;
  children?: any[];
  spacing?: SpacingVariant;
  narrow?: boolean;
  appearance?: string;
  background_color?: string;
  background_image?: {
    filename: string;
    alt?: string;
  };
  background_size?: string;
  background_position?: string;
  background_attachment?: string;
  background_repeat?: string;
  background_opacity?: string;
  text_align?: TextAlign;
  padding_x?: SpacingVariant;
  padding_y?: SpacingVariant;
  max_width?: string;
  [key: string]: any;
}

interface RowProps {
  blok: RowBlok;
}

const Row: React.FC<RowProps> = ({ blok }) => {
  const childrenWithProps = blok.children?.map((child) => (
    <StoryblokComponent key={child._uid} blok={child} />
  ));
  console.log("🔍 Row Debug:", {
    spacing: blok.spacing,
    narrow: blok.narrow,
    appearance: blok.appearance,
    background_color: blok.background_color,
    text_align: blok.text_align,
    padding_x: blok.padding_x,
    padding_y: blok.padding_y,
    max_width: blok.max_width,
  });
  return (
    <div {...storyblokEditable(blok)}>
      <RowUI
        spacing={blok.spacing}
        narrow={blok.narrow}
        appearance={blok.appearance}
        backgroundColor={blok.background_color}
        backgroundImage={blok.background_image}
        backgroundSize={blok.background_size}
        backgroundPosition={blok.background_position}
        backgroundAttachment={blok.background_attachment}
        backgroundRepeat={blok.background_repeat}
        backgroundOpacity={blok.background_opacity}
        textAlign={blok.text_align}
        paddingX={blok.padding_x}
        paddingY={blok.padding_y}
        maxWidth={blok.max_width}>
        {childrenWithProps}
      </RowUI>
    </div>
  );
};

export default Row;
