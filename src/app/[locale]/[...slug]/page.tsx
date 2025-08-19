 /* eslint-disable @typescript-eslint/no-explicit-any */


export const dynamic = "force-dynamic";

import { getStoryblokApi } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Blok from "@/components";
import { SbBlokData } from "@storyblok/react";

interface StoryBlock {
  component: string;
  _uid: string;
  [key: string]: unknown;
}

interface Props {
  params: {
    locale: string;
    slug: string[];
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface BlokData extends SbBlokData {
  component: string;
  _uid: string;
}

export default async function DynamicPage({ params }: any) {
  const slug = params.slug ? params.slug.join("/") : "home";

  try {
    const { data } = await fetchStoryblokData(slug);
    const storyContent = (
      data as { story?: { content?: { body?: StoryBlock[] } } }
    ).story?.content;

    if (!storyContent) {
      notFound();
    }

    const blocks = storyContent?.body || [];

    return (
      <div>
        {blocks.map((blok) => (
          <Blok key={(blok as SbBlokData)._uid} blok={blok as BlokData} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching story:", error);
    notFound();
  }
}

async function fetchStoryblokData(slug: string) {
  const { isEnabled } = await draftMode();

  const sbParams = {
    version: (isEnabled ? "draft" : "published") as "draft" | "published",
  };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/${slug}`, { version: sbParams.version });
}

export async function generateMetadata({ params }: any) {
  const slug = params.slug ? params.slug.join("/") : "home";

  try {
    const { data } = await fetchStoryblokData(slug);
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
