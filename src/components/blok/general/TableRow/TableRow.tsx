 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import TableRowUI from '../../../ui/Table/TableRow';
import TableColumn from '.././TableColumn';
import TableHeader from '.././TableHeader';

function split(param?: string): string[] {
	return param ? param.split(',') : [];
}

interface TableRowBlok {
	component: string;
	_uid: string;
	[key: string]: any;
}

interface TableRowProps {
	blok: TableRowBlok[]; // Changed from any[] to TableRowBlok[]
	className?: string;
	type?: 'header' | 'column';
	columnWidths?: string;
	alignment?: string;
	verticalAlignment?: string;
	spacer?: string;
}

// Helper function to ensure valid vertical alignment
function getValidVerticalAlignment(value?: string): "top" | "middle" | "bottom" {
	if (value === 'top' || value === 'bottom') return value;
	return 'middle'; // default
}

const TableRow: React.FC<TableRowProps> = ({
	blok,
	className = '',
	type = 'column',
	columnWidths = '',
	alignment = '',
	verticalAlignment = '',
	spacer = '',
}) => {
	const Component = type === 'header' ? TableHeader : TableColumn;

	const widths = split(columnWidths);
	const aligns = split(alignment);
	const verticals = split(verticalAlignment);

	const items = Array.isArray(blok) ? blok : [];

	if (type === 'header' && items.length === 1) {
		const totalColumns = widths.length || 2;

		return (
			<TableRowUI className={className} {...storyblokEditable(items[0])}>
				<Component
					key={items[0]._uid}
					blok={{ ...items[0], colSpan: String(totalColumns) }}
					width="100%"
					alignment={aligns[0] || 'left'}
					verticalAlignment={getValidVerticalAlignment(verticals[0] || 'middle')}
					spacer={spacer}
				/>
			</TableRowUI>
		);
	}

	return (
		<TableRowUI className={className}>
			{items.map((col, index) => (
				<Component
					key={col._uid}
					blok={col}
					width={widths[index]}
					alignment={aligns[index]}
					verticalAlignment={getValidVerticalAlignment(verticals[index])}
					spacer={spacer}
					{...storyblokEditable(col)}
				/>
			))}
		</TableRowUI>
	);
};

export default TableRow;