"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { ReviewsBlok } from "@/types/storyblok";
import { useState, useEffect } from "react";
import Image from "next/image";
import FigmaStarRating from "../../ui/FigmaStarRating/FigmaStarRating";

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

  // Reset slide when cards per slide changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [cardsPerSlide]);

  // Don't render the component if no reviews - MOVED AFTER ALL HOOKS
  if (!reviews || reviews.length === 0) {
    return (
      <section
        {...storyblokEditable(blok)}
        className="py-16 px-6 transition-all duration-500 ease-in-out"
        style={{ background: "#F4F4F4" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "48px",
              fontWeight: "700",
              lineHeight: "normal",
              color: "#32546D",
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
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

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

    if (isLeftSwipe && currentSlide < totalSlides - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
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
      className="py-16 px-6 transition-all duration-500 ease-in-out"
      style={{ background: "#F4F4F4" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          {/* H2 Title */}
          <h2
            className="text-left mb-12"
            style={{
              fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "48px",
              fontWeight: "700",
              lineHeight: "normal",
              color: "#32546D",
            }}
          >
            {blok?.title || "Customer Reviews"}
          </h2>

          
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
                className={`${getCardSizeClasses()} bg-white p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] group transform-gpu mx-auto relative`}
                style={{
                  borderRadius: "10px",
                  boxShadow: "9px 8px 16.9px rgba(0, 0, 0, 0.25)",
                  willChange: "transform",
                  minHeight: "230px",
                  maxWidth: "400px",
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
                          className="w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: "#C02139"
                          }}
                        >
                          <span className="text-white font-medium text-lg">
                            {review.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* User Details */}
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-medium text-black mb-1 transition-colors duration-300 group-hover:text-gray-700 truncate"
                        style={{
                          fontFamily: "Rubik, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "18px",
                          fontWeight: "400",
                          lineHeight: "30px",
                        }}
                      >
                        {review.name}
                      </h4>
                      <p
                        className="text-black transition-colors duration-300 truncate"
                        style={{
                          fontFamily: "Rubik, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "30px",
                        }}
                      >
                        {review.company || review.role || "Bruxelles"}
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
                  <div className="flex-shrink-0">
                    <FigmaStarRating rating={review.rating} />
                  </div>
                </div>

                {/* Review Text */}
                <div
                  className="text-black leading-relaxed transition-colors duration-300 group-hover:text-gray-600 flex-1 mt-6"
                  style={{
                    fontFamily: "Rubik, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "30px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  &quot;{review.review_text}&quot;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls - Only show when needed */}
        {showNavigation && (
          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
            {/* Pagination Dots */}
            <div className="flex gap-[30px]">
              {Array.from({ length: totalSlides }).map((_, index) => {
                const isActive = currentSlide === index;
                return isActive ? (
                  // Active indicator - pill shape
                  <div
                    key={index}
                    className="w-[45px] h-[15px] flex-shrink-0 rounded-full"
                    style={{ background: "#BE213A" }}
                  />
                ) : (
                  // Inactive dot
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="w-[15px] h-[15px] flex-shrink-0 rounded-full border-none cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE213A] focus-visible:ring-offset-2"
                    style={{
                      background: "rgba(105, 105, 132, 0.50)"
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-[80px]">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-[30px] h-[30px] flex-shrink-0 border-none bg-transparent cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE213A] focus-visible:ring-offset-2"
                style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}
                type="button"
                aria-label="Previous slide"
              >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 13.7496H8.925L13.4625 8.29961C13.6747 8.04434 13.7768 7.71524 13.7463 7.38471C13.7158 7.05417 13.5553 6.74929 13.3 6.53711C13.0447 6.32494 12.7156 6.22286 12.3851 6.25334C12.0546 6.28381 11.7497 6.44434 11.5375 6.69961L5.2875 14.1996C5.24545 14.2593 5.20785 14.3219 5.175 14.3871C5.175 14.4496 5.175 14.4871 5.0875 14.5496C5.03084 14.6929 5.00118 14.8455 5 14.9996C5.00118 15.1537 5.03084 15.3063 5.0875 15.4496C5.0875 15.5121 5.0875 15.5496 5.175 15.6121C5.20785 15.6773 5.24545 15.74 5.2875 15.7996L11.5375 23.2996C11.655 23.4407 11.8022 23.5542 11.9686 23.632C12.1349 23.7097 12.3164 23.7499 12.5 23.7496C12.7921 23.7502 13.0751 23.6485 13.3 23.4621C13.4266 23.3572 13.5312 23.2283 13.6079 23.0829C13.6846 22.9374 13.7318 22.7783 13.7469 22.6146C13.762 22.4509 13.7447 22.2858 13.6959 22.1288C13.6471 21.9718 13.5678 21.8259 13.4625 21.6996L8.925 16.2496H23.75C24.0815 16.2496 24.3995 16.1179 24.6339 15.8835C24.8683 15.6491 25 15.3311 25 14.9996C25 14.6681 24.8683 14.3501 24.6339 14.1157C24.3995 13.8813 24.0815 13.7496 23.75 13.7496Z"
                    fill={currentSlide > 0 ? "#BE213A" : "#696984"}
                    fillOpacity={currentSlide > 0 ? "1" : "0.5"}
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide >= totalSlides - 1}
                className="w-[30px] h-[30px] flex-shrink-0 border-none bg-transparent cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE213A] focus-visible:ring-offset-2"
                style={{ opacity: currentSlide >= totalSlides - 1 ? 0.5 : 1 }}
                type="button"
                aria-label="Next slide"
              >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.25 13.7496H21.075L16.5375 8.29961C16.3253 8.04434 16.2232 7.71524 16.2537 7.38471C16.2842 7.05417 16.4447 6.74929 16.7 6.53711C16.9553 6.32494 17.2844 6.22286 17.6149 6.25334C17.9454 6.28381 18.2503 6.44434 18.4625 6.69961L24.7125 14.1996C24.7545 14.2593 24.7922 14.3219 24.825 14.3871C24.825 14.4496 24.825 14.4871 24.9125 14.5496C24.9692 14.6929 24.9988 14.8455 25 14.9996C24.9988 15.1537 24.9692 15.3063 24.9125 15.4496C24.9125 15.5121 24.9125 15.5496 24.825 15.6121C24.7922 15.6773 24.7545 15.74 24.7125 15.7996L18.4625 23.2996C18.345 23.4407 18.1978 23.5542 18.0314 23.632C17.8651 23.7097 17.6836 23.7499 17.5 23.7496C17.2079 23.7502 16.9249 23.6485 16.7 23.4621C16.5734 23.3572 16.4688 23.2283 16.3921 23.0829C16.3154 22.9374 16.2682 22.7783 16.2531 22.6146C16.238 22.4509 16.2553 22.2858 16.3041 22.1288C16.3529 21.9718 16.4322 21.8259 16.5375 21.6996L21.075 16.2496H6.25C5.91848 16.2496 5.60054 16.1179 5.36612 15.8835C5.13169 15.6491 5 15.3311 5 14.9996C5 14.6681 5.13169 14.3501 5.36612 14.1157C5.60054 13.8813 5.91848 13.7496 6.25 13.7496Z"
                    fill={currentSlide < totalSlides - 1 ? "#BE213A" : "#696984"}
                    fillOpacity={currentSlide < totalSlides - 1 ? "1" : "0.5"}
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
