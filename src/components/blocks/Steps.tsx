import { storyblokEditable } from '@storyblok/react/rsc';
import { StepsBlok } from "@/types/storyblok";

export default function Steps({ blok }: { blok: StepsBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="py-16 lg:py-24 bg-white"
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
        </div>

        {/* Steps Grid */}
        {blok?.steps && blok.steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blok.steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-belfius-red rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.step_number}
                </div>

                {/* Icon */}
                {step.icon && (
                  <div className="mb-6">
                    <img
                      src={step.icon.filename}
                      alt={step.icon.alt || "Step Icon"}
                      className="w-16 h-16"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="mt-4">
                  <h3 className="font-belfius-title text-xl text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-belfius-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}