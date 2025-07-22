import { storyblokEditable } from '@storyblok/react/rsc';

interface HeroProps {
  blok: {
    headline?: string;
    subheadline?: string;
    description?: string;
    primary_button?: Array<{
      label: string;
      link: {
        cached_url: string;
      };
    }>;
    secondary_button?: Array<{
      label: string;
      link: {
        cached_url: string;
      };
    }>;
    hero_image?: {
      filename: string;
      alt?: string;
    };
  };
}

export default function Hero({ blok }: HeroProps) {
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
              {blok.primary_button?.map((cta, index) => (
                <a
                  key={index}
                  href={`/${cta.link.cached_url}`}
                  className="btn-belfius-primary font-belfius-cta text-center inline-flex items-center justify-center space-x-2"
                >
                  <span>{cta.label}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
              
              {blok.secondary_button?.map((cta, index) => (
                <a
                  key={index}
                  href={`/${cta.link.cached_url}`}
                  className="px-6 py-3 border-2 border-belfius-red text-belfius-red font-belfius-cta rounded-lg hover:bg-belfius-red hover:text-white transition-all duration-300 text-center"
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={blok.hero_image?.filename || '/hero-placeholder.jpg'}
                alt={blok.hero_image?.alt || blok.headline || 'Hero Image'}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-belfius-gradient rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-belfius-red opacity-10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}