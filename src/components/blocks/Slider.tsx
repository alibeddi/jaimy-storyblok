import { storyblokEditable } from "@storyblok/react/rsc";
import { SliderBlok } from "@/types/storyblok";

export default function Slider({ blok }: { blok: SliderBlok }) {
  
  const imageOnRight = blok?.text_position === 'right' || blok?.reverse_layout;
  
 
  const currentFeature = blok?.feature && blok.feature.length > 0 ? blok.feature[0] : null;
  
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative w-full min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4"
    >
      {/* Main Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Content Layout with Dynamic Positioning */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12 ${
          imageOnRight ? "lg:grid-flow-col-dense" : ""
        }`}>
          {/* Content Area */}
          <div className={`flex flex-col justify-center space-y-8 ${
            imageOnRight ? "lg:col-start-2" : ""
          }`}>
            {/* H2 Heading - From feature data or main blok */}
            <h2
              className="text-gray-800 text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                fontFamily:
                  "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "700",
              }}
            >
              {currentFeature?.title ||  "Default Title"}
            </h2>


            {/* Body Text - From feature data or main blok */}
            <div
              className="space-y-6 text-gray-700 leading-relaxed"
              style={{
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "400",
              }}
            >
              {(currentFeature?.description ) ? (
                <div className="space-y-4">
                  {(currentFeature?.description ||  "")
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="text-lg">
                        {paragraph}
                      </p>
                    ))}
                </div>
              ) : (
                <p className="text-lg">
                  Please add description content in Storyblok feature.
                </p>
              )}
            </div>

            {/* CTA Button - From feature data or main blok */}
            <div className="pt-4">
              {currentFeature?.cta_text ? (
                <a
                  href={currentFeature?.link?.cached_url || '#'}
                  className="inline-block px-8 py-4 text-white font-bold text-lg uppercase tracking-wide rounded-full transition-transform hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(180deg, #C30B30 0%, #961E34 100%)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    fontFamily:
                      "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "700",
                    textDecoration: "none",
                  }}
                >
                  {currentFeature.cta_text}
                </a>
              ) : blok?.cta_button && blok.cta_button.length > 0 ? (
                blok.cta_button.map((button, index) => (
                  <a
                    key={index}
                    href={button.link?.cached_url || '#'}
                    className="inline-block px-8 py-4 text-white font-bold text-lg uppercase tracking-wide rounded-full transition-transform hover:scale-105 mr-4 mb-4"
                    style={{
                      background:
                        "linear-gradient(180deg, #C30B30 0%, #961E34 100%)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      fontFamily:
                        "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    {button.label || 'Click Here'}
                  </a>
                ))
              ) : (
                <div className="text-gray-500 italic">
                  Add CTA text in feature or CTA buttons in main blok
                </div>
              )}
            </div>
          </div>

          {/* Image Area with Dynamic Positioning - From feature data or main blok */}
          <div className={`flex items-center justify-center ${
            imageOnRight ? "lg:col-start-1" : ""
          }`}>
            <div className="w-full max-w-md lg:max-w-lg">
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
                  className="w-full h-auto rounded-3xl object-cover"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                />
              ) : (
                <div 
                  className="w-full h-64 lg:h-80 rounded-3xl bg-gray-200 flex items-center justify-center"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span className="text-gray-500 text-lg font-semibold">
                    Add image in feature or main blok
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
