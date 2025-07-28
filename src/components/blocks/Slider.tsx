import { storyblokEditable } from "@storyblok/react/rsc";
import { SliderBlok } from "@/types/storyblok";

export default function Slider({ blok }: { blok: SliderBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative w-full bg-white py-8 md:py-16 lg:py-20"
    >
      {/* Container for responsive layout */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        {/* Main Card Container */}
        <div className="relative w-full mx-auto bg-white rounded-lg md:rounded-xl lg:rounded-[20px] overflow-hidden shadow-lg md:shadow-xl lg:shadow-[-5px_7px_17px_2px_rgba(0,0,0,0.55)]">

          {/* Content Layout - Responsive Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 p-6 md:p-8 lg:p-12 min-h-[600px] md:min-h-[700px] lg:min-h-[905px]">

            {/* Left Content Area */}
            <div className="flex flex-col justify-center lg:justify-start order-2 lg:order-1">

              {/* H2 Heading */}
              <h2
                className="text-[#32546D] mb-6 md:mb-8 lg:mb-12"
                style={{
                  fontFamily: 'BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif',
                  fontWeight: '700',
                  lineHeight: 'normal'
                }}
              >
                <span className="text-2xl md:text-4xl lg:text-[48px]">
                  {blok?.title || "H2"}
                </span>
              </h2>

              {/* Body Text */}
              <div
                className="text-black mb-6 md:mb-8 lg:mb-12 flex-1 lg:flex-none"
                style={{
                  fontFamily: 'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.5'
                }}
              >
                <div className="text-sm md:text-lg lg:text-[20px] lg:leading-normal">
                  {blok?.description ? (
                    <p>{blok.description}</p>
                  ) : (
                    <div className="space-y-4">
                      <p>
                        Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text
                      </p>
                      <p>
                        Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text
                      </p>
                      <p>
                        Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text
                      </p>
                      <p>
                        Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative w-full max-w-[213px] h-[60px] md:h-[70px] lg:h-[83px]">
                {blok?.cta_button && blok.cta_button.length > 0 ? (
                  blok.cta_button.map((button, index) => (
                    <a
                      key={index}
                      href={button.link.cached_url}
                      className="absolute inset-0 flex items-center justify-center text-white text-center transition-transform hover:scale-105"
                      style={{
                        borderRadius: '25px',
                        background: 'linear-gradient(90deg, #961E34 0%, #C30B30 101.65%)',
                        boxShadow: '-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)',
                        fontFamily: 'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                        fontWeight: '700',
                        lineHeight: 'normal',
                        textDecoration: 'none'
                      }}
                    >
                      <span className="text-lg md:text-xl lg:text-[24px]">
                        {button.label}
                      </span>
                    </a>
                  ))
                ) : (
                  <button
                    className="absolute inset-0 flex items-center justify-center text-white text-center transition-transform hover:scale-105"
                    style={{
                      borderRadius: '25px',
                      background: 'linear-gradient(90deg, #961E34 0%, #C30B30 101.65%)',
                      boxShadow: '-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)',
                      fontFamily: 'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                      fontWeight: '700',
                      lineHeight: 'normal',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span className="text-lg md:text-xl lg:text-[24px]">
                      CTA HERE
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Image Area */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[567px] aspect-[189/283]">
                {blok?.featured_image?.filename ? (
                  <img
                    src={blok.featured_image.filename}
                    alt={blok.featured_image.alt || "Featured image"}
                    className="w-full h-full object-cover rounded-lg md:rounded-xl lg:rounded-[20px]"
                    style={{
                      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                ) : (
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/21987b989129052723a1d82d024ed1e4951b06e2?width=1134"
                    alt="Young family moving into new home"
                    className="w-full h-full object-cover rounded-lg md:rounded-xl lg:rounded-[20px]"
                    style={{
                      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
