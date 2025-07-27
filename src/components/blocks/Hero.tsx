import { storyblokEditable } from "@storyblok/react/rsc";
import { HeroBlok } from "@/types/storyblok";

export default function Hero({ blok }: { blok: HeroBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative bg-gradient-to-br from-belfius-light-grey to-white py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Subtitle */}
            {blok.subheadline && (
              <div className="inline-block">
                <span className="bg-belfius-red text-white px-4 py-2 rounded-full text-sm font-medium font-belfius-body">
                  {blok.subheadline}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-belfius-title text-4xl lg:text-6xl text-gray-900 leading-tight">
              {blok.headline || "Welkom bij Belfius"}
            </h1>

            {/* Description */}
            {blok.description && (
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-belfius-body">
                {blok.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {blok.primary_button?.map((button, index) => (
                <a
                  key={index}
                  href={button.link.cached_url}
                  className="bg-belfius-red text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 font-belfius-body"
                >
                  {button.label}
                </a>
              ))}
              {blok.secondary_button?.map((button, index) => (
                <a
                  key={index}
                  href={button.link.cached_url}
                  className="border-2 border-belfius-red text-belfius-red px-8 py-3 rounded-lg font-medium hover:bg-belfius-red hover:text-white transition-colors duration-200 font-belfius-body"
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          {blok.hero_image && blok.hero_image.filename && (
            <div className="relative">
              <img
                src={blok.hero_image.filename}
                alt={blok.hero_image.alt || "Hero Image"}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
