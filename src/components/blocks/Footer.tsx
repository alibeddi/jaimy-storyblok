import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { FooterBlok } from "@/types/storyblok";

export default function Footer({ blok }: { blok: FooterBlok }) {
  return (
    <footer
      {...storyblokEditable(blok)}
      className={`py-16 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {blok.logo && (
              <div className="mb-6">
                <Image
                  src={blok.logo.filename}
                  alt={blok.logo.alt || "Company Logo"}
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            )}
            {blok.company_description && (
              <p className="text-gray-400 font-belfius-body mb-6">
                {blok.company_description}
              </p>
            )}
            {blok.social_links && blok.social_links.length > 0 && (
              <div className="flex space-x-4">
                {blok.social_links.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon ? (
                      <img
                        src={social.icon}
                        alt={social.platform}
                        className="w-6 h-6"
                      />
                    ) : (
                      <span className="capitalize">{social.platform}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {blok.navigation_sections && blok.navigation_sections.length > 0 && (
            <>
              {blok.navigation_sections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-belfius-title text-white text-lg mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.link.cached_url}
                          className="text-gray-400 hover:text-white transition-colors duration-200 font-belfius-body"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

          {/* Contact Info */}
          {blok.contact_info && (
            <div>
              <h3 className="font-belfius-title text-white text-lg mb-4">
                Contact
              </h3>
              <div className="space-y-2 text-gray-400 font-belfius-body">
                {blok.contact_info.email && (
                  <div>
                    <a
                      href={`mailto:${blok.contact_info.email}`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {blok.contact_info.email}
                    </a>
                  </div>
                )}
                {blok.contact_info.phone && (
                  <div>
                    <a
                      href={`tel:${blok.contact_info.phone}`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {blok.contact_info.phone}
                    </a>
                  </div>
                )}
                {blok.contact_info.address && (
                  <div>{blok.contact_info.address}</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        {blok.copyright_text && (
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-belfius-body">
              {blok.copyright_text}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}