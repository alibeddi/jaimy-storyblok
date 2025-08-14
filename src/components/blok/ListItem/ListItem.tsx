 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import ListItemUI from '../../ui/ListItem'; // Fixed case sensitivity
import { IconColor, IconType, IconSize, SpacingVariant } from '@/types/ui';

interface ListItemBlok {
	component: string;
	_uid: string;
	text: string;
	icon_color?: string;
	icon_variant?: string;
	icon_type?: string;
	[key: string]: any;
}

interface ListContext {
	icon_color?: string;
	icon_position?: string;
	icon_spacing?: string;
	icon_size?: string;
}

interface ListItemProps {
	blok: ListItemBlok;
	list?: ListContext;
}

const ListItem: React.FC<ListItemProps> = ({ blok, list }) => {
	return (
		<ListItemUI
			text={blok.text}
			iconColor={
				blok.icon_color === 'default' ? list?.icon_color : blok.icon_color
			}
			iconVariant={blok.icon_variant}
			iconType={blok.icon_type}
			iconPosition={list?.icon_position || 'left'}
			iconSpacing={list?.icon_spacing || 'xs'}
			iconSize={list?.icon_size || 'sm'}
			{...storyblokEditable(blok)}
		/>
	);
};

export default ListItem;