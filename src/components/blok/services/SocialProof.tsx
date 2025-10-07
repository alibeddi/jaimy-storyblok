"use client";

import { useEffect, useRef, useState } from "react";

import { SocialProofBlok } from "@/types/storyblok";
import { storyblokEditable } from "@storyblok/react";

// Counter component with animation
function AnimatedCounter({
  targetNumber,
  suffix = "",
  duration = 2000,
}: {
  targetNumber: number | string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Parse Storyblok values robustly (accept number or formatted string)
  const parseTargetNumber = (value: number | string): number => {
    if (typeof value === "number") return value;
    if (!value) return 0;
    // Strip all non-digits
    const digitsOnly = String(value).replace(/\D+/g, "");
    if (!digitsOnly) return 0;
    return parseInt(digitsOnly, 10);
  };

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
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const node = counterRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const numericTarget = parseTargetNumber(targetNumber);
    if (numericTarget === 0) {
      setCount(0);
      setHasAnimated(true);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = numericTarget * easeOut;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericTarget);
        setHasAnimated(true);
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
    <div
      ref={counterRef}
      className="font-belfius-title text-4xl lg:text-6xl text-belfius-red mb-2">
      {formatNumber(count)}
      {suffix}
    </div>
  );
}

export default function SocialProof({ blok }: { blok: SocialProofBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}`}>
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-left">
          {blok?.title && (
            <h1
              data-blok-field="headline"
              // {...sbEditable(blok)}
              className="text-4xl mb-10 lg:text-5xl xl:text-6xl 2xl:text-6xl font-light leading-tight tracking-wide transition-all duration-300 hover:text-gray-700"
              style={{
                fontFamily:
                  "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",

                color: "rgba(50,84,109,1)",
              }}>
              {blok.title}
            </h1>
          )}
        </div>
        {/* Fallback: Show content even when layout is not set */}
        {!blok?.layout && (
          <div className="space-y-16">
            {/* Statistics */}
            {blok?.statistics && blok.statistics.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {blok.statistics.map((stat, index) => {
                  type StatRecord = {
                    component?: string;
                    value?: string | number;
                    number?: string | number;
                    suffix?: string;
                    label?: string;
                    description?: string;
                  };
                  const rec = stat as unknown as StatRecord;
                  const isTrustBadgeBlok = rec.component === "trust_badges";
                  const value = (isTrustBadgeBlok ? rec.value : rec.number) as
                    | number
                    | string
                    | undefined;
                  const suffix = (
                    isTrustBadgeBlok ? rec.suffix : rec.suffix
                  ) as string | undefined;
                  const label = (isTrustBadgeBlok ? rec.label : rec.label) as
                    | string
                    | undefined;
                  const description = (
                    isTrustBadgeBlok ? rec.description : rec.description
                  ) as string | undefined;

                  return (
                    <div
                      key={index}
                      className="text-center min-w-[200px] max-w-[250px]">
                      {/* Animated Number */}
                      <div
                        data-blok-field={
                          isTrustBadgeBlok
                            ? "statistics[].value"
                            : "statistics[].number"
                        }>
                        <AnimatedCounter
                          targetNumber={
                            (value as unknown as number | string) ?? 0
                          }
                          suffix={suffix || ""}
                          duration={2000 + index * 200}
                        />
                      </div>

                      {/* Label */}
                      {label && (
                        <div
                          className="font-belfius-body text-lg text-gray-900 mb-2"
                          data-blok-field="statistics[].label">
                          {label}
                        </div>
                      )}

                      {/* Description */}
                      {description && (
                        <div
                          className="text-gray-600 font-belfius-body text-sm"
                          data-blok-field="statistics[].description">
                          {description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
