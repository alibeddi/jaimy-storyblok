 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
// import sourcesConfig from '../../config/sources';
import HeadingUI from '../../../ui/Heading';
import { HeadingTag, HeadingType, SizeVariant, TextColor, TextAlign, SpacingVariant } from '@/types/ui';

interface HeadingBlok {
	component: string;
	title: string | { content: string };
	size: SizeVariant;
	tag?: HeadingTag;
	type?: HeadingType;
	id?: string;
	color?: TextColor;
	text_align?: TextAlign;
	margin_bottom?: SpacingVariant;
	[key: string]: any;
}

interface HeadingProps {
	className?: string;
	blok: HeadingBlok;
}

const Heading: React.FC<HeadingProps> = ({ className, blok }) => {
	const titleContent =
		typeof blok.title === 'string' ? blok.title : blok.title?.content || '';

	return (
		<HeadingUI
			title={titleContent}
			id={blok.id}
			className={className}
			tag={blok.tag}
			type={blok.type}
			size={blok.size}
			color={blok.color}
			textAlign={blok.text_align}
			marginBottom={blok.margin_bottom}
			{...storyblokEditable(blok)}
		>
			{titleContent}
		</HeadingUI>
	);
};

export default Heading;