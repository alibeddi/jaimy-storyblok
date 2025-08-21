 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import Blok from '../../../index';
import BlogUI from '../../../ui/Blog';

interface NestedBlok {
  _uid: string;
  component: string;
  [key: string]: any;
}

interface AuthorContent {
  content?: any;
}

interface BlogBlok {
  title: string; // Required property
  short_text?: string;
  image?: {
    filename: string;
    alt?: string;
  };
  image_mobile?: {
    filename: string;
    alt?: string;
  };
  image_focus?: "center" | "top" | "bottom" | "left" | "right";
  updated?: string;
  summary?: NestedBlok[];
  content?: NestedBlok[];
  author?: AuthorContent;
  [key: string]: any;
}

interface BlogProps {
  blok: BlogBlok;
}

const Blog: React.FC<BlogProps> = ({ blok }) => {
  return (
    <BlogUI blok={blok} {...storyblokEditable(blok)}>
      {blok.summary && blok.summary.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Résumé</h2>
          {blok.summary.map((nestedBlok) => (
            <Blok key={nestedBlok._uid} blok={nestedBlok} />
          ))}
        </section>
      )}

      {blok.content && blok.content.length > 0 && (
        <section className="prose max-w-none mb-8">
          {blok.content.map((nestedBlok) => (
            <Blok key={nestedBlok._uid} blok={nestedBlok} />
          ))}
        </section>
      )}

      {blok.author?.content && (
        <section className="my-12">
          <Blok blok={blok.author.content} />
        </section>
      )}
    </BlogUI>
  );
};

export default Blog;