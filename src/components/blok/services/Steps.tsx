import { StepBlok, StepItem, StepsBlok } from "@/types/storyblok";

import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

export default function Steps({ blok }: { blok: StepsBlok }) {
  const steps = blok?.steps || [];

  return (
    <section {...storyblokEditable(blok)} className="bg-gray-100  relative">
      {/* Main Content */}
      <div className="max-w-[90%] mx-auto px-8 py-16">
        {/* H2 Heading */}

        <h1
          data-blok-field="headline"
          // {...sbEditable(blok)}
          className="text-4xl mb-16 lg:text-5xl xl:text-6xl 2xl:text-6xl font-light leading-tight tracking-wide transition-all duration-300 hover:text-gray-700"
          style={{
            fontFamily:
              "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",

            color: "rgba(50,84,109,1)",
          }}>
          {blok?.title}
        </h1>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-16">
          {steps.map((step, index) => {
            const item = step as StepBlok | StepItem;
            const isBlok = (s: StepBlok | StepItem): s is StepBlok => {
              const obj = s as Record<string, unknown>;
              return (
                typeof obj.component === "string" && obj.component === "step"
              );
            };
            if (isBlok(item)) {
              return <StoryblokComponent key={`step-${index}`} blok={item} />;
            }
            const fallback: StepBlok = {
              _uid: `${blok._uid}-step-${index}`,
              component: "step",
              step_number: item.step_number,
              title: item.title,
              description: item.description,
              icon: item.icon,
            };
            return <StoryblokComponent key={`step-${index}`} blok={fallback} />;
          })}
        </div>
      </div>
    </section>
  );
}
