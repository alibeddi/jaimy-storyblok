import { storyblokEditable } from '@storyblok/react/rsc';

interface HeaderProps {
  blok: {
    logo?: {
      filename: string;
      alt?: string;
    };
    navigation?: Array<{
      label: string;
      link: {
        cached_url: string;
      };
    }>;
    cta_button?: Array<{
      label: string;
      link: {
        cached_url: string;
      };
    }>;
  };
}

export default function Header({ blok }: HeaderProps) {
    console.log(blok)
  return (
    <header 
      {...storyblokEditable(blok)} 
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={blok.logo?.filename || '/logo.svg'} 
              alt={blok.logo?.alt || 'Logo'} 
              className="h-8 w-auto"
            />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {blok.navigation?.map((item, index) => (
              <a
                key={index}
                href={`/${item.link.cached_url}`}
                className="text-gray-700 hover:text-belfius-red font-medium transition-colors duration-200 font-belfius-body"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            {blok.cta_button?.map((cta, index) => (
              <a
                key={index}
                href={`/${cta.link.cached_url}`}
                className="btn-belfius-primary font-belfius-cta"
              >
                {cta.label}
              </a>
            ))}
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-belfius-red focus:outline-none focus:ring-2 focus:ring-belfius-red">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}