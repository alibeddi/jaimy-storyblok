 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';

interface TeaserBlok {
	component: string;
	_uid: string;
	headline?: string;
	[key: string]: any;
}

interface TeaserProps {
	blok: TeaserBlok;
}

const Teaser: React.FC<TeaserProps> = ({ blok }) => {
	return (
		<section className="py-12 text-center" {...storyblokEditable(blok)}>
			<h2 className="text-3xl font-bold">{blok.headline}</h2>
		</section>
	);
};

export default Teaser;