	/* eslint-disable @typescript-eslint/no-explicit-any */
	import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import ContainerUI from '../../ui/Container';
import Blok from '../../index';
import { IconColor, IconType, IconSize, SpacingVariant, TextAlign } from '@/types/ui';

interface ChildBlok {
	component: string;
	_uid: string;
	[key: string]: any;
}

interface BackgroundImageBlok {
	filename: string;
	alt?: string;
}

interface ContainerBlok {
	component: string;
	children?: ChildBlok[];
	icon_variant?: string;
	icon_type?: IconType;
	icon_color?: IconColor;
	icon_size?: IconSize;
	icon_spacing?: SpacingVariant;
	background_color?: string;
	background_image?: BackgroundImageBlok;
	background_size?: string;
	background_position?: string;
	background_attachment?: string;
	background_repeat?: string;
	background_opacity?: string | number;
	grow?: boolean; // Changed from string to boolean
	justify_content?: string;
	align_content?: string;
	text_align?: TextAlign;
	padding_x?: SpacingVariant;
	padding_top?: SpacingVariant;
	padding_bottom?: SpacingVariant;
	preset?: string;
	[key: string]: any;
}

interface ContainerProps {
	blok: ContainerBlok;
}

const Container: React.FC<ContainerProps> = ({ blok }) => {
	const hasIcon = blok.icon_type && blok.icon_type !== 'default';

	return (
		<ContainerUI
			// Icon props
			hasIcon={hasIcon}
			iconVariant={blok.icon_variant}
			iconType={blok.icon_type}
			iconColor={blok.icon_color}
			iconSize={blok.icon_size}
			iconSpacing={blok.icon_spacing}
			// Background props
			backgroundColor={blok.background_color}
			backgroundImage={blok.background_image}
			backgroundSize={blok.background_size}
			backgroundPosition={blok.background_position}
			backgroundAttachment={blok.background_attachment}
			backgroundRepeat={blok.background_repeat}
			backgroundOpacity={blok.background_opacity}
			// Advanced props
			grow={blok.grow} // Now directly pass the boolean value
			justifyContent={blok.justify_content}
			alignContent={blok.align_content}
			textAlign={blok.text_align}
			paddingX={blok.padding_x}
			paddingTop={blok.padding_top}
			paddingBottom={blok.padding_bottom}
			// preset={blok.preset}
			{...storyblokEditable(blok)}
		>
			{blok.children?.map((child) => (
				<Blok key={child._uid} blok={child} />
			))}
		</ContainerUI>
	);
};

export default Container;