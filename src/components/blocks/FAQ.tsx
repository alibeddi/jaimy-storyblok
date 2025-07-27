"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";

interface FAQProps {
  blok: {
    title?: string;
    subtitle?: string;
    description?: string;
    faq_items?: Array<{
      question: string;
      answer: string;
    }>;
    layout?: "single-column" | "two-column";
    background_color?: string;
  };
}

export default function FAQ({ blok }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${
        blok.background_color === "gray" ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        {blok.faq_items && blok.faq_items.length > 0 && (
          <div
            className={`max-w-4xl mx-auto ${
              blok.layout === "two-column"
                ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
                : ""
            }`}
          >
            {blok.faq_items.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 text-left flex items-center justify-between hover:text-belfius-red transition-colors"
                >
                  <h3 className="font-belfius-title text-lg lg:text-xl text-gray-900 pr-8">
                    {item.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
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

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openItems.includes(index)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-6">
                    <div className="text-gray-700 leading-relaxed font-belfius-body">
                      {item.answer.split("\n\n").map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
