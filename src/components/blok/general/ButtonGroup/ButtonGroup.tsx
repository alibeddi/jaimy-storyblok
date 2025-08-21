 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ButtonGroupUI from '../../../ui/ButtonGroup';
import { storyblokEditable } from '@storyblok/react';
import Blok from '../../../index';

interface ChildBlok {
	component: string;
	_uid: string;
	[key: string]: any;
}

interface ButtonGroupBlok {
	component: string;
	align?: "default" | "left" | "center" | "right";
	orientation?: "default" | "horizontal" | "vertical";
	children?: ChildBlok[];
	[key: string]: any;
}

interface ButtonGroupProps {
	blok: ButtonGroupBlok;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ blok }) => {
	return (
		<div {...storyblokEditable(blok)}>
			<ButtonGroupUI align={blok.align} orientation={blok.orientation}>
				{blok.children?.map((child) => {
					return <Blok blok={child} key={child._uid} />;
				})}
			</ButtonGroupUI>
		</div>
	);
};

export default ButtonGroup;