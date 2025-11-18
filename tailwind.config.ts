// Tailwind v4 config - optimized safelist for CMS-driven classes
// Theme customizations live in CSS via @theme in src/app/globals.css

import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  plugins: [require("@tailwindcss/typography")],
  // Reduced safelist - only truly dynamic CMS-driven classes
  safelist: [
    // Core CMS background colors
    { pattern: /^bg-(red|grey)-(light|dark|gradient)$/ },
    "bg-white",
    "bg-black",
    
    // Core CMS text colors
    { pattern: /^text-(red|grey)-(light|dark)$/ },
    "text-white",
    "text-black",
    
    // Layout utilities
    { pattern: /^text-(left|center|right)$/ },
    { pattern: /^justify-(start|center|end|between)$/ },
    { pattern: /^items-(start|center|end|stretch)$/ },
    
    // Grid columns (CMS-driven)
    { pattern: /^grid-cols-([1-6])$/ },
    { pattern: /^md:grid-cols-([1-6])$/ },
    { pattern: /^lg:grid-cols-([1-6])$/ },
    
    // Spacing (CMS-driven)
    { pattern: /^gap-([0-9]|10)$/ },
    { pattern: /^(px|pt|pb)-([0-9]|10|12|16|20)$/ },
    
    // Font weights
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    
    // Border radius
    { pattern: /^rounded-(none|sm|md|lg|xl|2xl|full)?$/ },
    
    // Shadows
    { pattern: /^shadow-(none|sm|md|lg|xl)?$/ },
    
    // Max widths
    { pattern: /^max-w-(sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)$/ },
  ],
};
