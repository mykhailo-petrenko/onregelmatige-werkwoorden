import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import type { VerbInfo, VerbList } from '../Lists/types.ts';
import { memo, useMemo } from 'react';

export interface VerbListProps {
  list: VerbList | null;
  onDelete?: (id: string) => void;
}

const VerbListTable = memo(function VerbListTable(props: VerbListProps) {


  const tableRows = useMemo(() => {
    const rows: VerbInfo[] = props.list?.items || [];
    return rows.map((row) => {
      const key = `row=${row.id}`;

      const handleDelete = () => {
        props.onDelete?.(row.id);
      };

      return <TableRow
        key={key}
      >
        <TableCell component="th" scope="row">{row.infinitive}</TableCell>
        <TableCell>{row.imperfectum[0]}</TableCell>
        <TableCell>{row.imperfectum[1]}</TableCell>
        <TableCell>{row.perfectum.join(', ')} ({row.hulpWerkwoorden.join('/')})</TableCell>
        <TableCell>{row.vertaling}</TableCell>
        <TableCell>
          <IconButton aria-label="delete" size="small" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    });
  }, [props.list?.items]);

  return (<>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Infinitief</TableCell>
            <TableCell colSpan={2}>Imperfectum</TableCell>
            <TableCell>Perfectum</TableCell>
            <TableCell>Vertaling</TableCell>
            <TableCell>Acties</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
  </>);
});

export default VerbListTable;
