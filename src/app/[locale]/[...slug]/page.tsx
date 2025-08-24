/* eslint-disable @typescript-eslint/no-explicit-any */

import { getStoryblokApi } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Blok from "@/components";
import { SbBlokData } from "@storyblok/react";

export const dynamic = "force-dynamic";

interface StoryBlock {
  component: string;
  _uid: string;
  [key: string]: unknown;
}

interface Props {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface BlokData extends SbBlokData {
  component: string;
  _uid: string;
}

export default async function DynamicPage({ params }: Props) {
  const { slug, locale } = await params;
  const slugPath = slug?.length ? slug.join("/") : "home";

  try {
    const { data } = await fetchStoryblokData(slugPath, locale);
    const storyContent = data?.story?.content;

    if (!storyContent) {
      notFound();
    }

    const blocks = storyContent?.body || [];

    return (
      <div>
        {blocks.map((blok: any) => (
          <Blok key={(blok as SbBlokData)._uid} blok={blok as BlokData} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching story:", error);
    notFound();
  }
}

async function fetchStoryblokData(slug: string, locale: string) {
  const { isEnabled } = await draftMode();

  const version = (isEnabled ? "draft" : "published") as "draft" | "published";

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/${slug}`, {
    version,
    language: locale,
    fallback_lang: "fr",
  });
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const slugPath = slug?.length ? slug.join("/") : "home";

  try {
    const { data } = await fetchStoryblokData(slugPath, locale);
    const story = data?.story;

    return {
      title: story?.content?.seo_title || story?.name || "Page",
      description: story?.content?.seo_description || "Dynamic page content",
    };
  } catch {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }
}
