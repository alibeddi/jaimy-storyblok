"use client";

import { SbBlokData } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

interface InlineTextBlok extends SbBlokData {
  component: "inline_text";
  text?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  style?: "default" | "highlight" | "muted" | "bold";
}

export default function InlineText({ blok }: { blok: InlineTextBlok }) {
  const { text = "", tag = "p", className = "", style = "default" } = blok;

  const getStyleClasses = () => {
    switch (style) {
      case "highlight":
        return "text-blue-600 font-semibold";
      case "muted":
        return "text-gray-500";
      case "bold":
        return "font-bold";
      default:
        return "";
    }
  };

  const commonProps = {
    ...storyblokEditable(blok),
    className: `${getStyleClasses()} ${className}`.trim(),
  };

  switch (tag) {
    case "h1":
      return <h1 {...commonProps}>{text}</h1>;
    case "h2":
      return <h2 {...commonProps}>{text}</h2>;
    case "h3":
      return <h3 {...commonProps}>{text}</h3>;
    case "h4":
      return <h4 {...commonProps}>{text}</h4>;
    case "h5":
      return <h5 {...commonProps}>{text}</h5>;
    case "h6":
      return <h6 {...commonProps}>{text}</h6>;
    case "span":
      return <span {...commonProps}>{text}</span>;
    default:
      return <p {...commonProps}>{text}</p>;
  }
}
