import React from "react";
import { SbBlokData } from "@storyblok/react";

interface BlokData extends SbBlokData {
  component: string;
  _uid: string;
}

interface BlokProps {
  blok: BlokData;
}

// Lazy load the component map to avoid circular dependencies
const getComponentMap = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { componentMap } = require("./blok-map");
    return componentMap;
  } catch (error) {
    console.error("Failed to load component map:", error);
    return {};
  }
};

const Blok: React.FC<BlokProps> = ({ blok }) => {
  // Early return for invalid blok data
  if (!blok || !blok?.component) {
    console.error("Invalid blok data:", blok);
    return null;
  }

  const componentRegistry = getComponentMap();
  const Component = componentRegistry[blok.component];

  if (!Component) {
    console.error(
      "Unknown component:",
      blok?.component,
      "Available components:",
      Object.keys(componentRegistry)
    );
    return (
      <div
        style={{
          padding: "10px",
          background: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        }}>
        Unknown component: {blok.component}
        <br />
        <small>Component ID: {blok?._uid}</small>
      </div>
    );
  }

  return <Component blok={blok} key={blok._uid} />;
};

export default Blok;
