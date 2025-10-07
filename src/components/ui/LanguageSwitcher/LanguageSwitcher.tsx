"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "dropdown" | "inline";
  showFlag?: boolean;
}

const languageNames = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
  de: "Deutsch",
} as const;

const languageFlags = {
  en: "🇺🇸",
  fr: "🇫🇷",
  nl: "🇳🇱",
  de: "🇩🇪",
} as const;

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  variant = "dropdown",
  showFlag = true,
}) => {
  const t = useTranslations("navigation");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = React.useState(false);

  const switchLanguage = (newLocale: Locale) => {
    const currentPathname = pathname;
    // Remove the current locale from the pathname
    const pathnameWithoutLocale = currentPathname.replace(`/${locale}`, "");
    // Create new path with the new locale
    const newPath = `/${newLocale}${pathnameWithoutLocale}`;

    setIsOpen(false);
    router.push(newPath);
  };

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {locales.map((lang) => (
          <button
            key={lang}
            onClick={() => switchLanguage(lang)}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              locale === lang
                ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            {showFlag && <span className="mr-1">{languageFlags[lang]}</span>}
            {languageNames[lang]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md",
          "text-sm font-medium text-gray-700 dark:text-gray-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          "transition-colors"
        )}
        aria-label={t("language")}
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        {showFlag && <span>{languageFlags[locale]}</span>}
        <span>{languageNames[locale]}</span>
        <ChevronDown
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className={cn(
              "absolute right-0 top-full mt-1 z-20",
              "bg-white dark:bg-gray-900 rounded-md shadow-lg border",
              "border-gray-200 dark:border-gray-700",
              "min-w-[160px] py-1"
            )}
          >
            {locales.map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "transition-colors flex items-center gap-2",
                  locale === lang
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200"
                    : "text-gray-700 dark:text-gray-200"
                )}
              >
                {showFlag && <span>{languageFlags[lang]}</span>}
                <span>{languageNames[lang]}</span>
                {locale === lang && (
                  <span className="ml-auto text-primary-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
