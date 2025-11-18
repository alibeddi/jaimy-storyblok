/* eslint-disable @typescript-eslint/no-explicit-any */

import Blok from "@/components";
import { SbBlokData } from "@storyblok/react";
import { draftMode } from "next/headers";
import { getCachedStory } from "@/lib/storyblok-cache";
import { notFound } from "next/navigation";

// Use static generation with ISR
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

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
    const { isEnabled } = await draftMode();
    const version = (isEnabled || forceDraft ? "draft" : "published") as "draft" | "published";

    // Use cached story fetching
    const { story } = await getCachedStory(slugPath, locale, version);
    const storyContent = story?.content;

    if (!storyContent) {
      notFound();
    }

    const blocks = storyContent?.body || [];

    // Pass story data to StoryblokProvider via a script tag
    const storyData = story;

    if (blocks.length === 0) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1>No content blocks found</h1>
          <p>Story: {slugPath}</p>
          <p>Locale: {locale}</p>
        </div>
      );
    }

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
        <div suppressHydrationWarning>
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

/**
 * Generate static params for all published stories
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  try {
    const { getStoryblokApi } = await import("@storyblok/react/rsc");
    const storyblokApi = getStoryblokApi();

    // Fetch all links (stories)
    const { data } = await storyblokApi.get('cdn/links', {
      version: 'published',
    });

    const paths: Array<{ slug: string[]; locale: string }> = [];

    // Generate paths for all stories
    if (data.links) {
      Object.values(data.links).forEach((link: unknown) => {
        const typedLink = link as { is_folder?: boolean; slug?: string; lang?: string };
        if (!typedLink.is_folder && typedLink.slug) {
          const slug = typedLink.slug === 'home' ? [] : typedLink.slug.split('/');

          // Generate for all locales
          ['en', 'nl', 'fr'].forEach((locale) => {
            paths.push({
              slug,
              locale,
            });
          });
        }
      });
    }

    console.log(`[Static Generation] Generated ${paths.length} static paths`);
    return paths;
  } catch (error) {
    console.error('[Static Generation] Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const slugPath = slug?.length ? slug.join("/") : "home";

  try {
    // Use cached story for metadata
    const { story } = await getCachedStory(slugPath, locale, 'published');

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
