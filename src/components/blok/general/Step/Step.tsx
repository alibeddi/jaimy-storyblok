"use client";

import Image from "next/image";
import type { StepBlok } from "@/types/storyblok";
import { storyblokEditable } from "@storyblok/react";

export default function Step({ blok }: { blok: StepBlok }) {
  const stepNumber = Number(blok.step_number || 0);
  const title = blok.title || `Step ${stepNumber || 1}`;
  const icon = blok.icon?.filename;

  return (
    <div
      {...storyblokEditable(blok)}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-20 h-20 bg-[#AF1B3C] rounded-full flex items-center justify-center shadow-md"
          data-blok-field="icon">
          {icon ? (
            <Image
              src={icon}
              alt={blok.icon?.alt || `${title} icon`}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          ) : (
            <div className="w-8 h-8 bg-white rounded" />
          )}
        </div>
      </div>

      <div className="pt-12">
        <h3
          className="font-belfius-title text-xl font-bold text-gray-900 mb-6"
          data-blok-field="title">
          {title}
        </h3>
        <p
          className="text-gray-600 font-belfius-body leading-relaxed text-sm"
          data-blok-field="description">
          {blok.description}
        </p>
      </div>
    </div>
  );
}
