 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import BlokImage from '../../../ui/BlokImage'; // Changed from '../ui/Image' to '../ui/BlokImage'
import cn from 'classnames';
import { SpacingVariant } from '@/types/ui';

interface ImageAsset {
	filename: string;
	alt?: string;
	width?: number;
	height?: number;
	focus?: string;
}

interface ImageBlok {
	component: string;
	_uid: string;
	img?: ImageAsset;
	aspect_ratio_desktop?: string;
	aspect_ratio_tablet?: string;
	aspect_ratio_mobile?: string;
	max_width?: string | number;
	margin_bottom?: SpacingVariant;
	preset?: string;
	[key: string]: any;
}

interface ImageProps {
	blok: ImageBlok;
}

const Image: React.FC<ImageProps> = ({ blok }) => {
	const marginBottomClasses: Record<SpacingVariant, string> = {
		none: 'mb-0',
		xs: 'mb-1',
		sm: 'mb-4',
		default: 'mb-6',
		md: 'mb-8',
		lg: 'mb-12',
		xl: 'mb-16',
	};

	const className = cn({
		[marginBottomClasses[blok.margin_bottom || 'default']]: true,
	});

	const imageConfig = {
		width: blok.img?.width,
		height: blok.img?.height,
		priority: false,
		layout: 'responsive',
	};

	return (
		<div className={className}>
			<BlokImage
				asset={blok.img}
				aspectDesktop={blok.aspect_ratio_desktop}
				aspectTablet={blok.aspect_ratio_tablet}
				aspectMobile={blok.aspect_ratio_mobile}
				maxWidth={blok.max_width}
				preset={blok.preset}
				{...imageConfig}
				{...storyblokEditable(blok)}
			/>
		</div>
	);
};

export default Image;