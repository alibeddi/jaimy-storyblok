import { storyblokEditable } from "@storyblok/react/rsc";
import { PageBlok } from "@/types/storyblok";
import Blok from "@/components";

export default function TemplatePage({ blok }: { blok: PageBlok }) {
  return (
    <main {...storyblokEditable(blok)} className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Storyblok Components Template
          </h1>
          <p className="text-gray-600">
            This page showcases all available components for testing and
            development
          </p>
        </div>

        {/* Service Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Service Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blok.body
              ?.filter((block) =>
                [
                  "header",
                  "hero",
                  "steps",
                  "blogs",
                  "reviews",
                  "social_proof",
                  "faq",
                  "footer",
                  "feature",
                  "slider",
                  "body",
                ].includes(block.component)
              )
              .map((nestedBlok) => (
                <div
                  key={nestedBlok._uid}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="mb-4 p-2 bg-blue-50 rounded">
                    <h3 className="text-sm font-semibold text-blue-800">
                      Component: {nestedBlok.component}
                    </h3>
                    <p className="text-xs text-blue-600">
                      UID: {nestedBlok._uid}
                    </p>
                  </div>
                  <Blok blok={nestedBlok} />
                </div>
              ))}
          </div>
        </section>

        {/* General Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            General Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blok.body
              ?.filter((block) =>
                [
                  "button",
                  "button-group",
                  "teaser",
                  "grid",
                  "banner",
                  "image",
                  "heading",
                  "rich-text",
                  "columns",
                  "column",
                  "row",
                  "table",
                  "table-column",
                  "table-row",
                  "table-header",
                  "list",
                  "list-item",
                  "review-stars",
                  "hr",
                  "accordion",
                  "accordion-item",
                  "container",
                  "form",
                  "form-step",
                  "form-fieldset",
                  "form-group",
                  "input-field",
                  "blog",
                  "author",
                  "blog-overview",
                  "blog-card",
                  "iframe",
                ].includes(block.component)
              )
              .map((nestedBlok) => (
                <div
                  key={nestedBlok._uid}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="mb-4 p-2 bg-green-50 rounded">
                    <h3 className="text-sm font-semibold text-green-800">
                      Component: {nestedBlok.component}
                    </h3>
                    <p className="text-xs text-green-600">
                      UID: {nestedBlok._uid}
                    </p>
                  </div>
                  <Blok blok={nestedBlok} />
                </div>
              ))}
          </div>
        </section>

        {/* Analytics Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Analytics Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blok.body
              ?.filter((block) =>
                [
                  "analytics_button",
                  "analytics_form",
                  "analytics_video",
                  "anytrack_tracker",
                  "anytrack_form",
                ].includes(block.component)
              )
              .map((nestedBlok) => (
                <div
                  key={nestedBlok._uid}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="mb-4 p-2 bg-purple-50 rounded">
                    <h3 className="text-sm font-semibold text-purple-800">
                      Component: {nestedBlok.component}
                    </h3>
                    <p className="text-xs text-purple-600">
                      UID: {nestedBlok._uid}
                    </p>
                  </div>
                  <Blok blok={nestedBlok} />
                </div>
              ))}
          </div>
        </section>

        {/* SEO Component */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            SEO Component
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {blok.body
              ?.filter((block) => block.component === "seo")
              .map((nestedBlok) => (
                <div key={nestedBlok._uid}>
                  <div className="mb-4 p-2 bg-yellow-50 rounded">
                    <h3 className="text-sm font-semibold text-yellow-800">
                      Component: {nestedBlok.component}
                    </h3>
                    <p className="text-xs text-yellow-600">
                      UID: {nestedBlok._uid}
                    </p>
                  </div>
                  <Blok blok={nestedBlok} />
                </div>
              ))}
          </div>
        </section>

        {/* Fallback content if no body */}
        {!blok.body?.length && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Jaimy Template
            </h1>
            <p className="text-gray-600 mb-8">
              Your Storyblok integration is working!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              <div className="p-4 border rounded">
                <h3 className="font-semibold mb-2">
                  Available Service Components:
                </h3>
                <ul className="text-sm space-y-1">
                  <li>• Hero</li>
                  <li>• Header</li>
                  <li>• Footer</li>
                  <li>• Steps</li>
                  <li>• Reviews</li>
                  <li>• Blogs</li>
                  <li>• FAQ</li>
                  <li>• Social Proof</li>
                  <li>• Features</li>
                  <li>• Slider</li>
                </ul>
              </div>
              <div className="p-4 border rounded">
                <h3 className="font-semibold mb-2">
                  Available General Components:
                </h3>
                <ul className="text-sm space-y-1">
                  <li>• Button & Button Group</li>
                  <li>• Heading & Rich Text</li>
                  <li>• Image & Banner</li>
                  <li>• Columns & Grid</li>
                  <li>• Table Components</li>
                  <li>• List Components</li>
                  <li>• Form Components</li>
                  <li>• Accordion</li>
                  <li>• Container</li>
                  <li>• Iframe</li>
                </ul>
              </div>
              <div className="p-4 border rounded">
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Real-time editing</li>
                  <li>• Autosave functionality</li>
                  <li>• Inline editing</li>
                  <li>• SEO management</li>
                  <li>• Multi-language support</li>
                  <li>• Analytics integration</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
