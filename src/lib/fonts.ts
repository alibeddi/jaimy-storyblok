/**
 * Optimized font configuration for Belfius fonts
 * Uses next/font/local for optimal loading and performance
 */

import localFont from 'next/font/local';

/**
 * BelfiusMontserrat - Primary font family
 * Optimized with font-display: swap and preloading
 */
export const belfiusMontserrat = localFont({
  src: [
    {
      path: '../../public/fonts/belfius/BelfiusMontserrat-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/belfius/BelfiusMontserrat-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/belfius/BelfiusMontserrat-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-belfius-montserrat',
  display: 'optional', // Changed from 'swap' to 'optional' to prevent layout shift
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

/**
 * BelfiusAlternative - Secondary font family
 * Optimized with font-display: swap
 */
export const belfiusAlternative = localFont({
  src: [
    {
      path: '../../public/fonts1/belfius/BelfiusAlternative_regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts1/belfius/BelfiusAlternative_bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-belfius-alternative',
  display: 'optional', // Changed to 'optional' to prevent layout shift
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

/**
 * Font class names for use in components
 */
export const fontClassNames = {
  montserrat: belfiusMontserrat.className,
  alternative: belfiusAlternative.className,
  montserratVariable: belfiusMontserrat.variable,
  alternativeVariable: belfiusAlternative.variable,
};
