 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import ReviewStarsUI from '../../../ui/ReviewStars'; // Fixed case sensitivity
import cn from 'classnames';
import { SpacingVariant } from '@/types/ui';

interface ReviewStarsBlok {
	component: string;
	_uid: string;
	rating: string | number;
	margin_bottom?: SpacingVariant;
	[key: string]: any;
}

interface ReviewStarsProps {
	blok: ReviewStarsBlok;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ blok }) => {
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
		<ReviewStarsUI
			className={className}
			rating={parseInt(String(blok.rating), 10)}
			{...storyblokEditable(blok)}
		/>
	);
};

export default ReviewStars;