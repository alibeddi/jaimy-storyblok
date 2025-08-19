import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import { SbBlokData } from '@storyblok/react';

// Import only the components that can be nested (avoid circular imports)
import Button from './blok/Button';
import ButtonGroup from './blok/ButtonGroup';
import Heading from './blok/Heading';
import RichText from './blok/RichText';
import Image from './blok/Image';
import AccordionItem from './blok/AccordionItem';
// Add other safe components as needed

interface BlokData extends SbBlokData {
  component: string;
  _uid: string;
}

interface NestedBlokProps {
  blok: BlokData;
}

// Nested component map (without Accordion to avoid circular dependency)
const nestedComponentMap: Record<string, React.ComponentType<any>> = {
  button: Button,
  'button-group': ButtonGroup,
  heading: Heading,
  'rich-text': RichText,
  image: Image,
  'accordion-item': AccordionItem,
  // Add other components that can be nested
};

const NestedBlok: React.FC<NestedBlokProps> = ({ blok }) => {
  const Component = nestedComponentMap[blok.component];

  if (!Component) {
    console.warn('Nested component not found:', blok.component);
    return (
      <div style={{ padding: '10px', background: '#fff3cd', border: '1px solid #ffeaa7' }}>
        Nested component: {blok.component} (not registered for nesting)
      </div>
    );
  }

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <Component blok={blok} />
    </div>
  );
};

export default NestedBlok;