import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? "en";
  try {
    const messages = (await import(`../messages/${resolvedLocale}.json`))
      .default;
    return { locale: resolvedLocale, messages };
  } catch {
    const fallback = (await import("../messages/en.json")).default;
    return { locale: "en", messages: fallback };
  }
});
