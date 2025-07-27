import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface SocialProofProps {
  blok: {
    title?: string;
    subtitle?: string;
    description?: string;
    logos?: Array<{
      logo: {
        filename: string;
        alt?: string;
      };
      company_name?: string;
    }>;
    statistics?: Array<{
      number: string;
      label: string;
      description?: string;
    }>;
    testimonials?: Array<{
      text: string;
      author: string;
      company?: string;
    }>;
    layout?: "logos-only" | "stats-only" | "mixed";
    background_color?: string;
  };
}

export default function SocialProof({ blok }: SocialProofProps) {
  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${
        blok.background_color === "gray" ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Logos Section */}
        {blok.logos && blok.logos.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {blok.logos.map((item, index) => (
                <div key={index} className="flex justify-center">
                  <div className="relative h-12 w-32 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    {item.logo.filename ? (
                      <Image
                        src={item.logo.filename}
                        alt={
                          item.logo.alt || item.company_name || "Company logo"
                        }
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          {item.company_name || "Logo"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics Section */}
        {blok.statistics && blok.statistics.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {blok.statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-belfius-title text-4xl lg:text-5xl text-belfius-red mb-2">
                    {stat.number}
                  </div>
                  <div className="font-belfius-title text-lg text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-gray-600 font-belfius-body">
                      {stat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        {blok.testimonials && blok.testimonials.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blok.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <blockquote className="text-gray-700 mb-4 font-belfius-body leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <div className="font-belfius-title text-gray-900">
                    {testimonial.author}
                  </div>
                  {testimonial.company && (
                    <div className="text-sm text-gray-600 font-belfius-body">
                      {testimonial.company}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
