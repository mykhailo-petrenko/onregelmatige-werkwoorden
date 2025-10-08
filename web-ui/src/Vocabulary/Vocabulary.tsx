import React, { useCallback, type JSX } from 'react';
import { ALL_WORDS, DEFAULT_LISTS } from '../Lists/words';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Box, Chip, Container, Table as MuiTable, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, TextField } from '@mui/material';
import { useWordBuckets } from '../Lists/statsStorage';
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
	{
		id: 'progress',
		header: 'Status',
		accessorFn: (row) => row.id,
		cell: (ctx) => {
			const id = ctx.getValue() as string;
			
			return <WordProgress wordId={id} />;
		}
	},
	{
		id: 'actions',
		header: 'Acties',
		cell: (ctx) => {
			const id = ctx.row.original.id;

			return (
				<AddToList wordId={id} />
			);
		}
	},
];

import WordProgress from '../Lists/WordProgress';
import { AddToList } from '../Lists/AddToList';
import { SearchField } from '../Lists/SearchField';

const LEVELS = DEFAULT_LISTS.map(l => l.label);
const LEVEL_IDS = DEFAULT_LISTS.reduce((acc, list) => {
	acc[list.label] = list.items;
	return acc;
}, {} as Record<string, string[]>);

export function Vocabulary(): JSX.Element {
	const [selectedLevels, setSelectedLevels] = React.useState<string[]>([]);

	const [searchQuery, setSearchQuery] = React.useState('');
	// default sort: show vocabulary sorted by infinitive (infinitief)
	const [sortBy, setSortBy] = React.useState<string | null>('infinitive');
	const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');

	const { getWordBucket } = useWordBuckets();

	// Async filtered data state (computed in idle time when possible)
	const [filteredData, setFilteredData] = React.useState<VerbInfo[]>(ALL_WORDS);

	React.useEffect(() => {

		const doWork = () => {
			let base = ALL_WORDS;

			if (selectedLevels.length !== 0) {
				const allowed = new Set<string>(selectedLevels.flatMap(lvl => LEVEL_IDS[lvl] || []));
				base = base.filter(v => allowed.has(v.id));
			}

			const q = searchQuery.trim().toLowerCase();
			if (q) {
				base = base.filter(v => {
					const parts: string[] = [];
					parts.push(v.infinitive || '');
					if (Array.isArray(v.imperfectum)) parts.push((v.imperfectum as string[]).join(' '));
					if (Array.isArray(v.perfectum)) parts.push((v.perfectum as string[]).join(' '));
					if (Array.isArray(v.hulpWerkwoorden)) parts.push((v.hulpWerkwoorden as string[]).join(' '));
					parts.push(v.vertaling || '');
					const hay = parts.join(' ').toLowerCase();
					return hay.includes(q);
				});
			}

			if (sortBy) {
				base = [...base].sort((a, b) => {
					if (sortBy === 'infinitive') {
						return sortDir === 'asc'
							? a.infinitive.localeCompare(b.infinitive)
							: b.infinitive.localeCompare(a.infinitive);
					}
					if (sortBy === 'progress') {
						const A = getWordBucket(a.id);
						const B = getWordBucket(b.id);
						return sortDir === 'asc' ? A - B : B - A;
					}
					return 0;
				});
			}

			setFilteredData(base);
		};

		// prefer requestIdleCallback when available so filtering runs off the main update path
		if (typeof (window as any).requestIdleCallback === 'function') {
			const handle = (window as any).requestIdleCallback(doWork);
			return () => (window as any).cancelIdleCallback(handle);
		} else {
			const t = setTimeout(doWork, 0);
			return () => clearTimeout(t);
		}
	}, [selectedLevels, searchQuery, sortBy, sortDir, getWordBucket]);

	const table = useReactTable<VerbInfo>({
		data: filteredData,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const handleChipClick = useCallback((lvl: string) => {
		setSelectedLevels(prev => prev.includes(lvl) ? prev.filter(x => x !== lvl) : [...prev, lvl]);
	}, [setSelectedLevels]);

	return (
		<Container maxWidth="lg">
			<h2>Vocabulary</h2>

			<Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
				<SearchField 
					onChange={setSearchQuery} 
				/>
			</Box>

			<TableContainer component={Paper}>
				<MuiTable size="small">
					<TableHead>
					{table.getHeaderGroups().map((hg: HeaderGroup<VerbInfo>) => (
						<TableRow key={hg.id}>
							{hg.headers.map(h => {
								const colId = h.id;
								const sortable = colId === 'infinitive' || colId === 'progress';
								const sortKey = colId === 'infinitive' ? 'infinitive' : colId === 'progress' ? 'progress' : null;
								const isActiveSort = sortKey && sortBy === sortKey;
								return (
									<TableCell
										key={h.id}
										sx={{ borderBottom: '1px solid #ccc', cursor: sortable ? 'pointer' : 'default' }}
										onClick={sortable ? () => {
											if (!sortKey) return;
											if (sortBy === sortKey) {
												setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
											} else {
												setSortBy(sortKey);
												setSortDir('asc');
											}
										} : undefined}
									>
										{flexRender(h.column.columnDef.header, h.getContext())}
										{isActiveSort ? (sortDir === 'asc' ? ' ▲' : ' ▼') : null}
									</TableCell>
								);
							})}
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
						</TableRow>
					))}
					</TableBody>
				</MuiTable>
			</TableContainer>
		</Container>
	);
}
