import { storyblokEditable } from '@storyblok/react/rsc';

interface StepsProps {
  blok: {
    title?: string;
    subtitle?: string;
    steps?: Array<{
      step_number: string;
      title: string;
      description: string;
      icon?: {
        filename: string;
        alt?: string;
      };
    }>;
  };
}

export default function Steps({ blok }: StepsProps) {
  const steps = blok.steps || [];

  return (
    <section {...storyblokEditable(blok)} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
            {blok.title || "Hoe werkt het?"}
          </h2>
        </div>
        
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Step Number Circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-belfius-gradient rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="font-belfius-step-number text-2xl text-white">
                    {step.step_number}
                  </span>
                </div>
                
                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-belfius-light-grey transform translate-x-1/2 z-0">
                    <div className="h-full bg-belfius-red w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                )}
              </div>
              
              {/* Step Content */}
              <div className="space-y-4">
                <h3 className="font-belfius-step-title text-xl lg:text-2xl text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-belfius-body">
                  {step.description}
                </p>
              </div>
              
              {/* Icon (if provided) */}
              {step.icon && (
                <div className="mt-4">
                  <img 
                    src={step.icon.filename} 
                    alt={step.icon.alt || step.title}
                    className="w-12 h-12 mx-auto icon-belfius"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="btn-belfius-primary font-belfius-cta inline-flex items-center space-x-2"
          >
            <span>Start nu</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}