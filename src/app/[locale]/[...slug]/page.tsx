/* eslint-disable @typescript-eslint/no-explicit-any */

import Blok from "@/components";
import { SbBlokData } from "@storyblok/react";
import { draftMode } from "next/headers";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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

export default async function DynamicPage({ params, searchParams }: Props) {
  const { slug, locale } = await params;
  const sp = (await searchParams) || {};
  const forceDraft = typeof sp._storyblok !== "undefined";
  const slugPath = slug?.length ? slug.join("/") : "home";

  // Enable draft mode when in Storyblok editor
  if (forceDraft) {
    const draft = await draftMode();
    draft.enable();
  }

  try {
    const { data } = await fetchStoryblokData(slugPath, locale, forceDraft);
    const storyContent = data?.story?.content;

    if (!storyContent) {
      notFound();
    }

    const blocks = storyContent?.body || [];

    // Pass story data to StoryblokProvider via a script tag
    const storyData = data?.story;

    return (
      <>
        {storyData && (
          <script
            id="storyblok-story-data"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(storyData),
            }}
          />
        )}
        <div>
          {blocks.map((blok: any) => (
            <Blok key={(blok as SbBlokData)._uid} blok={blok as BlokData} />
          ))}
        </div>
      </>
    );
  } catch (error: any) {
    console.error("Error fetching story:", error);

    // Handle 404 errors gracefully - show empty page for new stories
    if (error?.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">
              Creating New Story...
            </h1>
            <p className="text-gray-500">
              This story is being created. Please add content in the Storyblok
              editor.
            </p>
          </div>
        </div>
      );
    }

    notFound();
  }
}

async function fetchStoryblokData(
  slug: string,
  locale: string,
  forceDraft = false
) {
  try {
    const { isEnabled } = await draftMode();
    const version = (isEnabled || forceDraft ? "draft" : "published") as
      | "draft"
      | "published";

    const storyblokApi = getStoryblokApi();
    return await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      language: locale,
      fallback_lang: "fr",
    });
  } catch (error: any) {
    // Re-throw the error with status information
    throw {
      ...error,
      status: error?.response?.status || error?.status || 500,
      message: error?.message || "Failed to fetch story",
    };
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const slugPath = slug?.length ? slug.join("/") : "home";

  try {
    const { data } = await fetchStoryblokData(slugPath, locale);
    const story = data?.story;

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

    // Extract SEO data from the first SEO block in the story
    const seoData = story?.content?.body?.find(
      (block: { component: string }) => block.component === "seo"
    );

    const title =
      seoData?.title || story?.content?.seo_title || story?.name || "Page";
    const description =
      seoData?.description ||
      story?.content?.seo_description ||
      "Dynamic page content";
    const ogTitle = seoData?.og_title || title;
    const ogDescription = seoData?.og_description || description;
    const ogImage = seoData?.og_image?.filename || "";
    const twitterTitle = seoData?.twitter_title || ogTitle;
    const twitterDescription = seoData?.twitter_description || ogDescription;
    const twitterImage = seoData?.twitter_image?.filename || ogImage;
    const robotsContent = getRobotsContent(seoData?.robots);
    const canonicalUrl = seoData?.canonical_url || "";
    const keywords = seoData?.keywords || "";

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
  } catch (error: any) {
    // Handle 404 errors for new stories
    if (error?.status === 404) {
      return {
        title: "Creating New Story",
        description:
          "This story is being created. Please add content in the Storyblok editor.",
      };
    }

    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }
}
