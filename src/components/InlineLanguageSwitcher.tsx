"use client";
import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LOCALES = [
  { code: "fr", label: "Français" },
  { code: "nl", label: "Nederlands" },
  { code: "en", label: "English" },
];

export default function InlineLanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = useMemo(
    () => LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0],
    [currentLocale]
  );

  const switchTo = (nextLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${nextLocale}`);
      return;
    }
    segments[0] = nextLocale;
    router.push("/" + segments.join("/"));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 flex items-center space-x-2 border border-dashed border-blue-500"
      >
        <span>{current.label}</span>
        <div className="w-6 h-6 bg-[#AF1B3C] rounded-full flex items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
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
        </div>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-blue-200 rounded-md shadow-md z-50">
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchTo(loc.code)}
              className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                loc.code === currentLocale
                  ? "text-[#AF1B3C] font-medium"
                  : "text-gray-700"
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
