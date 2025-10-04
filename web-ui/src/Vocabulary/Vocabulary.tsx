import React, { type JSX } from 'react';
import { useAtom } from 'jotai';
import { myListsPersistence } from '../Lists/manageLists';
import { ALL_WORDS, DEFAULT_LISTS } from '../Lists/words';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Box, Chip, Container } from '@mui/material';
import type { VerbInfo } from '../Lists/types';
import type { ColumnDef, HeaderGroup, Row, Cell } from '@tanstack/react-table';

const columns: ColumnDef<VerbInfo>[] = [
	{
		accessorKey: 'infinitive',
		header: 'Infinitief',
		cell: info => String(info.getValue()),
	},
	{
		accessorKey: 'imperfectum',
		header: 'Imperfectum',
		cell: info => Array.isArray(info.getValue()) ? (info.getValue() as string[]).join(' / ') : '',
	},
	{
		accessorKey: 'perfectum',
		header: 'Perfectum',
		cell: info => Array.isArray(info.getValue()) ? (info.getValue() as string[]).join(', ') : '',
	},
	{
		accessorKey: 'hulpWerkwoorden',
		header: 'Hulpwerkwoorden',
		cell: info => Array.isArray(info.getValue()) ? (info.getValue() as string[]).join('/') : '',
	},
	{
		accessorKey: 'vertaling',
		header: 'Vertaling',
		cell: info => String(info.getValue()),
	},
];

const LEVELS = DEFAULT_LISTS.map(l => l.label);
const LEVEL_IDS = DEFAULT_LISTS.reduce((acc, list) => {
	acc[list.label] = list.items;
	return acc;
}, {} as Record<string, string[]>);

export function Vocabulary(): JSX.Element {
	// keep reading lists to trigger updates when user changes their lists (not used directly now)
	const [/* lists */] = useAtom(myListsPersistence);
	const [selectedLevels, setSelectedLevels] = React.useState<string[]>([]);

	const filteredData = React.useMemo(() => {
		if (selectedLevels.length === 0) return ALL_WORDS;
		const allowed = new Set<string>(selectedLevels.flatMap(lvl => LEVEL_IDS[lvl] || []));
		return ALL_WORDS.filter(v => allowed.has(v.id));
	}, [selectedLevels]);

	const table = useReactTable<VerbInfo>({
		data: filteredData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const handleChipClick = (lvl: string) => {
		setSelectedLevels(prev => prev.includes(lvl) ? prev.filter(x => x !== lvl) : [...prev, lvl]);
	};

	return (
		<Container maxWidth="lg">
			<h2>Vocabulary</h2>

			<Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
				{LEVELS.map(lvl => (
					<Chip
						key={lvl}
						label={lvl}
						clickable
						color={selectedLevels.includes(lvl) ? 'primary' : 'default'}
						variant={selectedLevels.includes(lvl) ? 'filled' : 'outlined'}
						onClick={() => handleChipClick(lvl)}
					/>
				))}
			</Box>

			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					{table.getHeaderGroups().map((hg: HeaderGroup<VerbInfo>) => (
						<tr key={hg.id}>
							{hg.headers.map(h => (
								<th key={h.id} style={{ borderBottom: '1px solid #ccc', padding: 8 }}>
									{flexRender(h.column.columnDef.header, h.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row: Row<VerbInfo>) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell: Cell<VerbInfo, unknown>) => (
								<td key={cell.id} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
}
