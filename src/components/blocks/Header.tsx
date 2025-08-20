import { storyblokEditable } from "@storyblok/react/rsc";
import { HeaderBlok } from "@/types/storyblok";
import Image from "next/image";
import InlineLanguageSwitcher from "@/components/InlineLanguageSwitcher";

export default function Header({ blok }: { blok: HeaderBlok }) {
  return (
    <header
      {...storyblokEditable(blok)}
      className="bg-white border border-blue-500 w-full h-[90px] flex items-center justify-between px-8"
    >
      {/* Logo Section */}
      <div className="flex items-center">
        {blok.logo && blok.logo.filename ? (
          <Image
            src={blok.logo.filename}
            alt={blok.logo.alt || "Jaimy Logo"}
            width={200}
            height={50}
            className="h-[50px] w-auto"
            priority
          />
        ) : (
          <div className="flex items-center">
            {/* Custom Logo with interlocking C shapes */}
            <div className="flex items-center mr-2">
              <div className="relative">
                <div className="w-8 h-8 bg-[#AF1B3C] rounded-full flex items-center justify-center text-white font-bold text-sm transform rotate-45">
                  C
                </div>
                <div className="w-8 h-8 bg-[#AF1B3C] rounded-full flex items-center justify-center text-white font-bold text-sm transform -rotate-45 absolute -top-1 -right-1">
                  C
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[#AF1B3C] font-bold text-xl">jaimy</span>
              <span className="text-gray-400 text-sm">by Belfius</span>
            </div>
          </div>
        )}
      </div>

      {/* Search and Language Section */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ..."
              className="w-64 px-4 py-2 bg-gray-100 border border-dashed border-blue-500 rounded-lg text-gray-400 focus:outline-none focus:border-blue-600"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#AF1B3C] rounded-full flex items-center justify-center border border-dashed border-blue-500">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center">
          <InlineLanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
