import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { SocialProofBlok } from "@/types/storyblok";

export default function SocialProof({ blok }: { blok: SocialProofBlok }) {
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

        {/* Content based on layout */}
        {blok?.layout === "logos-only" && blok?.logos && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {blok.logos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                {logo.logo.filename && (
                  <Image
                    src={logo.logo.filename}
                    alt={logo.logo.alt || logo.company_name || "Company Logo"}
                    width={120}
                    height={60}
                    className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {blok?.layout === "stats-only" && blok?.statistics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blok.statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-belfius-title text-4xl lg:text-6xl text-belfius-red mb-2">
                  {stat.number}
                </div>
                <div className="font-belfius-body text-lg text-gray-900 mb-2">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-gray-600 font-belfius-body">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {blok?.layout === "mixed" && (
          <div className="space-y-16">
            {/* Logos */}
            {blok?.logos && blok.logos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                {blok.logos.map((logo, index) => (
                  <div key={index} className="flex justify-center">
                    {logo.logo.filename && (
                      <Image
                        src={logo.logo.filename}
                        alt={
                          logo.logo.alt || logo.company_name || "Company Logo"
                        }
                        width={120}
                        height={60}
                        className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Statistics */}
            {blok?.statistics && blok.statistics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blok.statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-belfius-title text-4xl lg:text-6xl text-belfius-red mb-2">
                      {stat.number}
                    </div>
                    <div className="font-belfius-body text-lg text-gray-900 mb-2">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-gray-600 font-belfius-body">
                        {stat.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials */}
            {blok?.testimonials && blok.testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blok.testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <blockquote className="text-gray-700 mb-4 font-belfius-body italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                    <div className="font-belfius-body">
                      <div className="font-medium text-gray-900">
                        {testimonial.author}
                      </div>
                      {testimonial.company && (
                        <div className="text-gray-600">
                          {testimonial.company}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Fallback: Show content even when layout is not set */}
        {!blok?.layout && (
          <div className="space-y-16">
            {/* Statistics */}
            {blok?.statistics && blok.statistics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blok.statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-belfius-title text-4xl lg:text-6xl text-belfius-red mb-2">
                      {stat.number}
                    </div>
                    <div className="font-belfius-body text-lg text-gray-900 mb-2">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-gray-600 font-belfius-body">
                        {stat.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials */}
            {blok?.testimonials && blok.testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blok.testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <blockquote className="text-gray-700 mb-4 font-belfius-body italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                    <div className="font-belfius-body">
                      <div className="font-medium text-gray-900">
                        {testimonial.author}
                      </div>
                      {testimonial.company && (
                        <div className="text-gray-600">
                          {testimonial.company}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Logos */}
            {blok?.logos && blok.logos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                {blok.logos.map((logo, index) => (
                  <div key={index} className="flex justify-center">
                    {logo.logo.filename && (
                      <Image
                        src={logo.logo.filename}
                        alt={
                          logo.logo.alt || logo.company_name || "Company Logo"
                        }
                        width={120}
                        height={60}
                        className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
