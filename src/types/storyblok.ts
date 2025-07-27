// Base Storyblok types
export interface StoryblokStory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  created_at: string;
  published_at: string;
  first_published_at: string;
  release_id: number;
  lang: string;
  content: StoryblokComponent;
  tag_list: string[];
  is_startpage: boolean;
  parent_id: number;
  meta_robots: string;
  sort_by_date: string;
  alternates: unknown[];
  translated_slugs: unknown[];
}

// Base component interface
export interface StoryblokComponent<T extends string = string> {
  _uid: string;
  component: T;
  [key: string]: unknown;
}

// Import the SbBlokData type from Storyblok
import type { SbBlokData } from "@storyblok/react/rsc";

// Component-specific types based on your Storyblok schema
export interface ReviewsBlok extends SbBlokData {
  component: "reviews";
  title?: string;
  subtitle?: string;
  description?: string;
  reviews?: Array<{
    name: string;
    role?: string;
    company?: string;
    rating: number;
    review_text: string;
    avatar?: {
      filename: string;
      alt?: string;
    };
    date?: string;
  }>;
  layout?: "grid-2" | "grid-3" | "carousel";
  show_rating?: boolean;
  background_color?: string;
}

export interface HeroBlok extends SbBlokData {
  component: "hero";
  headline?: string;
  subheadline?: string;
  description?: string;
  primary_button?: Array<{
    label: string;
    link: {
      cached_url: string;
    };
  }>;
  secondary_button?: Array<{
    label: string;
    link: {
      cached_url: string;
    };
  }>;
  hero_image?: {
    filename: string;
    alt?: string;
  };
}

export interface StepsBlok extends SbBlokData {
  component: "steps";
  title?: string;
  subtitle?: string;
  steps?: Array<{
    step_number: string;
    title: string;
    description: string;
    icon?: {
      filename: string;
      alt?: string;
    };
  }>;
}

export interface HeaderBlok extends SbBlokData {
  component: "header";
  logo?: {
    filename: string;
    alt?: string;
  };
  navigation?: Array<{
    label: string;
    link: {
      cached_url: string;
    };
  }>;
  cta_button?: Array<{
    label: string;
    link: {
      cached_url: string;
    };
  }>;
}

export interface BlogsBlok extends SbBlokData {
  component: "blogs";
  title?: string;
  subtitle?: string;
  description?: string;
  blog_posts?: Array<{
    title: string;
    excerpt: string;
    author: string;
    date: string;
    read_time: string;
    image?: {
      filename: string;
      alt?: string;
    };
    link: {
      cached_url: string;
    };
    category?: string;
  }>;
  view_all_button?: Array<{
    label: string;
    link: {
      cached_url: string;
    };
  }>;
  layout?: "grid-2" | "grid-3" | "grid-4";
}

export interface SocialProofBlok extends SbBlokData {
  component: "social_proof";
  title?: string;
  subtitle?: string;
  description?: string;
  logos?: Array<{
    logo: {
      filename: string;
      alt?: string;
    };
    company_name?: string;
  }>;
  statistics?: Array<{
    number: string;
    label: string;
    description?: string;
  }>;
  testimonials?: Array<{
    text: string;
    author: string;
    company?: string;
  }>;
  layout?: "logos-only" | "stats-only" | "mixed";
  background_color?: string;
}

export interface FAQBlok extends SbBlokData {
  component: "faq";
  title?: string;
  subtitle?: string;
  description?: string;
  faq_items?: Array<{
    question: string;
    answer: string;
  }>;
  layout?: "single-column" | "two-column";
  background_color?: string;
}

export interface FooterBlok extends SbBlokData {
  component: "footer";
  logo?: {
    filename: string;
    alt?: string;
  };
  company_description?: string;
  navigation_sections?: Array<{
    title: string;
    links: Array<{
      label: string;
      link: {
        cached_url: string;
      };
    }>;
  }>;
  social_links?: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
  contact_info?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  copyright_text?: string;
  background_color?: string;
}

export interface SliderBlok extends SbBlokData {
  component: "slider";
  title?: string;
  subtitle?: string;
  description?: string;
  content_sections?: Array<{
    heading: string;
    text: string;
    image?: {
      filename: string;
      alt?: string;
    };
    layout?: "text-left" | "text-right";
  }>;
  cta_button?: Array<{
    label: string;
    link: {
      cached_url: string;
    };
  }>;
  background_color?: string;
}

export interface PageBlok extends SbBlokData {
  component: "page";
  body?: Array<
    | ReviewsBlok
    | HeroBlok
    | StepsBlok
    | HeaderBlok
    | BlogsBlok
    | SocialProofBlok
    | FAQBlok
    | FooterBlok
    | SliderBlok
  >;
}

// Union type for all possible bloks
export type StoryblokBlok =
  | ReviewsBlok
  | HeroBlok
  | StepsBlok
  | HeaderBlok
  | BlogsBlok
  | SocialProofBlok
  | FAQBlok
  | FooterBlok
  | SliderBlok
  | PageBlok;
