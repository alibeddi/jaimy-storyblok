"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { HeaderBlok } from "@/types/storyblok";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ blok }: { blok: HeaderBlok }) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Default supported languages if not provided in Storyblok
  const defaultLanguages = [
    { code: "fr", label: "Français" },
    { code: "nl", label: "Nederlands" },
    { code: "en", label: "English" },
  ];

  const supportedLanguages = blok.supported_languages?.length 
    ? blok.supported_languages 
    : defaultLanguages;

  const currentLanguage = useMemo(
    () => supportedLanguages.find((l) => l.code === currentLocale) ?? supportedLanguages[0],
    [currentLocale, supportedLanguages]
  );

  const switchLanguage = useCallback((nextLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${nextLocale}`);
      return;
    }
    segments[0] = nextLocale;
    router.push("/" + segments.join("/"));
    setLanguageOpen(false);
    setMobileMenuOpen(false);
  }, [pathname, router]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${currentLocale}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  }, [searchQuery, router, currentLocale]);

  const searchPlaceholder = blok.search_placeholder || "Search ...";
  const languageTitle = blok.language_dropdown_title || currentLanguage.label;
  const searchEnabled = blok.search_enabled !== false;
  const languageEnabled = blok.language_dropdown_enabled !== false;

  return (
    <header
      {...storyblokEditable(blok)}
      className="w-full bg-white shadow-sm relative z-50"
    >
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between px-4 xl:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0">
          {blok.logo && blok.logo.filename ? (
            <Image
              src={blok.logo.filename}
              alt={blok.logo.alt || "Logo"}
              width={145}
              height={54}
              className="h-12 w-auto object-contain"
              priority
            />
          ) : (
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-[#AF1B3C] font-bold text-xl font-[BelfiusMontserrat]">jaimy</span>
                <span className="text-gray-400 text-sm font-[BelfiusMontserrat]">by Belfius</span>
              </div>
            </div>
          )}
        </div>

        {/* Search and Language Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          {searchEnabled && (
            <form onSubmit={handleSearch} className="relative">
              <div 
                className="flex items-center w-80 xl:w-96 h-12 bg-[#F1F1F1] rounded-full px-3 gap-3"
                style={{ 
                  boxShadow: "0 4px 12px 0 rgba(13, 10, 44, 0.06)",
                }}
              >
                <div className="flex-1 px-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-lg font-[Poppins] font-normal text-[#ABB7C2] placeholder-[#ABB7C2] border-none outline-none"
                    style={{ fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif" }}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
                  style={{
                    background: "linear-gradient(180deg, #961E34 0%, #C30B30 100%)"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_search" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                      <rect width="30" height="30" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_search)">
                      <path d="M11.8483 19.31C9.72791 19.31 7.93223 18.5749 6.46115 17.1047C4.99028 15.6343 4.25488 13.853 4.25488 11.7609C4.25488 9.66861 4.98999 7.88742 6.46024 6.41718C7.93063 4.94675 9.71421 4.21155 11.8108 4.21155C13.9075 4.21155 15.6907 4.94675 17.1605 6.41718C18.6303 7.88742 19.3652 9.66867 19.3652 11.7612C19.3652 12.6367 19.2154 13.489 18.9158 14.3184C18.616 15.1478 18.1825 15.899 17.6152 16.5722L25.2258 24.1322C25.3652 24.2624 25.4369 24.4331 25.4408 24.6444C25.445 24.8558 25.3733 25.0332 25.2258 25.1765C25.0783 25.3201 24.9009 25.3919 24.6936 25.3919C24.4863 25.3919 24.3136 25.3181 24.1755 25.1706L16.5961 17.5912C15.9743 18.1417 15.2492 18.5657 14.4208 18.8634C13.5925 19.1611 12.735 19.31 11.8483 19.31ZM11.8293 17.8919C13.5366 17.8919 14.983 17.2969 16.1686 16.1069C17.3543 14.9171 17.9471 13.4684 17.9471 11.7609C17.9471 10.0532 17.3543 8.60453 16.1686 7.41468C14.983 6.22472 13.5366 5.62974 11.8293 5.62974C10.1111 5.62974 8.65553 6.22472 7.46237 7.41468C6.26954 8.60453 5.673 10.0532 5.673 11.7609C5.673 13.4684 6.26954 14.9171 7.46237 16.1069C8.65553 17.2969 10.1111 17.8919 11.8293 17.8919Z" fill="white"/>
                    </g>
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* Language Dropdown */}
          {languageEnabled && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center w-44 xl:w-52 h-12 bg-[#F1F1F1] rounded-full px-3 gap-3 hover:bg-gray-200 transition-colors"
                style={{ 
                  boxShadow: "0 4px 12px 0 rgba(13, 10, 44, 0.06)",
                }}
              >
                <div className="flex-1 px-2">
                  <span 
                    className="text-lg font-[Poppins] font-normal text-[#ABB7C2]"
                    style={{ fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif" }}
                  >
                    {languageTitle}
                  </span>
                </div>
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(180deg, #961E34 0%, #C30B30 100%)"
                  }}
                >
                  <svg width="16" height="14" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_dropdown" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="24">
                      <rect y="0" width="30" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_dropdown)">
                      <path d="M14.9999 18.4544C14.8749 18.4544 14.7623 18.4335 14.6621 18.3919C14.5619 18.3502 14.4638 18.2812 14.3677 18.185L8.4327 12.25C8.29318 12.1106 8.22464 11.9427 8.22708 11.7462C8.22953 11.55 8.30449 11.3782 8.45184 11.2309C8.59924 11.0834 8.76924 11.0097 8.96154 11.0097C9.15384 11.0097 9.32371 11.0834 9.47117 11.2309L14.9999 16.7787L20.5481 11.2309C20.6874 11.0913 20.8521 11.0228 21.0421 11.0253C21.2319 11.0276 21.4006 11.1025 21.5481 11.25C21.6953 11.3975 21.769 11.5674 21.769 11.7597C21.769 11.952 21.6953 12.1218 21.5481 12.269L15.6321 18.185C15.5361 18.2812 15.438 18.3502 15.3377 18.3919C15.2375 18.4335 15.1249 18.4544 14.9999 18.4544Z" fill="white"/>
                    </g>
                  </svg>
                </div>
              </button>

              {/* Language Dropdown Menu */}
              {languageOpen && (
                <div className="absolute top-full mt-2 right-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                  {supportedLanguages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => switchLanguage(language.code)}
                      className={`w-full text-left px-4 py-3 text-base font-[Poppins] hover:bg-gray-50 transition-colors ${
                        language.code === currentLocale
                          ? "text-[#AF1B3C] font-medium bg-gray-50"
                          : "text-gray-700"
                      }`}
                      style={{ fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif" }}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          {blok.logo && blok.logo.filename ? (
            <Image
              src={blok.logo.filename}
              alt={blok.logo.alt || "Logo"}
              width={120}
              height={45}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <div className="flex flex-col">
              <span className="text-[#AF1B3C] font-bold text-lg font-[BelfiusMontserrat]">jaimy</span>
              <span className="text-gray-400 text-xs font-[BelfiusMontserrat]">by Belfius</span>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-[#F1F1F1] hover:bg-gray-200 transition-colors"
          style={{ 
            boxShadow: "0 2px 8px 0 rgba(13, 10, 44, 0.06)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="#ABB7C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            {searchEnabled && (
              <form onSubmit={handleSearch}>
                <div 
                  className="flex items-center w-full h-12 bg-[#F1F1F1] rounded-full px-3 gap-3"
                  style={{ 
                    boxShadow: "0 4px 12px 0 rgba(13, 10, 44, 0.06)",
                  }}
                >
                  <div className="flex-1 px-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      className="w-full bg-transparent text-base font-[Poppins] font-normal text-[#ABB7C2] placeholder-[#ABB7C2] border-none outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(180deg, #961E34 0%, #C30B30 100%)"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 30 30" fill="none">
                      <path d="M11.8483 19.31C9.72791 19.31 7.93223 18.5749 6.46115 17.1047C4.99028 15.6343 4.25488 13.853 4.25488 11.7609C4.25488 9.66861 4.98999 7.88742 6.46024 6.41718C7.93063 4.94675 9.71421 4.21155 11.8108 4.21155C13.9075 4.21155 15.6907 4.94675 17.1605 6.41718C18.6303 7.88742 19.3652 9.66867 19.3652 11.7612C19.3652 12.6367 19.2154 13.489 18.9158 14.3184C18.616 15.1478 18.1825 15.899 17.6152 16.5722L25.2258 24.1322C25.3652 24.2624 25.4369 24.4331 25.4408 24.6444C25.445 24.8558 25.3733 25.0332 25.2258 25.1765C25.0783 25.3201 24.9009 25.3919 24.6936 25.3919C24.4863 25.3919 24.3136 25.3181 24.1755 25.1706L16.5961 17.5912C15.9743 18.1417 15.2492 18.5657 14.4208 18.8634C13.5925 19.1611 12.735 19.31 11.8483 19.31ZM11.8293 17.8919C13.5366 17.8919 14.983 17.2969 16.1686 16.1069C17.3543 14.9171 17.9471 13.4684 17.9471 11.7609C17.9471 10.0532 17.3543 8.60453 16.1686 7.41468C14.983 6.22472 13.5366 5.62974 11.8293 5.62974C10.1111 5.62974 8.65553 6.22472 7.46237 7.41468C6.26954 8.60453 5.673 10.0532 5.673 11.7609C5.673 13.4684 6.26954 14.9171 7.46237 16.1069C8.65553 17.2969 10.1111 17.8919 11.8293 17.8919Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </form>
            )}

            {/* Mobile Language Selector */}
            {languageEnabled && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 font-[BelfiusMontserrat]">Language</p>
                <div className="grid grid-cols-1 gap-2">
                  {supportedLanguages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => switchLanguage(language.code)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors font-[Poppins] ${
                        language.code === currentLocale
                          ? "text-[#AF1B3C] font-medium bg-red-50 border-[#AF1B3C]"
                          : "text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(languageOpen || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setLanguageOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}
