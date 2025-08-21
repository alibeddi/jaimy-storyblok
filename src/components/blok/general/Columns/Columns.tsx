	 /* eslint-disable @typescript-eslint/no-explicit-any */		
	import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import ColumnsUI from '../../../ui/Columns';
import Blok from '../../../index';

interface ChildBlok {
	component: string;
	_uid: string;
	[key: string]: any;
}

interface ColumnsBlok {
	component: string;
	children: ChildBlok[];
	columns_mobile?: string;
	columns_tablet?: string;
	columns_desktop?: string;
	reverse_mobile?: boolean;
	squeeze_mobile?: string;
	squeeze_tablet?: string;
	squeeze_desktop?: string;
	justify_content?: string;
	align_content?: string;
	touch_slide?: boolean;
	touch_slide_column_size?: string;
	connector_toggle?: boolean;
	connector_color?: string;
	margin_bottom?: string;
	[key: string]: any;
}

interface ColumnsProps {
	blok: ColumnsBlok;
}

const Columns: React.FC<ColumnsProps> = ({ blok }) => {
	const reversedChildren = blok.reverse_mobile
		? [...blok.children].reverse()
		: blok.children;

	const childrenWithProps = reversedChildren.map((child) => {
		const newChild = {
			...child,
			group_columns_mobile: blok.columns_mobile,
			group_columns_tablet: blok.columns_tablet,
			group_columns_desktop: blok.columns_desktop,
			touch_slide: blok.touch_slide,
			touch_slide_column_size: blok.touch_slide_column_size,
			disable_gutters: blok.connector_toggle,
			columns: blok.children.length,
			margin_bottom: blok.margin_bottom,
		};

		return <Blok key={child._uid} blok={newChild} />;
	});

	return (
		<ColumnsUI
			{...storyblokEditable(blok)}
			columnsMobile={blok.columns_mobile}
			columnsTablet={blok.columns_tablet}
			columnsDesktop={blok.columns_desktop}
			reverseMobile={blok.reverse_mobile}
			squeezeMobile={blok.squeeze_mobile}
			squeezeTablet={blok.squeeze_tablet}
			squeezeDesktop={blok.squeeze_desktop}
			justifyContent={blok.justify_content}
			alignContent={blok.align_content}
			touchSlide={blok.touch_slide}
			touchSlideColumnSize={blok.touch_slide_column_size}
			connectorToggle={blok.connector_toggle}
			connectorColor={blok.connector_color}
			marginBottom={blok.margin_bottom}
		>
			{childrenWithProps}
		</ColumnsUI>
	);
};

export default Columns;