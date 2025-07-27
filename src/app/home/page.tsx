import { getStoryblokApi } from "@storyblok/react/rsc";
import Header from "@/components/blocks/Header";
import Hero from "@/components/blocks/Hero";
import Steps from "@/components/blocks/Steps";
import Body from "@/components/blocks/Body";
import Blogs from "@/components/blocks/Blogs";
import Reviews from "@/components/blocks/Reviews";
import SocialProof from "@/components/blocks/SocialProof";
import FAQ from "@/components/blocks/FAQ";
import Footer from "@/components/blocks/Footer";
import { draftMode } from "next/headers";

interface StoryBlock {
  component: string;
  _uid: string;
  [key: string]: unknown;
}

export default async function Home() {
  const { data } = await fetchData();

  // Extract blocks from the story content
  const storyContent = (
    data as { story?: { content?: { body?: StoryBlock[] } } }
  ).story?.content;
  const blocks = storyContent?.body || [];

  // Find specific blocks
  const headerBlock = blocks.find(
    (block: StoryBlock) => block.component === "header"
  );
  const heroBlock = blocks.find(
    (block: StoryBlock) => block.component === "hero"
  );
  const stepsBlock = blocks.find(
    (block: StoryBlock) => block.component === "steps"
  );
  const bodyBlock = blocks.find(
    (block: StoryBlock) => block.component === "body"
  );
  const blogsBlock = blocks.find(
    (block: StoryBlock) => block.component === "blogs"
  );
  const reviewsBlock = blocks.find(
    (block: StoryBlock) => block.component === "reviews"
  );
  const socialProofBlock = blocks.find(
    (block: StoryBlock) => block.component === "social_proof"
  );
  const faqBlock = blocks.find(
    (block: StoryBlock) => block.component === "faq"
  );
  const footerBlock = blocks.find(
    (block: StoryBlock) => block.component === "footer"
  );

  return (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {headerBlock && <Header blok={headerBlock as any} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {heroBlock && <Hero blok={heroBlock as any} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {stepsBlock && <Steps blok={stepsBlock as any} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {bodyBlock && <Body blok={bodyBlock as any} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {blogsBlock && <Blogs blok={blogsBlock as any} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {reviewsBlock && <Reviews blok={reviewsBlock as any} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {socialProofBlock && <SocialProof blok={socialProofBlock as any} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {faqBlock && <FAQ blok={faqBlock as any} />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {footerBlock && <Footer blok={footerBlock as any} />}
    </div>
  );
}

async function fetchData() {
  const { isEnabled } = await draftMode();

  const sbParams = {
    version: isEnabled ? "draft" : ("published" as const),
  };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get("cdn/stories/home", {
    version: sbParams.version as "draft" | "published",
  });
}
