import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface ReviewsProps {
  blok: {
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
  };
}

export default function Reviews({ blok }: ReviewsProps) {
  const gridClasses = {
    "grid-2": "grid-cols-1 md:grid-cols-2",
    "grid-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    carousel: "grid-cols-1",
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
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
      className={`py-16 lg:py-24 ${
        blok.background_color === "gray" ? "bg-gray-50" : "bg-white"
      }`}
    >
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

        {/* Reviews Grid */}
        {blok.reviews && blok.reviews.length > 0 && (
          <div className={`grid ${gridClasses[blok.layout || "grid-3"]} gap-8`}>
            {blok.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Rating */}
                {blok.show_rating && (
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
                  {review.avatar?.filename ? (
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
                    {(review.role || review.company) && (
                      <div className="text-sm text-gray-600 font-belfius-body">
                        {review.role && <span>{review.role}</span>}
                        {review.role && review.company && <span> at </span>}
                        {review.company && <span>{review.company}</span>}
                      </div>
                    )}
                    {review.date && (
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
}
