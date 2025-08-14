import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import { componentMap } from './blok-map';
import { SbBlokData } from '@storyblok/react';

interface BlokData extends SbBlokData {
  component: string;
  _uid: string;
}

interface BlokProps {
  blok: BlokData;
}

const Blok: React.FC<BlokProps> = ({ blok }) => {
  const Component = componentMap[blok.component];

  if (!Component) {
    console.error(
      'Unknown component:',
      blok.component,
      'Available components:',
      Object.keys(componentMap)
    );
    return (
      <div
        style={{
          padding: '10px',
          background: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
        }}
      >
        Unknown component: {blok.component}
        <br />
        <small>Component ID: {blok._uid}</small>
      </div>
    );
  }

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <Component blok={blok} />
    </div>
  );
};

export default Blok;