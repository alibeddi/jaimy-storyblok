import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jaimy - Storyblok Project",
  description: "A modern website built with Next.js and Storyblok",
};

// The root layout only provides basic HTML structure
// All i18n-aware components are in the [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
