import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { FooterBlok } from "@/types/storyblok";
import Link from "next/link";
import Button from "../general/Button/Button";

export default function Footer({ blok }: { blok: FooterBlok }) {
  const defaultLogo = blok.logo?.filename || "/footer-logo.png";
  const defaultEmail = blok.contact_info?.[0]?.email || "info@jaimy.be";
  const defaultPhone = blok.contact_info?.[0]?.phone || "+32 (0) 460 20 25 23";
  const defaultCopyright = blok.copyright_text || "© Jaimy by Belfius 2024 | BE0699.693.365 | Karel Rogierplein 11, 1210 Brussel";
  console.log(blok?.social_links?.[0]?.social_link)
  return (
    <footer
      {...storyblokEditable(blok)}
      className="relative overflow-hidden"
      style={{
        background: blok.background_color || "linear-gradient(90deg, #961E34 0%, #C30B30 100%)"
      }}
    >
      {/* Curved white background at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1920 44"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-11"
          preserveAspectRatio="none"
        >
          <path
            d="M2057 -46C2057 10.8853 1570.98 44 964.294 44C357.61 44 -140 10.8853 -140 -46C-140 -102.885 351.815 -149 958.5 -149C1565.18 -149 2057 -102.885 2057 -46Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
            {/* Logo section */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <div className="mb-6">
                <Image
                  src={defaultLogo}
                  alt={blok.logo?.alt || "Jaimy Logo"}
                  width={92}
                  height={68}
                  className="w-23 h-17 mx-auto lg:mx-0"
                />
              </div>
            </div>

            {/* Email section */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <h3 className="text-white text-lg font-bold mb-4" style={{ fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif" }}>
                Email
              </h3>
              <a
                href={`mailto:${defaultEmail}`}
                className="text-white text-base underline hover:text-gray-200 transition-colors duration-200"
                style={{ fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif" }}
              >
                {defaultEmail}
              </a>
            </div>

            {/* Call Us section */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <h3 className="text-white text-lg font-bold mb-4" style={{ fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif" }}>
                Call Us
              </h3>
              <a
                href={`tel:${defaultPhone.replace(/\s/g, "")}`}
                className="text-white text-base underline hover:text-gray-200 transition-colors duration-200"
                style={{ fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif" }}
              >
                {defaultPhone}
              </a>
            </div>

            {/* Follow us section */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <h3 className="text-white text-lg font-bold mb-4" style={{ fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif" }}>
                Follow us
              </h3>
              <div className="flex gap-3 mb-6 justify-center lg:justify-start">
                {/* Social Media Icons */}
                {blok?.social_links?.[0]?.social_link?.map((social, index) => (
              
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    {social.icon && (
                      <Image
                        src={social.icon.filename}
                        alt={social.icon.alt || social.platform}
                        width={25}
                        height={25}
                        className="w-6 h-6"
                      />
                    )}
                  </a>
                )) || (
                  <>
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <Image
                        src="https://api.builder.io/api/v1/image/assets/TEMP/15d9a13b1a4367826d8f1697ab0490c70d11dada?width=50"
                        alt="LinkedIn"
                        width={25}
                        height={25}
                        className="w-6 h-6"
                      />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <Image
                        src="https://api.builder.io/api/v1/image/assets/TEMP/6110b1f843a357bd36bd96c980f0861568970f3b?width=50"
                        alt="Facebook"
                        width={25}
                        height={25}
                        className="w-6 h-6"
                      />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <Image
                        src="https://api.builder.io/api/v1/image/assets/TEMP/47f631391c5839051cae61781bf270c628afc9f7?width=50"
                        alt="Instagram"
                        width={25}
                        height={25}
                        className="w-6 h-6"
                      />
                    </a>
                  </>
                )}
              </div>
              
              {/* Footer Buttons */}
              <div className="flex flex-col items-center sm:flex-row gap-3 justify-center lg:justify-start">
                {blok.footer_buttons?.map((button, index) => (
                  <div key={index} className="relative" {...storyblokEditable(button)}>
                    <Button
                      blok={button} 
                      className="footer-button"
                    />
                  </div>
                )) || (
                  <>
                    <div className="relative">
                      <Button
                        blok={{
                          component: "button",
                          title: "Homepage",
                          type: "button",
                          variant: "primary",
                          link: { url: "#" }
                        }}
                        className="footer-button homepage"
                      />
                    </div>
                    <div className="relative">
                      <Button
                        blok={{
                          component: "button",
                          title: "Pro Platform",
                          type: "button",
                          variant: "tertiary",
                          link: { url: "#" }
                        }}
                        className="footer-button pro-platform"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Separator line */}
          <div className="w-full h-px bg-white mb-6"></div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-20 mb-8">
            {blok.navigation_sections?.map((section, index) => (
              section.links.map((link, linkIndex) => (
                <Link
                  key={`${index}-${linkIndex}`}
                  href={link.link.cached_url}
                  className="text-white text-base hover:text-gray-200 transition-colors duration-200"
                  style={{ fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  {link.label}
                </Link>
              ))
            )) || (
              <>
                <a 
                  href="#" 
                  className="text-white text-base hover:text-gray-200 transition-colors duration-200"
                  style={{ fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Terms
                </a>
                <a 
                  href="#" 
                  className="text-white text-base hover:text-gray-200 transition-colors duration-200"
                  style={{ fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Policy
                </a>
                <a 
                  href="#" 
                  className="text-white text-base hover:text-gray-200 transition-colors duration-200"
                  style={{ fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif" }}
                >
                  Cookies
                </a>
              </>
            )}
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-left">
            <p
              className="text-white text-base font-light"
              style={{ fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif" }}
            >
              {defaultCopyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
