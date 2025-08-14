 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import RowUI from '../../ui/Row'; // Fixed case sensitivity
import Blok from '../../index';
import { SpacingVariant, TextAlign } from '@/types/ui';

interface RowBlok {
	component: string;
	_uid: string;
	children?: any[];
	spacing?: SpacingVariant;
	narrow?: boolean;
	appearance?: string;
	background_color?: string;
	background_image?: {
		filename: string;
		alt?: string;
	};
	background_size?: string;
	background_position?: string;
	background_attachment?: string;
	background_repeat?: string;
	background_opacity?: string;
	text_align?: TextAlign;
	padding_y?: SpacingVariant;
	[key: string]: any;
}

interface RowProps {
	blok: RowBlok;
}

const Row: React.FC<RowProps> = ({ blok }) => {
	const childrenWithProps = blok.children?.map((child) => (
		<Blok key={child._uid} blok={child} />
	));

	return (
		<div {...storyblokEditable(blok)}>
			<RowUI
				spacing={blok.spacing}
				narrow={blok.narrow}
				appearance={blok.appearance}
				backgroundColor={blok.background_color}
				backgroundImage={blok.background_image}
				backgroundSize={blok.background_size}
				backgroundPosition={blok.background_position}
				backgroundAttachment={blok.background_attachment}
				backgroundRepeat={blok.background_repeat}
				backgroundOpacity={blok.background_opacity}
				textAlign={blok.text_align}
				paddingY={blok.padding_y}
			>
				{childrenWithProps}
			</RowUI>
		</div>
	);
};

export default Row;