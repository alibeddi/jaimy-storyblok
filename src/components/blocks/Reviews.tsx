"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { ReviewsBlok } from "@/types/storyblok";
import { useState } from "react";

export default function Reviews({ blok }: { blok: ReviewsBlok }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Demo reviews data
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
    <section
      {...storyblokEditable(blok)}
      className="bg-gray-100 min-h-screen py-16"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* H2 Title */}
        <h2 className="text-[#32546D] font-belfius-title text-4xl lg:text-5xl mb-16">
          {blok?.title || "H2"}
        </h2>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* User Info and Rating */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* User Avatar */}
                  <div className="w-12 h-12 bg-[#AF1B3C] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>

                  {/* User Details */}
                  <div>
                    <h4 className="font-belfius-title text-lg font-bold text-gray-900">
                      {review.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{review.location}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={`text-xl ${
                        starIndex < review.rating
                          ? "text-[#AF1B3C]"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-700 font-belfius-body leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? "bg-[#AF1B3C]" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl"
              type="button"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="text-[#AF1B3C] hover:text-red-700 transition-colors duration-200 text-2xl"
              type="button"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
