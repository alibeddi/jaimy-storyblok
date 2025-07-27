"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";
import { FAQBlok } from "@/types/storyblok";

export default function FAQ({ blok }: { blok: FAQBlok }) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        {blok?.faq_items && blok.faq_items.length > 0 && (
          <div className={`grid ${blok?.layout === "two-column" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6`}>
            {blok.faq_items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-belfius-title text-lg text-gray-900">
                    {item.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openItems.includes(index) ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 font-belfius-body leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}