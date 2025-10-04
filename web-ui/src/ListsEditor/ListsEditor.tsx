import { Divider, Container } from '@mui/material';
import VerbListTable from './VerbListTable.tsx';
import { useCurrentLearnList } from '../Lists/activeLlistProvider.ts';

export function ListEditor() {

  const currentList = useCurrentLearnList();

    return (<>
    <Container maxWidth="lg">
      <section>
        <h3>{currentList?.label}</h3>
      </section>
      <Divider />
      <VerbListTable
        list={currentList}
      />
      </Container>
    </>);
}
