"use client";

import { useEffect, useState } from "react";

import { storyblokEditable } from "@storyblok/react";

interface InlineEditableTextProps {
  blok: {
    _uid: string;
    text: string;
    component: string;
    tag?: string;
    className?: string;
    placeholder?: string;
  };
}

export default function InlineEditableText({ blok }: InlineEditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(blok.text || "");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setText(blok.text || "");
  }, [blok.text]);

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
      setText(blok.text || "");
    }
  };

  const Tag = (blok.tag as keyof React.JSX.IntrinsicElements) || "p";

  if (isEditing) {
    return (
      <Tag
        {...storyblokEditable(blok)}
        className={`${
          blok.className || ""
        } outline-none border-2 border-blue-500 rounded px-2 py-1`}
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
    <Tag
      {...storyblokEditable(blok)}
      className={`${blok.className || ""} ${
        isHovered
          ? "bg-blue-50 border border-blue-200 rounded px-2 py-1 cursor-pointer"
          : ""
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: "1.5rem" }}>
      {text || blok.placeholder || "Click to edit"}
    </Tag>
  );
}
