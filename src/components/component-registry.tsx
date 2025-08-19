/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type ComponentType = React.ComponentType<any>;

// Component mapping object with proper TypeScript typing
export const componentMap: Record<string, ComponentType> = {};

// Function to register components
export const registerComponent = (name: string, component: ComponentType) => {
  componentMap[name] = component;
};

export default componentMap;