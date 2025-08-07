"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { ReviewsBlok } from "@/types/storyblok";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Reviews({ blok }: { blok: ReviewsBlok }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  // Use only Storyblok data - no dummy data
  const reviews = blok?.reviews || [];

  // Dynamic responsive cards per slide with real-time updates
  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setCardsPerSlide(1); // Extra small mobile: 1 card
      } else if (width < 768) {
        setCardsPerSlide(1); // Mobile: 1 card
      } else if (width < 1024) {
        setCardsPerSlide(2); // Tablet: 2 cards
      } else if (width < 1280) {
        setCardsPerSlide(3); // Small desktop: 3 cards
      } else {
        setCardsPerSlide(3); // Large desktop: 3 cards
      }
    };

    // Set initial value
    updateCardsPerSlide();

    // Add resize listener
    window.addEventListener('resize', updateCardsPerSlide);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  // Don't render the component if no reviews
  if (!reviews || reviews.length === 0) {
    return (
      <section 
        {...storyblokEditable(blok)} 
        className="bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 transition-all duration-500 ease-in-out"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-gray-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight tracking-wide mb-3 sm:mb-4 md:mb-6 transition-all duration-300 hover:text-gray-700"
            style={{
              fontFamily:
                "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: "300",
            }}
          >
            {blok?.title || "Customer Reviews"}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">No reviews available. Add reviews in Storyblok to display them here.</p>
        </div>
      </section>
    );
  }

  const totalSlides = Math.ceil(reviews.length / cardsPerSlide);

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(index, totalSlides - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Reset slide when cards per slide changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [cardsPerSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && totalSlides > 1) {
      nextSlide();
    }
    if (isRightSwipe && totalSlides > 1) {
      prevSlide();
    }
  };

  const getVisibleReviews = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return reviews.slice(startIndex, startIndex + cardsPerSlide);
  };

  const visibleReviews = getVisibleReviews();

  // Enhanced responsive grid system based on screen size and card count
  const getGridClasses = () => {
    const totalReviews = reviews.length;
    
    // If total reviews <= cardsPerSlide, show all without pagination
    if (totalReviews <= cardsPerSlide) {
      if (cardsPerSlide === 1 || totalReviews === 1) {
        return "grid grid-cols-1 place-items-center max-w-sm mx-auto";
      } else if (cardsPerSlide === 2 || totalReviews === 2) {
        return "grid grid-cols-1 sm:grid-cols-2 place-items-center max-w-2xl mx-auto";
      } else {
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center max-w-4xl mx-auto";
      }
    }
    
    // For paginated content, use responsive grid based on cardsPerSlide
    if (cardsPerSlide === 1) {
      return "grid grid-cols-1 place-items-center";
    } else if (cardsPerSlide === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 place-items-center";
    } else {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center";
    }
  };

  // Dynamic card sizing based on screen size and cards per slide
  const getCardSizeClasses = () => {
    if (cardsPerSlide === 1) {
      return "w-full max-w-sm sm:max-w-md";
    } else if (cardsPerSlide === 2) {
      return "w-full max-w-xs sm:max-w-sm";
    } else {
      return "w-full max-w-xs";
    }
  };

  // Responsive gap classes
  const getGapClasses = () => {
    if (cardsPerSlide === 1) {
      return "gap-4 sm:gap-6";
    } else if (cardsPerSlide === 2) {
      return "gap-3 sm:gap-4 md:gap-6";
    } else {
      return "gap-3 sm:gap-4 md:gap-6 lg:gap-8";
    }
  };

  // Show all reviews if total <= cardsPerSlide, otherwise paginate
  const displayReviews = reviews.length <= cardsPerSlide ? reviews : visibleReviews;
  const showNavigation = reviews.length > cardsPerSlide;

  return (
    <section 
      {...storyblokEditable(blok)} 
      className="bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 transition-all duration-500 ease-in-out"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          {/* H2 Title */}
          <h2
            className="text-gray-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight tracking-wide mb-3 sm:mb-4 md:mb-6 transition-all duration-300 hover:text-gray-700"
            style={{
              fontFamily:
                "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: "300",
            }}
          >
            {blok?.title || "Customer Reviews"}
          </h2>

          {/* Subtitle */}
          {blok?.subtitle && (
            <p
              className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto transition-opacity duration-300 hover:opacity-90 px-2"
              style={{
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "300",
              }}
            >
              {blok.subtitle}
            </p>
          )}

          {/* Description */}
          {blok?.description && (
            <p
              className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto mt-2 sm:mt-3 md:mt-4 transition-opacity duration-300 hover:opacity-90 px-2"
              style={{
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "300",
              }}
            >
              {blok.description}
            </p>
          )}
        </div>

        {/* Reviews Cards Container - Fully Responsive */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <div className={`${getGridClasses()} ${getGapClasses()}`}>
            {displayReviews.map((review, index) => (
              <div 
                key={showNavigation ? `${currentSlide}-${index}` : `static-${index}`} 
                className={`${getCardSizeClasses()} bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02] group transform-gpu mx-auto`}
                style={{
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)",
                  willChange: "transform",
                  minHeight: cardsPerSlide === 1 ? "320px" : cardsPerSlide === 2 ? "280px" : "240px",
                }}
              >
                {/* User Info and Rating Row */}
                <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6 gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {/* User Avatar */}
                    <div className="relative flex-shrink-0">
                      {review.avatar?.filename ? (
                        <div className={`${
                          cardsPerSlide === 1 ? "w-12 h-12 sm:w-14 sm:h-14" :
                          cardsPerSlide === 2 ? "w-10 h-10 sm:w-12 sm:h-12" :
                          "w-8 h-8 sm:w-10 sm:h-10"
                        } rounded-full overflow-hidden ring-2 ring-gray-100 transition-all duration-300 group-hover:ring-red-100`}>
                          <Image
                            src={review.avatar.filename}
                            alt={review.avatar.alt || review.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div
                          className={`${
                            cardsPerSlide === 1 ? "w-12 h-12 sm:w-14 sm:h-14" :
                            cardsPerSlide === 2 ? "w-10 h-10 sm:w-12 sm:h-12" :
                            "w-8 h-8 sm:w-10 sm:h-10"
                          } rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                          style={{ 
                            background: "linear-gradient(135deg, #C30B30 0%, #961E34 100%)",
                            boxShadow: "0 2px 8px rgba(195, 11, 48, 0.3)"
                          }}
                        >
                          <span className={`text-white font-medium ${
                            cardsPerSlide === 1 ? "text-base sm:text-lg" :
                            cardsPerSlide === 2 ? "text-sm sm:text-base" :
                            "text-xs sm:text-sm"
                          }`}>
                            {review.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* User Details */}
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`font-medium text-gray-900 mb-1 transition-colors duration-300 group-hover:text-gray-700 truncate ${
                          cardsPerSlide === 1 ? "text-base sm:text-lg" :
                          cardsPerSlide === 2 ? "text-sm sm:text-base" :
                          "text-xs sm:text-sm"
                        }`}
                        style={{
                          fontFamily:
                            "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "500",
                        }}
                      >
                        {review.name}
                      </h4>
                      <p
                        className={`text-gray-500 transition-colors duration-300 truncate ${
                          cardsPerSlide === 1 ? "text-sm sm:text-base" :
                          cardsPerSlide === 2 ? "text-xs sm:text-sm" :
                          "text-xs"
                        }`}
                        style={{
                          fontFamily:
                            "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "300",
                        }}
                      >
                        {review.role && review.company 
                          ? `${review.role} at ${review.company}`
                          : review.company || review.role || "Verified Customer"
                        }
                      </p>
                      {review.date && (
                        <p
                          className={`text-gray-400 transition-colors duration-300 mt-0.5 ${
                            cardsPerSlide === 1 ? "text-xs sm:text-sm" : "text-xs"
                          }`}
                          style={{
                            fontFamily:
                              "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: "300",
                          }}
                        >
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(5)].map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`transition-all duration-300 ${
                          starIndex < review.rating 
                            ? "text-yellow-400 group-hover:scale-110" 
                            : "text-gray-300"
                        } ${
                          cardsPerSlide === 1 ? "text-base sm:text-lg" :
                          cardsPerSlide === 2 ? "text-sm sm:text-base" :
                          "text-xs sm:text-sm"
                        }`}
                        style={{
                          filter: starIndex < review.rating ? "drop-shadow(0 1px 2px rgba(255, 193, 7, 0.3))" : "none",
                        }}
                      >
                        {starIndex < review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <blockquote
                  className={`text-gray-700 leading-relaxed italic transition-colors duration-300 group-hover:text-gray-600 flex-1 ${
                    cardsPerSlide === 1 ? "text-sm sm:text-base" :
                    cardsPerSlide === 2 ? "text-xs sm:text-sm" :
                    "text-xs"
                  }`}
                  style={{
                    fontFamily:
                      "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "300",
                    lineHeight: "1.5",
                    display: "-webkit-box",
                    WebkitLineClamp: cardsPerSlide === 1 ? 5 : cardsPerSlide === 2 ? 4 : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  &ldquo;{review.review_text}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls - Only show when needed */}
        {showNavigation && (
          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
            {/* Pagination Dots */}
            <div className="flex gap-1 sm:gap-1.5 md:gap-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-125 active:scale-110 ${
                    index === currentSlide 
                      ? "shadow-lg" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  style={{
                    background:
                      index === currentSlide 
                        ? "linear-gradient(135deg, #C30B30 0%, #961E34 100%)"
                        : undefined,
                    boxShadow:
                      index === currentSlide
                        ? "0 2px 8px rgba(195, 11, 48, 0.4)"
                        : undefined,
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={prevSlide}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 touch-manipulation"
                style={{
                  background: "linear-gradient(135deg, #C30B30 0%, #961E34 100%)",
                  boxShadow: "0 2px 8px rgba(195, 11, 48, 0.3)",
                }}
                type="button"
                aria-label="Previous slide"
              >
                <span className="text-white text-xs sm:text-sm md:text-base font-medium">←</span>
              </button>
              <button
                onClick={nextSlide}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 touch-manipulation"
                style={{
                  background: "linear-gradient(135deg, #C30B30 0%, #961E34 100%)",
                  boxShadow: "0 2px 8px rgba(195, 11, 48, 0.3)",
                }}
                type="button"
                aria-label="Next slide"
              >
                <span className="text-white text-xs sm:text-sm md:text-base font-medium">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
