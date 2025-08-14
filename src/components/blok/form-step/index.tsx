import React from 'react';
import { StoryblokComponent } from '@storyblok/react';
import { SbBlokData } from '@storyblok/react';

interface ChildBlok extends SbBlokData {
  _uid: string;
  component: string;
}

interface FormStepBlok {
  title: string;
  children?: ChildBlok[];
}

interface FormStepProps {
  blok: FormStepBlok;
}

const FormStep: React.FC<FormStepProps> = ({ blok }) => {
  const filteredChildren = blok.children || [];

  return (
    <div className="form-step-content">
      <h2 className="form-step-title">{blok.title}</h2>

      {filteredChildren.map((child) => (
        <StoryblokComponent blok={child} key={child._uid} />
      ))}
    </div>
  );
};

export default FormStep;