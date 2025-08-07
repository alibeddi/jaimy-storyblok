import { storyblokEditable } from "@storyblok/react/rsc";
import { BlogsBlok } from "@/types/storyblok";
import Image from "next/image";
import CurvedBackground from "../ui/CurvedBackground";

export default function Blogs({ blok }: { blok: BlogsBlok }) {
  // Use actual Storyblok data or fallback to default values
  const blogPosts = blok?.blog_posts || [];
  
  // If no blog posts from Storyblok, show empty state or fallback
  if (blogPosts.length === 0) {
    return (
      <section
        {...storyblokEditable(blok)}
        className="bg-[#F4F4F4] py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex items-center">
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden backdrop-blur-md shadow-xl w-full bg-white/70 transition-all duration-300 hover:bg-white/80">
            <div className="relative z-10">
              <h2 className="text-[#32546D] font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 md:mb-12 text-left leading-tight tracking-wide transition-all duration-300">
                {blok?.title || "H2"}
              </h2>
              <p className="text-gray-600 text-center font-light text-sm sm:text-base transition-opacity duration-300">No blog posts available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#F4F4F4] py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden transition-all duration-500 ease-in-out"
    >
       <CurvedBackground className="absolute inset-0 hidden md:block " width={'100%'} height={'100%'} fillColor={'#B9203B'}/>
      
      <div className="max-w-[90%]  mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex items-center">
        {/* Main Container - Responsive with smooth transitions */}
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden backdrop-blur-md bg-white/70 w-full transition-all duration-300 hover:bg-white/80 hover:shadow-2xl">
          {/* Content */}
          <div className="relative z-10">
            {/* H2 Title - Responsive typography */}
            <h2 className="text-[#32546D] font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 md:mb-12 text-left leading-tight tracking-wide transition-all duration-300 hover:text-[#2a4a5f]">
              {blok?.title || "H2"}
            </h2>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Left Column - Main Featured Blog Post */}
              <div className="space-y-4 sm:space-y-6">
                {/* Main Blog Card */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
                  {/* Main Image with NEW Tag */}
                  <div className="relative h-48 sm:h-64 md:h-80">
                    <Image
                      src={blogPosts[0]?.image?.filename || "/backgrounds/blogs-card-bg.png"}
                      alt={blogPosts[0]?.image?.alt || blogPosts[0]?.title || "Blog post image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* NEW Tag */}
                    {blogPosts[0] && (
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-[#AF1B3C] text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-[#8f1530]">
                        NEW
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 bg-white/90">
                    {/* Main Blog Title */}
                    <h3 className="font-light text-lg sm:text-xl md:text-2xl text-gray-900 leading-tight mb-3 sm:mb-4 transition-colors duration-300 hover:text-[#AF1B3C] cursor-pointer">
                      {blogPosts[0]?.title || "Blog Title"}
                    </h3>

                    {/* Main Blog Body Text */}
                    <p className="text-gray-700 font-light text-sm sm:text-base leading-relaxed transition-opacity duration-300 hover:opacity-80">
                      {blogPosts[0]?.excerpt || "Blog excerpt"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Three Smaller Blog Posts */}
              <div className="space-y-4 sm:space-y-6">
                {blogPosts.slice(1, 4).map((post, index) => (
                  <div
                    key={post.title + index}
                    className="rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-white/80 hover:bg-white/90 group cursor-pointer"
                  >
                    <div className="flex gap-3 sm:gap-4">
                      {/* Blog Image */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden relative">
                          <Image
                            src={post?.image?.filename || "/backgrounds/blogs-card-bg.png"}
                            alt={post?.image?.alt || post?.title || "Blog post image"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-light text-base sm:text-lg text-gray-900 leading-tight mb-2 transition-colors duration-300 group-hover:text-[#AF1B3C] truncate">
                          {post?.title || "Blog Title"}
                        </h4>
                        <p className="text-gray-700 font-light text-xs sm:text-sm leading-relaxed line-clamp-2 transition-opacity duration-300 group-hover:opacity-80">
                          {post?.excerpt || "Blog excerpt"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View All Button - Responsive */}
        {blok?.view_all_button && blok.view_all_button.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <a
              href={blok.view_all_button[0].link.cached_url}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#AF1B3C] text-white rounded-lg hover:bg-[#8f1530] transition-all duration-300 font-light text-sm sm:text-base hover:scale-105 hover:shadow-lg"
            >
              {blok.view_all_button[0].label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
