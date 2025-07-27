import { storyblokEditable } from "@storyblok/react/rsc";
import { BlogsBlok } from "@/types/storyblok";
import Image from "next/image";

export default function Blogs({ blok }: { blok: BlogsBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#F4F4F4] min-h-screen py-16 relative"
    >
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Main Container */}
        <div
          className="bg-white rounded-3xl p-12 relative overflow-hidden"
          style={{
            boxShadow: "-5px 7px 17px 2px #0000008C",
            border: "1px solid #000000",
          }}
        >
          {/* Background Image Inside Container */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/backgrounds/blogs-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* H2 Title */}
            <h2 className="text-[#32546D] font-belfius-title text-4xl lg:text-5xl mb-12 text-center">
              {blok?.title || "H2"}
            </h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Main Blog Post */}
              <div className="space-y-6">
                {/* Main Image with NEW Tag */}
                <div className="relative">
                  <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">💻</div>
                      <div className="text-gray-600 font-medium">
                        Main Blog Image
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        Person typing on laptop
                      </div>
                    </div>
                  </div>
                  {/* NEW Tag */}
                  <div className="absolute bottom-4 left-4 bg-[#AF1B3C] text-white px-3 py-1 rounded-lg text-sm font-bold uppercase">
                    NEW
                  </div>
                </div>

                {/* Main Blog Title */}
                <h3 className="font-belfius-title text-2xl font-bold text-gray-900 leading-tight">
                  Title Title Title Title Title Title Title Title Title Title
                  Title
                </h3>

                {/* Main Blog Body Text */}
                <div className="space-y-2">
                  <p className="text-gray-700 font-belfius-body">Body text</p>
                  <p className="text-gray-700 font-belfius-body">Body text</p>
                </div>
              </div>

              {/* Right Column - Three Smaller Blog Posts */}
              <div className="space-y-8">
                {/* First Small Blog Post */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl">👧</div>
                        <div className="text-xs text-gray-500">
                          Girl with tablet
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-belfius-title text-lg font-bold text-gray-900 leading-tight mb-2">
                      Title Title Title Title Title Title Title Title Title
                      Title Title Title
                    </h4>
                    <p className="text-gray-700 font-belfius-body text-sm">
                      Body text Body text Body text Body text Body text
                    </p>
                  </div>
                </div>

                {/* Second Small Blog Post */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl">🎧</div>
                        <div className="text-xs text-gray-500">
                          Person with headphones
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-belfius-title text-lg font-bold text-gray-900 leading-tight mb-2">
                      Title Title Title Title Title Title Title Title Title
                      Title Title Title
                    </h4>
                    <p className="text-gray-700 font-belfius-body text-sm">
                      Body text Body text Body text Body text Body text
                    </p>
                  </div>
                </div>

                {/* Third Small Blog Post */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl">🐱</div>
                        <div className="text-xs text-gray-500">
                          Cat with laptop
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-belfius-title text-lg font-bold text-gray-900 leading-tight mb-2">
                      Title Title Title Title Title Title Title Title Title
                      Title Title Title
                    </h4>
                    <p className="text-gray-700 font-belfius-body text-sm">
                      Body text Body text Body text Body text Body text
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
