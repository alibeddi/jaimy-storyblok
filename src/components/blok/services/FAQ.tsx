"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";
import { FAQBlok } from "@/types/storyblok";

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.25 13.7496H21.075L16.5375 8.29961C16.3253 8.04434 16.2232 7.71524 16.2537 7.38471C16.2842 7.05417 16.4447 6.74929 16.7 6.53711C16.9553 6.32494 17.2844 6.22286 17.6149 6.25334C17.9454 6.28381 18.2503 6.44434 18.4625 6.69961L24.7125 14.1996C24.7545 14.2593 24.7922 14.3219 24.825 14.3871C24.825 14.4496 24.825 14.4871 24.9125 14.5496C24.9692 14.6929 24.9988 14.8455 25 14.9996C24.9988 15.1537 24.9692 15.3063 24.9125 15.4496C24.9125 15.5121 24.9125 15.5496 24.825 15.6121C24.7922 15.6773 24.7545 15.74 24.7125 15.7996L18.4625 23.2996C18.345 23.4407 18.1978 23.5542 18.0314 23.632C17.8651 23.7097 17.6836 23.7499 17.5 23.7496C17.2079 23.7502 16.9249 23.6485 16.7 23.4621C16.5734 23.3572 16.4688 23.2283 16.3921 23.0829C16.3154 22.9374 16.2682 22.7783 16.2531 22.6146C16.238 22.4509 16.2553 22.2858 16.3041 22.1288C16.3529 21.9718 16.4322 21.8259 16.5375 21.6996L21.075 16.2496H6.25C5.91848 16.2496 5.60054 16.1179 5.36612 15.8835C5.13169 15.6491 5 15.3311 5 14.9996C5 14.6681 5.13169 14.3501 5.36612 14.1157C5.60054 13.8813 5.91848 13.7496 6.25 13.7496Z"
      fill="#BE213A"
    />
  </svg>
);

export default function FAQ({ blok }: { blok: FAQBlok }) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4" style={{ fontFamily: 'BelfiusMontserrat, -apple-system, Roboto, Helvetica, sans-serif' }}>
              {blok.subtitle}
            </p>
          )}
          {blok?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mb-8" style={{ fontFamily: 'BelfiusMontserrat, -apple-system, Roboto, Helvetica, sans-serif' }}>
              {blok.description}
            </p>
          )}
        </div>

        {/* FAQ Two-Column Layout */}
        {blok?.faq_items && blok.faq_items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Section - Questions List */}
            <div className="space-y-4">
              {/* FAQ Title */}
              <h2
                className="mb-6 lg:mb-8 text-[#32546D] leading-[150%]"
                style={{
                  fontFamily: 'BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif',
                  fontWeight: '700',
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                }}
              >
                FAQ
              </h2>

              <div className="space-y-6">
                {blok.faq_items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedQuestion(index)}
                    className={`w-full rounded-[20px] transition-all duration-200 text-left ${
                      selectedQuestion === index
                        ? "bg-[#F1F5F9]"
                        : "bg-white shadow-[0_5px_12px_0_rgba(0,0,0,0.10)]"
                    }`}
                    style={{
                      padding: '20px 20px 20px 32px',
                      minHeight: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span
                      className="text-black uppercase leading-[150%]"
                      style={{
                        fontFamily: 'BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif',
                        fontWeight: '700',
                        fontSize: 'clamp(16px, 2vw, 20px)',
                      }}
                    >
                      {item.question}
                    </span>
                    {selectedQuestion !== index && (
                      <ArrowIcon className="w-[24px] h-[24px] flex-shrink-0 ml-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Section - Selected Answer */}
            <div className="lg:pl-6">
              {blok.faq_items[selectedQuestion] && (
                <div className="mt-8 lg:mt-0">
                  <h3
                    className="text-black uppercase leading-[150%] mb-6"
                    style={{
                      fontFamily: 'BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif',
                      fontWeight: '700',
                      fontSize: 'clamp(20px, 2.5vw, 28px)',
                    }}
                  >
                    {blok.faq_items[selectedQuestion].question}
                  </h3>
                  <div
                    className="text-black leading-[155%]"
                    style={{
                      fontFamily: 'BelfiusMontserrat, -apple-system, Roboto, Helvetica, sans-serif',
                      fontWeight: '400',
                      fontSize: 'clamp(14px, 1.5vw, 18px)',
                    }}
                  >
                    <p className="whitespace-pre-line">
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
