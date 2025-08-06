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
        className="bg-[#F4F4F4] py-16 relative blogs-large-screen"
      >
        <div className="max-w-7xl mx-auto px-8 relative z-10 blogs-container-large flex items-center">
          <div className="rounded-3xl p-12 relative overflow-hidden backdrop-blur-md shadow-xl w-full">
            <div className="relative z-10">
              <h2 className="text-[#32546D] font-belfius-title text-4xl lg:text-5xl mb-12 text-left">
                {blok?.title || "H2"}
              </h2>
              <p className="text-gray-600 text-center">No blog posts available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#F4F4F4] py-16 relative overflow-hidden blogs-large-screen"
    >
       {/* Background Image - Hidden on mobile, visible on larger screens
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              backgroundImage: "url(/backgrounds/blogs-bg.png)",
              backgroundSize: "contain",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
              maxWidth: "100%",
              right: "0",
              left: "10%"
            }}
          /> */}
          <CurvedBackground className="absolute inset-0 hidden md:block "  anchorRight={true} width={'80%'} height={'100%'} fillColor={'#B9203B'}/>
      <div className="max-w-7xl mx-auto px-8 relative z-10 blogs-container-large flex items-center">
        
        {/* Main Container - No background, with blur effect */}
        <div className="rounded-3xl p-12 relative overflow-hidden backdrop-blur-md bg-white/60 w-full">
         

          {/* Content */}
          <div className="relative z-10">
            {/* H2 Title */}
            <h2 className="text-[#32546D] font-belfius-title text-4xl lg:text-5xl mb-12 text-left">
              {blok?.title || "H2"}
            </h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Main Featured Blog Post */}
              <div className="space-y-6">
                {/* Main Blog Card - White background with 60% opacity */}
                <div className=" rounded-2xl overflow-hidden  transition-all duration-300 ">
                  {/* Main Image with NEW Tag */}
                  <div className="relative h-80">
                    <Image
                      src={blogPosts[0]?.image?.filename || "/backgrounds/blogs-card-bg.png"}
                      alt={blogPosts[0]?.image?.alt || blogPosts[0]?.title || "Blog post image"}
                      fill
                      className="object-cover"
                    />
                    {/* NEW Tag - Show if it's a recent post (you can customize this logic) */}
                    {blogPosts[0] && (
                      <div className="absolute bottom-4 left-4 bg-[#AF1B3C] text-white px-3 py-1 rounded-lg text-sm font-bold uppercase">
                        NEW
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Main Blog Title */}
                    <h3 className="font-belfius-title text-2xl font-bold text-gray-900 leading-tight mb-4">
                      {blogPosts[0]?.title || "Blog Title"}
                    </h3>

                    {/* Main Blog Body Text */}
                    <p className="text-gray-800 font-belfius-body text-base leading-relaxed">
                      {blogPosts[0]?.excerpt || "Blog excerpt"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Three Smaller Blog Posts */}
              <div className="space-y-6">
                {blogPosts.slice(1, 4).map((post, index) => (
                  <div
                    key={post.title + index}
                    className=" rounded-2xl p-6  transition-all duration-300 "
                  >
                    <div className="flex gap-4">
                      {/* Blog Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden relative">
                          <Image
                            src={post?.image?.filename || "/backgrounds/blogs-card-bg.png"}
                            alt={post?.image?.alt || post?.title || "Blog post image"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div className="flex-1">
                        <h4 className="font-belfius-title text-lg font-bold text-gray-900 leading-tight mb-2">
                          {post?.title || "Blog Title"}
                        </h4>
                        <p className="text-gray-800 font-belfius-body text-sm leading-relaxed">
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

        {/* View All Button */}
        {blok?.view_all_button && blok.view_all_button.length > 0 && (
          <div className="text-center mt-12">
            <a
              href={blok.view_all_button[0].link.cached_url}
              className="inline-flex items-center px-6 py-3 bg-belfius-red text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-belfius-body"
            >
              {blok.view_all_button[0].label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
