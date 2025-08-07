"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { SocialProofBlok } from "@/types/storyblok";
import { useEffect, useRef, useState } from "react";

// Counter component with animation
function AnimatedCounter({ 
  targetNumber, 
  suffix = "", 
  duration = 2000 
}: { 
  targetNumber: number; 
  suffix?: string; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);
      console.log('currentCount', count);
console.log(  targetNumber)
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Format the animated number with proper formatting
  const formatNumber = (current: number): string => {
    const rounded = Math.floor(current);
    
    // Add commas for thousands
    if (rounded >= 1000) {
      return rounded.toLocaleString();
    }
    
    return rounded.toString();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
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
  }, [hasAnimated]);

  useEffect(() => {
    
    setHasAnimated(true);
    
    if (targetNumber === 0) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = targetNumber * easeOut;
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, targetNumber, duration, hasAnimated]);

  return (
    <div ref={counterRef} className="font-belfius-title text-4xl lg:text-6xl text-belfius-red mb-2">
      {formatNumber(count)}{suffix}
    </div>
  );
}

export default function SocialProof({ blok }: { blok: SocialProofBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-left">
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
        {/* Fallback: Show content even when layout is not set */}
        {!blok?.layout && (
          <div className="space-y-16">
            {/* Statistics */}
            {blok?.statistics && blok.statistics.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {blok.statistics.map((stat, index) => (
                  <div key={index} className="text-center min-w-[200px] max-w-[250px]">
                    {/* Animated Number */}
                    <AnimatedCounter 
                      targetNumber={Number(stat.number) || 0} 
                      suffix={stat.suffix || ""} 
                      duration={2000 + index * 200} 
                    />
                    
                    {/* Label */}
                    <div className="font-belfius-body text-lg text-gray-900 mb-2">
                      {stat.label}
                    </div>
                    
                    {/* Description */}
                    {stat.description && (
                      <div className="text-gray-600 font-belfius-body text-sm">
                        {stat.description}
                      </div>
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
