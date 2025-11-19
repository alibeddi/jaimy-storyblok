import Button from "../../blok/general/Button";
import { ButtonBlok } from "../../blok/general/Button/Button";
import Image from "@/components/ui/Image/Image";
import { storyblokEditable } from "@storyblok/react";

interface FeaturesProps {
  blok: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: {
      filename: string;
      alt?: string;
    };
    button?: ButtonBlok;

    image_position?: "left" | "right"; // Enhanced: More intuitive field name
    reverse_layout?: boolean; // Keep for backward compatibility
  };
}

export default function Features({ blok }: FeaturesProps) {
  // Enhanced: Support both new image_position and legacy reverse_layout
  const imageOnRight = blok.image_position === "right" || blok.reverse_layout;

  return (
    <section {...storyblokEditable(blok)} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 items-center ${
              imageOnRight ? "lg:grid-flow-col-dense" : ""
            }`}>
            {/* Text Content */}
            <div
              className={`p-8 h-full flex flex-col justify-between lg:p-12 xl:p-16 space-y-6 ${
                imageOnRight ? "lg:col-start-2" : ""
              }`}>
              {/* Title */}
              {blok.title && (
                <h1
                  data-blok-field="headline"
                  // {...sbEditable(blok)}
                  className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-light leading-tight tracking-wide transition-all duration-300 hover:text-gray-700"
                  style={{
                    fontFamily:
                      "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",

                    color: "rgba(50,84,109,1)",
                  }}>
                  {blok.title}
                </h1>
              )}

              {/* Subtitle */}
              {blok.subtitle && (
                <h3
                  data-blok-field="subtitle"
                  className="font-belfius-title text-lg lg:text-xl text-gray-600 leading-tight">
                  {blok.subtitle}
                </h3>
              )}

              {/* Description */}
              {blok.description && (
                <div className="space-y-4">
                  {blok.description.split("\n\n").map((paragraph, index) => (
                    <p
                      data-blok-field="description"
                      key={index}
                      className="text-gray-700 text-base leading-relaxed font-belfius-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {blok.button && blok.button[0] && (
                // <div className="pt-2">
                //   <a
                //     href={blok.cta_button[0].link?.cached_url}
                //     className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 font-belfius-cta text-sm uppercase tracking-wide"
                //   >
                //     {blok.cta_button[0].label}
                //   </a>
                // </div>
                <div data-blok-field="button">
                  <Button className="" blok={blok.button[0]} />
                </div>
              )}
            </div>

            {/* Image */}
            {blok.image && blok.image.filename && (
              <div
                className={`relative ${imageOnRight ? "lg:col-start-1" : ""}`}>
                <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
                  <div data-blok-field="image">
                    <Image
                      src={blok.image.filename}
                      alt={blok.image.alt || blok.title || "Feature image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
