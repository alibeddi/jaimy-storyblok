 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import { cn } from '@/lib/utils'; // Add this import
import TableColumnUI from '../../../ui/Table/TableColumn';

interface TableColumnBlok {
	component: string;
	_uid: string;
	colSpan?: string | number;
	rowSpan?: string | number;
	body?: any[]; // Add this property
	className?: string; // Add this property
	[key: string]: any;
}

interface TableColumnProps {
	blok: TableColumnBlok;
	width?: string;
	align?: "left" | "center" | "right"; // Changed from string to specific union type
	verticalAlignment?: "top" | "middle" | "bottom";
	spacer?: string;
}

const TableColumn: React.FC<TableColumnProps> = ({ 
	blok, 
	width = '', 
	align = 'left',
	verticalAlignment = 'middle',
	spacer = '' 
}) => {
	const colSpanValue = blok.colSpan ? parseInt(blok.colSpan.toString(), 10) : undefined;
	const rowSpanValue = blok.rowSpan ? parseInt(blok.rowSpan.toString(), 10) : undefined;

	return (
		<TableColumnUI
			{...(colSpanValue ? { colSpan: colSpanValue } : {})}
			{...(rowSpanValue ? { rowSpan: rowSpanValue } : {})}
			width={width}
			align={align}
			verticalAlignment={verticalAlignment}
			className={cn(
				'table-column',
				blok.className
			)}
			{...blok}
		>
			{blok.body?.map((nestedBlok: any, index: number) => (
				<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid || index} />
			))}
		</TableColumnUI>
	);
};

export default TableColumn;