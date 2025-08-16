# 🌐 Internationalization (i18n) Setup - Next.js 15

This document describes the complete internationalization setup for the Next.js 15 project using `next-intl`.

## 📋 Overview

The project now supports **4 languages**:

- 🇺🇸 **English** (`en`)
- 🇫🇷 **French** (`fr`) - Default language
- 🇳🇱 **Dutch** (`nl`)
- 🇩🇪 **German** (`de`)

## 🏗️ Architecture

### File Structure

```
src/
├── i18n/
│   ├── config.ts                 # i18n configuration
│   └── messages/
│       ├── en.json              # English translations
│       ├── fr.json              # French translations
│       ├── nl.json              # Dutch translations
│       └── de.json              # German translations
├── middleware.ts                # Locale detection & routing
├── app/
│   ├── layout.tsx              # Root layout (minimal)
│   └── [locale]/
│       ├── layout.tsx          # Locale-specific layout
│       ├── page.tsx            # Home page
│       ├── not-found.tsx       # 404 page with translations
│       └── ...                 # Other locale-specific pages
└── components/
    └── ui/
        ├── LanguageSwitcher/   # Language switcher component
        └── ErrorBoundary/      # Error boundary with i18n
```

## ⚙️ Configuration

### 1. Next.js Configuration (`next.config.ts`)

```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");

const nextConfig: NextConfig = {
  // ... your existing config
};

export default withNextIntl(nextConfig);
```

### 2. i18n Configuration (`src/i18n/config.ts`)

```typescript
export const locales = ["en", "fr", "nl", "de"] as const;
export const defaultLocale = "fr" as const;
export type Locale = (typeof locales)[number];
```

### 3. Middleware (`src/middleware.ts`)

```typescript
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "nl", "de"],
  defaultLocale: "fr",
  localePrefix: "always",
});
```

## 🧩 Components

### Language Switcher

```tsx
import { LanguageSwitcher } from '@/components/ui';

// Dropdown variant (default)
<LanguageSwitcher />

// Inline buttons
<LanguageSwitcher variant="inline" />

// Without flags
<LanguageSwitcher showFlag={false} />
```

### Using Translations in Components

#### Client Components

```tsx
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("common");

  return <h1>{t("welcome")}</h1>;
}
```

#### Server Components

```tsx
import { getTranslations } from "next-intl/server";

export default async function ServerComponent() {
  const t = await getTranslations("common");

  return <h1>{t("welcome")}</h1>;
}
```

## 📝 Translation Files

### Structure

Each translation file follows this structure:

```json
{
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "submit": "Submit"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "forms": {
    "required": "This field is required",
    "email": "Email",
    "name": "Name"
  }
}
```

### Available Translation Namespaces

- `common` - General UI text
- `navigation` - Navigation menus
- `forms` - Form labels and validation
- `hero` - Hero section content
- `features` - Feature descriptions
- `testimonials` - Customer testimonials
- `faq` - FAQ section
- `blog` - Blog-related content
- `footer` - Footer content
- `errors` - Error messages (404, 500, etc.)
- `dates` - Date formatting

## 🛠️ Development

### Adding New Translations

1. Add the key to all language files (`en.json`, `fr.json`, `nl.json`, `de.json`)
2. Use the translation in your component:
   ```tsx
   const t = useTranslations("namespace");
   return <span>{t("newKey")}</span>;
   ```

### Adding New Languages

1. Add locale to `src/i18n/config.ts`:
   ```typescript
   export const locales = ["en", "fr", "nl", "de", "es"] as const;
   ```
2. Create new message file: `src/i18n/messages/es.json`
3. Update middleware configuration
4. Add flag emoji to `LanguageSwitcher` component

## 🔗 Routing

### URL Structure

- `/fr` - French (default)
- `/en` - English
- `/nl` - Dutch
- `/de` - German

### Custom Route Names

Configured in middleware for localized paths:

```typescript
pathnames: {
  '/about': {
    en: '/about',
    fr: '/a-propos',
    nl: '/over-ons',
    de: '/ueber-uns'
  }
}
```

## 🎯 Features

### ✅ Implemented

- [x] 4-language support (EN, FR, NL, DE)
- [x] Automatic locale detection
- [x] Language switcher component (2 variants)
- [x] Server and client component support
- [x] Route-based localization
- [x] Error pages with translations
- [x] TypeScript integration
- [x] Middleware for locale routing

### 🚀 Future Enhancements

- [ ] RTL language support
- [ ] Pluralization rules
- [ ] Date/number formatting
- [ ] Dynamic imports for large translation files
- [ ] Translation management system integration
- [ ] SEO meta tags per locale

## 📖 Usage Examples

### Basic Translation

```tsx
import { useTranslations } from "next-intl";

function WelcomeMessage() {
  const t = useTranslations("common");
  return <h1>{t("welcome")}</h1>;
}
```

### With Parameters

```tsx
const t = useTranslations("messages");
// Translation: "Hello {name}, you have {count} messages"
return <p>{t("greeting", { name: "John", count: 5 })}</p>;
```

### Conditional Translations

```tsx
const t = useTranslations("forms");
return <input placeholder={t("email")} aria-label={t("emailRequired")} />;
```

## 🐛 Troubleshooting

### Build Errors

- Ensure all translation keys exist in all language files
- Check that `locale` parameter is properly typed
- Verify middleware configuration matches available locales

### Missing Translations

- Check the namespace is correctly specified
- Ensure the key exists in the target language file
- Verify the component is wrapped in `NextIntlClientProvider`

## 📚 Resources

- [next-intl Documentation](https://next-intl.dev/)
- [Next.js i18n Documentation](https://nextjs.org/docs/advanced-features/i18n)
- [ICU Message Format](https://formatjs.io/docs/core-concepts/icu-syntax/)
