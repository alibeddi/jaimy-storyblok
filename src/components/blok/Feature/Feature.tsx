	/* eslint-disable @typescript-eslint/no-explicit-any */
	import React from 'react';
import { storyblokEditable } from '@storyblok/react';

interface FeatureBlok {
	component: string;
	name?: string;
	[key: string]: any;
}

interface FeatureProps {
	blok: FeatureBlok;
}

const Feature: React.FC<FeatureProps> = ({ blok }) => (
	<div className="column feature" {...storyblokEditable(blok)}>
		{blok.name}
	</div>
);

export default Feature;