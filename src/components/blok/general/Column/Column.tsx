	
	 /* eslint-disable @typescript-eslint/no-explicit-any */
	 import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import ColumnUI from '../../../ui/Column';
import Blok from '../../../index';
import { TextAlign, SpacingVariant } from '@/types/ui';

interface ChildBlok {
	component: string;
	_uid: string;
	[key: string]: any;
}

interface LinkBlok {
	url?: string;
	cached_url?: string;
}

interface BackgroundImageBlok {
	filename: string;
	alt?: string;
}

interface ColumnBlok {
	component: string;
	children: ChildBlok[];
	flex_direction?: string;
	text_align?: TextAlign;
	justify_content?: string;
	align_content?: string;
	padding_x?: SpacingVariant;
	padding_top?: SpacingVariant;
	padding_bottom?: SpacingVariant;
	background_color?: string;
	background_image?: BackgroundImageBlok;
	background_size?: string;
	background_position?: string;
	background_repeat?: string;
	background_attachment?: string;
	link?: LinkBlok;
	target?: string;
	effect?: string;
	quote?: boolean;
	quote_color?: string;
	columns?: number;
	touch_slide?: boolean;
	border?: string;
	border_color?: string;
	group_columns_mobile?: string;
	group_columns_tablet?: string;
	group_columns_desktop?: string;
	disable_gutters?: boolean;
	[key: string]: any;
}

interface ColumnProps {
	blok: ColumnBlok;
}

const Column: React.FC<ColumnProps> = ({ blok }) => {
	const childrenWithProps = blok.children?.map((child) => {
		const newChild = {
			...child,
			disable_gutters: true,
			columns: blok.columns,
			columns_slide: blok.touch_slide,
		};

		return <Blok key={child._uid} blok={newChild} />;
	});

	return (
		<ColumnUI
			{...storyblokEditable(blok)}
			flexDirection={blok.flex_direction}
			textAlign={blok.text_align}
			justifyContent={blok.justify_content}
			alignContent={blok.align_content}
			paddingX={blok.padding_x}
			paddingTop={blok.padding_top}
			paddingBottom={blok.padding_bottom}
			backgroundColor={blok.background_color}
			backgroundImage={blok.background_image}
			backgroundSize={blok.background_size}
			backgroundPosition={blok.background_position}
			backgroundRepeat={blok.background_repeat}
			backgroundAttachment={blok.background_attachment}
			link={blok.link}
			target={blok.target}
			effect={blok.effect}
			quote={blok.quote}
			quoteColor={blok.quote_color}
			border={blok.border}
			borderColor={blok.border_color}
			group_columns_mobile={blok.group_columns_mobile}
			group_columns_tablet={blok.group_columns_tablet}
			group_columns_desktop={blok.group_columns_desktop}
			disable_gutters={blok.disable_gutters}
		>
			{childrenWithProps}
		</ColumnUI>
	);
};

export default Column;