import React, { type JSX } from 'react';
import { ALL_WORDS, DEFAULT_LISTS } from '../Lists/words';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Box, Chip, Container, Table as MuiTable, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useWordBuckets } from '../Lists/statsStorage';
import { useAddWordToCurrentList } from '../Lists/activeLlistProvider';
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

import WordProgress from '../Lists/WordProgress';

const LEVELS = DEFAULT_LISTS.map(l => l.label);
const LEVEL_IDS = DEFAULT_LISTS.reduce((acc, list) => {
	acc[list.label] = list.items;
	return acc;
}, {} as Record<string, string[]>);

export function Vocabulary(): JSX.Element {
	const [selectedLevels, setSelectedLevels] = React.useState<string[]>([]);

	const filteredData = React.useMemo(() => {
		if (selectedLevels.length === 0) return ALL_WORDS;
		const allowed = new Set<string>(selectedLevels.flatMap(lvl => LEVEL_IDS[lvl] || []));
		return ALL_WORDS.filter(v => allowed.has(v.id));
	}, [selectedLevels]);

	const { getWordBucket } = useWordBuckets();

	const progressCol: ColumnDef<VerbInfo> = React.useMemo(() => ({
		id: 'progress',
		header: 'Status',
		accessorFn: (row) => row.id,
		cell: (ctx) => {
			const id = ctx.getValue() as string;
			
			return <WordProgress wordId={id} />;
		}
	}), [getWordBucket]);

	const columnsWithProgress = React.useMemo(() => [...columns, progressCol], [progressCol]);
	const addToCurrentList = useAddWordToCurrentList();

	const table = useReactTable<VerbInfo>({
		data: filteredData,
		columns: columnsWithProgress,
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

			<TableContainer component={Paper}>
				<MuiTable size="small">
					<TableHead>
					{table.getHeaderGroups().map((hg: HeaderGroup<VerbInfo>) => (
						<TableRow key={hg.id}>
							{hg.headers.map(h => (
								<TableCell key={h.id} sx={{ borderBottom: '1px solid #ccc' }}>
									{flexRender(h.column.columnDef.header, h.getContext())}
								</TableCell>
							))}
							<TableCell sx={{ borderBottom: '1px solid #ccc' }}>Acties</TableCell>
						</TableRow>
					))}
					</TableHead>
					<TableBody>
					{table.getRowModel().rows.map((row: Row<VerbInfo>) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell: Cell<VerbInfo, unknown>) => (
								<TableCell key={cell.id} sx={{ borderBottom: '1px solid #eee' }}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
							<TableCell sx={{ borderBottom: '1px solid #eee' }}>
								<Tooltip title="Add to active list">
									<span>
										<IconButton 
											size="small" 
											onClick={() => addToCurrentList((row.original as VerbInfo).id)}
										>
											<AddIcon fontSize="small" />
										</IconButton>
									</span>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
					</TableBody>
				</MuiTable>
			</TableContainer>
		</Container>
	);
}
