"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/ui";

/**
 * Example component demonstrating i18n usage with next-intl
 * This shows how to use translations and the language switcher
 */
export const I18nExample: React.FC = () => {
  const t = useTranslations("common");
  const heroT = useTranslations("hero");
  const formT = useTranslations("forms");

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Language Switcher in Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{heroT("title")}</h1>
        <LanguageSwitcher />
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
        <h2 className="text-4xl font-bold mb-4">{heroT("title")}</h2>
        <p className="text-xl mb-6">{heroT("subtitle")}</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          {heroT("cta")}
        </button>
      </section>

      {/* Content with Various Translations */}
      <section className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">{t("about")}</h3>
          <p className="text-gray-600 mb-4">
            This is an example of how to implement internationalization in your
            Next.js 15 project using next-intl. The content automatically
            changes based on the selected language.
          </p>
          <button className="text-blue-600 hover:text-blue-800">
            {t("learnMore")}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">{t("contact")}</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formT("name")}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={formT("name")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formT("email")}
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={formT("email")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formT("message")}
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder={formT("message")}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {formT("submit")}
            </button>
          </form>
        </div>
      </section>

      {/* Language Switcher Variants */}
      <section className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Language Switcher Variants
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Dropdown (default):</h4>
            <LanguageSwitcher />
          </div>

          <div>
            <h4 className="font-medium mb-2">Inline buttons:</h4>
            <LanguageSwitcher variant="inline" />
          </div>

          <div>
            <h4 className="font-medium mb-2">Without flags:</h4>
            <LanguageSwitcher showFlag={false} />
          </div>
        </div>
      </section>

      {/* Navigation Example */}
      <nav className="mt-8 flex justify-center space-x-6">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          {t("home")}
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          {t("about")}
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          {t("services")}
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          {t("blog")}
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          {t("contact")}
        </a>
      </nav>
    </div>
  );
};

export default I18nExample;
