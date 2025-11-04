"use client";

import React, { useEffect, useState } from "react";
import { SbBlokData } from "@storyblok/react";

interface BlokData extends SbBlokData {
  component: string;
  _uid: string;
}

interface BlokProps {
  blok: BlokData;
}

// Type for the component map
type ComponentMap = Record<string, React.ComponentType<{ blok: BlokData }>>;

// Lazy load the component map
const getComponentMap = async (): Promise<ComponentMap> => {
  try {
    const { componentMap } = await import("./blok-map");
    return componentMap as ComponentMap;
  } catch (error) {
    console.error("Failed to load component map:", error);
    return {};
  }
};

const Blok: React.FC<BlokProps> = ({ blok }) => {
  const [Component, setComponent] = useState<React.ComponentType<{
    blok: BlokData;
  }> | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      const componentRegistry = await getComponentMap();
      const Comp = componentRegistry[blok.component];
      setComponent(() => Comp || null);
    };
    loadComponent();
  }, [blok.component]);

  if (!blok?.component) {
    console.error("Invalid blok data:", blok);
    return null;
  }

  if (!Component) {
    return (
      <div
        style={{
          padding: "10px",
          background: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        }}>
        Loading or unknown component: {blok.component}
      </div>
    );
  }

  return <Component blok={blok} key={blok._uid} />;
};

export default Blok;
