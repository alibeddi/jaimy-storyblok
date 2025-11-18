"use client";

import React, { Suspense } from "react";
import { SbBlokData } from "@storyblok/react";
import { loadComponent } from "@/lib/component-registry";

interface BlokData extends SbBlokData {
  component: string;
  _uid: string;
}

interface BlokProps {
  blok: BlokData;
}

// Loading placeholder component to prevent CLS
const LoadingPlaceholder = () => (
  <div style={{ minHeight: '50px' }} aria-label="Loading component" />
);

const Blok: React.FC<BlokProps> = ({ blok }) => {
  if (!blok?.component) {
    console.error("[Blok] Invalid blok data:", blok);
    return null;
  }

  // Load component dynamically
  const Component = loadComponent(blok.component) as React.ComponentType<{ blok: BlokData }>;
  
  if (!Component) {
    console.warn(`[Blok] Component "${blok.component}" not found in registry`);
    return (
      <div style={{ padding: '20px', background: '#fee', border: '1px solid red' }}>
        Component "{blok.component}" not found
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Component blok={blok} />
    </Suspense>
  );
};

export default Blok;
