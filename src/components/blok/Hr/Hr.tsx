 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import HrUI from '../../ui/Hr';
import cn from 'classnames';
import { SpacingVariant } from '@/types/ui';

interface HrBlok {
	component: string;
	_uid: string;
	variant?: "default" | "dotted" | "dashed" | "thick";
	hr_color?: string;
	margin_bottom?: SpacingVariant;
	[key: string]: any;
}

interface HrProps {
	blok: HrBlok;
}

const Hr: React.FC<HrProps> = ({ blok }) => {
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

	return (
		<HrUI
			className={className}
			color={blok.hr_color}
			variant={blok.variant}
			margin={blok.margin_bottom}
			{...storyblokEditable(blok)}
		/>
	);
};

export default Hr;