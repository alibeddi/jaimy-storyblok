 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import cn from 'classnames';

import TableUI from '../../ui/Table'; // Fixed case sensitivity
import TableHeadUI from '../../ui/Table/TableHead'; // Fixed case sensitivity
import TableBodyUI from '../../ui/Table/TableBody'; // Fixed case sensitivity
import TableRow from '.././TableRow';
import TableHeader from '.././TableHeader';
import TableRowUI from '../../ui/Table/TableRow'; // Fixed case sensitivity

interface TableBlok {
	component: string;
	_uid: string;
	table_head: any[];
	table_body: any[];
	column_widths?: string;
	column_alignment?: string;
	column_vertical_alignment?: string;
	header_background_color?: string;
	header_text_color?: string;
	column_background_color_a?: string;
	column_background_color_b?: string;
	column_text_color_a?: string;
	column_text_color_b?: string;
	header_spacer_horizontal?: string;
	header_spacer_vertical?: string;
	column_spacer_horizontal?: string;
	column_spacer_vertical?: string;
	responsiveTable?: boolean;
	[key: string]: any;
}

interface TableProps {
	blok: TableBlok;
}

const Table: React.FC<TableProps> = ({ blok }) => {
	const totalColumns =
		blok.table_body && blok.table_body.length > 0 && blok.table_body[0].content
			? blok.table_body[0].content.length
			: 2;

	const tableHeaderRowClasses = cn(
		'py-3 px-4 w-full',
		`bg-[rgb(var(--color-${blok.header_background_color}))]`,
		`text-[rgb(var(--color-${blok.header_text_color}))]`
	);

	const bodyRowA = cn(
		`bg-[rgb(var(--color-${blok.column_background_color_a}))]`,
		`text-[rgb(var(--color-${blok.column_text_color_a}))]`
	);

	const bodyRowB = cn(
		`bg-[rgb(var(--color-${blok.column_background_color_b}))]`,
		`text-[rgb(var(--color-${blok.column_text_color_b}))]`
	);

	const headerColSpacer = cn({
		'px-0': blok.header_spacer_horizontal === 'none',
		'px-1': blok.header_spacer_horizontal === 'x-small',
		'px-2': blok.header_spacer_horizontal === 'small',
		'px-4': blok.header_spacer_horizontal === 'medium',
		'px-6': blok.header_spacer_horizontal === 'large',
		'px-8': blok.header_spacer_horizontal === 'x-large',
		'py-0': blok.header_spacer_vertical === 'none',
		'py-1': blok.header_spacer_vertical === 'x-small',
		'py-2': blok.header_spacer_vertical === 'small',
		'py-4': blok.header_spacer_vertical === 'medium',
		'py-6': blok.header_spacer_vertical === 'large',
		'py-8': blok.header_spacer_vertical === 'x-large',
	});

	const bodyColSpacer = cn({
		'px-0': blok.column_spacer_horizontal === 'none',
		'px-1': blok.column_spacer_horizontal === 'x-small',
		'px-2': blok.column_spacer_horizontal === 'small',
		'px-4': blok.column_spacer_horizontal === 'medium',
		'px-6': blok.column_spacer_horizontal === 'large',
		'px-8': blok.column_spacer_horizontal === 'x-large',
		'py-0': blok.column_spacer_vertical === 'none',
		'py-1': blok.column_spacer_vertical === 'x-small',
		'py-2': blok.column_spacer_vertical === 'small',
		'py-4': blok.column_spacer_vertical === 'medium',
		'py-6': blok.column_spacer_vertical === 'large',
		'py-8': blok.column_spacer_vertical === 'x-large',
	});

	const hasHeaders = blok.table_head && blok.table_head.length > 0;

	return (
		<div {...storyblokEditable(blok)}>
			<TableUI
				responsive={blok.responsiveTable}
				className="w-full border-collapse"
			>
				{hasHeaders && (
					<TableHeadUI>
						<TableRowUI className={tableHeaderRowClasses}>
							{blok.table_head.map((header) => (
								<TableHeader
									key={header._uid}
									blok={header}
									className={headerColSpacer}
									alignment={header.text_align || 'center'}
									verticalAlignment="middle"
								/>
							))}
						</TableRowUI>
					</TableHeadUI>
				)}

				<TableBodyUI>
					{blok.table_body.map((row, index) => (
						<TableRow
							key={row._uid}
							className={index % 2 === 0 ? bodyRowA : bodyRowB}
							blok={row.content}
							columnWidths={blok.column_widths}
							alignment={blok.column_alignment}
							verticalAlignment={blok.column_vertical_alignment}
							spacer={bodyColSpacer}
						/>
					))}
				</TableBodyUI>
			</TableUI>
		</div>
	);
};

export default Table;