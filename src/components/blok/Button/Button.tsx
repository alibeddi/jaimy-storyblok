 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ButtonUI from '../../ui/Button';
import { 
	IconColor, 
	IconType, 
	IconSize, 
	IconPosition, 
	SpacingVariant, 
	ButtonType, 
	ButtonVariant, 
	ButtonTarget 
} from '@/types/ui';

interface LinkBlok {
	url?: string;
	cached_url?: string;
}

interface ButtonBlok {
	component: string;
	icon_variant?: string;
	icon_color?: IconColor;
	icon_type?: IconType;
	icon_position?: IconPosition;
	icon_size?: IconSize;
	icon_spacing?: SpacingVariant;
	title: string;
	type: ButtonType;
	variant: ButtonVariant;
	target?: ButtonTarget;
	link: LinkBlok;
	preset?: string;
	relation?: string[];
	disable_nofollow?: boolean;
	[key: string]: any;
}

interface ButtonProps {
	className?: string;
	blok: ButtonBlok;
}

const Button: React.FC<ButtonProps> = ({ className, blok }) => {
	const to = blok.link?.url || '#';
	return (
		<ButtonUI
			className={className}
			icon={blok.icon_variant}
			iconColor={blok.icon_color}
			iconType={blok.icon_type}
			iconPosition={blok.icon_position}
			iconSize={blok.icon_size}
			iconSpacing={blok.icon_spacing}
			type={blok.type}
			variant={blok.variant}
			to={to}
			target={blok.target}
			relation={blok.relation}
			disableNofollow={blok.disable_nofollow}
		>
			{blok.title}
		</ButtonUI>
	);
};

export default Button;