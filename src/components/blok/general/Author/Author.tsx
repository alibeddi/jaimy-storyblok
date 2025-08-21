import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import cn from 'classnames';
import Image from 'next/image';
import { SbBlokData } from '@storyblok/react';

interface AuthorBlok extends SbBlokData {
  name?: string;
  occupation?: string;
  description?: string;
  avatar?: {
    filename?: string;
    alt?: string;
  };
}

interface AuthorProps {
  blok: AuthorBlok;
}

const Author: React.FC<AuthorProps> = ({ blok }) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-gray-100 rounded-lg shadow-sm'
      )}
      {...storyblokEditable(blok)}
    >
      {/* Avatar */}
      {blok.avatar?.filename && (
        <Image
          src={blok.avatar.filename}
          alt={blok.avatar.alt || blok.name || "Author avatar"}
          width={112}
          height={112}
          className="w-28 h-28 rounded-lg object-cover"
        />
      )}

      {/* Infos */}
      <div className="text-gray-800 max-w-3xl">
        <h3 className="text-xl font-bold mb-1 uppercase tracking-wide">
          {blok.name}
        </h3>

        {blok.occupation && (
          <p className="text-sm text-gray-500 mb-2">{blok.occupation}</p>
        )}

        {blok.description && (
          <p className="text-sm leading-relaxed">{blok.description}</p>
        )}
      </div>
    </div>
  );
};

export default Author;