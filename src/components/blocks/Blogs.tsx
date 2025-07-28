import { storyblokEditable } from "@storyblok/react/rsc";
import { BlogsBlok } from "@/types/storyblok";
import Image from "next/image";

export default function Blogs({ blok }: { blok: BlogsBlok }) {
  // Demo blog data - you can replace this with actual Storyblok data
  const blogPosts = [
    {
      id: 1,
      title: "Title Title Title Title Title Title Title Title Title Title Title Title",
      description: "Body text Body text Body text Body text Body text Body text",
      image: "/backgrounds/blogs-card-bg.png",
      isNew: true,
      category: "Technology"
    },
    {
      id: 2,
      title: "Title Title Title Title Title Title Title Title Title Title Title Title",
      description: "Body text Body text Body text Body text Body text",
      image: "/backgrounds/blogs-card-bg.png",
      isNew: false,
      category: "Design"
    },
    {
      id: 3,
      title: "Title Title Title Title Title Title Title Title Title Title Title Title",
      description: "Body text Body text Body text Body text Body text",
      image: "/backgrounds/blogs-card-bg.png",
      isNew: false,
      category: "Development"
    },
    {
      id: 4,
      title: "Title Title Title Title Title Title Title Title Title Title Title Title",
      description: "Body text Body text Body text Body text Body text",
      image: "/backgrounds/blogs-card-bg.png",
      isNew: false,
      category: "Business"
    }
  ];

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#F4F4F4] min-h-screen py-16 relative"
    >
      <div
            className="absolute inset-0 "
            style={{
              backgroundImage: "url(/backgrounds/blogs-bg.png)",
              backgroundSize: "90% 100%",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
            }}
          />
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Main Container - No background, with blur effect */}
        
        <div className="rounded-3xl p-12 relative overflow-hidden bg-white/60 shadow-xl">
          {/* Background Image with blur effect */}
          

          {/* Content */}
          <div className="relative z-10">
            {/* H2 Title */}
            <h2 className="text-[#32546D] font-belfius-title text-4xl lg:text-5xl mb-12 text-left">
              { "H2"}
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
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover"
                    />
                    {/* NEW Tag */}
                    {blogPosts[0].isNew && (
                      <div className="absolute bottom-4 left-4 bg-[#AF1B3C] text-white px-3 py-1 rounded-lg text-sm font-bold uppercase">
                        NEW
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Main Blog Title */}
                    <h3 className="font-belfius-title text-2xl font-bold text-gray-900 leading-tight mb-4">
                      {blogPosts[0].title}
                    </h3>

                    {/* Main Blog Body Text */}
                    <p className="text-gray-800 font-belfius-body text-base leading-relaxed">
                      {blogPosts[0].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Three Smaller Blog Posts */}
              <div className="space-y-6">
                {blogPosts.slice(1).map((post) => (
                  <div
                    key={post.id}
                    className=" rounded-2xl p-6  transition-all duration-300 "
                  >
                    <div className="flex gap-4">
                      {/* Blog Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden relative">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div className="flex-1">
                        <h4 className="font-belfius-title text-lg font-bold text-gray-900 leading-tight mb-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-800 font-belfius-body text-sm leading-relaxed">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
