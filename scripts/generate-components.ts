import fs from "fs";
import path from "path";

// Import your existing types
import {
  ReviewsBlok,
  HeroBlok,
  StepsBlok,
  HeaderBlok,
  BlogsBlok,
  SocialProofBlok,
  FAQBlok,
  FooterBlok,
  SliderBlok,
  PageBlok,
  StoryblokComponent,
} from "../src/types/storyblok";

interface ComponentTemplate {
  name: string;
  interface: string;
  template: string;
}

const componentTemplates: ComponentTemplate[] = [
  {
    name: "Reviews",
    interface: "ReviewsBlok",
    template: `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { ReviewsBlok } from "@/types/storyblok";

export default function Reviews({ blok }: { blok: ReviewsBlok }) {
  const gridClasses = {
    "grid-2": "grid-cols-1 md:grid-cols-2",
    "grid-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    carousel: "grid-cols-1",
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={\`w-5 h-5 \${i < rating ? "text-yellow-400" : "text-gray-300"}\`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className={\`py-16 lg:py-24 \${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}\`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok?.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        {blok?.reviews && blok?.reviews?.length > 0 && (
          <div className={\`grid \${gridClasses[blok?.layout || "grid-3"]} gap-8\`}>
            {blok?.reviews?.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Rating */}
                {blok?.show_rating && (
                  <div className="flex items-center mb-4">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-600 font-belfius-body">
                      {review.rating}/5
                    </span>
                  </div>
                )}

                {/* Review Text */}
                <blockquote className="text-gray-700 mb-6 font-belfius-body leading-relaxed">
                  &ldquo;{review.review_text}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  {review?.avatar?.filename ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={review.avatar.filename}
                        alt={review.avatar.alt || review.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-belfius-red rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {review.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <div className="font-belfius-title text-gray-900">
                      {review.name}
                    </div>
                    {(review?.role || review?.company) && (
                      <div className="text-sm text-gray-600 font-belfius-body">
                        {review.role && <span>{review.role}</span>}
                        {review.role && review.company && <span> at </span>}
                        {review.company && <span>{review.company}</span>}
                      </div>
                    )}
                    {review?.date && (
                      <div className="text-sm text-gray-500 font-belfius-body">
                        {review.date}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}`,
  },
  {
    name: "Hero",
    interface: "HeroBlok",
    template: `import { storyblokEditable } from "@storyblok/react/rsc";
import { HeroBlok } from "@/types/storyblok";

export default function Hero({ blok }: { blok: HeroBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative bg-gradient-to-br from-belfius-light-grey to-white py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Subtitle */}
            {blok.subheadline && (
              <div className="inline-block">
                <span className="bg-belfius-red text-white px-4 py-2 rounded-full text-sm font-medium font-belfius-body">
                  {blok.subheadline}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-belfius-title text-4xl lg:text-6xl text-gray-900 leading-tight">
              {blok.headline || "Welkom bij Belfius"}
            </h1>

            {/* Description */}
            {blok.description && (
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-belfius-body">
                {blok.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {blok.primary_button?.map((button, index) => (
                <a
                  key={index}
                  href={button.link.cached_url}
                  className="bg-belfius-red text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 font-belfius-body"
                >
                  {button.label}
                </a>
              ))}
              {blok.secondary_button?.map((button, index) => (
                <a
                  key={index}
                  href={button.link.cached_url}
                  className="border-2 border-belfius-red text-belfius-red px-8 py-3 rounded-lg font-medium hover:bg-belfius-red hover:text-white transition-colors duration-200 font-belfius-body"
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          {blok.hero_image && (
            <div className="relative">
              <img
                src={blok.hero_image.filename}
                alt={blok.hero_image.alt || "Hero Image"}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    name: "Steps",
    interface: "StepsBlok",
    template: `import { storyblokEditable } from '@storyblok/react/rsc';
import { StepsBlok } from "@/types/storyblok";

export default function Steps({ blok }: { blok: StepsBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok?.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
        </div>

        {/* Steps Grid */}
        {blok?.steps && blok.steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blok.steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-belfius-red rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.step_number}
                </div>

                {/* Icon */}
                {step.icon && (
                  <div className="mb-6">
                    <img
                      src={step.icon.filename}
                      alt={step.icon.alt || "Step Icon"}
                      className="w-16 h-16"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="mt-4">
                  <h3 className="font-belfius-title text-xl text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-belfius-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}`,
  },
  {
    name: "Header",
    interface: "HeaderBlok",
    template: `import { storyblokEditable } from '@storyblok/react/rsc';
import { HeaderBlok } from "@/types/storyblok";

export default function Header({ blok }: { blok: HeaderBlok }) {
  return (
    <header
      {...storyblokEditable(blok)}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {blok.logo && (
            <div className="flex-shrink-0">
              <img
                src={blok.logo.filename}
                alt={blok.logo.alt || "Logo"}
                className="h-8 w-auto"
              />
            </div>
          )}

          {/* Navigation */}
          {blok.navigation && blok.navigation.length > 0 && (
            <nav className="hidden md:flex space-x-8">
              {blok.navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.link.cached_url}
                  className="text-gray-700 hover:text-belfius-red font-belfius-body transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* CTA Button */}
          {blok.cta_button && blok.cta_button.length > 0 && (
            <div className="flex space-x-4">
              {blok.cta_button.map((button, index) => (
                <a
                  key={index}
                  href={button.link.cached_url}
                  className="bg-belfius-red text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 font-belfius-body"
                >
                  {button.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}`,
  },
  {
    name: "Blogs",
    interface: "BlogsBlok",
    template: `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { BlogsBlok } from "@/types/storyblok";

export default function Blogs({ blok }: { blok: BlogsBlok }) {
  const gridClasses = {
    "grid-2": "grid-cols-1 md:grid-cols-2",
    "grid-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "grid-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok?.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* Blog Posts Grid */}
        {blok?.blog_posts && blok.blog_posts.length > 0 && (
          <div className={\`grid \${gridClasses[blok?.layout || "grid-3"]} gap-8 mb-12\`}>
            {blok.blog_posts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                {post.image && (
                  <div className="relative h-48">
                    <Image
                      src={post.image.filename}
                      alt={post.image.alt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {post.category && (
                      <div className="absolute top-4 left-4 bg-belfius-red text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-belfius-title text-xl text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-belfius-body">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 font-belfius-body">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                    <span>{post.read_time}</span>
                  </div>

                  {/* Link */}
                  <a
                    href={post.link.cached_url}
                    className="text-belfius-red font-medium hover:underline font-belfius-body"
                  >
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {blok?.view_all_button && blok.view_all_button.length > 0 && (
          <div className="text-center">
            {blok.view_all_button.map((button, index) => (
              <a
                key={index}
                href={button.link.cached_url}
                className="inline-block bg-belfius-red text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 font-belfius-body"
              >
                {button.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}`,
  },
  {
    name: "SocialProof",
    interface: "SocialProofBlok",
    template: `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { SocialProofBlok } from "@/types/storyblok";

export default function SocialProof({ blok }: { blok: SocialProofBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={\`py-16 lg:py-24 \${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}\`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok?.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* Content based on layout */}
        {blok?.layout === "logos-only" && blok?.logos && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {blok.logos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={logo.logo.filename}
                  alt={logo.logo.alt || logo.company_name || "Company Logo"}
                  width={120}
                  height={60}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        )}

        {blok?.layout === "stats-only" && blok?.statistics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blok.statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-belfius-title text-4xl lg:text-6xl text-belfius-red mb-2">
                  {stat.number}
                </div>
                <div className="font-belfius-body text-lg text-gray-900 mb-2">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-gray-600 font-belfius-body">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {blok?.layout === "mixed" && (
          <div className="space-y-16">
            {/* Logos */}
            {blok?.logos && blok.logos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                {blok.logos.map((logo, index) => (
                  <div key={index} className="flex justify-center">
                    <Image
                      src={logo.logo.filename}
                      alt={logo.logo.alt || logo.company_name || "Company Logo"}
                      width={120}
                      height={60}
                      className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Statistics */}
            {blok?.statistics && blok.statistics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blok.statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-belfius-title text-4xl lg:text-6xl text-belfius-red mb-2">
                      {stat.number}
                    </div>
                    <div className="font-belfius-body text-lg text-gray-900 mb-2">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-gray-600 font-belfius-body">
                        {stat.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials */}
            {blok?.testimonials && blok.testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blok.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                    <blockquote className="text-gray-700 mb-4 font-belfius-body italic">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="font-belfius-body">
                      <div className="font-medium text-gray-900">{testimonial.author}</div>
                      {testimonial.company && (
                        <div className="text-gray-600">{testimonial.company}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}`,
  },
  {
    name: "FAQ",
    interface: "FAQBlok",
    template: `"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";
import { FAQBlok } from "@/types/storyblok";

export default function FAQ({ blok }: { blok: FAQBlok }) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className={\`py-16 lg:py-24 \${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}\`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok?.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        {blok?.faq_items && blok.faq_items.length > 0 && (
          <div className={\`grid \${blok?.layout === "two-column" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6\`}>
            {blok.faq_items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-belfius-title text-lg text-gray-900">
                    {item.question}
                  </h3>
                  <svg
                    className={\`w-5 h-5 text-gray-500 transform transition-transform duration-200 \${openItems.includes(index) ? "rotate-180" : ""}\`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 font-belfius-body leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}`,
  },
  {
    name: "Footer",
    interface: "FooterBlok",
    template: `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { FooterBlok } from "@/types/storyblok";

export default function Footer({ blok }: { blok: FooterBlok }) {
  return (
    <footer
      {...storyblokEditable(blok)}
      className={\`py-16 \${blok?.background_color === "gray" ? "bg-gray-50" : "bg-gray-900"}\`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {blok.logo && (
              <div className="mb-6">
                <Image
                  src={blok.logo.filename}
                  alt={blok.logo.alt || "Company Logo"}
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            )}
            {blok.company_description && (
              <p className="text-gray-400 font-belfius-body mb-6">
                {blok.company_description}
              </p>
            )}
            {blok.social_links && blok.social_links.length > 0 && (
              <div className="flex space-x-4">
                {blok.social_links.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon ? (
                      <img
                        src={social.icon}
                        alt={social.platform}
                        className="w-6 h-6"
                      />
                    ) : (
                      <span className="capitalize">{social.platform}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {blok.navigation_sections && blok.navigation_sections.length > 0 && (
            <>
              {blok.navigation_sections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-belfius-title text-white text-lg mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.link.cached_url}
                          className="text-gray-400 hover:text-white transition-colors duration-200 font-belfius-body"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

          {/* Contact Info */}
          {blok.contact_info && (
            <div>
              <h3 className="font-belfius-title text-white text-lg mb-4">
                Contact
              </h3>
              <div className="space-y-2 text-gray-400 font-belfius-body">
                {blok.contact_info.email && (
                  <div>
                    <a
                      href={\`mailto:\${blok.contact_info.email}\`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {blok.contact_info.email}
                    </a>
                  </div>
                )}
                {blok.contact_info.phone && (
                  <div>
                    <a
                      href={\`tel:\${blok.contact_info.phone}\`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {blok.contact_info.phone}
                    </a>
                  </div>
                )}
                {blok.contact_info.address && (
                  <div>{blok.contact_info.address}</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        {blok.copyright_text && (
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-belfius-body">
              {blok.copyright_text}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}`,
  },
  {
    name: "Slider",
    interface: "SliderBlok",
    template: `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { SliderBlok } from "@/types/storyblok";

export default function Slider({ blok }: { blok: SliderBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={\`py-16 lg:py-24 \${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}\`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok?.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* Content Sections */}
        {blok?.content_sections && blok.content_sections.length > 0 && (
          <div className="space-y-16">
            {blok.content_sections.map((section, index) => (
              <div
                key={index}
                className={\`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center \${section.layout === "text-right" ? "lg:grid-flow-col-dense" : ""}\`}
              >
                {/* Text Content */}
                <div className={\`\${section.layout === "text-right" ? "lg:col-start-2" : ""}\`}>
                  <h3 className="font-belfius-title text-3xl lg:text-4xl text-gray-900 mb-6">
                    {section.heading}
                  </h3>
                  <p className="text-lg text-gray-600 font-belfius-body leading-relaxed mb-8">
                    {section.text}
                  </p>
                </div>

                {/* Image */}
                {section.image && (
                  <div className={\`\${section.layout === "text-right" ? "lg:col-start-1" : ""}\`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={section.image.filename}
                        alt={section.image.alt || section.heading}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {blok?.cta_button && blok.cta_button.length > 0 && (
          <div className="text-center mt-12">
            {blok.cta_button.map((button, index) => (
              <a
                key={index}
                href={button.link.cached_url}
                className="inline-block bg-belfius-red text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 font-belfius-body"
              >
                {button.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}`,
  },
  {
    name: "Page",
    interface: "PageBlok",
    template: `import { storyblokEditable } from '@storyblok/react/rsc';
import { PageBlok } from "@/types/storyblok";

export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <main {...storyblokEditable(blok)} className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {blok.body?.map((nestedBlok) => (
          <div key={nestedBlok._uid}>
            {/* Nested components will be rendered here */}
            <pre className="p-4 rounded">
              {JSON.stringify(nestedBlok, null, 2)}
            </pre>
          </div>
        ))}
        
        {/* Fallback content if no body */}
        {!blok.body?.length && (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Welcome to Jaimy</h1>
            <p className="text-gray-600">Your Storyblok integration is working!</p>
          </div>
        )}
      </div>
    </main>
  );
}`,
  },
];

function generateComponents() {
  const componentsDir = path.join(process.cwd(), "src", "components", "blocks");

  // Ensure the directory exists
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  componentTemplates.forEach(({ name, interface, template }) => {
    const filePath = path.join(componentsDir, `${name}.tsx`);

    fs.writeFileSync(filePath, template);
    console.log(`✅ Generated ${name}.tsx`);
  });

  // Generate index file for easy imports
  const indexContent = componentTemplates
    .map(({ name }) => `export { default as ${name} } from './${name}';`)
    .join("\n");

  const indexPath = path.join(componentsDir, "index.ts");
  fs.writeFileSync(indexPath, indexContent);
  console.log(`✅ Generated index.ts`);

  console.log(
    `\n🎉 Successfully generated ${componentTemplates.length} components!`
  );
  console.log(`📁 Components saved to: ${componentsDir}`);
  console.log(`\n📝 Next steps:`);
  console.log(
    `1. Update your StoryblokProvider.tsx to import from the new components`
  );
  console.log(`2. Update your layout.tsx to use the new components`);
  console.log(`3. Test the components in Storyblok`);
}

// Run the generator
generateComponents();
