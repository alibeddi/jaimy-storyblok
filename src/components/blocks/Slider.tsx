"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { SliderBlok } from "@/types/storyblok";
import { useState, useEffect } from "react";

export default function Slider({ blok }: { blok: SliderBlok }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % (blok?.content_sections?.length || 3)
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [blok?.content_sections?.length]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % (blok?.content_sections?.length || 3)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + (blok?.content_sections?.length || 3)) %
        (blok?.content_sections?.length || 3)
    );
  };

  // Demo slides for testing
  const demoSlides = [
    {
      heading: "First Slide",
      text: "This is the first slide content. Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text",
      image: null,
    },
    {
      heading: "Second Slide",
      text: "This is the second slide content. Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text",
      image: null,
    },
    {
      heading: "Third Slide",
      text: "This is the third slide content. Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text",
      image: null,
    },
  ];

  const slides =
    blok?.content_sections && blok.content_sections.length > 0
      ? blok.content_sections
      : demoSlides;
  const currentSlideData = slides[currentSlide];

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#F4F4F4] min-h-screen py-16"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Container with Blue Border */}
        <div
          className="bg-white rounded-3xl p-12 relative"
          style={{
            boxShadow: "-5px 7px 17px 2px #0000008C",
            border: "1px solid #000000",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* H2 Heading */}
              <h2 className="text-[#32546D] font-belfius-title text-4xl lg:text-5xl leading-tight">
                {currentSlideData?.heading || blok?.title || "H2"}
              </h2>

              {/* Body Text Paragraphs */}
              <div className="space-y-6">
                {currentSlideData?.text ? (
                  <p className="text-gray-700 font-belfius-body leading-relaxed">
                    {currentSlideData.text}
                  </p>
                ) : blok?.description ? (
                  <p className="text-gray-700 font-belfius-body leading-relaxed">
                    {blok.description}
                  </p>
                ) : (
                  <>
                    <p className="text-gray-700 font-belfius-body leading-relaxed">
                      Body text Body text Body text Body text Body text Body
                      text Body text Body text Body text Body text Body text
                      Body text Body text Body text Body text Body text
                    </p>
                    <p className="text-gray-700 font-belfius-body leading-relaxed">
                      Body text Body text Body text Body text Body text Body
                      text Body text Body text Body text Body text Body text
                      Body text Body text Body text Body text Body text
                    </p>
                    <p className="text-gray-700 font-belfius-body leading-relaxed">
                      Body text Body text Body text Body text Body text Body
                      text Body text Body text Body text Body text Body text
                      Body text Body text Body text Body text Body text
                    </p>
                    <p className="text-gray-700 font-belfius-body leading-relaxed">
                      Body text Body text Body text Body text Body text Body
                      text Body text Body text Body text Body text Body text
                      Body text Body text Body text Body text Body text
                    </p>
                  </>
                )}
              </div>

              {/* CTA Button */}
              {blok?.cta_button && blok.cta_button.length > 0 ? (
                <div className="pt-4">
                  {blok.cta_button.map((button, index) => (
                    <a
                      key={index}
                      href={button.link.cached_url}
                      className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                      {button.label}
                    </a>
                  ))}
                </div>
              ) : (
                <div className="pt-4">
                  <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-shadow duration-200">
                    CTA HERE
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              {currentSlideData?.image?.filename ? (
                <div className="bg-gray-200 rounded-2xl border border-blue-200 p-8 h-96 flex items-center justify-center">
                  <img
                    src={currentSlideData.image.filename}
                    alt={currentSlideData.image.alt || "Slider Image"}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 rounded-2xl border border-blue-200 p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📷</div>
                    <div className="text-gray-600 font-medium">
                      Image Placeholder
                    </div>
                    <div className="text-sm text-gray-500 mt-2">567 x 849</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? "bg-[#AF1B3C]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 cursor-pointer"
            type="button"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 cursor-pointer"
            type="button"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
