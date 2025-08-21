import { storyblokEditable } from '@storyblok/react/rsc';
import { PageBlok } from "@/types/storyblok";

export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <main {...storyblokEditable(blok)} className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {blok.body?.map((nestedBlok) => (
          <div key={nestedBlok._uid}>
            {/* Nested components will be rendered here */}
            <pre className="p-4 rounded">
              {JSON.stringify(nestedBlok, null, 2)}
            </pre>
          </div>
        ))}
        
        {/* Fallback content if no body */}
        {!blok.body?.length && (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Welcome to Jaimy</h1>
            <p className="text-gray-600">Your Storyblok integration is working!</p>
          </div>
        )}
      </div>
    </main>
  );
}