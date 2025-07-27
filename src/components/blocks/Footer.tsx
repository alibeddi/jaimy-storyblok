import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface FooterProps {
  blok: {
    logo?: {
      filename: string;
      alt?: string;
    };
    company_description?: string;
    navigation_sections?: Array<{
      title: string;
      links: Array<{
        label: string;
        link: {
          cached_url: string;
        };
      }>;
    }>;
    social_links?: Array<{
      platform: string;
      url: string;
      icon?: string;
    }>;
    contact_info?: {
      email?: string;
      phone?: string;
      address?: string;
    };
    copyright_text?: string;
    background_color?: string;
  };
}

export default function Footer({ blok }: FooterProps) {
  const getSocialIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      facebook:
        "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      twitter:
        "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      linkedin:
        "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      instagram:
        "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    };
    return icons[platform.toLowerCase()] || "";
  };

  return (
    <footer
      {...storyblokEditable(blok)}
      className={`${
        blok.background_color === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {blok.logo?.filename && (
              <div className="mb-6">
                <Image
                  src={blok.logo.filename}
                  alt={blok.logo.alt || "Company logo"}
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            )}
            {blok.company_description && (
              <p className="text-gray-600 mb-6 font-belfius-body">
                {blok.company_description}
              </p>
            )}

            {/* Contact Info */}
            {blok.contact_info && (
              <div className="space-y-2">
                {blok.contact_info.email && (
                  <p className="text-sm text-gray-600 font-belfius-body">
                    Email: {blok.contact_info.email}
                  </p>
                )}
                {blok.contact_info.phone && (
                  <p className="text-sm text-gray-600 font-belfius-body">
                    Phone: {blok.contact_info.phone}
                  </p>
                )}
                {blok.contact_info.address && (
                  <p className="text-sm text-gray-600 font-belfius-body">
                    {blok.contact_info.address}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {blok.navigation_sections?.map((section, index) => (
            <div key={index}>
              <h3 className="font-belfius-title text-lg text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={`/${link.link.cached_url}`}
                      className="text-gray-600 hover:text-belfius-red transition-colors font-belfius-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-sm text-gray-600 font-belfius-body mb-4 md:mb-0">
              {blok.copyright_text ||
                `© ${new Date().getFullYear()} All rights reserved.`}
            </div>

            {/* Social Links */}
            {blok.social_links && blok.social_links.length > 0 && (
              <div className="flex space-x-4">
                {blok.social_links.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-belfius-red transition-colors"
                  >
                    {social.icon ? (
                      <span className="text-xl">{social.icon}</span>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={getSocialIcon(social.platform)} />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
