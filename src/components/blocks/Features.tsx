import { storyblokEditable } from "@storyblok/react/rsc";

interface FeaturesProps {
  blok: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: {
      filename: string;
      alt?: string;
    };
    cta_button?: [
      {
        label: string;
        link: {
          cached_url: string;
          linktype: string;
        };
      },
    ];
    reverse_layout?: boolean;
  };
}

export default function Features({ blok }: FeaturesProps) {
  console.log(blok);
  return (
    <section {...storyblokEditable(blok)} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 items-center ${
              blok.reverse_layout ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Text Content */}
            <div
              className={`p-8 lg:p-12 xl:p-16 space-y-6 ${
                blok.reverse_layout ? "lg:col-start-2" : ""
              }`}
            >
              {/* Title */}
              {blok.title && (
                <h2 className="font-belfius-title text-2xl lg:text-3xl xl:text-4xl text-gray-900 leading-tight">
                  {blok.title}
                </h2>
              )}

              {/* Description */}
              {blok.description && (
                <div className="space-y-4">
                  {blok.description.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 text-base leading-relaxed font-belfius-body"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {blok.cta_button && blok.cta_button[0] && (
                <div className="pt-2">
                  <a
                    href={blok.cta_button[0].link?.cached_url}
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 font-belfius-cta text-sm uppercase tracking-wide"
                  >
                    {blok.cta_button[0].label}
                  </a>
                </div>
              )}
            </div>

            {/* Image */}
            {blok.image && blok.image.filename && (
              <div
                className={`relative ${
                  blok.reverse_layout ? "lg:col-start-1" : ""
                }`}
              >
                <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
                  <img
                    src={blok.image.filename}
                    alt={blok.image.alt || blok.title || "Feature image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
