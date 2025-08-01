"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { ReviewsBlok } from "@/types/storyblok";
import { useState } from "react";

export default function Reviews({ blok }: { blok: ReviewsBlok }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Demo reviews data matching the screenshot
  const reviews = [
    {
      name: "Louis Lilet",
      location: "Bruxelles",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Louis Lilet",
      location: "Bruxelles",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Louis Lilet",
      location: "Bruxelles",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  return (
    <section {...storyblokEditable(blok)} className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* H2 Title */}
        <h2
          className="text-gray-800 text-4xl lg:text-5xl font-bold mb-16"
          style={{
            fontFamily:
              "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: "700",
          }}
        >
          {blok?.title || "H2"}
        </h2>

        {/* Reviews Cards Container */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                {/* User Info and Rating Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {/* User Avatar - Red Circle */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#C02139" }}
                    >
                      <span className="text-white font-bold text-lg">
                        {review.name.charAt(0)}
                      </span>
                    </div>

                    {/* User Details */}
                    <div>
                      <h4
                        className="font-bold text-gray-900 text-lg mb-1"
                        style={{
                          fontFamily:
                            "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "700",
                        }}
                      >
                        {review.name}
                      </h4>
                      <p
                        className="text-gray-600 text-sm"
                        style={{
                          fontFamily:
                            "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "400",
                        }}
                      >
                        {review.location}
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`text-xl ${
                          starIndex < review.rating ? "" : "text-gray-300"
                        }`}
                        style={{
                          color:
                            starIndex < review.rating ? "#C02139" : undefined,
                        }}
                      >
                        {starIndex < review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <blockquote
                  className="text-gray-700 leading-relaxed italic"
                  style={{
                    fontFamily:
                      "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  &ldquo;{review.text}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? "" : "bg-gray-400"
                }`}
                style={{
                  backgroundColor:
                    index === currentSlide ? "#C02139" : undefined,
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="transition-colors duration-200 text-2xl font-bold"
              style={{
                color: "#C02139",
              }}
              type="button"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="transition-colors duration-200 text-2xl font-bold"
              style={{
                color: "#C02139",
              }}
              type="button"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
