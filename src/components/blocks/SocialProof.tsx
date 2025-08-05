"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { SocialProofBlok } from "@/types/storyblok";
import { useEffect, useRef, useState } from "react";

// Counter component with animation
function AnimatedCounter({ targetNumber, duration = 2000 }: { targetNumber: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Extract numeric value from string (handles formats like "1,000+", "50K", "99%")
  const getNumericValue = (str: string): number => {
    const cleanStr = str.replace(/[^0-9.]/g, '');
    return parseFloat(cleanStr) || 0;
  };

  // Format the animated number back to match original format
  const formatNumber = (current: number, original: string): string => {
    const hasComma = original.includes(',');
    const hasPlus = original.includes('+');
    const hasPercent = original.includes('%');
    const hasK = original.toLowerCase().includes('k');
    
    let formatted = Math.floor(current).toString();
    
    if (hasComma && current >= 1000) {
      formatted = current.toLocaleString();
    }
    
    if (hasK) {
      formatted = Math.floor(current / 1000) + 'K';
    }
    
    if (hasPlus) {
      formatted += '+';
    }
    
    if (hasPercent) {
      formatted += '%';
    }
    
    return formatted;
  };

  const targetValue = getNumericValue(targetNumber);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully visible
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []); // Remove isVisible from dependency array

  useEffect(() => {
    if (!isVisible || targetValue === 0) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = targetValue * easeOut;
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, targetValue, duration]);

  return (
    <div ref={counterRef} className="font-belfius-title text-4xl lg:text-6xl text-belfius-red mb-2">
      {formatNumber(count, targetNumber)}
    </div>
  );
}

export default function SocialProof({ blok }: { blok: SocialProofBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
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

        {/* Content based on layout */}
        {blok?.layout === "logos-only" && blok?.logos && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {blok.logos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                {logo.logo.filename && (
                  <Image
                    src={logo.logo.filename}
                    alt={logo.logo.alt || logo.company_name || "Company Logo"}
                    width={120}
                    height={60}
                    className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {blok?.layout === "stats-only" && blok?.statistics && (
          <div className="flex flex-wrap justify-center gap-8">
            {blok.statistics.map((stat, index) => (
              <div key={index} className="text-center min-w-[200px]">
                <AnimatedCounter targetNumber={stat.number} duration={2000 + index * 200} />
                <div className="font-belfius-body text-lg text-gray-900 mb-2">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-gray-600 font-belfius-body">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {blok?.layout === "mixed" && (
          <div className="space-y-16">
            {/* Logos */}
            {blok?.logos && blok.logos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                {blok.logos.map((logo, index) => (
                  <div key={index} className="flex justify-center">
                    {logo.logo.filename && (
                      <Image
                        src={logo.logo.filename}
                        alt={
                          logo.logo.alt || logo.company_name || "Company Logo"
                        }
                        width={120}
                        height={60}
                        className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Statistics */}
            {blok?.statistics && blok.statistics.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8">
                {blok.statistics.map((stat, index) => (
                  <div key={index} className="text-center min-w-[200px]">
                    <AnimatedCounter targetNumber={stat.number} duration={2000 + index * 200} />
                    <div className="font-belfius-body text-lg text-gray-900 mb-2">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-gray-600 font-belfius-body">
                        {stat.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Fallback: Show content even when layout is not set */}
        {!blok?.layout && (
          <div className="space-y-16">
            {/* Statistics */}
            {blok?.statistics && blok.statistics.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8">
                {blok.statistics.map((stat, index) => (
                  <div key={index} className="text-center min-w-[200px]">
                    <AnimatedCounter targetNumber={stat.number} duration={2000 + index * 200} />
                    <div className="font-belfius-body text-lg text-gray-900 mb-2">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-gray-600 font-belfius-body">
                        {stat.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Logos */}
            {blok?.logos && blok.logos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                {blok.logos.map((logo, index) => (
                  <div key={index} className="flex justify-center">
                    {logo.logo.filename && (
                      <Image
                        src={logo.logo.filename}
                        alt={
                          logo.logo.alt || logo.company_name || "Company Logo"
                        }
                        width={120}
                        height={60}
                        className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
