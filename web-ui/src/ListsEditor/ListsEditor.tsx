import { Container } from '@mui/material';
import VerbListTable from './VerbListTable.tsx';
import { useCurrentLearnList, usedeleteWordFromCurrentList } from '../Lists/activeLlistProvider.ts';

export function ListEditor() {

  const currentList = useCurrentLearnList();
  const selecteWordFromList = usedeleteWordFromCurrentList();

  return (<>
    <Container maxWidth="lg">
      <p>&nbsp;</p>
      <VerbListTable
        list={currentList}
        onDelete={selecteWordFromList}
      />
      </Container>
  </>);
}
