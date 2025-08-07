import { storyblokEditable } from "@storyblok/react/rsc";
import { SliderBlok } from "@/types/storyblok";

export default function Slider({ blok }: { blok: SliderBlok }) {
  
  const imageOnRight = blok?.text_position === 'right' || blok?.reverse_layout;
  
  const currentFeature = blok?.feature && blok.feature.length > 0 ? blok.feature[0] : null;
  
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 transition-all duration-500 ease-in-out"
    >
      {/* Main Card Container - Fixed height for consistent layout */}
      <div className="w-full max-w-[90%]  bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 ease-in-out hover:scale-[1.01]">
        {/* Content Layout with Dynamic Positioning - Fixed height grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] ${
          imageOnRight ? "lg:grid-flow-col-dense" : ""
        }`}>
          {/* Content Area - Centered text content */}
          <div className={`flex flex-col justify-center items-center text-center lg:text-left lg:items-start space-y-6 sm:space-y-8 md:space-y-10 h-full ${
            imageOnRight ? "lg:col-start-2" : ""
          }`}>
            {/* H2 Heading - Centered with responsive typography */}
            <h2
              className="text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight tracking-wide transition-all duration-300 hover:text-gray-700 line-clamp-3 break-words max-w-full"
              style={{
                fontFamily:
                  "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "300",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                hyphens: "auto"
              }}
            >
              {currentFeature?.title || "Default Title"}
            </h2>

            {/* Body Text - Centered with enhanced readability */}
            <div
              className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed transition-opacity duration-300 hover:opacity-90 flex-1 overflow-hidden max-w-2xl"
              style={{
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "300",
              }}
            >
              {(currentFeature?.description) ? (
                <div className="space-y-3 sm:space-y-4">
                  {(currentFeature?.description || "")
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-300 line-clamp-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Please add description content in Storyblok feature.
                </p>
              )}
            </div>

            {/* CTA Button - Centered */}
            <div className="pt-2 sm:pt-4 flex-shrink-0">
              {currentFeature?.cta_text ? (
                <a
                  href={currentFeature?.link?.cached_url || '#'}
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-white font-medium text-sm sm:text-base md:text-lg uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{
                    background:
                      "linear-gradient(180deg, #C30B30 0%, #961E34 100%)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    fontFamily:
                      "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  {currentFeature.cta_text}
                </a>
              ) : blok?.cta_button && blok.cta_button.length > 0 ? (
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                  {blok.cta_button.map((button, index) => (
                    <a
                      key={index}
                      href={button.link?.cached_url || '#'}
                      className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-white font-medium text-sm sm:text-base md:text-lg uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                      style={{
                        background:
                          "linear-gradient(180deg, #C30B30 0%, #961E34 100%)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        fontFamily:
                          "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: "500",
                        textDecoration: "none",
                      }}
                    >
                      {button.label || 'Click Here'}
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic text-sm sm:text-base">
                  Add CTA text in feature or CTA buttons in main blok
                </div>
              )}
            </div>
          </div>

          {/* Image Area - Full height matching card */}
          <div className={`flex items-center justify-center h-full ${
            imageOnRight ? "lg:col-start-1" : ""
          }`}>
            <div className="w-full h-full flex items-center justify-center transition-all duration-300 hover:scale-[1.02] group">
              {(currentFeature?.image?.filename || blok?.featured_image?.filename) ? (
                <img
                  src={currentFeature?.image?.filename || blok?.featured_image?.filename}
                  alt={
                    currentFeature?.image?.alt || 
                    blok?.featured_image?.alt || 
                    currentFeature?.title || 
                    blok?.title || 
                    "Featured image"
                  }
                  className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] rounded-2xl sm:rounded-3xl object-cover transition-all duration-500 group-hover:shadow-2xl"
                  style={{
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                  }}
                />
              ) : (
                <div 
                  className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-all duration-300 hover:from-gray-200 hover:to-gray-300"
                  style={{
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-500 text-sm sm:text-base md:text-lg font-light">
                      Add image in feature or main blok
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
