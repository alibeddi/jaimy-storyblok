"use client";

import React, { useEffect, useState, Suspense } from "react";
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
  const [Component, setComponent] = useState<React.ComponentType<{
    blok: BlokData;
  }> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlokComponent = async () => {
      try {
        const LoadedComponent = loadComponent(blok.component);
        if (LoadedComponent) {
          setComponent(LoadedComponent as React.ComponentType<{ blok: BlokData }>);
        } else {
          console.warn(`Component "${blok.component}" not found in registry`);
        }
      } catch (error) {
        console.error(`Error loading component "${blok.component}":`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlokComponent();
  }, [blok.component]);

  if (!blok?.component) {
    console.error("Invalid blok data:", blok);
    return null;
  }

  if (isLoading || !Component) {
    return <LoadingPlaceholder />;
  }

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Component blok={blok} key={blok._uid} />
    </Suspense>
  );
};

export default Blok;
