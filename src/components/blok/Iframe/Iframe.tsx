/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import cn from 'classnames';
import { SpacingVariant } from '@/types/ui';

interface IframeBlok {
	component: string;
	_uid: string;
	formId?: string;
	locale?: string;
	width?: string;
	height?: string;
	sandbox?: string;
	margin_bottom?: SpacingVariant;
	[key: string]: any;
}

interface IframeProps {
	blok: IframeBlok;
}

const Iframe: React.FC<IframeProps> = ({ blok }) => {
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
		'w-full flex justify-center': true,
	});

	// Use form_id instead of formId to match Storyblok data structure
	const formId = blok.formId || '';
	const width = blok.width || '100%';
	const height = blok.height || '600px'; // Increased default height for better form visibility
	const locale = blok.locale || 'fr';
	const sandbox =
		blok.sandbox || 'allow-same-origin allow-scripts allow-popups allow-forms';

	// Don't render if no form ID is provided
	if (!formId) {
		return (
			<div {...storyblokEditable(blok)} className={className}>
				<div className="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded">
					No form ID provided
				</div>
			</div>
		);
	}

	return (
		<div {...storyblokEditable(blok)} className={className}>
			<iframe
				id="formsIframe"
				src={`https://forms.fixxer.eu/${locale}/${formId}`}
				width={width}
				height={height}
				sandbox={sandbox}
				className="rounded border w-full min-h-[400px] max-w-full"
				title="Embedded form"
				style={{
					width: width,
					height: height,
					minHeight: '400px', // Ensure minimum height for form visibility
					maxWidth: '100%', // Prevent overflow
					border: 'none', // Clean appearance
				}}
				loading="lazy" // Improve performance
			></iframe>
		</div>
	);
};

export default Iframe;