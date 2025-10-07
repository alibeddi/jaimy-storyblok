import {
  HeadingTag,
  HeadingType,
  SizeVariant,
  SpacingVariant,
  TextAlign,
  TextColor,
} from "@/types/ui";

import HeadingUI from "../../../ui/Heading";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import RichText from "../../../ui/RichText";
import { storyblokEditable } from "@storyblok/react";

interface HeadingBlok {
  component: string;
  title: string | any; // Can be string or rich text object
  size: SizeVariant;
  tag?: HeadingTag;
  type?: HeadingType;
  id?: string;
  color?: TextColor;
  text_align?: TextAlign;
  margin_bottom?: SpacingVariant;
  [key: string]: any;
}

interface HeadingProps {
  className?: string;
  blok: HeadingBlok;
}

const Heading: React.FC<HeadingProps> = ({ className, blok }) => {
  // Check if title is a rich text object or a simple string
  const isRichText = typeof blok.title === "object" && blok.title !== null;
  const titleContent = typeof blok.title === "string" ? blok.title : "";

  return (
    <HeadingUI
      title={titleContent}
      id={blok.id}
      className={className}
      tag={blok.tag}
      type={blok.type}
      size={blok.size}
      color={blok.color}
      textAlign={blok.text_align}
      marginBottom={blok.margin_bottom}
      {...storyblokEditable(blok)}>
      {isRichText ? <RichText content={blok.title} /> : titleContent}
    </HeadingUI>
  );
};

export default Heading;
