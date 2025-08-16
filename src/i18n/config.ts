import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

// Can be imported from a shared config
export const locales = ["en", "fr", "nl", "de"] as const;
export const defaultLocale = "fr" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  const messages: AbstractIntlMessages = (
    await import(`./messages/${locale}.json`)
  ).default;

  return {
    locale: locale as string,
    messages,
  };
});
