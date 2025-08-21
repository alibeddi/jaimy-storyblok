import React from 'react';
import { StoryblokComponent } from '@storyblok/react';
import classNames from 'classnames';
import { SbBlokData } from '@storyblok/react';

interface ChildBlok extends SbBlokData {
  _uid: string;
  component: string;
}

interface FormGroupBlok {
  children?: ChildBlok[];
}

interface FormGroupProps {
  blok: FormGroupBlok;
}

const FormGroup: React.FC<FormGroupProps> = ({ blok }) => {
  const filteredChildren = blok.children || [];

  const groupClass = classNames('form-group', {
    'form-group--single': filteredChildren.length === 1,
    'form-group--multiple': filteredChildren.length > 1,
  });

  return (
    <div className={groupClass}>
      {filteredChildren.map((child) => (
        <StoryblokComponent blok={child} key={child._uid} />
      ))}
    </div>
  );
};

export default FormGroup;