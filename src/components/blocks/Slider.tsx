import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { SliderBlok } from "@/types/storyblok";

export default function Slider({ blok }: { blok: SliderBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* Content Sections */}
        {blok?.content_sections && blok.content_sections.length > 0 && (
          <div className="space-y-16">
            {blok.content_sections.map((section, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${section.layout === "text-right" ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Text Content */}
                <div
                  className={`${section.layout === "text-right" ? "lg:col-start-2" : ""}`}
                >
                  <h3 className="font-belfius-title text-3xl lg:text-4xl text-gray-900 mb-6">
                    {section.heading}
                  </h3>
                  <p className="text-lg text-gray-600 font-belfius-body leading-relaxed mb-8">
                    {section.text}
                  </p>
                </div>

                {/* Image */}
                {section.image && section.image.filename && (
                  <div
                    className={`${section.layout === "text-right" ? "lg:col-start-1" : ""}`}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={section.image.filename}
                        alt={section.image.alt || section.heading}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {blok?.cta_button && blok.cta_button.length > 0 && (
          <div className="text-center mt-12">
            {blok.cta_button.map((button, index) => (
              <a
                key={index}
                href={button.link.cached_url}
                className="inline-block bg-belfius-red text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 font-belfius-body"
              >
                {button.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
