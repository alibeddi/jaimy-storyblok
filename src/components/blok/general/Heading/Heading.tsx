"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react";
// import sourcesConfig from '../../config/sources';
import HeadingUI from "../../../ui/Heading";
import {
  HeadingTag,
  HeadingType,
  SizeVariant,
  TextColor,
  TextAlign,
  SpacingVariant,
} from "@/types/ui";
import "@/types/storyblok-bridge";

interface HeadingBlok {
  component: string;
  title: string | { content: string };
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
  const titleContent =
    typeof blok.title === "string" ? blok.title : blok.title?.content || "";

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(titleContent);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setText(titleContent);
  }, [titleContent]);

  const handleClick = () => {
    if (typeof window !== "undefined" && window.storyblok) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Trigger Storyblok save
    if (typeof window !== "undefined" && window.storyblok) {
      window.storyblok.saveDraft();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
      if (typeof window !== "undefined" && window.storyblok) {
        window.storyblok.saveDraft();
      }
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setText(titleContent);
    }
  };

  if (isEditing) {
    const Tag = (blok?.tag as keyof React.JSX.IntrinsicElements) || "h1";
    return (
      <Tag
        {...storyblokEditable(blok)}
        className={`${className || ""} outline-none border-2 border-blue-500 rounded px-2 py-1`}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: text }}
        style={{ minHeight: "1.5rem" }}
      />
    );
  }

  return (
    <div
      className={`${className || ""} ${
        isHovered
          ? "bg-blue-50 border border-blue-200 rounded px-2 py-1 cursor-pointer"
          : ""
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HeadingUI
        title={text}
        id={blok?.id}
        tag={blok?.tag}
        type={blok?.type}
        size={blok.size}
        color={blok?.color}
        textAlign={blok?.text_align}
        marginBottom={blok?.margin_bottom}
        {...storyblokEditable(blok)}
      >
        {text || "Click to edit"}
      </HeadingUI>
    </div>
  );
};

export default Heading;
