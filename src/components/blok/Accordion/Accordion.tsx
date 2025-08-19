import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import AccordionUI from '../../ui/Accordion';
import NestedBlok from '../../NestedBlok'; // Use NestedBlok instead of Blok
import cn from 'classnames';
import { SbBlokData } from '@storyblok/react';

type MarginBottom = 'none' | 'x-small' | 'small' | 'default' | 'medium' | 'large' | 'x-large';

interface ChildBlok extends SbBlokData {
  _uid: string;
  component: string;
  title?: string;
}

interface AccordionBlok extends SbBlokData {
  _uid: string;
  dark?: boolean;
  multiple?: boolean;
  faq?: boolean;
  children?: ChildBlok[];
  margin_bottom?: MarginBottom;
}

interface AccordionProps {
  blok: AccordionBlok;
}

const Accordion: React.FC<AccordionProps> = ({ blok }) => {
  const marginBottomClasses: Record<MarginBottom, string> = {
    none: 'mb-0',
    'x-small': 'mb-1',
    small: 'mb-4',
    default: 'mb-6',
    medium: 'mb-8',
    large: 'mb-12',
    'x-large': 'mb-16',
  };

  const className = cn({
    [marginBottomClasses[blok.margin_bottom || 'default']]: true,
  });

  const structuredData = blok.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: blok.children?.map((item) => ({
          '@type': 'Question',
          name: item.title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FAQ content',
          },
        })),
      }
    : null;

  return (
    <>
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <AccordionUI
        className={className}
        dark={blok.dark}
        multiple={blok.multiple}
        {...storyblokEditable(blok)}
      >
        
        {blok.children?.map((child, index) => (
          <NestedBlok key={child._uid} blok={{ ...child, index }} />
        ))}
      </AccordionUI>
    </>
  );
};

export default Accordion;