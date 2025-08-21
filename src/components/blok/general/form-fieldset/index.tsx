import React from 'react';
import { StoryblokComponent } from '@storyblok/react';
import { SbBlokData } from '@storyblok/react';

interface ChildBlok extends SbBlokData {
  _uid: string;
  component: string;
}

interface FormFieldsetBlok {
  children?: ChildBlok[];
}

interface FormFieldsetProps {
  blok: FormFieldsetBlok;
}

const FormFieldset: React.FC<FormFieldsetProps> = ({ blok }) => {
  const filteredChildren = blok.children || [];

  return (
    <fieldset className="form-fieldset">
      {filteredChildren.map((child) => (
        <StoryblokComponent blok={child} key={child._uid} />
      ))}
    </fieldset>
  );
};

export default FormFieldset;