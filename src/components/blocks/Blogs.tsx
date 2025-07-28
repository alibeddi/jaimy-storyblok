import { storyblokEditable } from "@storyblok/react/rsc";
import { BlogsBlok } from "@/types/storyblok";
import Image from "next/image";

export default function Blogs({ blok }: { blok: BlogsBlok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-white min-h-screen py-16 relative"
      style={{
        backgroundImage: "url(/backgrounds/blogs-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div
          className="bg-white/90 rounded-3xl p-12 relative overflow-hidden"
          style={{
            boxShadow: "-5px 7px 17px 2px #0000008C",
            border: "1px solid #000000",
          }}
        >
          {/* Content */}
          <div className="relative z-10">
            {/* H2 Title */}
            <h2 className="text-[#32546D] font-belfius-title text-4xl lg:text-5xl mb-16 text-center">
              {blok?.title || "Latest Blog Posts"}
            </h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Main Blog Post */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Blog Image</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#AF1B3C] text-white px-3 py-1 rounded-full text-sm font-bold">
                        NEW
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-belfius-title text-xl font-bold text-gray-900 mb-3">
                      Main Blog Post Title
                    </h3>
                    <p className="text-gray-600 font-belfius-body mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <button className="bg-[#AF1B3C] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-belfius-body">
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              {/* Smaller Blog Posts */}
              <div className="lg:col-span-1 space-y-6">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex">
                      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-500 text-xs">Image</span>
                      </div>
                      <div className="p-4 flex-1">
                        <h4 className="font-belfius-title text-lg font-bold text-gray-900 mb-2">
                          Blog Post {index}
                        </h4>
                        <p className="text-gray-600 font-belfius-body text-sm mb-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit...
                        </p>
                        <button className="text-[#AF1B3C] font-belfius-body text-sm hover:text-red-700 transition-colors duration-200">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
