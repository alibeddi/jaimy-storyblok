// Tailwind v4 config - used primarily to safelist CMS-driven classes
// Theme customizations live in CSS via @theme in src/app/globals.css

import type { Config } from "tailwindcss";

export default <Partial<Config>>{
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

    // Border color (CSS variable based)
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
  ],
};
