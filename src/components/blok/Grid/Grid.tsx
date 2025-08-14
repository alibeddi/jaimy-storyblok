	/* eslint-disable @typescript-eslint/no-explicit-any */
	import React from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';

interface NestedBlok {
	component: string;
	_uid: string;
	[key: string]: any;
}

interface GridBlok {
	component: string;
	columns: NestedBlok[];
	[key: string]: any;
}

interface GridProps {
	blok: GridBlok;
}

const Grid: React.FC<GridProps> = ({ blok }) => {
	return (
		<div className="grid grid-cols-3" {...storyblokEditable(blok)}>
			{blok.columns.map((nestedBlok) => (
				<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
			))}
		</div>
	);
};

export default Grid;