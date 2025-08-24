 /* eslint-disable @typescript-eslint/no-explicit-any */
    import { storyblokEditable } from "@storyblok/react/rsc";
import { StepsBlok } from "@/types/storyblok";
import Image from "next/image";

export default function Steps({ blok }: { blok: StepsBlok }) {
  const steps = [
    {
      id: 1,
      title: "Step 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
      icon: "/icons/event_available.png",
    },
    {
      id: 2,
      title: "Step 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
      icon: "/icons/message.png",
    },
    {
      id: 3,
      title: "Step 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
      icon: "/icons/settings.png",
    },
  ];

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-gray-100  relative"
    >
      {/* Main Content */}
      <div className="max-w-[90%] mx-auto px-8 py-16">
        {/* H2 Heading */}
        <h2 className="text-[#32546D] font-belfius-title text-4xl lg:text-5xl mb-16">
          {blok?.title}
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-16">
    
          {steps.map((step) => ( // Remove index parameter if not needed
            <div
              key={step.id}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center relative"
            >
              {/* Icon - Absolutely positioned at the top center */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 bg-[#AF1B3C] rounded-full flex items-center justify-center shadow-md">
                  <Image
                    src={step.icon}
                    alt={`${step.title} icon`}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
              </div>

              {/* Content with top padding to accommodate the icon */}
              <div className="pt-12">
                {/* Step Title */}
                <h3 className="font-belfius-title text-xl font-bold text-gray-900 mb-6">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 font-belfius-body leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
