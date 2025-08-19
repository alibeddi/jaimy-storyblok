export const dynamic = "force-dynamic";

import { getStoryblokApi } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";
import DynamicBlockRenderer from "@/components/DynamicBlockRenderer";
import { SbBlokData } from '@storyblok/react';
import { notFound } from 'next/navigation';

interface StoryBlock {
  component: string;
  _uid: string;
  [key: string]: unknown;
}

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function DynamicPage({ params }: PageProps) {
  // Convert slug array to path string
  const slug = params.slug ? params.slug.join('/') : 'home';
  
  try {
    const { data } = await fetchStoryblokData(slug);
    
    // Extract blocks from the story content
    const storyContent = (
      data as { story?: { content?: { body?: StoryBlock[] } } }
    ).story?.content;
    
    if (!storyContent) {
      notFound();
    }
    
    const blocks = storyContent?.body || [];
    
    console.log("Dynamic page slug:", slug);
    console.log("Story content:", storyContent);
    console.log("Blocks:", blocks);

    return (
      <div>
        <DynamicBlockRenderer blocks={blocks as SbBlokData[]} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching story:', error);
    notFound();
  }
}

async function fetchStoryblokData(slug: string) {
  const { isEnabled } = draftMode();
  
  const sbParams = {
    version: isEnabled ? "draft" : "published" as "draft" | "published",
  };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/${slug}`, {
    version: sbParams.version,
  });
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps) {
  const slug = params.slug ? params.slug.join('/') : 'home';
  
  try {
    const { data } = await fetchStoryblokData(slug);
    const story = data?.story;
    
    return {
      title: story?.content?.seo_title || story?.name || 'Page',
      description: story?.content?.seo_description || 'Dynamic page content',
    };
  } catch {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
}