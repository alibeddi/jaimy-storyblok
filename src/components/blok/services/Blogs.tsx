import { BlogBlok, BlogItem, BlogsBlok } from "@/types/storyblok";

import BlogSmall from "../general/Blog/BlogSmall";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

export default function Blogs({ blok }: { blok: BlogsBlok }) {
  // Use actual Storyblok data or fallback to default values
  const blogPosts = blok?.blog_posts || [];

  // If no blog posts from Storyblok, return empty or null
  if (blogPosts.length === 0) {
    return null;
  }

  // Single blog: center it
  if (blogPosts.length === 1) {
    const first = blogPosts[0] as BlogBlok | BlogItem | undefined;
    if (!first) return null;

    const isBlok = (p: BlogBlok | BlogItem): p is BlogBlok => {
      const obj = p as Record<string, unknown>;
      return typeof obj.component === "string" && obj.component === "blog";
    };

    return (
      <div {...storyblokEditable(blok)} className="w-full">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {(() => {
              if (isBlok(first)) {
                return <StoryblokComponent blok={first} />;
              }
              const fallback: BlogBlok = {
                _uid: `${blok._uid}-blog-0`,
                component: "blog",
                children: [
                  {
                    _uid: `${blok._uid}-blog-0-image`,
                    component: "image",
                    filename: first.image?.filename || "",
                    alt: first.image?.alt || first.title,
                  },
                  {
                    _uid: `${blok._uid}-blog-0-title`,
                    component: "heading",
                    text: first.title,
                    level: "h3",
                  },
                  {
                    _uid: `${blok._uid}-blog-0-excerpt`,
                    component: "rich_text",
                    type: "excerpt",
                    content: first.excerpt,
                  },
                  {
                    _uid: `${blok._uid}-blog-0-author`,
                    component: "rich_text",
                    type: "author",
                    content: first.author,
                  },
                  {
                    _uid: `${blok._uid}-blog-0-date`,
                    component: "rich_text",
                    type: "date",
                    content: first.date,
                  },
                  {
                    _uid: `${blok._uid}-blog-0-read-time`,
                    component: "rich_text",
                    type: "read_time",
                    content: first.read_time,
                  },
                ],
                link: first.link,
                category: first.category,
              };
              return <StoryblokComponent blok={fallback} />;
            })()}
          </div>
        </div>
      </div>
    );
  }

  // Multiple blogs: use grid layout
  return (
    <div {...storyblokEditable(blok)} className="w-full">
      {/* Blog Grid Only - No backgrounds, titles, or wrappers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        {/* Left Column - Main Featured Blog Post */}
        <div className="space-y-4 sm:space-y-6">
          {(() => {
            const first = blogPosts[0] as BlogBlok | BlogItem | undefined;
            if (!first) return null;
            const isBlok = (p: BlogBlok | BlogItem): p is BlogBlok => {
              const obj = p as Record<string, unknown>;
              return (
                typeof obj.component === "string" && obj.component === "blog"
              );
            };
            if (isBlok(first)) {
              return <StoryblokComponent blok={first} />;
            }
            const fallback: BlogBlok = {
              _uid: `${blok._uid}-blog-0`,
              component: "blog",
              children: [
                {
                  _uid: `${blok._uid}-blog-0-image`,
                  component: "image",
                  filename: first.image?.filename || "",
                  alt: first.image?.alt || first.title,
                },
                {
                  _uid: `${blok._uid}-blog-0-title`,
                  component: "heading",
                  text: first.title,
                  level: "h3",
                },
                {
                  _uid: `${blok._uid}-blog-0-excerpt`,
                  component: "rich_text",
                  type: "excerpt",
                  content: first.excerpt,
                },
                {
                  _uid: `${blok._uid}-blog-0-author`,
                  component: "rich_text",
                  type: "author",
                  content: first.author,
                },
                {
                  _uid: `${blok._uid}-blog-0-date`,
                  component: "rich_text",
                  type: "date",
                  content: first.date,
                },
                {
                  _uid: `${blok._uid}-blog-0-read-time`,
                  component: "rich_text",
                  type: "read_time",
                  content: first.read_time,
                },
              ],
              link: first.link,
              category: first.category,
            };
            return <StoryblokComponent blok={fallback} />;
          })()}
        </div>

        {/* Right Column - Three Smaller Blog Posts */}
        <div className="space-y-4 sm:space-y-6">
          {blogPosts.slice(1, 4).map((post, index) => {
            const idx = index + 1;
            const key = `post-${idx}`;
            const item = post as BlogBlok | BlogItem;
            const isBlok = (p: BlogBlok | BlogItem): p is BlogBlok => {
              const obj = p as Record<string, unknown>;
              return (
                typeof obj.component === "string" && obj.component === "blog"
              );
            };
            if (isBlok(item)) {
              return <BlogSmall key={key} blok={item} />;
            }
            const fallback: BlogBlok = {
              _uid: `${blok._uid}-blog-${idx}`,
              component: "blog",
              children: [
                {
                  _uid: `${blok._uid}-blog-${idx}-image`,
                  component: "image",
                  filename: item.image?.filename || "",
                  alt: item.image?.alt || item.title,
                },
                {
                  _uid: `${blok._uid}-blog-${idx}-title`,
                  component: "heading",
                  text: item.title,
                  level: "h4",
                },
                {
                  _uid: `${blok._uid}-blog-${idx}-excerpt`,
                  component: "rich_text",
                  type: "excerpt",
                  content: item.excerpt,
                },
                {
                  _uid: `${blok._uid}-blog-${idx}-author`,
                  component: "rich_text",
                  type: "author",
                  content: item.author,
                },
                {
                  _uid: `${blok._uid}-blog-${idx}-date`,
                  component: "rich_text",
                  type: "date",
                  content: item.date,
                },
              ],
              link: item.link,
              category: item.category,
            };
            return <BlogSmall key={key} blok={fallback} />;
          })}
        </div>
      </div>
    </div>
  );
}
