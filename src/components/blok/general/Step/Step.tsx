/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import Image from "@/components/ui/Image/Image";
import type { StepBlok } from "@/types/storyblok";

export default function Step({ blok }: { blok: StepBlok }) {
  const stepNumber = Number(blok.step_number || 0);
  const fallbackTitle = `Step ${stepNumber || 1}`;

  return (
    <div
      {...storyblokEditable(blok)}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-20 h-20 bg-[#AF1B3C] rounded-full flex items-center justify-center shadow-md overflow-hidden"
          data-blok-field="icon">
          {Array.isArray((blok as any)?.icon) ? (
            (blok as any).icon.map((nested: any) => (
              <StoryblokComponent key={nested._uid} blok={nested} />
            ))
          ) : (blok as any)?.icon &&
            typeof (blok as any).icon === "object" &&
            (blok as any).icon.component ? (
            <div className="w-12 h-12 flex items-center justify-center [&>*]:!mb-0">
              <StoryblokComponent blok={(blok as any).icon} />
            </div>
          ) : (blok as any)?.icon &&
            typeof (blok as any).icon === "object" &&
            (blok as any).icon.fieldtype === "asset" ? (
            <Image
              src={(blok as any).icon.filename}
              alt={(blok as any).icon.alt || "Step icon"}
              width={32}
              height={32}
              className="object-contain"
            />
          ) : (
            <div className="w-8 h-8 bg-white rounded" />
          )}
        </div>
      </div>

      <div className="pt-12">
        <div
          className="font-belfius-title text-xl font-bold text-gray-900 mb-6"
          data-blok-field="title">
          {Array.isArray((blok as any)?.title) ? (
            (blok as any).title.map((nested: any) => (
              <StoryblokComponent key={nested._uid} blok={nested} />
            ))
          ) : (blok as any)?.title &&
            typeof (blok as any).title === "object" &&
            (blok as any).title.component ? (
            <StoryblokComponent blok={(blok as any).title} />
          ) : (
            (blok as any)?.title || fallbackTitle
          )}
        </div>
        <div
          className="text-gray-600 font-belfius-body leading-relaxed text-sm"
          data-blok-field="description">
          {Array.isArray((blok as any)?.description) ? (
            (blok as any).description.map((nested: any) => (
              <StoryblokComponent key={nested._uid} blok={nested} />
            ))
          ) : (blok as any)?.description &&
            typeof (blok as any).description === "object" &&
            (blok as any).description.component ? (
            <StoryblokComponent blok={(blok as any).description} />
          ) : (
            (blok as any)?.description
          )}
        </div>
      </div>
    </div>
  );
}
