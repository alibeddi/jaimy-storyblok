  /* eslint-disable @typescript-eslint/no-explicit-any */
  import React from 'react';
import { StoryblokComponent } from '@storyblok/react';

interface FormGroupBlok {
  title?: string;
  columns?: number;
  fields?: Array<{
    _uid: string;
    [key: string]: any;
  }>;
}

interface FormGroupProps {
  blok: FormGroupBlok;
}

const FormGroup: React.FC<FormGroupProps> = ({ blok }) => {
  if (!blok.fields || blok.fields.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {blok.title && (
        <h3 className="text-lg font-semibold mb-4">{blok.title}</h3>
      )}

      <div
        className={`grid gap-4 ${
          blok.columns === 1
            ? 'grid-cols-1'
            : blok.columns === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-3'
        }`}
      >
        {blok.fields.map((field) => (
          <StoryblokComponent blok={field} key={field._uid} />
        ))}
      </div>
    </div>
  );
};

export default FormGroup;