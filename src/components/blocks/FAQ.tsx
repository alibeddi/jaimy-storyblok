"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";
import { FAQBlok } from "@/types/storyblok";

export default function FAQ({ blok }: { blok: FAQBlok }) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok?.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok?.description && (
            <p className="text-xl text-gray-600 max-w-3xl font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* FAQ Two-Column Layout */}
        {blok?.faq_items && blok.faq_items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Section - Questions List */}
            <div className="space-y-4">
              <h3 className="font-belfius-title text-2xl text-gray-900 mb-6">
                FAQ
              </h3>
              <div className="space-y-3">
                {blok.faq_items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedQuestion(index)}
                    className={`w-full p-4 rounded-lg shadow-sm border transition-all duration-200 text-left ${
                      selectedQuestion === index
                        ? "bg-blue-50 border-blue-200 shadow-md"
                        : "bg-white border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-belfius-body text-gray-900">
                        {item.question}
                      </span>
                      {selectedQuestion !== index && (
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Section - Selected Answer */}
            <div className="lg:pl-8">
              {blok.faq_items[selectedQuestion] && (
                <div>
                  <h3 className="font-belfius-title text-2xl text-gray-900 mb-6">
                    {blok.faq_items[selectedQuestion].question}
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="font-belfius-body text-gray-700 leading-relaxed">
                      {blok.faq_items[selectedQuestion].answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
