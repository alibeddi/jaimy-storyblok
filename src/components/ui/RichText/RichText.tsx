"use client";

import React from "react";
import { render } from "storyblok-rich-text-react-renderer";
import { cn } from "@/lib/utils";
import { RichTextProps } from "@/types/ui";

const RichText: React.FC<RichTextProps> = ({
  className,
  content,
  maxWidth = "100%",
  ...rest
}) => {
  if (!content) return null;

  const baseStyles = cn(
    "prose prose-gray max-w-none",
    "prose-headings:font-semibold prose-headings:text-foreground",
    "prose-p:text-foreground prose-p:leading-relaxed",
    "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
    "prose-strong:text-foreground prose-strong:font-semibold",
    "prose-ul:text-foreground prose-ol:text-foreground",
    "prose-li:text-foreground",
    "prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary",
    "prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
    "prose-pre:bg-muted prose-pre:border",
    className
  );

  return (
    <div className={baseStyles} style={{ maxWidth }} {...rest}>
      {render(content)}
    </div>
  );
};

export default RichText;
