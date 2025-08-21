
 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import cn from 'classnames';
import Blok from '../../../index';
import Connected from '../../../ui/Hero';
import Icon from '../../../ui/Icon';
import BlokImage from '../../../ui/BlokImage';
import { BlokImageProps } from '@/types/ui';

interface ChildBlok {
	component: string;
	_uid: string;
	[key: string]: any;
}

interface ImageBlok {
	filename: string;
	alt?: string;
}

interface HeroBlok {
	component: string;
	hero_appearance?: string;
	hero_icon?: boolean;
	connector_toggle?: boolean;
	connector_color?: string;
	content?: ChildBlok[];
	img?: ImageBlok;
	img_mobile?: ImageBlok;
	usp_bar?: ChildBlok[];
	preset?: string;
	[key: string]: any;
}

interface HeroProps {
	className?: string;
	blok: HeroBlok;
}

const Hero: React.FC<HeroProps> = ({ className, blok }) => {
	const hasImage = blok.img?.filename;
	const hasConnector = blok.connector_toggle;
	const hasIcon = blok.hero_icon;

	const imageMobile = blok.img_mobile?.filename ? blok.img_mobile : blok.img;

	const imageConfig = hasIcon
		? { aspectDesktop: '1:1', aspectTablet: '1:1', aspectMobile: '1:1' }
		: { aspectDesktop: '8:3', aspectTablet: '8:3', aspectMobile: '16:9' };

	const sectionClass = cn(
		className,
		'relative w-full z-10',
		blok.hero_appearance === 'full-width' &&
			hasImage &&
			hasConnector &&
			'lg:bg-gray-800',
		blok.hero_appearance === 'full-width' &&
			hasImage &&
			!hasConnector &&
			'bg-gray-800',
		hasIcon && 'pt-4 pb-9'
	);

	const heroContainerClass = cn(
		'w-full',
		'lg:container',
		!hasImage && !hasConnector && 'px-4 mt-4 lg:mt-8',
		blok.hero_appearance === 'constraint' && hasImage && 'px-4 lg:mt-0',
		hasConnector && 'lg:translate-y-4'
	);

	const contentClass = cn(
		'w-full',
		'p-4',
		!hasConnector && 'bg-gray-800',
		hasImage && blok.hero_appearance === 'full-width' && 'lg:pl-0',
		blok.hero_appearance === 'constraint' && 'lg:px-8'
	);

	const imageClass = cn(
		hasIcon
			? 'w-16 h-16 lg:w-32 lg:h-32 absolute top-8 right-8 lg:top-16 lg:right-0 z-10'
			: '',
		hasConnector && 'shadow-xl'
	);

	return (
		<section className={sectionClass} {...storyblokEditable(blok)}>
			<div className={heroContainerClass}>
				<Connected
					imagePosition="right"
					largeColumnDesktop="right"
					largeColumnMobile="left"
					color={blok.connector_color}
					disabled={!hasConnector}
				>
					<div className={contentClass}>
						<div className="space-y-4">
							{blok.content?.map((child) => (
								<Blok key={child._uid} blok={child} />
							))}
						</div>
					</div>

					{hasImage && (
						<div className="relative flex-grow p-4">
							{hasIcon && (
								<Icon
									className={imageClass}
									variant="primary"
									type="solid"
									size="default"
								/>
							)}
							<BlokImage
								asset={blok.img}
								className="hidden md:block mx-auto max-w-[35rem]"
								aspectDesktop={imageConfig.aspectDesktop}
								aspectTablet={imageConfig.aspectTablet}
								aspectMobile={imageConfig.aspectMobile}
								preset={blok.preset}
							/>
							<BlokImage
								asset={imageMobile}
								className="block md:hidden mx-auto max-w-[12rem]"
								aspectDesktop={imageConfig.aspectDesktop}
								aspectTablet={imageConfig.aspectTablet}
								aspectMobile={imageConfig.aspectMobile}
								preset={blok.preset}
							/>
						</div>
					)}
				</Connected>
			</div>
		</section>
	);
};

export default Hero;