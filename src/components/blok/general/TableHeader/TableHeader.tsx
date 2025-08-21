 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import { render } from 'storyblok-rich-text-react-renderer';
import cn from 'classnames';

interface TableHeaderBlok {
	component: string;
	_uid: string;
	colSpan?: string | number;
	text?: any; // Can be rich text object or string
	text_align?: string;
	color?: string;
	size?: string;
	[key: string]: any;
}

interface TableHeaderProps {
	blok: TableHeaderBlok;
	className?: string;
	alignment?: string;
	verticalAlignment?: "top" | "middle" | "bottom"; // Changed from string to specific union type
}

const TableHeader: React.FC<TableHeaderProps> = ({ 
	blok, 
	className = '', 
	alignment = '', 
	verticalAlignment = 'middle' // Changed default from empty string to valid value
}) => {
	const headerClasses = cn(
		className,
		{
			'text-left': blok.text_align === 'left' || alignment === 'left',
			'text-center': blok.text_align === 'center' || alignment === 'center',
			'text-right': blok.text_align === 'right' || alignment === 'right',
		},
		{
			'text-[rgb(var(--color-primary-500))]': blok.color === 'primary-500',
			'text-[rgb(var(--color-gray-200))]': blok.color === 'gray-200',
			'text-[rgb(var(--color-gray-500))]': blok.color === 'gray-500',
			'text-[rgb(var(--color-gray-600))]': blok.color === 'gray-600',
			'text-[rgb(var(--color-gray-800))]': blok.color === 'gray-800',
			'text-[rgb(var(--color-white))]': blok.color === 'white',
		},
		{
			'text-xs': blok.size === 'x-small',
			'text-sm': blok.size === 'small',
			'text-base': blok.size === 'medium',
			'text-lg': blok.size === 'large',
			'text-xl': blok.size === 'x-large',
		},
		{
			'align-top': verticalAlignment === 'top',
			'align-middle': verticalAlignment === 'middle',
			'align-bottom': verticalAlignment === 'bottom',
		},
		'w-full'
	);

	const colSpanValue = blok.colSpan ? parseInt(blok.colSpan.toString(), 10) : undefined;

	return (
		<th
			{...(colSpanValue ? { colSpan: colSpanValue } : {})}
			className={headerClasses}
			{...storyblokEditable(blok)}
		>
			{blok.text && typeof blok.text === 'object'
				? render(blok.text)
				: blok.text}
		</th>
	);
};

export default TableHeader;