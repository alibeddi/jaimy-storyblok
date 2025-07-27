import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface BodyProps {
  blok: {
    title?: string;
    subtitle?: string;
    description?: string;
    content_sections?: Array<{
      heading: string;
      text: string;
      image?: {
        filename: string;
        alt?: string;
      };
      layout?: "text-left" | "text-right";
    }>;
    cta_button?: Array<{
      label: string;
      link: {
        cached_url: string;
      };
    }>;
    background_color?: string;
  };
}

export default function Body({ blok }: BodyProps) {
  return (
    <section {...storyblokEditable(blok)} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        {(blok.title || blok.subtitle || blok.description) && (
          <div className="text-center mb-16">
            {blok.subtitle && (
              <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
                {blok.subtitle}
              </p>
            )}
            {blok.title && (
              <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
                {blok.title}
              </h2>
            )}
            {blok.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
                {blok.description}
              </p>
            )}
          </div>
        )}

        {/* Content Sections */}
        {blok.content_sections?.map((section, index) => (
          <div key={index} className="mb-16 lg:mb-24">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                section.layout === "text-right" ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Text Content */}
              <div
                className={`space-y-6 ${
                  section.layout === "text-right" ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <h3 className="font-belfius-title text-2xl lg:text-3xl text-gray-900">
                  {section.heading}
                </h3>
                <div className="text-gray-700 leading-relaxed font-belfius-body">
                  {section.text.split("\n\n").map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div
                className={`relative ${
                  section.layout === "text-right" ? "lg:order-1" : "lg:order-2"
                }`}
              >
                {section.image?.filename ? (
                  <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={section.image.filename}
                      alt={section.image.alt || section.heading}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-w-4 aspect-h-3 rounded-2xl bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Image placeholder</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* CTA Button */}
        {blok.cta_button?.map((cta, index) => (
          <div key={index} className="text-center mt-12">
            <a
              href={`/${cta.link.cached_url}`}
              className="btn-belfius-primary font-belfius-cta inline-flex items-center space-x-2"
            >
              <span>{cta.label}</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
