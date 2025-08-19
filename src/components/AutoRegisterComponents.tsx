"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { componentMap } from './blok-map';

// Initialize Storyblok with all components from the component map
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: componentMap, // This automatically includes all registered components
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}