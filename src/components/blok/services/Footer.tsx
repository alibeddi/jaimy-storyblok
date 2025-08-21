import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { FooterBlok } from "@/types/storyblok";

export default function Footer({ blok }: { blok: FooterBlok }) {
  return (
    <footer
      {...storyblokEditable(blok)}
      className="py-12"
      style={{ backgroundColor: "#AF1B3C" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Left Side - Logo and Contact Info */}
          <div className="mb-6 md:mb-0">
            {/* Logo */}
            <div className="mb-4">
              <Image
                src="/footer-logo.png"
                alt="Jaimy Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            {/* Contact Info */}
            <div className="space-y-2">
              <a
                href="mailto:info@jaimy.be"
                className="block text-white underline hover:text-gray-200 transition-colors duration-200 font-belfius-body"
              >
                info@jaimy.be
              </a>
              <a
                href="tel:+32460202523"
                className="block text-white underline hover:text-gray-200 transition-colors duration-200 font-belfius-body"
              >
                +32 (0) 460 20 25 23
              </a>
            </div>
          </div>

          {/* Right Side - Social Media Icon */}
          <div className="mb-6 md:mb-0">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Image
                src="/icons/Facebook.png"
                alt="Facebook"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>

        {/* Navigation Links near separator */}
        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="#"
            className="text-white hover:text-gray-200 transition-colors duration-200 font-belfius-body"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-200 transition-colors duration-200 font-belfius-body"
          >
            Policy
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-200 transition-colors duration-200 font-belfius-body"
          >
            Cookies
          </a>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-white pt-6">
          <p className="text-white font-belfius-body text-sm">
            © Jaimy by Belfius 2024 | BE0699.693.365 | Karel Rogierplein 11,
            1210 Brussel
          </p>
        </div>
      </div>
    </footer>
  );
}
