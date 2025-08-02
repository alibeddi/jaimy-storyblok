import { storyblokEditable } from "@storyblok/react/rsc";
import { SliderBlok } from "@/types/storyblok";

export default function Slider({ blok }: { blok: SliderBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}

      className="relative w-full min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4"
    >
      {/* Main Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12">
          {/* Left Content Area */}
          <div className="flex flex-col justify-center space-y-8">
            {/* H2 Heading */}
            <h2
              className="text-gray-800 text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                fontFamily:
                  "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "700",
              }}
            >
              {blok?.title || "H2"}
            </h2>

            {/* Body Text */}
            <div
              className="space-y-6 text-gray-700 leading-relaxed"
              style={{
                fontFamily:
                  "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "400",
              }}
            >
              {blok?.description ? (
                <p className="text-lg">{blok.description}</p>
              ) : (
                <>
                  <p className="text-lg">
                    Body text Body text Body text Body text Body text Body text
                    Body text Body text Body text Body text Body text Body text
                    Body text Body text Body text Body text
                  </p>
                  <p className="text-lg">
                    Body text Body text Body text Body text Body text Body text
                    Body text Body text Body text Body text Body text Body text
                    Body text Body text Body text Body text
                  </p>
                  <p className="text-lg">
                    Body text Body text Body text Body text Body text Body text
                    Body text Body text Body text Body text Body text Body text
                    Body text Body text Body text Body text
                  </p>
                  <p className="text-lg">
                    Body text Body text Body text Body text Body text Body text
                    Body text Body text Body text Body text Body text Body text
                    Body text Body text Body text Body text
                  </p>
                </>
              )}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              {blok?.cta_button && blok.cta_button.length > 0 ? (
                blok.cta_button.map((button, index) => (
                  <a
                    key={index}
                    href={button.link.cached_url}
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
                    {button.label}
                  </a>
                ))
              ) : (
                <button
                  className="px-8 py-4 text-white font-bold text-lg uppercase tracking-wide rounded-full transition-transform hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(180deg, #C30B30 0%, #961E34 100%)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    fontFamily:
                      "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  CTA HERE
                </button>
              )}

            </div>
          </div>


          {/* Right Image Area */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md lg:max-w-lg">
              {blok?.featured_image?.filename ? (
                <img
                  src={blok.featured_image.filename}
                  alt={blok.featured_image.alt || "Featured image"}
                  className="w-full h-auto rounded-3xl object-cover"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80"
                  alt="Young couple looking at smartphone"
                  className="w-full h-auto rounded-3xl object-cover"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
