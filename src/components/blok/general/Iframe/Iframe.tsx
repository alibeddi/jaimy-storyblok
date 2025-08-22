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
	console.log(blok ,'iframe')
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
		'w-full flex justify-center items-center': true,
	});
	
	const formId = blok.formId || '';
	const width = blok.width || '100%';
	const height = blok.height || '400';
	const locale = blok.locale || 'fr';
	const sandbox =
		blok.sandbox || 'allow-same-origin allow-scripts allow-popups allow-forms';

	return (
		<div {...storyblokEditable(blok)} className={className}>
			<iframe
  id="formsIframe"
  src={`https://forms.fixxer.eu/${locale}/${formId}`}
  width={width}
  height={height}
  sandbox={sandbox}
  className="rounded border-0 overflow-hidden"
  style={{ overflow: "hidden" }}
  scrolling="no"
  title="Embedded form"
/>
		</div>
	);
};

export default Iframe;