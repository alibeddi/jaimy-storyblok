import { BlogBlok, BlogItem, BlogsBlok } from "@/types/storyblok";

import BlogSmall from "../general/Blog/BlogSmall";
import CurvedBackground from "../../ui/CurvedBackground";
import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

export default function Blogs({ blok }: { blok: BlogsBlok }) {
  // Use actual Storyblok data or fallback to default values
  const blogPosts = blok?.blog_posts || [];

  // If no blog posts from Storyblok, show empty state or fallback
  if (blogPosts.length === 0) {
    return (
      <section
        {...storyblokEditable(blok)}
        className="bg-[#F4F4F4] py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex items-center">
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden backdrop-blur-md shadow-xl w-full bg-white/70 transition-all duration-300 hover:bg-white/80">
            <div className="relative z-10">
              <h2 className="text-[#32546D] font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 md:mb-12 text-left leading-tight tracking-wide transition-all duration-300">
                {blok?.title || "H2"}
              </h2>
              <p className="text-gray-600 text-center font-light text-sm sm:text-base transition-opacity duration-300">
                No blog posts available.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#F4F4F4] py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden transition-all duration-500 ease-in-out">
      {/* <CurvedBackground className="absolute inset-0 hidden md:block " width={'100%'} height={'100%'} fillColor={'#B9203B'}/> */}
      <div className="hidden md:block" style={{ pointerEvents: "none" }}>
        <CurvedBackground
          fillColor={"#B9203B"}
          width="80%"
          height="100%"
          className=" absolute inset-0 hidden md:block "
          opacity={0.9}
        />
      </div>
      <div className="max-w-[90%]  mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex items-center">
        {/* Main Container - Responsive with smooth transitions */}
        <div
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden  bg-white/70 w-full transition-all duration-300 hover:bg-white/80 hover:shadow-2xl"
          style={{
            background: "rgba(244, 244, 244, 0.50)",
            boxShadow: "-5px 7px 17px -2px rgba(0, 0, 0, 0.59)",
            //   backdropFilter: "blur(10px)"
          }}>
          {/* Content */}
          <div className="relative z-10">
            {/* H2 Title - Responsive typography */}
            <h2
              data-blok-field="title"
              className="text-[#32546D] font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 md:mb-12 text-left leading-tight tracking-wide transition-all duration-300 hover:text-[#2a4a5f]">
              {blok?.title || "H2"}
            </h2>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Left Column - Main Featured Blog Post */}
              <div className="space-y-4 sm:space-y-6">
                {(() => {
                  const first = blogPosts[0] as BlogBlok | BlogItem | undefined;
                  if (!first) return null;
                  const isBlok = (p: BlogBlok | BlogItem): p is BlogBlok => {
                    const obj = p as Record<string, unknown>;
                    return (
                      typeof obj.component === "string" &&
                      obj.component === "blog"
                    );
                  };
                  if (isBlok(first)) {
                    return <StoryblokComponent blok={first} />;
                  }
                  const fallback: BlogBlok = {
                    _uid: `${blok._uid}-blog-0`,
                    component: "blog",
                    title: first.title,
                    excerpt: first.excerpt,
                    author: first.author,
                    date: first.date,
                    read_time: first.read_time,
                    image: first.image,
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
                      typeof obj.component === "string" &&
                      obj.component === "blog"
                    );
                  };
                  if (isBlok(item)) {
                    return <BlogSmall key={key} blok={item} />;
                  }
                  const fallback: BlogBlok = {
                    _uid: `${blok._uid}-blog-${idx}`,
                    component: "blog",
                    title: item.title,
                    excerpt: item.excerpt,
                    author: item.author,
                    date: item.date,
                    read_time: item.read_time,
                    image: item.image,
                    link: item.link,
                    category: item.category,
                  };
                  return <BlogSmall key={key} blok={fallback} />;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* View All Button - Responsive */}
        {blok?.view_all_button && blok.view_all_button.length > 0 && (
          <div
            className="text-center mt-8 sm:mt-12"
            data-blok-field="view_all_button">
            <a
              href={blok.view_all_button[0].link.cached_url}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#AF1B3C] text-white rounded-lg hover:bg-[#8f1530] transition-all duration-300 font-light text-sm sm:text-base hover:scale-105 hover:shadow-lg">
              {blok.view_all_button[0].label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
