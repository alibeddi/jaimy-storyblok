"use client";

import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import React from "react";
import type { TrustBadgeBlok } from "@/types/storyblok";
import { TrustBadge as TrustBadgeUI } from "@/components/ui/TrustBadge";

type NestedBlok = {
  component: "heading" | "rich_text" | "image";
  _uid: string;
  [key: string]: unknown;
};

export default function TrustBadge({ blok }: { blok: TrustBadgeBlok }) {
  const nested: NestedBlok[] = ((
    blok as unknown as { children?: NestedBlok[]; body?: NestedBlok[] }
  ).children ??
    (blok as unknown as { children?: NestedBlok[]; body?: NestedBlok[] })
      .body ??
    []) as NestedBlok[];

  const heading = nested.find((b) => b.component === "heading");
  const richText = nested.find((b) => b.component === "rich_text");
  const image = nested.find((b) => b.component === "image");

  return (
    <div {...storyblokEditable(blok)}>
      <TrustBadgeUI
        titleSlot={heading ? <StoryblokComponent blok={heading} /> : undefined}
        textSlot={richText ? <StoryblokComponent blok={richText} /> : undefined}
        imageSlot={image ? <StoryblokComponent blok={image} /> : undefined}
      />
    </div>
  );
}
