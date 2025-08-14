 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import ListUI from '../../ui/List'; // Fixed case sensitivity - changed from '../ui/list' to '../ui/List'
import cn from 'classnames';
import { SpacingVariant, TextColor, FontWeight } from '@/types/ui';

interface ChildBlok {
	component: string;
	_uid: string;
	[key: string]: any;
}

interface ListBlok {
	component: string;
	_uid: string;
	children?: ChildBlok[];
	color?: TextColor;
	weight?: FontWeight;
	icon_color?: string;
	icon_position?: string;
	icon_spacing?: string;
	icon_size?: string;
	margin_bottom?: SpacingVariant;
	[key: string]: any;
}

interface ListProps {
	blok: ListBlok;
}

const List: React.FC<ListProps> = ({ blok }) => {
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
		[marginBottomClasses[blok.margin_bottom || 'default']]: blok.margin_bottom,
	});

	return (
		<ListUI
			className={className}
			color={blok.color}
			weight={blok.weight}
			{...storyblokEditable(blok)}
		>
			{blok.children?.map((child) => (
				<StoryblokComponent
					key={child._uid}
					blok={child}
					list={{
						icon_color: blok.icon_color,
						icon_position: blok.icon_position,
						icon_spacing: blok.icon_spacing,
						icon_size: blok.icon_size,
					}}
				/>
			))}
		</ListUI>
	);
};

export default List;