import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import type { VerbInfo, VerbList } from './VerbTypes.ts';
import { memo } from 'react';

export interface VerbListProps {
  list: VerbList | null;
}

const VerbListTable = memo(function VerbListTable(props: VerbListProps) {
  const rows: VerbInfo[] = props.list?.items || [];
  console.log('VerbListTable', rows);

  const tableRows = rows.map((row) => {
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
