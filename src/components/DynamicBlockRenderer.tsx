import React from 'react';
import { StoryblokComponent } from '@storyblok/react';

import { SbBlokData } from '@storyblok/react';

interface DynamicBlockRendererProps {
  blocks: SbBlokData[];
}

export default function DynamicBlockRenderer({ blocks }: DynamicBlockRendererProps) {
  return (
    <div>
      {blocks.map((block) => (
        <StoryblokComponent blok={block} key={block._uid} />
      ))}
    </div>
  );
}