"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { HeroBlok } from "@/types/storyblok";
import IframeComponent from "./IframeComponent";

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
                {/* Trustbadge 1 */}
                <div className="relative flex-1 min-h-[70px] sm:min-h-[75px] md:min-h-[80px] lg:min-h-[83px]">
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
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-[#D9D9D9] rounded-none mr-2 sm:mr-3 md:mr-3 lg:mr-4 relative flex-shrink-0">
                      <svg 
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-6 sm:w-6 sm:h-7 md:w-7 md:h-8 lg:w-8 lg:h-9 xl:w-9 xl:h-11" 
                        viewBox="0 0 37 45" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M8.6316 44.0236V28.1801L0.44281 14.8881L9.40301 0.350037H27.4421L36.4023 14.8881L28.2135 28.1801V44.0236L18.4226 40.5819L8.6316 44.0236ZM9.93706 41.9467L18.4226 39.0985L26.908 41.9467V29.4262H9.93706V41.9467ZM10.0557 1.6555L1.86695 14.8881L10.0557 28.1207H26.7894L34.9782 14.8881L26.7894 1.6555H10.0557ZM15.9303 22.1275L9.93706 16.1936L10.8865 15.2441L15.9303 20.288L25.9586 10.2003L26.908 11.0904L15.9303 22.1275Z" 
                          fill="#AF1B3C"
                        />
                      </svg>
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
                        197.432
                      </div>
                      <div 
                        className="text-xs sm:text-xs md:text-sm lg:text-sm leading-tight"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 400,
                          color: "rgba(50,84,109,1)"
                        }}
                      >
                        Projets réalisés 
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trustbadge 2 */}
                <div className="relative flex-1 min-h-[70px] sm:min-h-[75px] md:min-h-[80px] lg:min-h-[83px]">
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
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-12 xl:h-12 bg-[#D9D9D9] rounded-none mr-2 sm:mr-3 md:mr-3 lg:mr-4 relative flex-shrink-0">
                      <svg 
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-4 sm:w-6 sm:h-5 md:w-7 md:h-6 lg:w-8 lg:h-7 xl:w-9 xl:h-8" 
                        viewBox="0 0 38 36" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M13.35 35.7L10.15 30.25L3.95 29L4.55 22.7L0.5 18L4.55 13.3L3.95 7.04999L10.15 5.74999L13.35 0.299988L19 2.74999L24.65 0.299988L27.9 5.74999L34.1 7.04999L33.45 13.3L37.5 18L33.45 22.7L34.1 29L27.9 30.25L24.65 35.7L19 33.25L13.35 35.7ZM13.85 34.25L19 32.15L24.2 34.25L27.25 29.4L32.85 28.1L32.35 22.3L36.15 18L32.35 13.7L32.85 7.84999L27.25 6.59999L24.2 1.74999L19 3.84999L13.8 1.74999L10.75 6.59999L5.15 7.84999L5.65 13.7L1.85 18L5.65 22.3L5.15 28.1L10.75 29.4L13.85 34.25ZM16.9 23.15L26.4 13.7L25.55 12.95L16.9 21.6L12.45 17.05L11.6 17.9L16.9 23.15Z" 
                          fill="#AF1B3C"
                        />
                      </svg>
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
                        4.5
                      </div>
                      <div 
                        className="text-xs sm:text-xs md:text-sm lg:text-sm leading-tight"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 400,
                          color: "rgba(50,84,109,1)"
                        }}
                      >
                        Taux de satisfaction
                      </div>
                    </div>
                  </div>
                </div>
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