import { SpacingVariant, TextAlign } from "@/types/ui";
import { storyblokEditable } from "@storyblok/react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import RowUI from "../../../ui/Row"; // Fixed case sensitivity
import Blok from "@/components/Blok";

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
  // Flex & layout - from 'general' group advanced controls
  display?: string; // "flex" | "grid" | "block"
  flex_direction?: string; // row | row-reverse | col | col-reverse
  justify_content?: string; // start | center | end | between | around | evenly
  align_items?: string; // start | center | end | stretch | baseline
  align_content?: string; // start | center | end | between | around | evenly
  justify_items?: string; // grid only, harmless for flex
  flex_wrap?: string; // wrap | nowrap | wrap-reverse
  gap?: string; // none | xs | sm | default | md | lg | xl
  [key: string]: any;
}

interface RowProps {
  blok: RowBlok;
}

const Row: React.FC<RowProps> = ({ blok }) => {
  const childrenWithProps = blok.children?.map((child) => (
    <Blok key={child._uid} blok={child} />
  ));

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
        maxWidth={blok.max_width}
        display={blok.display}
        flexDirection={blok.flex_direction}
        justifyContent={blok.justify_content}
        alignItems={blok.align_items}
        alignContent={blok.align_content}
        justifyItems={blok.justify_items}
        flexWrap={blok.flex_wrap}
        gap={blok.gap}>
        {childrenWithProps}
      </RowUI>
    </div>
  );
};

export default Row;
