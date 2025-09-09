import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import type { VerbInfo, VerbList } from '../Lists/types.ts';
import { memo, useMemo } from 'react';

export interface VerbListProps {
  list: VerbList | null;
}

const VerbListTable = memo(function VerbListTable(props: VerbListProps) {

  const tableRows = useMemo(() => {
    const rows: VerbInfo[] = props.list?.items || [];
    return rows.map((row) => {
      const key = `row=${row.id}`;

      return <TableRow
        key={key}
      >
        <TableCell component="th" scope="row">{row.infinitive}</TableCell>
        <TableCell>{row.imperfectum[0]}</TableCell>
        <TableCell>{row.imperfectum[1]}</TableCell>
        <TableCell>{row.perfectum.join(', ')} ({row.hulpWerkwoorden.join('/')})</TableCell>
        <TableCell>{row.vertaling}</TableCell>
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
