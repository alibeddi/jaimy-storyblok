import { storyblokEditable } from "@storyblok/react/rsc";
import { BlogsBlok } from "@/types/storyblok";
import Image from "next/image";

export default function Blogs({ blok }: { blok: BlogsBlok }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
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
            <p className="text-xl text-gray-600 max-w-3xl font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* Blog Posts Grid */}
        {blok?.blog_posts && blok.blog_posts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Large Featured Blog Post */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  {blok.blog_posts[0]?.image?.filename && (
                    <Image
                      src={blok.blog_posts[0].image.filename}
                      alt={blok.blog_posts[0].image.alt || "Blog post image"}
                      width={600}
                      height={480}
                      className="w-full h-64 object-cover object-center"
                    />
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                      NIEUW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-belfius-title text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    {blok.blog_posts[0]?.title ||
                      "Title Title Title Title Title Title Title Title Title"}
                  </h3>
                  <p className="text-gray-600 font-belfius-body mb-4">
                    {blok.blog_posts[0]?.excerpt ||
                      "Body text Body text Body text Body text Body text Body text"}
                  </p>
                  {blok.view_all_button && blok.view_all_button.length > 0 && (
                    <button className="text-belfius-red font-belfius-body hover:text-red-700 transition-colors duration-200">
                      Read More →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Smaller Blog Posts */}
            <div className="flex flex-col h-full justify-between gap-4">
              {blok.blog_posts.slice(1, 4).map((post, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex-1"
                >
                  <div className="flex h-24">
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-200 overflow-hidden">
                      {post.image?.filename ? (
                        <Image
                          src={post.image.filename}
                          alt={post.image.alt || "Blog post image"}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between min-h-0">
                      <div>
                        <h4 className="font-belfius-title text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {post.title ||
                            "Title Title Title Title Title Title Title Title Title"}
                        </h4>
                        <p className="text-gray-600 font-belfius-body text-sm mb-3 line-clamp-2">
                          {post.excerpt ||
                            "Body text Body text Body text Body text"}
                        </p>
                      </div>
                      {blok.view_all_button &&
                        blok.view_all_button.length > 0 && (
                          <button className="text-belfius-red font-belfius-body text-sm hover:text-red-700 transition-colors duration-200 self-start">
                            Read More →
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
