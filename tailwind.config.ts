// Tailwind v4 config - used primarily to safelist CMS-driven classes
// Theme customizations live in CSS via @theme in src/app/globals.css

import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    { pattern: /bg-(primary|gray)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /bg-(red|grey)-(light|dark|gradient)/ },
    { pattern: /bg-(white|black)/ },

    // Explicit background classes
    "bg-red-light",
    "bg-red-dark",
    "bg-red-gradient",
    "bg-grey-light",
    "bg-grey-dark",
    "bg-white",
    "bg-black",

    // Text alignment
    { pattern: /text-(left|center|right)/ },
    // Flex alignment driven by CMS
    { pattern: /justify-(start|center|end|between|around|evenly)/ },
    { pattern: /items-(start|center|end|stretch|baseline)/ },

    // Text color patterns
    { pattern: /text-(primary|gray)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /text-(red|grey)-(light|dark)/ },
    { pattern: /text-(white|black)/ },

    // Explicit text color classes
    "text-red-light",
    "text-red-dark",
    "text-grey-light",
    "text-grey-dark",
    "text-white",
    "text-black",

    // Border side utilities
    "border",
    "border-t",
    "border-b",
    "border-l",
    "border-r",

    // Border color (token and variable based)
    { pattern: /border-(primary|gray)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /border-(white|black)/ },
    "border-[rgb(var(--color-gray-300))]",
    "border-[rgb(var(--color-gray-500))]",
    "border-[rgb(var(--color-gray-700))]",
    "border-[rgb(var(--color-gray-800))]",
    "border-[rgb(var(--color-white))]",

    // Background colors (CSS variable based)
    "bg-[rgb(var(--color-primary-100))]",
    "bg-[rgb(var(--color-primary-200))]",
    "bg-[rgb(var(--color-primary-300))]",
    "bg-[rgb(var(--color-primary-400))]",
    "bg-[rgb(var(--color-primary-500))]",
    "bg-[rgb(var(--color-primary-600))]",
    "bg-[rgb(var(--color-primary-700))]",
    "bg-[rgb(var(--color-primary-800))]",
    "bg-[rgb(var(--color-primary-900))]",
    "bg-[rgb(var(--color-gray-100))]",
    "bg-[rgb(var(--color-gray-200))]",
    "bg-[rgb(var(--color-gray-300))]",
    "bg-[rgb(var(--color-gray-400))]",
    "bg-[rgb(var(--color-gray-500))]",
    "bg-[rgb(var(--color-gray-600))]",
    "bg-[rgb(var(--color-gray-700))]",
    "bg-[rgb(var(--color-gray-800))]",
    "bg-[rgb(var(--color-white))]",
    "bg-[rgb(var(--color-black))]",
    "bg-[rgb(var(--color-review))]",

    // Token alias sometimes used directly by CMS
    "bg-review",

    // Text colors (CSS variable based)
    "text-[rgb(var(--color-primary-100))]",
    "text-[rgb(var(--color-primary-200))]",
    "text-[rgb(var(--color-primary-300))]",
    "text-[rgb(var(--color-primary-400))]",
    "text-[rgb(var(--color-primary-500))]",
    "text-[rgb(var(--color-primary-600))]",
    "text-[rgb(var(--color-primary-700))]",
    "text-[rgb(var(--color-primary-800))]",
    "text-[rgb(var(--color-primary-900))]",
    "text-[rgb(var(--color-gray-100))]",
    "text-[rgb(var(--color-gray-200))]",
    "text-[rgb(var(--color-gray-300))]",
    "text-[rgb(var(--color-gray-400))]",
    "text-[rgb(var(--color-gray-500))]",
    "text-[rgb(var(--color-gray-600))]",
    "text-[rgb(var(--color-gray-700))]",
    "text-[rgb(var(--color-gray-800))]",
    "text-[rgb(var(--color-white))]",
    "text-[rgb(var(--color-black))]",
    "text-[rgb(var(--color-review))]",

    // Gradient utilities
    "from-[rgb(var(--color-gradient-start))]",
    "to-[rgb(var(--color-gradient-end))]",
    "bg-gradient-to-r",

    // Margins that are often CMS-driven
    "mb-0",
    "mb-1",
    "mb-2",
    "mb-4",
    "mb-6",
    "mb-8",
    "mb-10",
    // Padding variants used in Column (px, pt, pb)
    { pattern: /px-(0|1|2|4|6|8|10|12|16|20)/ },
    { pattern: /pt-(0|1|2|4|6|8|10|12|16|20)/ },
    { pattern: /pb-(0|1|2|4|6|8|10|12|16|20)/ },
    { pattern: /gap-(0|1|2|4|6|8|10)/ },
    { pattern: /md:gap-(0|1|2|4|6|8|10)/ },
    { pattern: /lg:gap-(0|1|2|4|6|8|10)/ },

    // Button variant classes
    "hover:bg-[rgb(var(--color-primary-600))]",
    "hover:bg-[rgb(var(--color-gray-200))]",
    "hover:bg-[rgb(var(--color-primary-500))]",
    "border-[rgb(var(--color-primary-500))]",
    "text-[rgb(var(--color-primary-500))]",
    "focus-visible:ring-[rgb(var(--color-primary-500))]",
    "focus-visible:ring-[rgb(var(--color-gray-500))]",
    "focus-visible:ring-2",
    "transition-all",
    "duration-200",

    // Font weight classes
    "font-normal",
    "font-bold",
    "!font-bold",
    "font-light",
    "font-medium",
    "font-semibold",

    // Font family classes
    "font-belfius-montserrat",
    "font-belfius-alternative",
    "font-sans",
    "font-serif",
    "font-mono",

    // Font family patterns for dynamic generation
    {
      pattern: /font-(belfius-montserrat|belfius-alternative|sans|serif|mono)/,
    },

    // Text size classes for Heading component - expanded
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl",
    "text-[10rem]",

    // Prose font weight classes
    "prose-headings:font-normal",
    "prose-headings:font-bold",
    "prose-headings:!font-bold",
    "prose-headings:font-light",
    "prose-headings:font-medium",
    "prose-headings:font-semibold",
    // Also apply weights to paragraphs inside prose
    "prose-p:font-normal",
    "prose-p:font-bold",
    "prose-p:font-light",
    "prose-p:font-medium",
    "prose-p:font-semibold",

    // Icon margin override
    "[&>*]:!mb-0",

    // Gap classes for Columns component
    "gap-2",
    "gap-4",
    "gap-6",
    "md:gap-2",
    "md:gap-4",
    "md:gap-6",
    "lg:gap-2",
    "lg:gap-4",
    "lg:gap-6",

    // Padding classes for Column component
    "px-0",
    "px-1",
    "px-2",
    "px-4",
    "px-6",
    "px-8",
    "px-10",
    "px-12",
    "px-16",
    "px-20",
    "pt-0",
    "pt-1",
    "pt-2",
    "pt-4",
    "pt-6",
    "pt-8",
    "pt-10",
    "pt-12",
    "pt-16",
    "pt-20",
    "pb-0",
    "pb-1",
    "pb-2",
    "pb-4",
    "pb-6",
    "pb-8",
    "pb-10",
    "pb-12",
    "pb-16",
    "pb-20",

    // Border radius classes for Column and Columns components
    "rounded-none",
    "rounded-sm",
    "rounded",
    "rounded-md",
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
    "rounded-full",

    // Shadow classes for Column and Columns components
    "shadow-none",
    "shadow-sm",
    "shadow",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "shadow-2xl",

    // Max width classes for Row component
    "max-w-sm",
    "max-w-md",
    "max-w-lg",
    "max-w-xl",
    "max-w-2xl",
    "max-w-3xl",
    "max-w-4xl",
    "max-w-5xl",
    "max-w-6xl",
    "max-w-7xl",

    // Border color classes for Column and Columns components
    "border-gray-100",
    "border-gray-200",
    "border-gray-300",
    "border-gray-400",
    "border-gray-500",
    "border-gray-600",
    "border-gray-700",
    "border-gray-800",
    "border-gray-900",
    "border-red-500",
    "border-blue-500",
    "border-green-500",
    "border-yellow-500",
    "border-purple-500",
    "border-pink-500",
    "border-indigo-500",
    "border-black",
    "border-white",

    // Grid column counts used by Columns component, with responsive prefixes
    { pattern: /(grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12))/ },
    { pattern: /(md:grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12))/ },
    { pattern: /(lg:grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12))/ },

    // Border color patterns for dynamic border colors
    {
      pattern:
        /(border-(gray|red|blue|green|yellow|purple|pink|indigo|black|white)-(100|200|300|400|500|600|700|800|900))/,
    },
  ],
};
