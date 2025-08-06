export const dynamic = "force-dynamic";

import Slider from "@/components/blocks/Slider";
import Blogs from "@/components/blocks/Blogs";
import Reviews from "@/components/blocks/Reviews";
import SocialProof from "@/components/blocks/SocialProof";
import FAQ from "@/components/blocks/FAQ";
import Footer from "@/components/blocks/Footer";
import Header from "@/components/blocks/Header";
import Hero from "@/components/blocks/Hero";
import Steps from "@/components/blocks/Steps";


import { getStoryblokApi } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";
import {
  HeaderBlok,
  HeroBlok,
  StepsBlok,
  SliderBlok,
  BlogsBlok,
  ReviewsBlok,
  SocialProofBlok,
  FAQBlok,
  FooterBlok,
} from "@/types/storyblok";

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
  console.log("storyContent", storyContent);
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
  const sliderBlock = blocks.find(
    (block: StoryBlock) => block.component === "features"
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
    (block: StoryBlock) => block.component === "FAQ"
  );
  const footerBlock = blocks.find(
    (block: StoryBlock) => block.component === "footer"
  );
  console.log("blocks", blocks);
  console.log("faqBlock", faqBlock);

  return (
    <div>
      <Header blok={headerBlock as HeaderBlok} />
    
      {heroBlock && <Hero blok={heroBlock as HeroBlok} />}
      {<Steps blok={stepsBlock as StepsBlok} />}
    
      <Slider blok={sliderBlock as SliderBlok} />
      {<Blogs blok={blogsBlock as BlogsBlok} />}
      <Reviews blok={reviewsBlock as ReviewsBlok} />
      <SocialProof blok={socialProofBlock as SocialProofBlok} />
      {faqBlock && <FAQ blok={faqBlock as FAQBlok} />}
      <Footer blok={footerBlock as FooterBlok} />
    
    </div>
  );
}

async function fetchData() {
  // const { isEnabled } = await draftMode();

  const sbParams = {
    version: "draft",
    // version: isEnabled ? "draft" : ("published" as const),
  };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get("cdn/stories/home", {
    version: sbParams.version as "draft" | "published",
  });
}
