/* eslint-disable @typescript-eslint/no-explicit-any */

import { getStoryblokApi } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Blok from "@/components";
import { SbBlokData } from "@storyblok/react";
import { PageBlok } from "@/types/storyblok";

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
    const content = story?.content as PageBlok;

    // Handle robots meta tag with enhanced options
    const getRobotsContent = (robots?: string) => {
      switch (robots) {
        case "noindex,nofollow":
          return "noindex, nofollow";
        case "index,nofollow":
          return "index, nofollow";
        case "noindex,follow":
          return "noindex, follow";
        case "noindex":
          return "noindex";
        case "nofollow":
          return "nofollow";
        default:
          return "index, follow";
      }
    };

    const seo = content?.seo;
    const title = seo?.title || story?.name || "Page";
    const description = seo?.description || "Dynamic page content";
    const ogTitle = seo?.og_title || title;
    const ogDescription = seo?.og_description || description;
    const ogImage = seo?.og_image?.filename || "";
    const twitterTitle = seo?.twitter_title || ogTitle;
    const twitterDescription = seo?.twitter_description || ogDescription;
    const twitterImage = seo?.twitter_image?.filename || ogImage;
    const robotsContent = getRobotsContent(seo?.robots);
    const canonicalUrl = seo?.canonical_url || "";
    const keywords = seo?.keywords || "";

    return {
      title,
      description,
      keywords,
      robots: robotsContent,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        images: ogImage ? [{ url: ogImage }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: twitterTitle,
        description: twitterDescription,
        images: twitterImage ? [twitterImage] : [],
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }
}
