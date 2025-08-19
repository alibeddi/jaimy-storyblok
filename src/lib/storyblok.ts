import { draftMode } from "next/headers";
import { getLocale } from "next-intl/server";

export async function getStoryblokQueryParams() {
  const { isEnabled } = await draftMode();
  const locale = await getLocale();
  const version = (isEnabled ? "draft" : "published") as "draft" | "published";
  // fallback_lang makes Storyblok return the default language if a translation is missing
  return { version, language: locale, fallback_lang: "en" };
}
