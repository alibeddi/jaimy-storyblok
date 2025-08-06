"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { HeroBlok } from "@/types/storyblok";
import IframeComponent from "./IframeComponent";
import Image from "next/image"; // Add this line

export default function Hero({ blok }: { blok: HeroBlok }) {
    console.log(blok);
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative w-full bg-white overflow-hidden hero-large-screen"
    >
     {/* Background Image - Hidden on mobile, visible on larger screens */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              backgroundImage: "url(/backgrounds/Hero_bg.png)",
              backgroundSize: "contain",
              backgroundPosition: "bottom right",
              backgroundRepeat: "no-repeat",
              maxWidth: "100%",
              right: "0%",
              left: "0%"
            }}
          />
      {/* Main Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 hero-container-large flex items-center">
        
        {/* Semi-transparent Background Card */}
        <div 
          className="rounded-[25px] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 w-full"
          style={{
            background: "rgba(244, 244, 244, 0.50)",
            boxShadow: "-5px 7px 17px -2px rgba(0, 0, 0, 0.59)"
          }}
        >
          {/* Content Layout - Better breakpoint management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
              {/* H1 Title */}
              <h1 
                className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight"
                style={{
                  fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: 700,
                  color: "rgba(50,84,109,1)"
                }}
              >
                {blok?.headline || "H1 Plan je ketelonderhoud"}
              </h1>

              {/* Body Text */}
              <p 
                className="text-sm sm:text-base md:text-base lg:text-lg leading-relaxed"
                style={{
                  fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: 400,
                  color: "rgba(0,0,0,1)"
                }}
              >
                {blok?.description || "Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text"}
              </p>

              {/* CTA Button */}
              <div className="pt-2 md:pt-3 lg:pt-4">
                <button 
                  className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-[25px] text-base sm:text-base md:text-lg font-semibold transition-transform hover:scale-105 w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(90deg, #961E34 0%, #C30B30 101.65%)",
                    boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)",
                    fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    color: "rgba(255,255,255,1)"
                  }}
                >
                  {blok?.primary_button?.[0]?.label || "CTA HERE"}
                </button>
              </div>

              {/* Trust Badges Container - Force horizontal layout on medium+ screens */}
              <div className="flex flex-col sm:flex-row md:flex-row gap-3 sm:gap-3 md:gap-4 lg:gap-6 pt-2 md:pt-3 lg:pt-4">
                {blok?.trust_badges?.map((badge, index) => (
                  <div key={index} className="relative flex-1 sm:flex-1 md:flex-1 lg:w-[300px] xl:w-[300px] min-h-[70px] sm:min-h-[75px] md:min-h-[80px] lg:min-h-[83px]">
                    <div 
                      className="absolute inset-0 rounded-[25px]"
                      style={{
                        background: "#F4F4F4",
                        opacity: 0.5,
                        boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)"
                      }}
                    />
                    <div className="relative flex items-center h-full px-3 sm:px-3 md:px-4 lg:px-6">
                      {/* Icon */}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-none mr-2 sm:mr-3 md:mr-3 lg:mr-4 relative flex-shrink-0">
                        {badge.icon_svg ? (
                          <div 
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-6 sm:w-6 sm:h-7 md:w-7 md:h-8 lg:w-8 lg:h-9 xl:w-9 xl:h-11"
                            dangerouslySetInnerHTML={{ __html: badge.icon_svg }}
                          />
                        ) : badge.icon?.filename ? (
                          <Image
                            src={badge.icon.filename}
                            alt={badge.icon.alt || 'Trust badge icon'}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          // Default icon if none provided
                          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#AF1B3C] rounded-full" />
                        )}
                      </div>
                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div 
                          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight"
                          style={{
                            fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 700,
                            color: "rgba(175,27,60,1)"
                          }}
                        >
                          {badge.value}
                        </div>
                        <div 
                          className="text-xs sm:text-xs md:text-sm lg:text-sm leading-tight"
                          style={{
                            fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 400,
                            color: "rgba(50,84,109,1)"
                          }}
                        >
                          {badge.description}
                        </div>
                      </div>
                    </div>
                </div>
                  ))}
              </div>
            </div>

            {/* Right Content - Iframe Component */}
            <div className="flex justify-center md:justify-end items-center">
              <div className="w-full max-w-sm sm:max-w-md md:max-w-full lg:max-w-lg aspect-[3/4] md:aspect-[3/4]">
                <div 
                  className="w-full h-full rounded-[25px] bg-white overflow-hidden"
                  style={{
                    boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)"
                  }}
                >
                  {/* Iframe Component Integration */}
                  {blok?.iframe_block ? (
                    <IframeComponent blok={blok.iframe_block} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-6 lg:p-8">
                      <span 
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-normal text-center"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 700,
                          color: "rgba(0,0,0,1)"
                        }}
                      >
                        Iframe
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}