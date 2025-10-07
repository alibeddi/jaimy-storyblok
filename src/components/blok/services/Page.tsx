import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import { PageBlok } from "@/types/storyblok";

export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <main {...storyblokEditable(blok)} className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {blok.body?.map((nestedBlok) => (
          <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok as any} /> // eslint-disable-line @typescript-eslint/no-explicit-any
        ))}

        {/* Fallback content if no body */}
        {!blok.body?.length && (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Welcome to Jaimy</h1>
            <p className="text-gray-600">
              Your Storyblok integration is working!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
