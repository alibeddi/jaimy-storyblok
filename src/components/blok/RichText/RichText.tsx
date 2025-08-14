 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import RichTextUI from '../../ui/RichText'; // Fixed case sensitivity - changed from '../ui/richText' to '../ui/RichText'
import { TextColor, TextAlign, SpacingVariant, SizeVariant } from '@/types/ui';

interface RichTextBlok {
	component: string;
	_uid: string;
	text?: any; // Storyblok rich text content
	content?: any; // Alternative content field
	size?: SizeVariant;
	color?: TextColor;
	text_align?: TextAlign;
	margin_bottom?: SpacingVariant;
	[key: string]: any;
}

interface RichTextProps {
	className?: string;
	blok: RichTextBlok;
}

const RichText: React.FC<RichTextProps> = ({ className, blok }) => {
	const content = blok.text || blok.content;

	return (
		<RichTextUI
			className={className}
			content={content}
			size={blok.size}
			color={blok.color}
			textAlign={blok.text_align}
			marginBottom={blok.margin_bottom}
			{...storyblokEditable(blok)}
		/>
	);
};

export default RichText;