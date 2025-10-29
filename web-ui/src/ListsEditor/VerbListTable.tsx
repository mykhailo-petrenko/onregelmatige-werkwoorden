import { memo, useMemo, useState } from 'react';
import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { VerbInfo, VerbList } from '../Lists/types';
import WordProgress from '../Lists/WordProgress';
import { SearchField } from '../Lists/SearchField';
import { useWordBuckets } from '../Lists/statsStorage';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import type { ColumnDef, HeaderGroup, Row, Cell } from '@tanstack/react-table';

export interface VerbListProps {
  list: VerbList | null;
  onDelete?: (id: string) => void;
}

const VerbListTable = memo(function VerbListTable(props: VerbListProps) {
  // Search and sorting state
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<string | null>('infinitive');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const data = useMemo<VerbInfo[]>(() => props.list?.items || [], [props.list?.items]);

  const { getWordBucket } = useWordBuckets();

  const filteredAndSorted = useMemo(() => {
    let base = data;

    const q = (query || '').trim().toLowerCase();
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
          return sortDir === 'asc' ? a.infinitive.localeCompare(b.infinitive) : b.infinitive.localeCompare(a.infinitive);
        }
        if (sortBy === 'progress') {
          const A = getWordBucket(a.id, 0);
          const B = getWordBucket(b.id, 0);
          return sortDir === 'asc' ? A - B : B - A;
        }
        return 0;
      });
    }

    return base;
  }, [data, query, sortBy, sortDir, getWordBucket]);

  const columns: ColumnDef<VerbInfo>[] = useMemo(() => {
    return [
      {
        accessorKey: 'infinitive',
        header: 'Infinitief',
        cell: info => String(info.getValue()),
      },
      {
        id: 'imperfectum-0',
        header: 'Imperfectum',
        accessorFn: row => Array.isArray(row.imperfectum) ? row.imperfectum[0] : '',
        cell: info => String(info.getValue()),
      },
      {
        id: 'imperfectum-1',
        header: '',
        accessorFn: row => Array.isArray(row.imperfectum) ? row.imperfectum[1] : '',
        cell: info => String(info.getValue()),
      },
      {
        accessorKey: 'perfectum',
        header: 'Perfectum',
        cell: info => Array.isArray(info.getValue()) ? (info.getValue() as string[]).join(', ') + ' (' + ((info.row.original.hulpWerkwoorden || []).join('/')) + ')' : '',
      },
      {
        accessorKey: 'vertaling',
        header: 'Vertaling',
        cell: info => String(info.getValue()),
      },
      {
        id: 'progress',
        header: 'Progress',
        accessorFn: row => row.id,
        cell: ctx => <WordProgress wordId={ctx.getValue() as string} />,
      },
      {
        id: 'actions',
        header: 'Acties',
        cell: ctx => {
          const id = ctx.row.original.id;
          return (
            <IconButton aria-label="delete" size="small" onClick={() => props.onDelete?.(id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          );
        }
      }
    ];
  }, [props.onDelete]);

  const table = useReactTable<VerbInfo>({
    data: filteredAndSorted,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (<>
    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }} />
      <SearchField onChange={setQuery} />
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
  </>);
});

export default VerbListTable;
