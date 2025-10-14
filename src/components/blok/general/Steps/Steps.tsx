import type { StepBlok, StepItem, StepsBlok } from "@/types/storyblok";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

interface StepsProps {
  blok: StepsBlok;
}

const Steps: React.FC<StepsProps> = ({ blok }) => {
  const steps = blok?.steps || [];

  return (
    <section {...storyblokEditable(blok)} className="bg-gray-100 relative">
      <div className="max-w-[90%] mx-auto px-8 py-16">
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
};

export default Steps;
