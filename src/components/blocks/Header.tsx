import { storyblokEditable } from "@storyblok/react/rsc";
import { HeaderBlok } from "@/types/storyblok";

export default function Header({ blok }: { blok: HeaderBlok }) {
  return (
    <header
      {...storyblokEditable(blok)}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {blok.logo && blok.logo.filename && (
            <div className="flex-shrink-0">
              <img
                src={blok.logo.filename}
                alt={blok.logo.alt || "Logo"}
                className="h-8 w-auto"
              />
            </div>
          )}

          {/* Navigation */}
          {blok.navigation && blok.navigation.length > 0 && (
            <nav className="hidden md:flex space-x-8">
              {blok.navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.link.cached_url}
                  className="text-gray-700 hover:text-belfius-red font-belfius-body transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* CTA Button */}
          {blok.cta_button && blok.cta_button.length > 0 && (
            <div className="flex space-x-4">
              {blok.cta_button.map((button, index) => (
                <a
                  key={index}
                  href={button.link.cached_url}
                  className="bg-belfius-red text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 font-belfius-body"
                >
                  {button.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
