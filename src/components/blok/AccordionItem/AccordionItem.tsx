import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import AccordionItemUI from '../../ui/Accordion/AccordionItem';
import NestedBlok from '../../NestedBlok';
import { SbBlokData } from '@storyblok/react';

interface ChildBlok extends SbBlokData {
  _uid: string;
  component: string;
}

interface AccordionItemBlok extends SbBlokData {
  _uid: string;
  title: string;
  index?: number;
  children?: ChildBlok[];
}

interface AccordionItemProps {
  blok: AccordionItemBlok;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ blok }) => {
  return (
    <AccordionItemUI
      title={blok.title}
      index={blok.index}
      {...storyblokEditable(blok)}
    >
      {blok.children?.map((child) => (
        <NestedBlok key={child._uid} blok={child} />
      ))}
    </AccordionItemUI>
  );
};

export default AccordionItem;