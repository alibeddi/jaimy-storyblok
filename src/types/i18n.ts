import { Locale } from "@/i18n/config";

// Locale-related types
export type { Locale };

// Language switcher component types
export interface LanguageSwitcherProps {
  className?: string;
  variant?: "dropdown" | "inline";
  showFlag?: boolean;
}

// Translation key types for type safety
export interface CommonTranslations {
  loading: string;
  error: string;
  retry: string;
  cancel: string;
  save: string;
  submit: string;
  next: string;
  previous: string;
  close: string;
  open: string;
  yes: string;
  no: string;
  home: string;
  about: string;
  contact: string;
  services: string;
  blog: string;
  readMore: string;
  learnMore: string;
  getStarted: string;
  backToHome: string;
}

export interface NavigationTranslations {
  home: string;
  about: string;
  services: string;
  blog: string;
  contact: string;
  language: string;
}

export interface FormTranslations {
  required: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  subject: string;
  company: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  invalidEmail: string;
  invalidPhone: string;
  success: string;
  error: string;
  sending: string;
  pleaseWait: string;
}

// Utility types for i18n
export interface LocalizedContent<T = string> {
  en: T;
  fr: T;
  nl: T;
  de: T;
}

export interface LocalizedSlug {
  locale: Locale;
  slug: string;
}

// Storyblok i18n integration types
export interface StoryblokI18nStory {
  uuid: string;
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  default_full_slug: string;
  created_at: string;
  published_at: string;
  alternates: StoryblokAlternate[];
  group_id: string;
  lang: Locale;
  is_dir: boolean;
  parent_id?: number;
  position?: number;
  meta_data?: Record<string, unknown>;
  content: Record<string, unknown>;
}

export interface StoryblokAlternate {
  id: number;
  name: string;
  slug: string;
  published: boolean;
  full_slug: string;
  is_folder: boolean;
  parent_id?: number;
}

// Hook types for i18n
export interface UseTranslationHook {
  t: (key: string, values?: Record<string, unknown>) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

// Route translation types
export interface RouteTranslation {
  en: string;
  fr: string;
  nl: string;
  de: string;
}

export interface LocalizedRoutes {
  [key: string]: RouteTranslation | string;
}

// Date and number formatting types
export interface LocalizedFormats {
  dateTime: {
    short: Intl.DateTimeFormatOptions;
    long: Intl.DateTimeFormatOptions;
  };
  number: {
    currency: Intl.NumberFormatOptions;
  };
}

// Error types for i18n
export interface I18nError {
  code: "MISSING_TRANSLATION" | "INVALID_LOCALE" | "LOADING_ERROR";
  message: string;
  key?: string;
  locale?: Locale;
}

// Component props that support i18n
export interface I18nAwareProps {
  locale?: Locale;
  translations?: Record<string, string>;
}
