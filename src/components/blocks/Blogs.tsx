import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface BlogsProps {
  blok: {
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
  };
}

export default function Blogs({ blok }: BlogsProps) {
  const gridClasses = {
    "grid-2": "grid-cols-1 md:grid-cols-2",
    "grid-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "grid-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section {...storyblokEditable(blok)} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* Blog Posts Grid */}
        {blok.blog_posts && blok.blog_posts.length > 0 && (
          <div
            className={`grid ${
              gridClasses[blok.layout || "grid-3"]
            } gap-8 mb-12`}
          >
            {blok.blog_posts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48 lg:h-56">
                  {post.image?.filename ? (
                    <Image
                      src={post.image.filename}
                      alt={post.image.alt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Image placeholder</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-belfius-red text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-belfius-title text-xl lg:text-2xl text-gray-900 mb-3 line-clamp-2">
                    <a
                      href={`/${post.link.cached_url}`}
                      className="hover:text-belfius-red transition-colors"
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 font-belfius-body">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="font-belfius-body">{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="font-belfius-body">{post.read_time}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {blok.view_all_button?.map((cta, index) => (
          <div key={index} className="text-center">
            <a
              href={`/${cta.link.cached_url}`}
              className="btn-belfius-primary font-belfius-cta inline-flex items-center space-x-2"
            >
              <span>{cta.label}</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
