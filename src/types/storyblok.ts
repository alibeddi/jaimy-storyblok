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

import { ButtonBlok } from "@/components/blok/general/Button/Button";
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

// Single review blok for nested usage - now uses general bloks
export interface ReviewBlok extends SbBlokData {
  component: "review";
  children?: Array<{
    component: "heading" | "rich_text" | "image" | "stars";
    _uid: string;
    [key: string]: unknown;
  }>;
}

export interface HeroBlok extends SbBlokData {
  component: "hero";
  headline?: string;
  subheadline?: string;
  description?: string;
  primary_button?: ButtonBlok;
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
  iframe_block?: IframeBlok[];
  trust_badges?: Array<TrustBadgeBlok | TrustBadgeItem>;
}

export interface StepsBlok extends SbBlokData {
  component: "steps";
  title?: string;
  subtitle?: string;
  steps?: Array<StepBlok | StepItem>;
}

export interface StepItem {
  step_number: string;
  title: string;
  description: string;
  icon?: {
    filename: string;
    alt?: string;
  };
}

export interface StepBlok extends SbBlokData {
  component: "step";
  step_number?: string;
  title?: string;
  description?: string;
  icon?: {
    filename: string;
    alt?: string;
  };
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
  search_placeholder?: string;
  search_enabled?: boolean;
  language_dropdown_enabled?: boolean;
  language_dropdown_title?: string;
  supported_languages?: Array<{
    code: string;
    label: string;
  }>;
}

export interface BlogsBlok extends SbBlokData {
  component: "blogs";
  title?: string;
  subtitle?: string;
  description?: string;
  blog_posts?: Array<BlogBlok | BlogItem>;
  view_all_button?: Array<{
    label: string;
    link: {
      cached_url: string;
    };
  }>;
  layout?: "grid-2" | "grid-3" | "grid-4";
}

// Plain blog item shape as used before (non-blok)
export interface BlogItem {
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
}

// Single blog blok for nested usage
export interface BlogBlok extends SbBlokData {
  component: "blog";
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
    number: number; // Changed from string to number
    suffix?: string; // New field for K+, %, etc.
    label: string;
    description?: string;
    icon?: {
      filename: string;
      alt?: string;
    };
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
    social_link: Array<{
      platform: string;
      url: string;
      icon?: { filename: string; alt?: string };
    }>;
  }>;
  contact_info?: Array<{
    email?: string;
    phone?: string;
    address?: string;
  }>;
  footer_buttons?: Array<ButtonBlok>;
  copyright_text?: string;
  background_color?: string;
}

export interface SliderBlok extends SbBlokData {
  component: "slider";
  title?: string;
  subtitle?: string;
  description?: string;
  featured_image?: {
    filename: string;
    alt?: string;
  };
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

export interface FeaturesBlok extends SbBlokData {
  component: "features";
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: {
      filename: string;
      alt?: string;
    };
  }>;
  layout?: "grid-2" | "grid-3";
  background_color?: string;
}

export interface SEOBlok extends SbBlokData {
  component: "seo";
  title?: string;
  description?: string;
  keywords?: string;
  robots?:
    | "index,follow"
    | "noindex,nofollow"
    | "index,nofollow"
    | "noindex,follow"
    | "noindex"
    | "nofollow";
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: {
    filename?: string;
    alt?: string;
  };
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: {
    filename?: string;
    alt?: string;
  };
}

export interface InlineTextBlok extends SbBlokData {
  component: "inline_text";
  text?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  style?: "default" | "highlight" | "muted" | "bold";
}

export interface PageBlok extends SbBlokData {
  component: "page";
  seo?: SEOBlok;
  body?: Array<
    | ReviewsBlok
    | ReviewBlok
    | BlogBlok
    | HeroBlok
    | StepsBlok
    | HeaderBlok
    | BlogsBlok
    | SocialProofBlok
    | FAQBlok
    | FooterBlok
    | SliderBlok
    | FeaturesBlok
    | SEOBlok
    | InlineTextBlok
  >;
  // SEO Configuration
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  robots?: "default" | "noindex" | "nofollow" | "noindex,nofollow";
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: {
    filename: string;
    alt?: string;
  };
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: {
    filename: string;
    alt?: string;
  };
}

// Union type for all possible bloks
export type StoryblokBlok =
  | ReviewsBlok
  | ReviewBlok
  | BlogBlok
  | HeroBlok
  | StepsBlok
  | HeaderBlok
  | BlogsBlok
  | SocialProofBlok
  | FAQBlok
  | FooterBlok
  | SliderBlok
  | PageBlok
  | FeaturesBlok
  | SEOBlok
  | InlineTextBlok;

// Add this interface to your existing storyblok.ts file
export interface IframeBlok extends SbBlokData {
  _uid: string;
  component: "iframe_component";
  title?: string;
  description?: string;
  formId: string; // The dynamic form ID
  service_type?: "typeform" | "jotform" | "googleforms" | "custom";
  base_url?: string; // Base URL for custom form service
  height?: string;
  width?: string;
  allow_fullscreen?: boolean;
  sandbox?: string;
  margin_bottom?: string;
}

export interface TrustBadgeItem {
  value: string;
  description: string;
  label: string;
  suffix?: string;
  icon?: {
    filename: string;
    alt?: string;
  };
  icon_svg?: string;
}

export interface TrustBadgeBlok extends SbBlokData {
  component: "trust_badge";
  value?: string;
  description?: string;
  label?: string;
  suffix?: string;
  icon?: {
    filename: string;
    alt?: string;
  };
  icon_svg?: string;
}

// Remove this duplicate interface:
// export interface HeroBlok {
//   _uid: string;
//   component: "hero";
//   title?: string;
//   description?: string;
//   cta_text?: string;
//   iframe_data?: IframeBlok;
// }

// Feature interface for nested feature data
export interface FeatureItem {
  _uid: string;
  component: "feature";
  title?: string;
  subtitle?: string;
  description?: string;
  cta_text?: string;
  image?: {
    filename: string;
    alt?: string;
  };
  icon?: {
    filename: string;
    alt?: string;
  };
  link?: {
    cached_url: string;
    linktype: string;
  };
}

// Updated SliderBlok to include feature array
export interface SliderBlok {
  _uid: string;
  component: "slider";
  title?: string;
  subtitle?: string;
  description?: string;
  featured_image?: {
    filename: string;
    alt?: string;
  };
  cta_button?: Array<{
    label: string;
    link: {
      cached_url: string;
    };
  }>;
  feature?: FeatureItem[]; // Array of feature items
  image_position?: "left" | "right";
  reverse_layout?: boolean;
}
