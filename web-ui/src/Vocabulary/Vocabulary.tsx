import React, { type JSX } from 'react';
import { ALL_WORDS, DEFAULT_LISTS } from '../Lists/words';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Box, Chip, Container, Table as MuiTable, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { useWordBuckets, MAX_BUCKET } from '../Lists/statsStorage';
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

const DEFAULT_COLOR = '#e0e0e0';

const LEARNING_GRADIENT = [
	'#FF4E11', 
	'#FF8E15',
	'#FAB733',
	'#ACB334',
	'#69B34C',
];

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
			
			const bucket = getWordBucket(id, 0);

			// color mapping: 1 -> orange, 5 -> green, interpolate roughly
			const color = bucket && LEARNING_GRADIENT[bucket - 1];

			// render 5 segments; filled segments colored according to bucket, others are light gray
			const segments = new Array(MAX_BUCKET).fill(0).map((_, i) => {
				const filled = i < bucket;
				return (
					<Box
						key={i}
						sx={{
							width: 18,
							height: 10,
							borderRadius: 1,
							backgroundColor: filled ? color : DEFAULT_COLOR,
						}}
					/>
				);
			});

			return (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
					{segments}
				</Box>
			);
		}
	}), [getWordBucket]);

	const columnsWithProgress = React.useMemo(() => [...columns, progressCol], [progressCol]);

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
