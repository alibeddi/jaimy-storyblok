"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { HeroBlok } from "@/types/storyblok";
import { useState, useEffect } from "react";

export default function Hero({ blok }: { blok: HeroBlok }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  const slides = [
    {
      id: 1,
      title: "H1 Plan je ketelonderhoud",
      description:
        "Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text",
      ctaText: "CTA HERE",
      stats: [
        { number: "197.432", label: "Projets réalisés", icon: "🏠" },
        { number: "4.5", label: "Taux de satisfaction", icon: "✓" },
      ],
      layout: "hero-1",
    },
    {
      id: 2,
      title: "Smart Home Control",
      description:
        "Control your home security and automation with our intuitive smart panel system.",
      ctaText: "Learn More",
      layout: "hero-2",
    },
    {
      id: 3,
      title: "Comfort & Control",
      description:
        "Experience ultimate comfort with our smart home automation system.",
      ctaText: "Get Started",
      layout: "hero-3",
    },
    {
      id: 4,
      title: "Modern Living",
      description:
        "Transform your home with cutting-edge technology and design.",
      ctaText: "Explore Now",
      layout: "hero-4",
    },
  ];

  const currentSlideData = slides[currentSlide];

  return (
    <section
      {...storyblokEditable(blok)}
      className="relative bg-gray-100 min-h-screen"
    >
      {/* Hero Section Label */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-gray-500 text-sm">
          Hero section {currentSlide + 1}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-screen">
        {/* Background Image with Circular Overlay */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 relative">
            {/* Circular overlay for hero-1 */}
            {currentSlide === 0 && (
              <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-white/20 rounded-full blur-sm"></div>
            )}

            {/* Organic white overlay for hero-2 */}
            {currentSlide === 1 && (
              <div className="absolute inset-0">
                <div
                  className="absolute top-0 left-0 w-3/4 h-full bg-white"
                  style={{
                    clipPath:
                      "polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%)",
                  }}
                ></div>
              </div>
            )}

            {/* S-curve overlay for hero-3 */}
            {currentSlide === 2 && (
              <div className="absolute inset-0">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-white"
                  style={{
                    clipPath:
                      "polygon(0 0, 60% 0, 80% 40%, 100% 60%, 100% 100%, 0 100%)",
                  }}
                ></div>
              </div>
            )}

            {/* Red organic shape for hero-4 */}
            {currentSlide === 3 && (
              <div className="absolute inset-0">
                <div
                  className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-[#AF1B3C]"
                  style={{
                    clipPath:
                      "polygon(40% 0, 100% 0, 100% 100%, 0 100%, 0 60%)",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div
            className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            style={{ boxShadow: "-5px 7px 17px -2px #00000096" }}
          >
            {/* Left Content */}
            <div className="space-y-8 px-8 py-12">
              {/* Title */}
              <h1 className="font-belfius-title text-4xl lg:text-6xl text-[#32546D] leading-tight">
                {currentSlideData.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-belfius-body">
                {currentSlideData.description}
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#AF1B3C] text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 font-belfius-body shadow-lg">
                  {currentSlideData.ctaText}
                </button>
              </div>

              {/* Stats for hero-1 */}
              {currentSlide === 0 && (
                <div className="flex space-x-4">
                  {currentSlideData.stats?.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 border border-red-200 shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{stat.icon}</span>
                        <div>
                          <div className="font-bold text-gray-900">
                            {stat.number}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className="relative px-8 py-12">
              {/* Iframe placeholder for hero-1 */}
              {currentSlide === 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8 border border-blue-200">
                  <div className="text-center text-2xl font-bold text-gray-900">
                    Iframe
                  </div>
                </div>
              )}

              {/* Smart panel for hero-2 */}
              {currentSlide === 1 && (
                <div className="relative">
                  <div className="bg-black rounded-lg p-6 shadow-2xl w-80 h-96">
                    <div className="bg-white rounded-lg h-full p-4">
                      <div className="text-center mb-4">
                        <div className="text-sm text-gray-500">HOME</div>
                        <div className="text-xs text-gray-400">▼</div>
                      </div>
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl">🔒</span>
                        </div>
                        <div className="text-lg font-bold">SECURE</div>
                      </div>
                      <div className="flex justify-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-lg">🏠</span>
                        </div>
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-lg">💡</span>
                        </div>
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-lg">🪟</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AC control for hero-3 */}
              {currentSlide === 2 && (
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                    <div className="text-center">
                      <div className="text-2xl mb-4">❄️</div>
                      <div className="text-lg font-bold">Air Control</div>
                      <div className="text-sm text-gray-600">
                        Temperature: 22°C
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Abstract design for hero-4 */}
              {currentSlide === 3 && (
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-20"></div>
                </div>
              )}
            </div>
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
    </section>
  );
}
