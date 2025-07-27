import { storyblokEditable } from "@storyblok/react/rsc";
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
          <div className={`grid ${gridClasses[blok?.layout || "grid-3"]} gap-8 mb-12`}>
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
}