"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { HeroBlok } from "@/types/storyblok";

export default function Hero({ blok }: { blok: HeroBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative w-full min-h-screen bg-white overflow-hidden"
    >
      {/* Curved Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/51a0bff854c5067540dc4dca45a29a9b1e335b80?width=8664"
          alt="Vector"
          className="absolute -left-1/2 -top-full w-[300vw] h-[300vw] transform rotate-[-129.613deg] object-cover opacity-80"
          style={{
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Semi-transparent Background Card */}
        <div 
          className="rounded-[25px] h-[800px] backdrop-blur-sm p-6 lg:p-12"
          style={{
            background: "rgba(244, 244, 244, 0.50)",
            boxShadow: "-5px 7px 17px -2px rgba(0, 0, 0, 0.59)"
          }}
        >
          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* H1 Title */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                style={{
                  fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: 700,
                  color: "rgba(50,84,109,1)"
                }}
              >
                H1 Plan je ketelonderhoud
              </h1>

              {/* Body Text */}
              <p 
                className="text-base lg:text-lg leading-relaxed"
                style={{
                  fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: 400,
                  color: "rgba(0,0,0,1)"
                }}
              >
                Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text 
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-[25px] text-lg font-semibold transition-transform hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg, #961E34 0%, #C30B30 101.65%)",
                    boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)",
                    fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    color: "rgba(255,255,255,1)"
                  }}
                >
                  CTA HERE
                </button>
              </div>

              {/* Trust Badges Container */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4">
                {/* Trustbadge 1 */}
                <div className="relative flex-1 min-h-[83px]">
                  <div 
                    className="absolute inset-0 rounded-[25px]"
                    style={{
                      background: "#F4F4F4",
                      opacity: 0.5,
                      boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)"
                    }}
                  />
                  <div className="relative flex items-center h-full px-4 lg:px-6">
                    {/* Icon */}
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#D9D9D9] rounded-none mr-4 relative flex-shrink-0">
                      <svg 
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-9 lg:w-9 lg:h-11" 
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
                    <div className="min-w-0">
                      <div 
                        className="text-lg lg:text-xl xl:text-2xl font-semibold leading-tight"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 700,
                          color: "rgba(175,27,60,1)"
                        }}
                      >
                        197.432
                      </div>
                      <div 
                        className="text-xs lg:text-sm leading-tight"
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
                <div className="relative flex-1 min-h-[83px]">
                  <div 
                    className="absolute inset-0 rounded-[25px]"
                    style={{
                      background: "#F4F4F4",
                      opacity: 0.5,
                      boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)"
                    }}
                  />
                  <div className="relative flex items-center h-full px-4 lg:px-6">
                    {/* Icon */}
                    <div className="w-12 h-12 lg:w-12 lg:h-12 bg-[#D9D9D9] rounded-none mr-4 relative flex-shrink-0">
                      <svg 
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-7 lg:w-9 lg:h-8" 
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
                    <div className="min-w-0">
                      <div 
                        className="text-lg lg:text-xl xl:text-2xl font-semibold leading-tight"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: 700,
                          color: "rgba(175,27,60,1)"
                        }}
                      >
                        4.5
                      </div>
                      <div 
                        className="text-xs lg:text-sm leading-tight"
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

            {/* Right Content - White Card with Iframe */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg aspect-[3/4] lg:aspect-[3/4]">
                <div 
                  className="w-full h-full rounded-[25px] bg-white flex items-center justify-center"
                  style={{
                    boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)"
                  }}
                >
                  <div className="text-center p-8">
                    <span 
                      className="text-3xl lg:text-4xl xl:text-5xl font-semibold leading-normal text-center"
                      style={{
                        fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 700,
                        color: "rgba(0,0,0,1)"
                      }}
                    >
                      Iframe
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

