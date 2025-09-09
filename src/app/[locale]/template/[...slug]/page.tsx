import { getStoryblokApi } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import TemplatePage from "../page";
import { PageBlok } from "@/types/storyblok";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
}

export default async function DynamicTemplatePage({ params }: Props) {
  const { slug, locale } = await params;
  const slugPath = slug?.length ? slug.join("/") : "template";

  try {
    const { data } = await fetchTemplateData(slugPath, locale);
    const storyContent = data?.story?.content as PageBlok;

    if (!storyContent) {
      notFound();
    }

    return <TemplatePage blok={storyContent} />;
  } catch (error) {
    console.error("Error fetching template:", error);
    notFound();
  }
}

async function fetchTemplateData(slug: string, locale: string) {
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
  const slugPath = slug?.length ? slug.join("/") : "template";

  try {
    const { data } = await fetchTemplateData(slugPath, locale);
    const story = data?.story;
    const content = story?.content as PageBlok;

    const seo = content?.seo;
    const title = seo?.title || `${story?.name || "Template"} - Jaimy`;
    const description =
      seo?.description || "Template page for testing Storyblok components";

    return {
      title,
      description,
      robots: "noindex, nofollow", // Template pages should not be indexed
    };
  } catch {
    return {
      title: "Template Not Found",
      description: "The requested template could not be found.",
    };
  }
}

