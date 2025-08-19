"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const locales = ["en", "nl", "fr"] as const;

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (nextLocale: string) => {
    if (pathname == null) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return router.push(`/${nextLocale}`);
    segments[0] = nextLocale;
    router.push("/" + segments.join("/"));
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          aria-pressed={loc === currentLocale}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            background: loc === currentLocale ? "#111" : "#fff",
            color: loc === currentLocale ? "#fff" : "#111",
          }}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
